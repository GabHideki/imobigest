document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.getItem('usuarioLogado')){
        window.location.href = '/login.html';
    }

    const btnMenu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu');
    const btnSair = document.getElementById('btn-sair');

    // Abre/Fecha o menu ao clicar no botão
    if (btnMenu && menu) {
        btnMenu.addEventListener('click', () => {
            menu.classList.toggle('fechado'); 
        });
    }

    // Ação do botão de sair
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            if (confirm('Deseja realmente sair do sistema?')) {
                localStorage.clear();
                window.location.href = '/login.html'; // Redireciona para a tela de login
            }
        });
    }
});