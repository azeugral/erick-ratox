"""Gera as páginas do site do Erick Ratox a partir de _ref/pages/*.html.

Cada página tem só o <main>; head, header, menu, muro, footer e scripts vêm daqui.
Rodar da raiz do projeto:  python _ref/build.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ROOT / "_ref" / "pages"
# CONFIRMAR: trocar pelo domínio próprio quando existir (e criar o arquivo CNAME).
BASE = "https://azeugral.github.io/erick-ratox/"
VER = "20261008"

ICON = {
    "wa": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.3-1.5-5.2C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8M20.4 3.6C18.2 1.3 15.2 0 12 0 5.5 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.2"/></svg>',
    "ig": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    "trofeu": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8M9 18h6"/></svg>',
    "spray": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="9" width="8" height="13"/><path d="M9 9V6h4v3M11 6V4"/><path d="M17 4h.01M20 3h.01M19 6h.01M21 7h.01M17 7h.01" stroke-linecap="round" stroke-width="2.4"/></svg>',
}

NAV = [
    ("index.html", "Início"),
    ("portfolio.html", "Portfólio"),
    ("cuidados.html", "Cuidados"),
    ("orcamento.html", "Orçamento"),
]


def head(title, desc, path, extra="", base=""):
    url = BASE + ("" if path == "index.html" else path)
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
{base}  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="theme-color" content="#0a0a0a">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{BASE}assets/img/og.jpg">
  <meta property="og:locale" content="pt_BR">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" href="favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sedgwick+Ave+Display&family=Unbounded:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css?v={VER}">
{extra}</head>"""


def header():
    links = "\n".join(f'        <a class="nav__link" href="{h}">{t}</a>' for h, t in NAV[1:-1])
    menu = "\n".join(f'      <li><a class="menu__link" href="{h}">{t}</a></li>' for h, t in NAV)
    return f"""<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<div class="muro" aria-hidden="true">
  <span class="muro__ghost muro__ghost--1">Ratox</span>
  <span class="muro__ghost muro__ghost--2">SSA 071</span>
  <span class="muro__ghost muro__ghost--3">rapadura</span>
  <canvas class="muro__spray"></canvas>
</div>
<header class="header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Erick Ratox, início">
      <img src="assets/img/logo-ratox-660.webp" alt="" width="51" height="42">
      <span class="brand__name">Erick Ratox</span>
    </a>
    <nav class="nav" aria-label="Principal">
{links}
      <a class="btn" href="orcamento.html">Orçamento</a>
    </nav>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu">
      <span class="nav-toggle__label">Menu</span><span class="nav-toggle__bars" aria-hidden="true"></span>
    </button>
  </div>
</header>
<div class="menu" id="menu">
  <nav aria-label="Menu">
    <ul class="menu__list">
{menu}
    </ul>
  </nav>
  <div class="menu__foot">
    <a class="btn btn--block" href="orcamento.html">Pedir orçamento</a>
    <a data-wa href="#">WhatsApp (71) 98294-9726</a>
    <a href="https://www.instagram.com/erick_ratox/" target="_blank" rel="noopener">@erick_ratox</a>
    <a href="https://www.instagram.com/rapaduraink/" target="_blank" rel="noopener">@rapaduraink · Stella Maris, Salvador</a>
  </div>
</div>
"""


def footer():
    pages = "\n".join(f'          <li><a href="{h}">{t}</a></li>' for h, t in NAV)
    return f"""<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div class="footer__brand">
        <img src="assets/img/logo-ratox-660.webp" alt="Hello Ratox" width="150" height="124" loading="lazy">
        <p>Tatuador em Salvador, BA. Tribal, preto e cinza e freehand no Rapadura Ink Studio, em Stella Maris.</p>
      </div>
      <div>
        <h4>Páginas</h4>
        <ul>
{pages}
        </ul>
      </div>
      <div>
        <h4>Contato</h4>
        <ul>
          <li><a data-wa href="#">WhatsApp (71) 98294-9726</a></li>
          <li><a href="https://www.instagram.com/erick_ratox/" target="_blank" rel="noopener">@erick_ratox</a></li>
          <li><a href="https://www.instagram.com/rapaduraink/" target="_blank" rel="noopener">@rapaduraink</a></li>
          <li>Stella Maris, Salvador, BA</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span data-ano>2026</span> Erick Ratox</span>
      <span>Site por <a href="https://lrgz.com.br" target="_blank" rel="noopener">L R G Z</a></span>
    </div>
  </div>
</footer>
<a class="orc-float" href="orcamento.html">Orçamento</a>
<script src="js/main.js?v={VER}" defer></script>
</body>
</html>
"""


JSONLD = """  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "name": "Erick Ratox",
    "description": "Tatuador em Salvador, BA. Tribal, preto e cinza, linhas e freehand. Premiado na Tattoo Week.",
    "url": "%s",
    "image": "%sassets/img/og.jpg",
    "telephone": "+55 71 98294-9726",
    "address": { "@type": "PostalAddress", "addressLocality": "Salvador", "addressRegion": "BA", "addressCountry": "BR", "streetAddress": "Stella Maris" },
    "areaServed": "Salvador",
    "priceRange": "$$",
    "knowsAbout": ["tatuagem tribal", "tatuagem preto e cinza", "tatuagem freehand", "graffiti"],
    "sameAs": ["https://www.instagram.com/erick_ratox/", "https://www.instagram.com/rapaduraink/"]
  }
  </script>
""" % (BASE, BASE)

PAGES_META = {
    "index.html": ("Erick Ratox | Tatuador em Salvador, BA",
                   "Erick Ratox tatua tribal, preto e cinza e freehand no Rapadura Ink Studio, em Stella Maris, Salvador. Premiado na Tattoo Week."),
    "portfolio.html": ("Portfólio | Erick Ratox, tatuador em Salvador",
                       "Fechamentos de braço, costas e perna em tribal, preto e cinza, linhas e freehand. Trabalhos do Erick Ratox no Rapadura Ink Studio."),
    "orcamento.html": ("Orçamento | Erick Ratox, tatuador em Salvador",
                       "Manda a ideia, a região do corpo e o tamanho. O orçamento sai pelo WhatsApp do Erick Ratox."),
    "cuidados.html": ("Cuidados com a tattoo | Erick Ratox",
                      "Como cuidar da tatuagem nos primeiros 30 dias: curativo, limpeza, pomada e o que evitar."),
    "404.html": ("Página não encontrada | Erick Ratox", "Essa parede tá vazia."),
}


def portfolio_grid():
    import json
    itens = json.loads((ROOT / "_ref" / "portfolio.json").read_text(encoding="utf-8"))
    out = []
    for slug, cats, cap in itens:
        alt = cap.replace(" · ", ", ")
        out.append(
            f'      <a class="work" href="assets/img/port/{slug}.webp" data-lightbox data-cat="{cats}" data-title="{cap}">'
            f'<img src="assets/img/port/{slug}-t.webp" data-full="assets/img/port/{slug}.webp" alt="Tatuagem de Erick Ratox: {alt}" loading="lazy" width="560" height="700">'
            f'<span class="work__cap">{cap}</span></a>'
        )
    return "\n".join(out)


def build():
    for name, (title, desc) in PAGES_META.items():
        body = (PAGES / name).read_text(encoding="utf-8")
        body = body.replace("{{portfolio}}", portfolio_grid())
        for k, v in ICON.items():
            body = body.replace("{{" + k + "}}", v)
        extra = JSONLD if name == "index.html" else ""
        if name == "404.html":
            extra += '  <meta name="robots" content="noindex">\n'
        # CONFIRMAR: com domínio próprio o base vira "/"
        base = '  <base href="/erick-ratox/">\n' if name == "404.html" else ""
        html = head(title, desc, name, extra, base) +"\n" + header() + '<main id="conteudo">\n' + body + "</main>\n" + footer()
        (ROOT / name).write_text(html, encoding="utf-8")
        print("ok", name)


if __name__ == "__main__":
    build()
