document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btn-login');
    if(localStorage.getItem('usuarioLogado')){
        window.location.href = '/contrato.html';
    }
    if (btnLogin) {
        btnLogin.addEventListener('click', async (event) => {

            event.preventDefault();

            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            console.log(email, password);

            try {
                const response = await fetch(
                    'http://localhost:8080/usuarios/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                            senha: password
                        })
                    }
                );

                console.log("Status:", response.status);
                
                if (!response.ok) {
                    let mensagemLogin = document.getElementById('mensagem-login');
                    mensagemLogin.innerHTML = '';
                    let paragrafo = document.createElement('p');
                    paragrafo.textContent = 'Email ou senha inválidos!';
                    mensagemLogin.appendChild(paragrafo);
                    throw new Error('Falha no login');
                }

                const data = await response.json();
                const usuarioLogado = {
                    id: data.id,
                    nome: data.nome,
                    email: data.email,
                    tipo: data.tipo
                };

                localStorage.setItem(
                    'usuarioLogado',
                    JSON.stringify(usuarioLogado)
                );

                window.location.href = '/contrato.html';

            } catch (error) {
                console.error(error);
            }
        });
    }
});