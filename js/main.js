/* ERICK RATOX  -  scripts compartilhados (sem dependências) */
(() => {
  "use strict";

  /* ---------- Config: tudo que o cliente pode trocar fica aqui ---------- */
  const CONFIG = {
    // Número com DDI (veio do link da bio: bit.ly/4aXqjOF).
    whatsappNumber: "5571982949726",
    instagram: "https://www.instagram.com/erick_ratox/",
    estudio: "https://www.instagram.com/rapaduraink/",
    // Upload da foto de referência (preset unsigned do Cloudinary). Vazio = a foto é copiada pra colar no chat.
    cloudinaryCloud: "",
    cloudinaryPreset: "",
    sprayColor: "245, 245, 245",
  };
  window.RATOX = CONFIG;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Links de WhatsApp: todos os [data-wa] ---------- */
  const waHref = (text) => `https://wa.me/${CONFIG.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waHref(a.dataset.wa || "Oi Erick! Vi teu site e queria mais informações.");
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- Nav: página atual ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link, .menu__link").forEach((a) => {
    if (a.getAttribute("href").split("/").pop() === here) a.setAttribute("aria-current", "page");
  });

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    const label = toggle.querySelector(".nav-toggle__label");
    const set = (open) => {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      label.textContent = open ? "Fechar" : "Menu";
    };
    toggle.addEventListener("click", () => set(!document.body.classList.contains("menu-open")));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
    document.querySelectorAll(".menu a").forEach((a) => a.addEventListener("click", () => set(false)));
  }

  /* ---------- Reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-slap, .spray-in");
  if (revealEls.length && !reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Orçamento flutuante: aparece depois do hero (some na própria página) ---------- */
  const wa = document.querySelector(".orc-float");
  if (wa && here === "orcamento.html") wa.remove();
  else if (wa) {
    const onScroll = () => wa.classList.toggle("is-on", window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- O muro: spray que segue o dedo / mouse e escorre ---------- */
  const cv = document.querySelector(".muro__spray");
  const spray = { burst: () => {} };
  if (cv && !reduceMotion) {
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const color = CONFIG.sprayColor;
    let w = 0, h = 0, raf = 0, idle = 0, lastW = 0;
    let drips = [];
    let last = null;

    const size = () => {
      // Largura útil sem a barra de rolagem (é o que o .muro fixo ocupa). O tamanho em CSS
      // é fixado em pixels iguais ao buffer / dpr: assim o ponto pintado cai exatamente sob o cursor.
      const vw = document.documentElement.clientWidth;
      // no celular a barra de endereço muda a altura: só redimensiona quando a largura muda
      if (vw === lastW && w) return;
      lastW = vw;
      const vh = Math.max(window.innerHeight, screen.height || 0);
      w = cv.width = Math.round(vw * dpr);
      h = cv.height = Math.round(vh * dpr);
      cv.style.width = `${vw}px`;
      cv.style.height = `${vh}px`;
    };
    size();
    window.addEventListener("resize", size);

    const dot = (x, y, r, a) => {
      ctx.fillStyle = `rgba(${color},${a})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    };

    const paint = (cx, cy, force = 1) => {
      const x = cx * dpr, y = cy * dpr;
      const r = (16 + 10 * force) * dpr;
      // núcleo macio
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 0.7);
      g.addColorStop(0, `rgba(${color},${0.22 * force})`);
      g.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 0.7, 0, Math.PI * 2); ctx.fill();
      // respingo
      const n = Math.round(22 * force);
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * Math.PI * 2;
        const d = r * Math.pow(Math.random(), 0.6);
        dot(x + Math.cos(ang) * d, y + Math.sin(ang) * d, (Math.random() * 1.3 + 0.4) * dpr, 0.12 + Math.random() * 0.3);
      }
      // de vez em quando a tinta escorre
      if (Math.random() < 0.05 * force && drips.length < 16) {
        drips.push({ x: x + (Math.random() - 0.5) * r * 0.6, y, len: 0, max: (50 + Math.random() * 140) * dpr, w: (1.6 + Math.random() * 2.2) * dpr, v: (0.7 + Math.random() * 0.9) * dpr });
      }
      kick();
    };

    const line = (a, b, force) => {
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.floor(dist / 12));
      for (let i = 1; i <= steps; i++) paint(a.x + (dx * i) / steps, a.y + (dy * i) / steps, force);
    };

    const loop = () => {
      // tinta vai secando e sumindo devagar
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.014)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      drips = drips.filter((d) => {
        ctx.fillStyle = `rgba(${color},0.5)`;
        ctx.fillRect(d.x - d.w / 2, d.y + d.len, d.w, d.v + 0.5);
        d.len += d.v; d.v *= 0.992;
        if (d.len >= d.max || d.v < 0.08 * dpr) {
          dot(d.x, d.y + d.len, d.w * 0.9, 0.55); // gota na ponta
          return false;
        }
        return true;
      });
      idle++;
      if (idle > 420 && !drips.length) { ctx.clearRect(0, 0, w, h); raf = 0; return; }
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { idle = 0; if (!raf) raf = requestAnimationFrame(loop); };

    // Mouse: borrifa enquanto passa (leve) e forte com o botão apertado
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const p = { x: e.clientX, y: e.clientY };
      if (last) line(last, p, e.buttons ? 1 : 0.35);
      last = p;
    }, { passive: true });
    document.addEventListener("mouseleave", () => { last = null; });

    // Toque: o dedo que rola a página também pinta o muro
    let lastT = null;
    window.addEventListener("touchstart", (e) => { const t = e.touches[0]; lastT = { x: t.clientX, y: t.clientY }; paint(lastT.x, lastT.y, 0.8); }, { passive: true });
    window.addEventListener("touchmove", (e) => {
      const t = e.touches[0]; const p = { x: t.clientX, y: t.clientY };
      if (lastT) line(lastT, p, 0.7);
      lastT = p;
    }, { passive: true });
    window.addEventListener("touchend", () => { lastT = null; }, { passive: true });

    // Respingo grande (quando o adesivo do logo bate no muro)
    spray.burst = (cx, cy, radius) => {
      for (let i = 0; i < 26; i++) {
        const ang = Math.random() * Math.PI * 2;
        const d = radius * (0.55 + Math.random() * 0.5);
        paint(cx + Math.cos(ang) * d, cy + Math.sin(ang) * d * 0.8, 0.9 + Math.random() * 0.5);
      }
    };
  }

  /* ---------- Hero: o adesivo bate e a tinta espirra ---------- */
  const heroLogo = document.querySelector(".hero__logo");
  if (heroLogo && !reduceMotion) {
    setTimeout(() => {
      const r = heroLogo.getBoundingClientRect();
      if (r.bottom > 0) spray.burst(r.left + r.width / 2, r.top + r.height / 2, r.width * 0.55);
    }, 650);
  }

  /* ---------- Portfólio: filtros ---------- */
  const filters = document.querySelectorAll(".filter");
  const items = document.querySelectorAll(".grid-port .work");
  if (filters.length && items.length) {
    const apply = (cat) => {
      items.forEach((it) => {
        const match = cat === "all" || (it.dataset.cat || "").split(" ").includes(cat);
        it.classList.toggle("is-hidden", !match);
        if (match && !reduceMotion) it.animate([{ opacity: 0, transform: "scale(.94)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: "cubic-bezier(.16,.84,.32,1)" });
      });
    };
    filters.forEach((btn) => btn.addEventListener("click", () => {
      filters.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      apply(btn.dataset.filter);
    }));
    const pre = new URLSearchParams(location.search).get("estilo");
    if (pre) document.querySelector(`.filter[data-filter="${CSS.escape(pre)}"]`)?.click();
  }

  /* ---------- Portfólio: lightbox com anterior / próxima (setas, teclado e swipe) ---------- */
  const lb = document.querySelector(".lightbox");
  if (lb) {
    const img = lb.querySelector(".lightbox__img img");
    const title = lb.querySelector("[data-lb-title]");
    const quote = lb.querySelector("[data-lb-quote]");
    const count = lb.querySelector("[data-lb-count]");
    const works = [...document.querySelectorAll(".grid-port .work[data-lightbox]")];
    let cur = 0;
    const visiveis = () => works.filter((w) => !w.classList.contains("is-hidden"));
    const show = (wk, dir = 0) => {
      const src = wk.querySelector("img");
      img.src = src.dataset.full || src.currentSrc || src.src;
      img.alt = src.alt;
      title.textContent = wk.dataset.title || "";
      quote.href = `orcamento.html?ref=${encodeURIComponent(wk.dataset.title || "")}`;
      const vis = visiveis();
      cur = vis.indexOf(wk);
      if (count) count.textContent = `${cur + 1} / ${vis.length}`;
      if (dir && !reduceMotion) img.animate([{ opacity: 0, transform: `translateX(${dir * 24}px)` }, { opacity: 1, transform: "none" }], { duration: 380, easing: "cubic-bezier(.16,.84,.32,1)" });
    };
    const step = (d) => { const vis = visiveis(); if (vis.length) show(vis[(cur + d + vis.length) % vis.length], d); };
    works.forEach((wk) => {
      wk.addEventListener("click", (e) => { e.preventDefault(); show(wk); lb.showModal(); });
    });
    lb.querySelector("[data-lb-prev]")?.addEventListener("click", () => step(-1));
    lb.querySelector("[data-lb-next]")?.addEventListener("click", () => step(1));
    lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });
    let x0 = null;
    lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    }, { passive: true });
    lb.querySelector(".lightbox__close").addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lightbox__img")) lb.close(); });
  }

  /* ---------- FAQ: abre e fecha com animação de altura ---------- */
  document.querySelectorAll(".faq details").forEach((d) => {
    const summary = d.querySelector("summary");
    const body = d.querySelector(".faq__a");
    if (!summary || !body) return;
    let running = null;
    summary.addEventListener("click", (e) => {
      e.preventDefault();
      if (reduceMotion) { d.open = !d.open; return; }
      if (running) running.cancel();
      const from = d.offsetHeight;
      d.style.overflow = "hidden";
      if (d.open) {
        running = d.animate([{ height: `${from}px` }, { height: `${summary.offsetHeight}px` }], { duration: 380, easing: "cubic-bezier(.65,0,.35,1)" });
        running.onfinish = () => { d.open = false; d.style.overflow = ""; running = null; };
      } else {
        d.open = true;
        const to = d.offsetHeight;
        running = d.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: 480, easing: "cubic-bezier(.16,.84,.32,1)" });
        body.animate([{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }], { duration: 420, delay: 80, easing: "cubic-bezier(.16,.84,.32,1)", fill: "backwards" });
        running.onfinish = () => { d.style.overflow = ""; running = null; };
      }
    });
  });

  /* ---------- Imagem de referência: sobe (se configurado) ou copia ---------- */
  const reduz = async (file, type) => {
    const bitmap = await createImageBitmap(file);
    const k = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bitmap.width * k); c.height = Math.round(bitmap.height * k);
    c.getContext("2d").drawImage(bitmap, 0, 0, c.width, c.height);
    return new Promise((r) => c.toBlob(r, type, 0.85));
  };
  const enviaImagem = async (file) => {
    if (!CONFIG.cloudinaryCloud || !CONFIG.cloudinaryPreset) return "";
    try {
      const dados = new FormData();
      dados.append("file", await reduz(file, "image/jpeg"), "orcamento.jpg");
      dados.append("upload_preset", CONFIG.cloudinaryPreset);
      const resp = await fetch(`https://api.cloudinary.com/v1_1/${CONFIG.cloudinaryCloud}/image/upload`, { method: "POST", body: dados });
      return resp.ok ? (await resp.json()).secure_url || "" : "";
    } catch (e) { return ""; }
  };
  const copiaImagem = async (file) => {
    try {
      if (!navigator.clipboard || !window.ClipboardItem) return false;
      await navigator.clipboard.write([new ClipboardItem({ "image/png": await reduz(file, "image/png") })]);
      return true;
    } catch (e) { return false; }
  };

  /* ---------- Orçamento: monta a mensagem e abre o WhatsApp ---------- */
  const form = document.querySelector("#form-orcamento");
  if (form) {
    const up = form.querySelector("[data-upload]");
    let refFile = null;
    if (up) {
      const input = up.querySelector(".upload__input");
      const zone = up.querySelector(".upload__zone");
      const prev = up.querySelector(".upload__preview");
      const setFile = (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        if (file.size > 20 * 1024 * 1024) { alert("Essa imagem é muito grande. Manda uma de até 20 MB."); return; }
        refFile = file;
        prev.querySelector("img").src = URL.createObjectURL(file);
        prev.querySelector(".upload__name").textContent = file.name;
        prev.hidden = false; zone.hidden = true;
      };
      input.addEventListener("change", () => setFile(input.files[0]));
      prev.querySelector(".upload__remove").addEventListener("click", () => { refFile = null; input.value = ""; prev.hidden = true; zone.hidden = false; });
      ["dragenter", "dragover"].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); up.classList.add("is-drag"); }));
      ["dragleave", "drop"].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); up.classList.remove("is-drag"); }));
      zone.addEventListener("drop", (e) => setFile(e.dataTransfer.files[0]));
    }
    const ref = new URLSearchParams(location.search).get("ref");
    if (ref) { const f = form.querySelector("#ideia"); if (f && !f.value) f.value = `Vi no portfólio: ${ref}. `; }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll("[required]").forEach((f) => {
        const bad = !f.value.trim();
        f.closest(".field").classList.toggle("is-invalid", bad);
        if (bad) ok = false;
      });
      if (!ok) { form.querySelector(".is-invalid input, .is-invalid textarea")?.focus(); return; }
      const v = (id) => (form.querySelector(`#${id}`)?.value || "").trim();
      const r = (name) => form.querySelector(`input[name="${name}"]:checked`)?.value || "";
      const msg = [
        "Oi Erick! Vim pelo site e quero fazer uma tattoo.",
        `Ideia: ${v("ideia")}`,
        r("estilo") && `Estilo: ${r("estilo")}`,
        `Região do corpo: ${v("regiao")}`,
        r("tamanho") && `Tamanho: ${r("tamanho")}`,
        r("pele") && `Primeira tattoo: ${r("pele")}`,
        v("periodo") && `Melhor período: ${v("periodo")}`,
        `Nome: ${v("nome")}`,
      ].filter(Boolean).join("\n");

      const hint = form.querySelector("[data-hint]");
      const botao = form.querySelector('button[type="submit"]');
      const abre = (t) => window.open(waHref(t), "_blank", "noopener");
      if (!refFile) { abre(msg); return; }

      const rotulo = botao.innerHTML;
      botao.disabled = true; botao.textContent = "Enviando foto...";
      enviaImagem(refFile).then((link) => {
        botao.disabled = false; botao.innerHTML = rotulo;
        if (link) { abre(`${msg}\nFoto de referência: ${link}`); return; }
        abre(msg);
        hint.textContent = "Conversa aberta. Agora anexa a foto pelo clipe do WhatsApp.";
        hint.hidden = false;
        copiaImagem(refFile).then((copiou) => { if (copiou) hint.textContent = "Conversa aberta. A foto está copiada: é só colar no chat."; });
      });
    });
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-ano]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
