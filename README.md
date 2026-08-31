# ADC — Amigos do Consórcio

Site estático (HTML + CSS + JS puro). Sem build, sem dependência.

## Estrutura

```
index.html
css/style.css
js/script.js
assets/
  ├── adc-logo.svg          ← logo completo (anel dourado + ADC)
  ├── adc-anel.svg          ← só o anel (marca d'água do hero e do CTA)
  ├── adc-letras.svg        ← só as letras ADC (tela de load)
  ├── adc-logo-cream.svg    ← versão monocromática clara
  ├── adc-logo-preto.svg    ← versão monocromática escura (fundo claro)
  ├── enzo.jpg
  └── pedro.jpg
```

Todo o logo é **SVG vetorial**: o anel é um círculo geométrico perfeito e as
letras foram traçadas do original. Nítido em qualquer tamanho, inclusive
impresso.

## Deploy

1. `git init` → `git add .` → `git commit -m "first"`
2. Push pro GitHub
3. Vercel → Import repo → Framework: **Other** → Deploy

## Antes de publicar — conferir

| O quê | Onde |
|---|---|
| WhatsApp dos dois | `js/script.js`, objeto `WPP` — e os links no `index.html` |
| Instagram | @amigosdoconsorcio_ (ADC), @enzosantorelli_ e @opedrolucass_ |
| Área de atendimento | rodapé |

## Cores

- Dourado (do logo): `#D8A94F`
- Dourado claro: `#F0C878`
- Dourado profundo: `#9A7430`
- Preto: `#0C0B09`
- Creme: `#EFE6D6`

## Tipografia

- **Outfit** 200/300 — títulos e números
- **Sora** 300 — corpo
- **Space Grotesk** — rótulos e microtextos

## Os dois momentos de assinatura

**Tela de load** — o anel do logo se desenha em círculo (stroke animado) e as
letras ADC acendem no centro.

**Anel seletor de modalidades** — no lugar de um acordeão comum, um arco
dourado percorre o anel até a posição da modalidade escolhida, com o nome
trocando no centro. O arco sempre gira pelo caminho mais curto.

---
Nova AI Solutions
