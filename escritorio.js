/* =====================================================================
   FUNDO: escritório fictício com 4 setores trabalhando
   Tecnologia · Marketing · Publicidade · Audiovisual
   A cena é larga e "anda" para o lado conforme a página é rolada.
   ===================================================================== */
(() => {
  const host = document.getElementById('escritorio'); if (!host) return;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = 3200, H = 900, FL = 790;
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const P = { parede: '#1c1815', chao: '#120f0d', mesa: '#3b3029', mesaE: '#2a221c', calca: '#1d1916', tela: '#0d0b0a',
    camisas: ['#4a2e1f', '#33302d', '#5a3a24', '#2d3138', '#6a3a1c', '#3b322b'], peles: ['#8a6a52', '#6b4d3a', '#b08a6e', '#4f392b'], cabelos: ['#1a1310', '#2b1d14', '#3d2a1c', '#0f0c0a'] };
  const pick = a => a[Math.floor(rnd() * a.length)];
  const o = (x, y) => `transform-origin:${x}px ${y}px`;
  let s = '';

  /* ---------- defs ---------- */
  s += `<defs>
    <linearGradient id="eCeu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d0b0a"/><stop offset=".7" stop-color="#2a170c"/><stop offset="1" stop-color="#5a2a0e"/></linearGradient>
    <linearGradient id="eCone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb37a" stop-opacity=".28"/><stop offset="1" stop-color="#ffb37a" stop-opacity="0"/></linearGradient>
    <radialGradient id="eBrilho"><stop offset="0" stop-color="#ff8a3d" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient>
    <linearGradient id="eChao" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1814"/><stop offset="1" stop-color="#0c0a09"/></linearGradient>
    <filter id="eNeon" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <clipPath id="eJanela"><rect x="0" y="70" width="${W}" height="330"/></clipPath>
  </defs>`;

  /* ---------- parede, janelas com a cidade à noite, chão ---------- */
  s += `<rect width="${W}" height="${H}" fill="${P.parede}"/>`;
  s += `<g clip-path="url(#eJanela)"><rect x="0" y="70" width="${W}" height="330" fill="url(#eCeu)"/>`;
  for (let x = -20; x < W; x += 40 + rnd() * 70) {
    const w = 50 + rnd() * 90, h = 90 + rnd() * 230, y = 400 - h;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#0b0908"/>`;
    for (let wy = y + 12; wy < 392; wy += 16) for (let wx = x + 8; wx < x + w - 8; wx += 14) {
      if (rnd() < .38) { const pisca = rnd() < .18; s += `<rect ${pisca ? `class="e-jl" style="animation-delay:-${(rnd() * 8).toFixed(1)}s;animation-duration:${(4 + rnd() * 6).toFixed(1)}s"` : ''} x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="6" height="8" fill="#ffb37a" opacity="${(.25 + rnd() * .5).toFixed(2)}"/>`; }
    }
  }
  s += `</g>`;
  for (let x = 0; x <= W; x += 200) s += `<rect x="${x - 4}" y="66" width="8" height="338" fill="#2a231e"/>`;
  s += `<rect x="0" y="62" width="${W}" height="10" fill="#2a231e"/><rect x="0" y="400" width="${W}" height="14" fill="#2a231e"/>`;
  s += `<rect x="0" y="${FL}" width="${W}" height="${H - FL}" fill="url(#eChao)"/><rect x="0" y="${FL - 6}" width="${W}" height="6" fill="#2a231e"/>`;
  for (let x = -400; x < W + 400; x += 160) s += `<path d="M${x} ${FL} L${x - 120} ${H}" stroke="rgba(255,255,255,.035)" stroke-width="2"/>`;

  /* ---------- luminárias pendentes ---------- */
  for (let x = 200; x < W; x += 400) {
    s += `<g class="e-lum" style="${o(x, 0)};animation-delay:-${(rnd() * 6).toFixed(1)}s">
      <polygon points="${x - 26},96 ${x + 26},96 ${x + 170},${FL - 10} ${x - 170},${FL - 10}" fill="url(#eCone)"/>
      <line x1="${x}" y1="0" x2="${x}" y2="76" stroke="#3a3029" stroke-width="3"/>
      <path d="M${x - 30} 98 Q${x} 64 ${x + 30} 98 Z" fill="#2c241e" stroke="#4a3b30" stroke-width="2"/>
      <ellipse cx="${x}" cy="98" rx="22" ry="5" fill="#ffd2ad"/></g>`;
  }

  /* ---------- peças reutilizáveis ---------- */
  const mesa = (x, w = 210) => `<rect x="${x}" y="${FL - 112}" width="${w}" height="12" rx="3" fill="${P.mesa}"/><rect x="${x + 10}" y="${FL - 100}" width="8" height="100" fill="${P.mesaE}"/><rect x="${x + w - 18}" y="${FL - 100}" width="8" height="100" fill="${P.mesaE}"/>`;
  const monitor = (x, y, tipo, w = 112, h = 72) => {
    let t = `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w}" ry="${h}" fill="url(#eBrilho)"/>
      <rect x="${x + w / 2 - 4}" y="${y + h}" width="8" height="${FL - 112 - y - h}" fill="#2a221c"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#0a0908" stroke="#4a3b30" stroke-width="2"/>
      <rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" rx="2" fill="${P.tela}"/>`;
    const ix = x + 11, iy = y + 12, iw = w - 22, ih = h - 24;
    if (tipo === 'cod') for (let i = 0; i < 5; i++) { const lw = 20 + rnd() * (iw - 24); t += `<rect class="e-cod" style="${o(ix + (i % 2) * 8, 0)};animation-delay:${(i * .45).toFixed(2)}s" x="${ix + (i % 2) * 8}" y="${iy + i * 10}" width="${lw.toFixed(0)}" height="4" rx="2" fill="${['#ffb37a', '#f4f1ec', '#ff6b2b'][i % 3]}" opacity=".85"/>`; }
    if (tipo === 'graf') t += `<path class="e-traco" d="M${ix} ${iy + ih} C${ix + iw * .3} ${iy + ih - 4} ${ix + iw * .45} ${iy + ih * .55} ${ix + iw * .6} ${iy + ih * .6} S${ix + iw * .85} ${iy + 6} ${ix + iw} ${iy}" fill="none" stroke="#ff9a52" stroke-width="3" stroke-linecap="round"/>`;
    if (tipo === 'barras') for (let i = 0; i < 6; i++) { const bh = ih * (.3 + i * .12); t += `<rect class="e-barra" style="${o(0, iy + ih)};animation-delay:${(i * .15).toFixed(2)}s" x="${ix + i * (iw / 6) + 2}" y="${iy + ih - bh}" width="${iw / 6 - 5}" height="${bh}" rx="1.5" fill="${i === 5 ? '#ffd2ad' : '#f26b1d'}" opacity=".85"/>`; }
    if (tipo === 'video') { t += `<rect x="${ix}" y="${iy}" width="${iw}" height="${ih * .55}" rx="2" fill="#3a2414"/><rect x="${ix}" y="${iy + ih * .7}" width="${iw * .35}" height="5" fill="#f26b1d"/><rect x="${ix + iw * .38}" y="${iy + ih * .7}" width="${iw * .3}" height="5" fill="#ffb37a"/><rect x="${ix + iw * .7}" y="${iy + ih * .7}" width="${iw * .3}" height="5" fill="#8a5a3a"/><rect class="e-cabecote" style="${o(ix, 0)}" x="${ix}" y="${iy + ih * .62}" width="2" height="${ih * .38}" fill="#fff"/>`; }
    if (tipo === 'design') t += `<circle class="e-pop" style="${o(ix + 16, iy + 14)}" cx="${ix + 16}" cy="${iy + 14}" r="10" fill="#f26b1d"/><rect class="e-pop" style="${o(ix + 45, iy + 14)};animation-delay:.4s" x="${ix + 34}" y="${iy + 4}" width="22" height="20" rx="3" fill="#ffd2ad"/><path class="e-traco" d="M${ix} ${iy + ih} Q${ix + iw / 2} ${iy + ih - 26} ${ix + iw} ${iy + ih - 6}" fill="none" stroke="#ff9a52" stroke-width="3"/>`;
    return t;
  };
  const sentado = (x, virado = 1, braco = 'e-digita') => {
    const c = pick(P.camisas), p = pick(P.peles), h = pick(P.cabelos);
    const g = `<rect x="${x - 28}" y="${FL - 70}" width="56" height="9" rx="3" fill="${P.mesaE}"/><rect x="${x - 3}" y="${FL - 61}" width="6" height="42" fill="#221c17"/><rect x="${x - 26}" y="${FL - 22}" width="52" height="5" rx="2" fill="#221c17"/>
      <rect x="${x - 38}" y="${FL - 150}" width="9" height="84" rx="4" fill="${P.mesaE}"/>
      <path d="M${x + 6} ${FL - 72} L${x + 44} ${FL - 72} L${x + 46} ${FL - 12}" fill="none" stroke="${P.calca}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="${x - 20}" y="${FL - 152}" width="38" height="84" rx="16" fill="${c}"/>
      <g class="e-acena" style="${o(x + 2, FL - 152)};animation-delay:-${(rnd() * 5).toFixed(1)}s"><circle cx="${x + 2}" cy="${FL - 170}" r="15" fill="${p}"/><path d="M${x - 13} ${FL - 172} A15 15 0 0 1 ${x + 17} ${FL - 174} L${x + 12} ${FL - 178} Q${x} ${FL - 186} ${x - 12} ${FL - 166}Z" fill="${h}"/></g>
      <g class="${braco}" style="${o(x + 4, FL - 136)};animation-delay:-${(rnd()).toFixed(2)}s"><path d="M${x + 4} ${FL - 136} L${x + 26} ${FL - 104} L${x + 58} ${FL - 116}" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${x + 60}" cy="${FL - 116}" r="6" fill="${p}"/></g>`;
    return virado === 1 ? `<g>${g}</g>` : `<g transform="translate(${2 * x} 0) scale(-1 1)">${g}</g>`;
  };
  const empe = (x, braco = 'e-aponta', virado = 1) => {
    const c = pick(P.camisas), p = pick(P.peles), h = pick(P.cabelos);
    const g = `<rect x="${x - 11}" y="${FL - 98}" width="10" height="98" rx="4" fill="${P.calca}"/><rect x="${x + 2}" y="${FL - 98}" width="10" height="98" rx="4" fill="${P.calca}"/>
      <rect x="${x - 18}" y="${FL - 182}" width="38" height="92" rx="15" fill="${c}"/>
      <path d="M${x - 10} ${FL - 166} L${x - 16} ${FL - 112}" stroke="${c}" stroke-width="11" stroke-linecap="round"/>
      <g class="e-acena" style="${o(x + 1, FL - 182)}"><circle cx="${x + 1}" cy="${FL - 200}" r="15" fill="${p}"/><path d="M${x - 14} ${FL - 202} A15 15 0 0 1 ${x + 16} ${FL - 204} L${x + 10} ${FL - 208} Q${x} ${FL - 216} ${x - 12} ${FL - 196}Z" fill="${h}"/></g>
      <g class="${braco}" style="${o(x + 10, FL - 166)}"><path d="M${x + 10} ${FL - 166} L${x + 40} ${FL - 186} L${x + 64} ${FL - 210}" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${x + 66}" cy="${FL - 212}" r="6" fill="${p}"/></g>`;
    return virado === 1 ? `<g>${g}</g>` : `<g transform="translate(${2 * x} 0) scale(-1 1)">${g}</g>`;
  };
  const planta = x => `<g class="e-planta" style="${o(x, FL - 60)};animation-delay:-${(rnd() * 4).toFixed(1)}s">${[-40, -15, 10, 35, -60, 55].map((a, i) => `<ellipse cx="${x}" cy="${FL - 105 - i * 6}" rx="10" ry="38" fill="${i % 2 ? '#2f3b22' : '#3c4a2a'}" transform="rotate(${a} ${x} ${FL - 60})"/>`).join('')}</g><path d="M${x - 24} ${FL - 62} L${x + 24} ${FL - 62} L${x + 18} ${FL} L${x - 18} ${FL}Z" fill="#4a3b30"/>`;

  /* ---------- TECNOLOGIA (0 a 800) ---------- */
  s += planta(30);
  s += mesa(120) + monitor(190, FL - 196, 'cod') + sentado(110);
  s += mesa(420, 260) + monitor(470, FL - 196, 'cod') + monitor(588, FL - 186, 'cod', 90, 62) + sentado(410);
  s += `<rect x="720" y="${FL - 300}" width="70" height="300" rx="4" fill="#0e0c0b" stroke="#3a3029" stroke-width="2"/>`;
  for (let i = 0; i < 11; i++) { const y = FL - 288 + i * 26; s += `<rect x="728" y="${y}" width="54" height="18" rx="2" fill="#171310"/>`; for (let k = 0; k < 3; k++) s += `<circle class="e-led" style="animation-delay:-${(rnd() * 3).toFixed(2)}s;animation-duration:${(.6 + rnd() * 1.8).toFixed(2)}s" cx="${736 + k * 9}" cy="${y + 9}" r="2.6" fill="${rnd() < .6 ? '#22c55e' : '#ff8a3d'}"/>`; }

  /* ---------- MARKETING (800 a 1600) ---------- */
  s += `<rect x="1120" y="480" width="380" height="200" rx="8" fill="#0a0908" stroke="#4a3b30" stroke-width="3"/><rect x="1130" y="490" width="360" height="180" rx="4" fill="#100d0b"/>
    <ellipse cx="1310" cy="580" rx="300" ry="170" fill="url(#eBrilho)"/>
    <text x="1146" y="522" font-family="Archivo,Arial,sans-serif" font-size="14" font-weight="700" fill="#ff9a52" letter-spacing="2">VENDAS DO MÊS</text>
    <text class="e-kpi" x="1146" y="562" font-family="Archivo,Arial Black,sans-serif" font-size="34" font-weight="900" fill="#f4f1ec">+62%</text>
    ${[0, 1, 2].map(i => `<path d="M1140 ${598 + i * 22} H1480" stroke="rgba(255,255,255,.06)"/>`).join('')}
    <path class="e-traco e-traco-l" d="M1146 650 C1210 646 1240 636 1280 628 S1360 600 1400 580 S1450 520 1478 506" fill="none" stroke="#ff9a52" stroke-width="4" stroke-linecap="round"/>
    <rect class="e-nota" x="1300" y="500" width="180" height="28" rx="8" fill="#1d1916" stroke="#3a3029"/><circle class="e-nota" cx="1316" cy="514" r="7" fill="#16a34a"/><rect class="e-nota" x="1330" y="510" width="120" height="8" rx="4" fill="#d9d3c9"/>`;
  s += empe(1065, 'e-aponta');
  s += mesa(860) + monitor(920, FL - 196, 'barras') + sentado(850);
  s += mesa(1300, 220) + monitor(1360, FL - 190, 'graf', 100, 66) + sentado(1290);
  /* café */
  s += `<rect x="1540" y="${FL - 120}" width="90" height="120" fill="#2a221c"/><rect x="1552" y="${FL - 196}" width="64" height="76" rx="6" fill="#3a3029"/><rect x="1570" y="${FL - 150}" width="26" height="24" rx="3" fill="#1d1916"/><rect x="1574" y="${FL - 136}" width="18" height="14" rx="2" fill="#f4f1ec"/>
    ${[0, 1, 2].map(i => `<path class="e-vapor" style="animation-delay:${i * .8}s" d="M${1578 + i * 5} ${FL - 140} q-6 -12 0 -24 q6 -12 0 -24" fill="none" stroke="#f4f1ec" stroke-width="2" stroke-linecap="round" opacity="0"/>`).join('')}`;

  /* ---------- PUBLICIDADE (1600 a 2400) ---------- */
  s += `<rect x="1660" y="430" width="700" height="${FL - 430}" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)" stroke-width="2"/>
    ${[1830, 2010, 2190].map(x => `<rect x="${x}" y="430" width="3" height="${FL - 430}" fill="rgba(255,255,255,.07)"/>`).join('')}
    <rect x="1700" y="500" width="260" height="160" rx="4" fill="#e6ded1" opacity=".88"/>
    <path class="e-traco" d="M1720 620 Q1760 540 1800 590 T1880 560 T1940 600" fill="none" stroke="#c94a0a" stroke-width="3"/>`;
  [['#f26b1d', 1716, 512], ['#ffc46b', 1760, 512], ['#ff9a52', 1804, 512], ['#ffd2ad', 1890, 520], ['#f26b1d', 1900, 566]].forEach(([c, x, y], i) => s += `<rect class="e-post" style="${o(x + 17, y + 15)};animation-delay:${(i * .5).toFixed(1)}s" x="${x}" y="${y}" width="34" height="30" rx="2" fill="${c}"/>`);
  s += empe(1990, 'e-gesto');
  s += `<ellipse cx="2170" cy="${FL - 110}" rx="140" ry="16" fill="${P.mesa}"/><rect x="2164" y="${FL - 100}" width="12" height="100" fill="${P.mesaE}"/><rect x="2130" y="${FL - 6}" width="80" height="6" fill="${P.mesaE}"/>`;
  s += `<rect x="2140" y="${FL - 150}" width="64" height="40" rx="3" fill="#0a0908" stroke="#4a3b30" stroke-width="2"/><rect x="2145" y="${FL - 145}" width="54" height="30" fill="#1d120a"/><circle class="e-pop" style="${o(2160, FL - 130)}" cx="2160" cy="${FL - 130}" r="7" fill="#f26b1d"/><rect class="e-pop" style="${o(2182, FL - 130)};animation-delay:.5s" x="2174" y="${FL - 138}" width="16" height="16" rx="2" fill="#ffd2ad"/>`;
  s += sentado(2060, 1, 'e-acena2') + sentado(2290, -1, 'e-gesto2');

  /* ---------- AUDIOVISUAL (2400 a 3200) ---------- */
  s += `<rect x="2700" y="430" width="220" height="${FL - 430}" fill="#251d17"/><rect x="2700" y="430" width="220" height="${FL - 430}" fill="url(#eBrilho)" opacity=".6"/>`;
  s += `<g><line x1="2470" y1="${FL}" x2="2490" y2="${FL - 330}" stroke="#3a3029" stroke-width="4"/><line x1="2510" y1="${FL}" x2="2490" y2="${FL - 330}" stroke="#3a3029" stroke-width="4"/>
    <polygon class="e-softbox" points="2530,${FL - 380} 2760,${FL - 300} 2760,${FL - 40} 2530,${FL - 250}" fill="#ffd2ad" opacity=".12"/>
    <rect x="2470" y="${FL - 410}" width="70" height="170" rx="6" fill="#efe6da" transform="rotate(-12 2505 ${FL - 325})"/></g>`;
  s += `<line x1="2600" y1="${FL}" x2="2630" y2="${FL - 200}" stroke="#3a3029" stroke-width="5"/><line x1="2660" y1="${FL}" x2="2630" y2="${FL - 200}" stroke="#3a3029" stroke-width="5"/><line x1="2630" y1="${FL}" x2="2630" y2="${FL - 200}" stroke="#3a3029" stroke-width="5"/>
    <rect x="2590" y="${FL - 250}" width="90" height="56" rx="8" fill="#141110" stroke="#4a3b30" stroke-width="2"/><rect x="2680" y="${FL - 238}" width="34" height="32" rx="4" fill="#1d1916" stroke="#4a3b30" stroke-width="2"/><circle cx="2716" cy="${FL - 222}" r="12" fill="#0a0908" stroke="#5a4a3c" stroke-width="3"/>
    <circle class="e-rec" cx="2604" cy="${FL - 238}" r="5" fill="#ff3b30"/><rect x="2614" y="${FL - 242}" width="40" height="8" rx="2" fill="#2a221c"/>`;
  s += `<rect x="2790" y="${FL - 80}" width="44" height="8" rx="3" fill="${P.mesaE}"/><rect x="2808" y="${FL - 72}" width="8" height="72" fill="#221c17"/>` + sentado(2820, -1, 'e-gesto2');
  s += mesa(2960, 220) + monitor(3010, FL - 200, 'video', 130, 80) + sentado(2950);
  s += planta(3165);

  /* ---------- placas de neon dos setores ---------- */
  const setores = [['TECNOLOGIA', 60], ['MARKETING', 860], ['PUBLICIDADE', 1680], ['AUDIOVISUAL', 2580]];
  setores.forEach(([t, x], k) => s += `<text class="e-neon" style="animation-delay:-${k * 1.7}s;font-stretch:125%" x="${x}" y="462" font-family="Archivo,Arial Black,sans-serif" font-weight="900" font-size="38" letter-spacing="3" fill="#ff9a52" filter="url(#eNeon)">${t}</text>`);

  /* ---------- pessoa andando com café entre Marketing e Publicidade ---------- */
  {
    const x = 0, c = '#5a3a24', p = '#8a6a52';
    s += `<g class="e-anda"><g transform="translate(1440 0)">
      <g class="e-perna1" style="${o(x, FL - 98)}"><rect x="${x - 5}" y="${FL - 98}" width="10" height="98" rx="4" fill="${P.calca}"/></g>
      <g class="e-perna2" style="${o(x, FL - 98)}"><rect x="${x - 5}" y="${FL - 98}" width="10" height="98" rx="4" fill="#28221d"/></g>
      <rect x="${x - 18}" y="${FL - 182}" width="36" height="92" rx="15" fill="${c}"/>
      <circle cx="${x + 2}" cy="${FL - 200}" r="15" fill="${p}"/><path d="M${x - 13} ${FL - 202} A15 15 0 0 1 ${x + 17} ${FL - 204} L${x + 10} ${FL - 208} Q${x} ${FL - 216} ${x - 12} ${FL - 196}Z" fill="#1a1310"/>
      <path d="M${x + 6} ${FL - 166} L${x + 24} ${FL - 132} L${x + 40} ${FL - 140}" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="${x + 36}" y="${FL - 154}" width="12" height="16" rx="2" fill="#f4f1ec"/>
    </g></g>`;
  }

  /* ---------- monta e anima ---------- */
  const css = `
  #escritorio{position:fixed;inset:0;z-index:-2;overflow:hidden;pointer-events:none;background:#111110}
  #escritorio svg{position:absolute;top:0;left:0;height:100%;width:auto;will-change:transform;opacity:.2}
  #escritorio::after{content:"";position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 40%,rgba(17,17,16,.55),rgba(17,17,16,.88) 75%),linear-gradient(180deg,rgba(17,17,16,.55),rgba(17,17,16,.25) 40%,rgba(17,17,16,.7))}
  #escritorio *{transform-box:view-box}
  .e-jl{animation:eJl 6s steps(1) infinite}@keyframes eJl{50%{opacity:.05}}
  .e-lum{animation:eLum 7s ease-in-out infinite}@keyframes eLum{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.2deg)}}
  .e-neon{animation:eNeon 9s infinite}@keyframes eNeon{0%,92%,100%{opacity:1}93%{opacity:.35}94%{opacity:1}96%{opacity:.5}97%{opacity:1}}
  .e-cod{animation:eCod 3.2s steps(10) infinite}@keyframes eCod{0%{transform:scaleX(0)}35%,85%{transform:scaleX(1);opacity:.85}100%{transform:scaleX(1);opacity:0}}
  .e-traco{stroke-dasharray:700;stroke-dashoffset:700;animation:eTraco 5s ease-in-out infinite}@keyframes eTraco{0%{stroke-dashoffset:700}45%,85%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
  .e-barra{animation:eBarra 3.6s ease-in-out infinite}@keyframes eBarra{0%{transform:scaleY(.1)}40%,80%{transform:scaleY(1)}100%{transform:scaleY(.1)}}
  .e-cabecote{animation:eCab 4s linear infinite}@keyframes eCab{to{transform:translateX(86px)}}
  .e-pop{animation:ePop 3s ease-in-out infinite}@keyframes ePop{0%,100%{transform:scale(.6);opacity:.4}40%,70%{transform:scale(1);opacity:1}}
  .e-digita{animation:eDig .32s ease-in-out infinite alternate}@keyframes eDig{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}
  .e-acena{animation:eAce 5s ease-in-out infinite}@keyframes eAce{0%,70%,100%{transform:rotate(0)}78%{transform:rotate(7deg)}86%{transform:rotate(-2deg)}}
  .e-acena2{animation:eAce2 4s ease-in-out infinite}@keyframes eAce2{0%,100%{transform:rotate(0)}50%{transform:rotate(-10deg)}}
  .e-aponta{animation:eApo 4s ease-in-out infinite}@keyframes eApo{0%,100%{transform:rotate(30deg)}35%,70%{transform:rotate(0)}}
  .e-gesto{animation:eGes 2.6s ease-in-out infinite}@keyframes eGes{0%,100%{transform:rotate(40deg)}50%{transform:rotate(10deg)}}
  .e-gesto2{animation:eGes2 3s ease-in-out infinite}@keyframes eGes2{0%,100%{transform:rotate(0)}50%{transform:rotate(-22deg)}}
  .e-led{animation:eLed 1.2s steps(1) infinite}@keyframes eLed{50%{opacity:.15}}
  .e-rec{animation:eLed 1s steps(1) infinite}
  .e-softbox{animation:eSoft 4s ease-in-out infinite}@keyframes eSoft{50%{opacity:.22}}
  .e-vapor{animation:eVap 2.4s ease-out infinite}@keyframes eVap{0%{opacity:0;transform:translateY(0)}30%{opacity:.5}100%{opacity:0;transform:translateY(-26px)}}
  .e-post{animation:ePop 4s ease-in-out infinite}
  .e-nota{animation:eNota 5s ease-in-out infinite}@keyframes eNota{0%,15%{opacity:0;transform:translateY(8px)}25%,80%{opacity:1;transform:none}100%{opacity:0}}
  .e-planta{animation:ePla 6s ease-in-out infinite}@keyframes ePla{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}
  .e-anda{animation:eAnda 22s linear infinite}@keyframes eAnda{0%{transform:translateX(0);opacity:0}4%{opacity:1}92%{opacity:1}100%{transform:translateX(560px);opacity:0}}
  .e-perna1{animation:ePer .7s ease-in-out infinite alternate}.e-perna2{animation:ePer .7s ease-in-out infinite alternate-reverse}@keyframes ePer{from{transform:rotate(16deg)}to{transform:rotate(-16deg)}}
  @media (prefers-reduced-motion:reduce){#escritorio *{animation:none!important}.e-traco{stroke-dashoffset:0}.e-cod,.e-barra{transform:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMinYMid slice" aria-hidden="true" focusable="false">${s}</svg>`;
  const svg = host.querySelector('svg');

  /* a cena passeia sozinha pelo escritório, ida e volta, sem depender da rolagem */
  const CICLO = 140000; // 140 s para ir de Tecnologia até Audiovisual e voltar
  const larg = () => Math.max(innerWidth, innerHeight * W / H);
  const medir = () => { svg.style.width = larg() + 'px'; svg.style.height = Math.max(innerHeight, innerWidth * H / W) + 'px'; };
  let t0 = performance.now(), raf = 0;
  const passo = t => { const max = larg() - innerWidth; const p = (1 - Math.cos(((t - t0) % CICLO) / CICLO * Math.PI * 2)) / 2;
    svg.style.transform = 'translate3d(' + (-max * p).toFixed(1) + 'px,0,0)'; raf = requestAnimationFrame(passo); };
  medir();
  if (!RM) raf = requestAnimationFrame(passo);
  addEventListener('resize', medir);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else if (!RM && !raf) raf = requestAnimationFrame(passo); });
})();
