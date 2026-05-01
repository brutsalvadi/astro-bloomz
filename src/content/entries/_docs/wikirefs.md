---
title: WikiRefs
---

plugin::[[remark-wikirefs]]


I `[[WikiRefs]]`[^nomi] sono una parte fondamentale del mondo del [[digital-garden|digital gardening]]. Sono il mattone di base dell'interconnessione realizzata in molti giardini digitali, incluso questo. Vengono renderizzati con il plugin [[remark-wikirefs]], appaiono in un colore diverso rispetto ai link web esterni, e puoi consultare quella documentazione per ulteriori dettagli.

In breve, questo particolare tipo di `[[wikirefs]]` comprende tre costrutti wiki: wikiattr, wikilink e wikimbed.

I _WikiAttr_ sono attributi formalizzati di un file. Includono un tipo di attributo descrittivo e un wikilink a un altro file. Si scrivono `:così::[[wikilink]]` (con un'a capo dopo) e vengono renderizzati nell'attributebox (attrbox).

I _WikiLink_ sono i tradizionali link bidirezionali con la sintassi a parentesi quadre e possono comparire ovunque in un file. Esistono `:tipizzati::[[wikilink]]` e normali `[[wikilink]]` non tipizzati. Sono evidenziati in un colore diverso rispetto ai link web esterni.

I _WikiEmbed_ incorporano il contenuto del file collegato direttamente nella pagina corrente. È possibile incorporare file markdown, immagini, audio o video. I WikiEmbed si scrivono `![[così]]`.


[^nomi]: "wikiref" porta in realtà molti nomi: "[wikilink](https://en.wikipedia.org/wiki/Help:Link)", "[link bidirezionale](https://maggieappleton.com/bidirectionals)", "[wikitext linking](https://tiddlywiki.com/#Linking%20in%20WikiText)", "backlink", "[link interno](https://help.obsidian.md/How+to/Internal+link)", per citarne solo alcuni...
