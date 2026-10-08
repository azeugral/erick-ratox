# Erick Ratox · site

Site do tatuador **Erick Ratox** (@erick_ratox), Salvador, BA. CEO do Rapadura Ink Studio (@rapaduraink), em Stella Maris.
HTML, CSS e JS puros, sem dependências. Publicado no GitHub Pages: https://azeugral.github.io/erick-ratox/

## Estrutura

- `_ref/build.py` gera as páginas: head, header, menu, muro, footer e scripts são compartilhados. Edite o miolo em `_ref/pages/*.html` e rode `python _ref/build.py`.
- `css/style.css` tem os tokens no topo: asfalto `#111110`, cal `#f4f1e8` e verde-ácido de spray `#c8f031`.
- `js/main.js` tem o `CONFIG` no topo: WhatsApp, Instagram e o Cloudinary (opcional).
- Fontes: Sedgwick Ave Display (títulos em graffiti), Unbounded, IBM Plex Sans e JetBrains Mono.
- Logo: o original está em `assets/brand/`. Em `assets/img/` ficam a versão com o miolo cal (`logo-ratox`) e a versão com a faixa verde-ácido (`logo-ratox-acid`).
- O fundo é o muro: concreto em SVG com tags apagadas e um canvas de spray que segue o dedo ou o mouse, com a tinta escorrendo.

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Hero com o adesivo, crachá "Hello, meu nome é Ratox", estilos, prêmios, rua, estúdio e chamada final |
| `portfolio.html` | Filtros (tribal, preto e cinza, linhas, freehand, reforma), lightbox e reels que abrem no Instagram |
| `rua.html` | Manifesto, graffiti, break, roupas e produtos, podcast |
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

- [ ] **Portfólio**: as fotos em `assets/img/port/` são miniaturas de 640px tiradas do Instagram, só para a prévia. Trocar pelas do zip.
- [ ] Foto do Erick e do estúdio (hoje há placeholders listrados).
- [ ] Endereço completo e horário do Rapadura Ink.
- [ ] Tattoo Week RJ: categoria e ano do prêmio.
- [ ] Break: grupo, eventos, foto ou vídeo.
- [ ] Podcast: nome, link e capa.
- [ ] Produtos: o que está à venda, preços e fotos (camiseta? isqueiro?).
- [ ] Valor mínimo e regra de sinal.
- [ ] Cuidados: curativo, pomada e hidratante que o Erick indica.
- [ ] Domínio próprio: trocar o `BASE` em `_ref/build.py` e o `<base>` do 404, criar o `CNAME` e atualizar o `sitemap.xml` e o `robots.txt`.
- [ ] Opcional: preset do Cloudinary em `js/main.js` para a foto de referência ir junto com a mensagem do orçamento.

Site por [L R G Z](https://lrgz.com.br)
