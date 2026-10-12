# Erick Ratox · site

Site do tatuador **Erick Ratox** (@erick_ratox), Salvador, BA. CEO do Rapadura Ink Studio (@rapaduraink), em Stella Maris.
HTML, CSS e JS puros, sem dependências. Publicado no GitHub Pages: https://azeugral.github.io/erick-ratox/

## Estrutura

- `_ref/build.py` gera as páginas: head, header, menu, muro, footer e scripts são compartilhados. Edite o miolo em `_ref/pages/*.html` e rode `python _ref/build.py`.
- `css/style.css` tem os tokens no topo: preto `#0a0a0a` e branco `#f2f2f0`/`#ffffff` (P&B forte; o token `--acido` hoje é o branco de destaque). A seção de prêmios é invertida (papel branco).
- `js/main.js` tem o `CONFIG` no topo: WhatsApp, Instagram e o Cloudinary (opcional).
- Fontes: Sedgwick Ave Display (títulos em graffiti), Unbounded, IBM Plex Sans e JetBrains Mono.
- Logo: o original está em `assets/brand/`. Em `assets/img/logo-ratox*` fica a versão oficial com o miolo branco.
- Prévia de link (WhatsApp/Instagram): `assets/img/og.jpg`, gerada por `_ref/og.py`.
- O fundo é o muro: concreto em SVG com tags apagadas e um canvas de spray que segue o dedo ou o mouse, com a tinta escorrendo.

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Hero com o adesivo, foto do Erick com crachá "Hello, meu nome é Ratox", estilos, prêmios, estúdio e chamada final |
| `portfolio.html` | 46 fotos do zip (lista em `_ref/portfolio.json`: arquivo, filtros, legenda), filtros e lightbox com setas e swipe |
| `orcamento.html` | Formulário que monta a mensagem e abre o WhatsApp, mais as dúvidas frequentes |
| `cuidados.html` | Cuidados com a tattoo |
| `404.html` | Página de erro |

## Dados extraídos do Instagram (08/10/2026)

- Bio: "Tatuador profissional em Salvador, BA · Ceo: @rapaduraink · Tatuador premiado na maior convenção do mundo. @tattooweek"
- Link da bio (bit.ly/4aXqjOF): WhatsApp **+55 71 98294-9726**
- Destaques: Tribal, Podcast, Preto e cinza, Produtos
- Prêmios: Tattoo Week RJ (prêmio; foi com um stand ganho em sorteio da @oddsheepoficial) e Combate Convenção Online (1º Freehand e 1º Tribal, post de dez/2024). Tattoo Week SP em 2025 (tatuou ao vivo).
- Rapadura Ink Studio: "Um novo conceito de tatuagem e piercing em Stella Maris". Fez dois anos em 2026.
- Fora da tattoo: graffiti (tag Ratox), break, roupas (ecobags com isqueiro personalizado de brinde) e "toda segunda-feira um post fora da tatuagem".

## CONFIRMAR antes de publicar de verdade

- [x] Portfólio e estilos com as fotos do zip; foto do Erick em "Quem tatua".
- [ ] Revisar a categoria (filtro) de cada foto em `_ref/portfolio.json`.
- [x] Foto do estúdio (fachada, enviada em 12/10).
- [ ] Endereço completo e horário do Rapadura Ink.
- [ ] Tattoo Week RJ: categoria e ano do prêmio.
- [ ] Valor mínimo e regra de sinal.
- [ ] Cuidados: curativo, pomada e hidratante que o Erick indica.
- [ ] Domínio próprio: trocar o `BASE` em `_ref/build.py` e o `<base>` do 404, criar o `CNAME` e atualizar o `sitemap.xml` e o `robots.txt`.
- [ ] Opcional: preset do Cloudinary em `js/main.js` para a foto de referência ir junto com a mensagem do orçamento.

Site por [L R G Z](https://lrgz.com.br)
