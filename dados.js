/* =====================================================================
   SEUS DADOS: preencha aqui uma vez e o site inteiro usa.
   (rodapé, Política de Privacidade, Termos, Reembolso e botões)
   O que estiver vazio aparece como "a preencher" em laranja.
   ===================================================================== */
window.DADOS = {
  nome: 'Vitor Emanuel',
  razaoSocial: 'Vitor Emanuel (pessoa física)',        // nome da empresa no CNPJ que vende os cursos. Ex.: Vitor Emanuel Silva LTDA
  cnpj: '153.781.914-32',               // ex.: 00.000.000/0001-00  (ou CPF, se vender como pessoa física)
  endereco: '',           // endereço completo (obrigatório para venda online, Decreto 7.962/2013)
  email: 'vbx1.exe@gmail.com',              // e-mail de atendimento e de privacidade. Ex.: contato@seudominio.com.br
  whatsapp: '5581999948932', // só números: 55 + DDD + número
  atualizado: '24 de novembro de 2026',

  /* links de compra (Cakto) */
  caktoQG: '',
  caktoClaude: 'https://pay.cakto.com.br/32dsh9c_1365590',      // link de checkout da Cakto do curso Claude na Prática
  caktoJovem: 'https://pay.cakto.com.br/dqgn6dg_1365595',   // checkout da Cakto do curso Empreenda Jovem

  /* ferramentas de medição: só carregam se o visitante ACEITAR no aviso de cookies.
     Deixe vazio se não usar. */
  metaPixel: '',          // ID do Pixel da Meta (Facebook/Instagram). Ex.: 123456789012345
  googleAnalytics: ''     // ID do Google Analytics 4. Ex.: G-XXXXXXXXXX
};

/* preenche os campos [data-d="..."] da página */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-d]').forEach(el => {
    const v = (window.DADOS[el.dataset.d] || '').toString().trim();
    if (v) { el.textContent = v; el.classList.remove('falta'); }
    else { el.textContent = 'a preencher'; el.classList.add('falta'); }
  });
});
