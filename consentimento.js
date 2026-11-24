/* =====================================================================
   AVISO DE COOKIES E CONSENTIMENTO (LGPD)
   - O site não usa cookies de rastreamento por padrão.
   - Pixel da Meta e Google Analytics só carregam se o visitante aceitar.
   - A escolha fica salva só no navegador da pessoa e pode ser mudada
     a qualquer momento pelo link "Preferências de cookies".
   ===================================================================== */
(() => {
  const CHAVE = 'consentimento-v1';
  const D = window.DADOS || {};
  const temMedicao = !!(D.metaPixel || D.googleAnalytics);
  const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE) || 'null'); } catch (e) { return null; } };
  const salvar = v => { try { localStorage.setItem(CHAVE, JSON.stringify({ medicao: v, data: new Date().toISOString() })); } catch (e) {} };

  let carregou = false;
  function carregarMedicao() {
    if (carregou) return; carregou = true;
    if (D.metaPixel) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', D.metaPixel); fbq('track', 'PageView');
    }
    if (D.googleAnalytics) {
      const s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(D.googleAnalytics); document.head.appendChild(s);
      window.dataLayer = window.dataLayer || []; window.gtag = function(){ dataLayer.push(arguments); };
      gtag('js', new Date()); gtag('config', D.googleAnalytics, { anonymize_ip: true });
    }
  }

  const css = `
  .ck{position:fixed;left:16px;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:90;max-width:640px;margin:0 auto;padding:18px 20px;border-radius:20px;
    background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,0) 50%),rgba(20,19,18,.92);-webkit-backdrop-filter:blur(20px) saturate(160%);backdrop-filter:blur(20px) saturate(160%);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.18),inset 0 0 0 1px rgba(255,255,255,.09),0 20px 60px rgba(0,0,0,.5);color:#f4f1ec;font:400 14px/1.55 'Archivo Variable',Archivo,system-ui,sans-serif}
  .ck[hidden]{display:none}
  .ck h2{font-size:15px;margin:0 0 6px;font-weight:800}
  .ck p{margin:0 0 14px;color:#c9c4bb}
  .ck a{color:#ff9a52}
  .ck .ck-b{display:flex;flex-wrap:wrap;gap:8px}
  .ck button{font:800 14px 'Archivo Variable',Archivo,sans-serif;border:0;border-radius:999px;padding:11px 18px;cursor:pointer}
  .ck .ck-sim{background:#f26b1d;color:#141414}
  .ck .ck-nao{background:rgba(255,255,255,.08);color:#f4f1ec;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}
  .ck .ck-nao:hover{background:rgba(242,107,29,.25)}
  .ck button:focus-visible{outline:3px solid #ffb37a;outline-offset:3px}`;

  function montar() {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    const el = document.createElement('section');
    el.className = 'ck'; el.hidden = true; el.setAttribute('role', 'dialog'); el.setAttribute('aria-live', 'polite'); el.setAttribute('aria-labelledby', 'ckT');
    const pol = (document.documentElement.dataset.raiz || '') + 'privacidade.html#cookies';
    el.innerHTML = temMedicao
      ? `<h2 id="ckT">Sua privacidade</h2><p>Usamos só o essencial para o site funcionar. Com a sua permissão, também usamos ferramentas de medição (como o Pixel da Meta) para entender visitas e melhorar anúncios. Saiba mais na <a href="${pol}">Política de Privacidade</a>.</p>
         <div class="ck-b"><button class="ck-sim" type="button">Aceitar medição</button><button class="ck-nao" type="button">Só o essencial</button></div>`
      : `<h2 id="ckT">Sem rastreamento por aqui</h2><p>Este site não usa cookies de rastreamento nem de publicidade. Guardamos apenas a sua escolha neste aviso, no seu próprio navegador. Saiba mais na <a href="${pol}">Política de Privacidade</a>.</p>
         <div class="ck-b"><button class="ck-sim" type="button">Entendi</button></div>`;
    document.body.appendChild(el);
    const fecha = v => { salvar(v); el.hidden = true; if (v) carregarMedicao(); };
    el.querySelector('.ck-sim').onclick = () => fecha(temMedicao);
    const nao = el.querySelector('.ck-nao'); if (nao) nao.onclick = () => fecha(false);
    return el;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const el = montar();
    const c = ler();
    if (!c) el.hidden = false;
    else if (c.medicao && temMedicao) carregarMedicao();
    /* qualquer link/botão com data-cookies reabre o aviso */
    document.querySelectorAll('[data-cookies]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); el.hidden = false; const p = el.querySelector('button'); p && p.focus(); }));
  });
})();
