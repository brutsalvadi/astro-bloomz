<script lang="ts">
  import SECTIONS from '../../../config/sections.json';

  let open = false;
  let isNew = false;
  let slug = '';           // used for existing pages
  let baseName = '';       // page name part for new pages
  let selectedSection = '';
  let selectedSub = '';
  let content = '';
  let apiBase = '/pages';
  let saving = false;
  let deleting = false;
  let saveStatus = '';
  let savedUrl = '';
  let errorMsg = '';
  let uploading = false;
  let dragOver = false;
  let fileInput: HTMLInputElement;

  $: section = SECTIONS.find(s => s.slug === selectedSection) ?? null;
  $: subs = section?.sub ?? [];
  $: fullSlug = [selectedSection, selectedSub, baseName].filter(Boolean).join('/');

  function reset(detail: { slug?: string; apiBase?: string }) {
    apiBase = detail.apiBase ?? '/pages';
    slug = detail.slug ?? '';
    baseName = '';
    selectedSection = '';
    selectedSub = '';
    content = '';
    isNew = !slug;
    saving = false;
    deleting = false;
    saveStatus = '';
    savedUrl = '';
    errorMsg = '';
  }

  function onSectionChange() {
    selectedSub = '';
    applyWikiref();
  }

  function applyWikiref() {
    const newRef = section ? `[[${section.label}]]` : '';
    const existing = /\[\[Bincio[A-Za-z]+\]\]/;
    if (existing.test(content)) {
      content = newRef
        ? content.replace(existing, newRef)
        : content.replace(new RegExp(`\\s*\\[\\[Bincio[A-Za-z]+\\]\\]\\n?`), '');
    } else if (newRef) {
      content = content.trimEnd() + '\n\n' + newRef + '\n';
    }
  }

  async function loadContent() {
    if (!slug) return;
    try {
      const r = await fetch(`${apiBase}/${slug}`, { credentials: 'include' });
      if (r.status === 404) { errorMsg = 'File non trovato — potrebbe essere già stato eliminato'; return; }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      content = data.content;
    } catch (e) {
      errorMsg = `Errore nel caricamento: ${e}`;
    }
  }

  async function save() {
    const s = (isNew ? fullSlug : slug).trim().toLowerCase().replace(/\s+/g, '-');
    if (!s) { errorMsg = 'Nome richiesto'; return; }
    if (isNew) baseName = baseName.trim().toLowerCase().replace(/\s+/g, '-');
    else slug = s;
    saving = true;
    errorMsg = '';
    try {
      const r = await fetch(`${apiBase}/${s}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content }),
      });
      if (!r.ok) throw new Error(await r.text());
      saveStatus = 'Salvato';
      if (isNew) {
        savedUrl = apiBase === '/stories' ? `/blog/${s}/` : `/entries/${s}/`;
      } else {
        setTimeout(() => window.location.reload(), 400);
      }
    } catch (e) {
      errorMsg = `Errore: ${e}`;
    } finally {
      saving = false;
    }
  }

  async function deletePage() {
    if (!confirm('Eliminare questa pagina?')) return;
    deleting = true;
    errorMsg = '';
    try {
      const r = await fetch(`${apiBase}/${slug}`, { method: 'DELETE', credentials: 'include' });
      if (!r.ok) throw new Error(await r.text());
      window.location.href = apiBase === '/stories' ? '/blog/' : '/entries/';
    } catch (e) {
      errorMsg = `Errore: ${e}`;
      deleting = false;
    }
  }

  async function uploadFiles(files: FileList | File[]) {
    uploading = true;
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const r = await fetch('/api/assets', { method: 'POST', body: fd, credentials: 'include' });
        if (!r.ok) { errorMsg = `Upload fallito: ${await r.text()}`; continue; }
        const d = await r.json();
        const ref = `\n![${d.filename.replace(/\.[^.]+$/, '')}](${d.url})`;
        content = content.trimEnd() + ref;
      }
    } finally {
      uploading = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') open = false;
    if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); save(); }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('open-editor', (e: Event) => {
      const detail = (e as CustomEvent).detail ?? {};
      reset(detail);
      open = true;
      if (!isNew) loadContent();
    });
  }

  function newContentTemplate() {
    if (apiBase === '/stories') {
      const today = new Date().toISOString().split('T')[0];
      return `---\ntitle: Senza titolo\ndescription: ...\npubDate: ${today}\n---\n\n`;
    }
    return `---\ntitle: Senza titolo\n---\n\n`;
  }

  $: if (open && isNew && !content) content = newContentTemplate();
</script>

{#if open}
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  role="dialog"
  class="fixed inset-0 z-50 flex flex-col"
  style="background: var(--bg-base)"
  on:keydown={handleKeydown}
  tabindex="-1"
>
  <!-- Header bar -->
  <div class="flex items-center gap-2 px-4 h-12 border-b shrink-0" style="border-color: var(--border)">
    {#if isNew}
      <!-- Section picker -->
      <select
        bind:value={selectedSection}
        on:change={onSectionChange}
        class="bg-transparent text-xs outline-none cursor-pointer shrink-0"
        style="color: var(--text-4)"
      >
        <option value="">— sezione —</option>
        {#each SECTIONS as s}
          <option value={s.slug}>{s.label}</option>
        {/each}
      </select>

      {#if subs.length}
        <span class="text-zinc-600 shrink-0">/</span>
        <select
          bind:value={selectedSub}
          class="bg-transparent text-xs outline-none cursor-pointer shrink-0"
          style="color: var(--text-4)"
        >
          <option value="">— sottosezione —</option>
          {#each subs as sub}
            <option value={sub.slug}>{sub.label}</option>
          {/each}
        </select>
      {/if}

      {#if selectedSection}
        <span class="text-zinc-600 shrink-0">/</span>
      {/if}

      <input
        type="text"
        bind:value={baseName}
        placeholder="nome-pagina"
        class="bg-transparent text-sm font-mono outline-none flex-1 min-w-0"
        style="color: var(--text-2)"
        autofocus
      />
    {:else}
      <span class="text-sm font-mono truncate flex-1 min-w-0" style="color: var(--text-4)">{slug}</span>
    {/if}

    <div class="ml-auto shrink-0 flex items-center gap-2">
      {#if saveStatus}
        <span class="text-xs" style="color: var(--accent)">{saveStatus}</span>
      {/if}
      {#if savedUrl}
        <a
          href={savedUrl}
          class="text-xs px-2 py-1 rounded border transition-colors"
          style="color: var(--accent); border-color: var(--accent)"
        >Visualizza →</a>
      {/if}
      {#if !isNew}
        <button
          on:click={deletePage}
          disabled={deleting}
          class="text-xs text-zinc-500 hover:text-red-400 transition-colors px-2 py-1 rounded border border-zinc-700 hover:border-red-800 disabled:opacity-50"
        >{deleting ? '…' : 'Elimina'}</button>
      {/if}
      <button
        on:click={save}
        disabled={saving}
        class="text-xs px-3 py-1 rounded border transition-colors disabled:opacity-50"
        style="color: var(--accent); border-color: var(--accent)"
      >{saving ? '…' : 'Salva'}</button>
      <button
        on:click={() => open = false}
        class="text-zinc-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center text-lg"
        title="Chiudi (Esc)"
      >✕</button>
    </div>
  </div>

  {#if errorMsg}
    <div class="px-4 py-2 text-xs shrink-0" style="color: #f87171">{errorMsg}</div>
  {/if}

  <textarea
    bind:value={content}
    class="flex-1 w-full p-4 bg-transparent font-mono text-sm resize-none outline-none"
    style="color: var(--text-2)"
    placeholder="Scrivi in markdown…"
    spellcheck="false"
    on:dragover|preventDefault={() => dragOver = true}
    on:dragleave={() => dragOver = false}
    on:drop|preventDefault={e => { dragOver = false; if (e.dataTransfer?.files) uploadFiles(e.dataTransfer.files); }}
  ></textarea>

  <!-- Image upload bar -->
  <div
    class="shrink-0 flex items-center gap-3 px-4 py-2 border-t text-xs transition-colors"
    style="border-color: var(--border); background: {dragOver ? 'var(--bg-2)' : 'transparent'}"
  >
    <button
      on:click={() => fileInput.click()}
      disabled={uploading}
      class="text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-40"
      title="Carica immagine"
    >{uploading ? 'Caricamento…' : '+ Immagine'}</button>
    <span class="text-zinc-600">oppure trascina un file nell'editor</span>
    <input bind:this={fileInput} type="file" accept="image/*" multiple class="hidden"
      on:change={e => e.currentTarget.files && uploadFiles(e.currentTarget.files)} />
  </div>
</div>
{/if}
