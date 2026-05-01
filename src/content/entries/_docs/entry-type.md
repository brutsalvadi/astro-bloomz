---
title: DocType Entry
---

Come in un dizionario, un'enciclopedia o Wikipedia, le entry sono uno dei tipi di documento centrali di questo template (insieme agli [[index-type]] e ai [[post-type]]). Sono concetti e idee atomici, significativamente [[wikirefs|collegati]] tra loro in modo da rendere comprensibile come quei concetti si relazionano.

Il percorso breadcrumb è formato dalla posizione dell'entry corrente nell'[[semantic-tree]]. I link nel footer sono costruiti sia dalla sua posizione nell'albero sia dai [[wikirefs]] in avanti e a ritroso.

### Markdown

Le entry conterranno tipicamente frontmatter e/o wikiattr, seguiti dal testo markdown:

```markdown
---
frontmatter: attributi
---

:tipo::[[wikiattr]]

Segue il resto del testo del documento,
che potrà contenere altri [[wikilink]].
```
