// Script para modal de cadastro e integração com Google Sign-In
// --- INTEGRAÇÃO BACK-END: ver comentários abaixo ---

window.addEventListener('DOMContentLoaded', function() {
  // Exibe o modal de cadastro ao entrar no site, se ainda não cadastrado
  if (!localStorage.getItem('usuarioCadastrado')) {
    document.getElementById('modal-cadastro').style.display = 'flex';
  }

  // Fecha o modal ao clicar em fechar
  document.getElementById('fechar-modal-cadastro').onclick = function() {
    document.getElementById('modal-cadastro').style.display = 'none';
  };

  // Cadastro manual
  document.getElementById('form-cadastro').onsubmit = function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    // --- INTEGRAÇÃO BACK-END: Enviar dados para API de cadastro ---
    // Exemplo:
    // enviarCadastroBackend({ nome, email });
    // Salva dados localmente para uso na conta
    localStorage.setItem('usuarioCadastrado', '1');
    localStorage.setItem('nomeUsuario', nome);
    localStorage.setItem('emailUsuario', email);
    document.getElementById('modal-cadastro').style.display = 'none';
    alert('Cadastro realizado com sucesso!');
  };
});

// --- INTEGRAÇÃO BACK-END: Função para enviar cadastro manual ---
function enviarCadastroBackend(dados) {
  // TODO: Implementar chamada para API de cadastro
  // fetch('/api/cadastro', { method: 'POST', body: JSON.stringify(dados) })
  //   .then(res => res.json())
  //   .then(data => { /* tratar resposta */ });
}

// Função chamada pelo Google Identity Services
function handleCredentialResponse(response) {
  // Decodifica o JWT do Google
  const data = JSON.parse(atob(response.credential.split('.')[1]));
  document.getElementById('nome').value = data.name || '';
  document.getElementById('email').value = data.email || '';
  document.getElementById('foto-perfil').src = data.picture || '';
  // --- INTEGRAÇÃO BACK-END: Enviar dados Google para API de cadastro/login ---
  // Exemplo:
  // enviarCadastroGoogleBackend({ nome: data.name, email: data.email, foto: data.picture });
  // Salva dados localmente para uso na conta
  localStorage.setItem('usuarioCadastrado', '1');
  localStorage.setItem('nomeUsuario', data.name || '');
  localStorage.setItem('emailUsuario', data.email || '');
  localStorage.setItem('fotoUsuario', data.picture || '');
  document.getElementById('modal-cadastro').style.display = 'none';
  alert('Cadastro realizado com Google!');
}

// --- INTEGRAÇÃO BACK-END: Função para cadastro/login Google ---
function enviarCadastroGoogleBackend(dados) {
  // TODO: Implementar chamada para API de cadastro/login Google
  // fetch('/api/cadastro-google', { method: 'POST', body: JSON.stringify(dados) })
  //   .then(res => res.json())
  //   .then(data => { /* tratar resposta */ });
}

// --- FIM DOS PONTOS DE INTEGRAÇÃO BACK-END ---
