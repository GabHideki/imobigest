document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.getItem('usuarioLogado')){
        window.location.href = '/login.html';
    }

    const btnMenu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu');
    const btnSair = document.getElementById('btn-sair');

    if (btnMenu && menu) {
        btnMenu.addEventListener('click', () => {
            menu.classList.toggle('fechado'); 
        });
    }

    if (btnSair) {
        btnSair.addEventListener('click', () => {
            if (confirm('Deseja realmente sair do sistema?')) {
                localStorage.removeItem('usuarioLogado');
                window.location.href = '/login.html';
            }
        });
    }
});