---
title: Test
date: '2021-08-04'
---

Questa pagina serve a testare e mostrare gli stili markdown disponibili in questo template.

## Markdown

(alcuni caratteri di escape `\` sono aggiunti per mostrare il testo grezzo)

### WikiRefs

#### WikiAttr con prefisso (vedi attrbox per l'output)

```markdown
:prefixed-wikiattr::[[wikirefs]]
```

:prefixed-wikiattr::[[wikirefs]]

#### Lista WikiAttr con prefisso (vedi attrbox per l'output)

```markdown
: prefixed-wikiattr-list :: 
- [[wikirefs]]
- [[feedback]]
```

: prefixed-wikiattr-list :: 
- [[wikirefs]]
- [[feedback]]

#### WikiAttr senza prefisso (vedi attrbox per il rendering)

```markdown
unprefixed-wikiattr::[[wikirefs]]
```

unprefixed-wikiattr::[[wikirefs]]

#### Lista WikiAttr senza prefisso (vedi attrbox per il rendering)

```markdown
unprefixed-wikiattr-list :: 
- [[wikirefs]]
- [[feedback]]
```

unprefixed-wikiattr-list :: 
- [[wikirefs]]
- [[feedback]]

#### Un WikiLink

```markdown
[[digital-garden]]
```

[[digital-garden]]

#### Un WikiLink tipizzato (controlla l'HTML per la classe CSS linktype)

```markdown
:typed-wikilink::[[digital-garden]].
```

:typed-wikilink::[[digital-garden]].

#### Un WikiEmbed (Markdown)

```markdown
![[test-render]]
```

![[test-render]]

#### Un WikiEmbed (Immagine)

```markdown
![[wikibonsai-way.png]]
```

![[wikibonsai-way.png]]

#### Zombie (link a pagine inesistenti)

#### WikiAttr con prefisso zombie (vedi attrbox per il rendering)

```markdown
:zombie-wikiattr::[[zombie]]
```

:zombie-wikiattr::[[zombie]]

#### Lista WikiAttr con prefisso zombie (vedi attrbox per il rendering)

```markdown
: zombie-wikiattr-list :: 
- [[zombie-1]]
- [[zombie-2]]
```

: zombie-wikiattr-list :: 
- [[zombie-1]]
- [[zombie-2]]

#### WikiAttr senza prefisso zombie (vedi attrbox per il rendering)

```markdown
zombie-wikiattr::[[zombie]]
```

zombie-wikiattr::[[zombie]]

#### Lista WikiAttr senza prefisso zombie (vedi attrbox per il rendering)

```markdown
zombie-wikiattr-list :: 
- [[zombie-1]]
- [[zombie-2]]
```

zombie-wikiattr-list :: 
- [[zombie-1]]
- [[zombie-2]]

#### WikiLink zombie

```markdown
[[zombie]]
```

[[zombie]]

#### WikiLink tipizzato zombie

```markdown
:zombie-typed-wikilink::[[zombie]].
```

:zombie-typed-wikilink::[[zombie]].

#### WikiEmbed zombie

```markdown
![[zombie]]
```

![[zombie]]

#### Intestazioni

```markdown
# Intestazione 1
## Intestazione 2
### Intestazione 3
#### Intestazione 4
##### Intestazione 5
###### Intestazione 6
```

# Intestazione 1
## Intestazione 2
### Intestazione 3
#### Intestazione 4
##### Intestazione 5
###### Intestazione 6

#### Liste

```markdown
- Uno
- Due
- Tre
```

- Uno
- Due
- Tre

#### Citazione

```markdown
> Citazione.
```

> Citazione.

#### Link web

```markdown
[Link web](https://astro-bloomz.netlify.app)
```

[Link web](https://astro-bloomz.netlify.app)

#### Blocco di codice

```javascript
// javascript
for (var i=1; i < 101; i++){
    if (i % 15 == 0) console.log("FizzBuzz");
    else if (i % 3 == 0) console.log("Fizz");
    else if (i % 5 == 0) console.log("Buzz");
    else console.log(i);
}
```

```ruby
# ruby
 1.upto 100 do |i|
  string = ""
  string += "Fizz" if i % 3 == 0
  string += "Buzz" if i % 5 == 0
  puts "#{i} = #{string}"
end
```

#### Codice inline

```markdown
Va bene, `va bene`, va bene.
```

Va bene, `va bene`, va bene.

#### Tabelle

```markdown
| Conigli | Volpi | Ricci |
|:------- |:-----:| -----:|
| 25      | 3     | 12    |
| 100     | 10    | 20    |
```

| Conigli | Volpi | Ricci |
|:------- |:-----:| -----:|
| 25      | 3     | 12    |
| 100     | 10    | 20    |

#### Testo lungo

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet, eros in aliquet eleifend, felis tellus laoreet velit, a feugiat purus mi at arcu. Sed tempor congue gravida. Suspendisse sodales ultricies lacus, nec consequat mauris dictum in. Aliquam at lacus sodales, porta velit in, consequat mauris. Maecenas consequat fermentum tortor, vitae tincidunt sem porta vel. Sed elementum dui libero, vitae bibendum est imperdiet non. Curabitur sit amet libero quis nulla faucibus euismod. Cras condimentum ante tortor, a sollicitudin elit accumsan eget.
