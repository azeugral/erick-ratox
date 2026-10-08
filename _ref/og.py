"""Gera assets/img/og.jpg (1200x630), a prévia do link no WhatsApp/Instagram.

Rodar da raiz do projeto:  python _ref/og.py
O conteúdo importante fica no centro: o WhatsApp recorta a miniatura pequena em quadrado.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
F = ROOT / "_ref" / "fonts"
W, H = 1200, 630

# fundo: foto do Erick em P&B, escurecida, ocupando tudo
foto = Image.open(ROOT / "assets/img/erick.webp").convert("L")
foto = ImageOps.fit(foto, (W, H), Image.LANCZOS, centering=(0.5, 0.35))
foto = ImageEnhance.Contrast(foto).enhance(1.25)
foto = ImageEnhance.Brightness(foto).enhance(0.38).filter(ImageFilter.GaussianBlur(1.2))
og = Image.merge("RGB", (foto, foto, foto))

# vinheta: escurece as bordas e o centro onde entra o logo
vin = Image.new("L", (W, H), 0)
d = ImageDraw.Draw(vin)
d.ellipse((W * 0.18, -H * 0.1, W * 0.82, H * 1.1), fill=150)
vin = vin.filter(ImageFilter.GaussianBlur(120))
og = Image.composite(Image.new("RGB", (W, H), (10, 10, 10)), og, vin)

# moldura fina branca
d = ImageDraw.Draw(og)
d.rectangle((18, 18, W - 19, H - 19), outline=(242, 242, 240), width=2)

# logo oficial (miolo branco) no centro
logo = Image.open(ROOT / "assets/img/logo-ratox.png").convert("RGBA")
logo.thumbnail((470, 360), Image.LANCZOS)
sombra = Image.new("RGBA", logo.size, (0, 0, 0, 0))
sombra.putalpha(logo.split()[3].point(lambda a: int(a * 0.7)))
sombra = sombra.filter(ImageFilter.GaussianBlur(14))
lx, ly = (W - logo.width) // 2, 52
og.paste(sombra, (lx, ly + 14), sombra)
og.paste(logo, (lx, ly), logo)


def centro(texto, fonte, y, cor=(242, 242, 240), espaco=0):
    if espaco:
        larg = sum(d.textlength(c, font=fonte) for c in texto) + espaco * (len(texto) - 1)
        x = (W - larg) / 2
        for c in texto:
            d.text((x, y), c, font=fonte, fill=cor)
            x += d.textlength(c, font=fonte) + espaco
    else:
        d.text(((W - d.textlength(texto, font=fonte)) / 2, y), texto, font=fonte, fill=cor)


d = ImageDraw.Draw(og)
tag = ImageFont.truetype(str(F / "SedgwickAveDisplay-Regular.ttf"), 76)
tit = ImageFont.truetype(str(F / "Unbounded.ttf"), 30)
tit.set_variation_by_axes([700])
mono = ImageFont.truetype(str(F / "JetBrainsMono.ttf"), 19)
mono.set_variation_by_axes([600])

ytxt = ly + logo.height + 8
centro("Erick Ratox", tag, ytxt)
centro("TATUADOR EM SALVADOR, BA", tit, ytxt + 92)
centro("TRIBAL · PRETO E CINZA · FREEHAND · RAPADURA INK", mono, ytxt + 140, (190, 190, 190), espaco=2)

og.save(ROOT / "assets/img/og.jpg", quality=86, optimize=True, progressive=True)
print("ok", (ROOT / "assets/img/og.jpg").stat().st_size // 1024, "KB")
