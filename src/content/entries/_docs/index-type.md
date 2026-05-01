---
title: DocType Index
---

I documenti indice sono il metodo principale per strutturare l'[[semantic-tree]]. Sono uno dei tipi di documento centrali di questo template (insieme agli [[entry-type]] e ai [[post-type]]).

### Navigazione

- Tramite la [[map-page]].
- Tramite i [[wikirefs]].

### Markdown

I file indice costruiscono l'[[semantic-tree]], visualizzabile nella [[map-page]]. Vanno collocati nella directory `./content/index/` e ciascuno deve contenere un elenco markdown con [[wikirefs]] che puntano tipicamente a [[entry-type|entry]] (ma possono puntare a qualsiasi [[doctype]]). Possono contenere o meno frontmatter yaml.

I documenti devono avere questa forma (senza i commenti):

(i caratteri di escape `\\` sono aggiunti per mostrare il testo grezzo)

```markdown
// file: i.bonsai.md

- [[bk.how-to-read-a-book]]
  - [[read]]
    - [[4-levels-of-reading]]
      - [[elementary-reading]]
      - [[inspectional-reading]]
      - [[analytical-reading]]
      - [[syntopical-reading]]
```

L'albero può essere suddiviso in più file indice:

```markdown
// file: i.bonsai.md

- [[bk.how-to-read-a-book]]
  - [[i.read]]
```

```markdown
// file: i.read.md

- [[4-levels-of-reading]]
  - [[elementary-reading]]
  - [[inspectional-reading]]
  - [[analytical-reading]]
  - [[syntopical-reading]]
```

Entrambi gli esempi genereranno un albero con questa struttura:

```markdown
i.bonsai
└── bk.how-to-read-a-book
    └── i.read
        └── 4-levels-of-reading
          ├── elementary-reading
          ├── inspectional-reading
          ├── analytical-reading
          └── syntopical-reading
```
