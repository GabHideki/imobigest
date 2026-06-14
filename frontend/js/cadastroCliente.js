document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.getItem('usuarioLogado')){
        window.location.href = '/login.html';
    }

    const btnCadastro = document.getElementById('btnCadastrar');
    const btnCancelar = document.getElementById('btnCancelar');

    if(btnCancelar){
        btnCancelar.addEventListener('click', () =>{
            window.location.href = '/cliente.html';
        })
    }

    if(btnCadastro){
        btnCadastro.addEventListener('click', async (event) =>{
            event.preventDefault();

            btnCadastro.disabled = true;
            const textoOriginalBotao = btnCadastro.textContent;
            btnCadastro.textContent = 'Cadastrando...';

            let nome = document.getElementById('nome').value;
            let cpf = document.getElementById('cpf').value;
            let telefone = document.getElementById('tell').value;
            let email = document.getElementById('email').value;

            try {
                const response = await fetch(
                    'http://localhost:8080/usuarios',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nome: nome,
                            cpf: cpf,
                            telefone: telefone,
                            email: email,
                            tipo: 'CLIENTE'
                        })
                    }
                );

                console.log("Status:", response.status);

                if(!response.ok){
                    let mensagemCadastro = document.getElementById('mensagem-cadastro');
                    mensagemCadastro.innerHTML = '';
                    let paragrafo = document.createElement('p');
                    paragrafo.textContent = 'Cliente já cadastrado!';
                    mensagemCadastro.appendChild(paragrafo);

                    btnCadastro.disabled = false;
                    btnCadastro.textContent = textoOriginalBotao;

                    throw new Error('Falha no cadastro');
                } else {
                    let mensagemCadastro = document.getElementById('mensagem-cadastro');
                    mensagemCadastro.innerHTML = '';
                    let paragrafo = document.createElement('p');
                    paragrafo.textContent = 'Cliente cadastrado com sucesso!';
                    mensagemCadastro.appendChild(paragrafo);
                    
                    setTimeout(() => {
                        window.location.href = '/cliente.html';
                    }, 1500);
                }
            } catch (error) {
                console.error(error);
                btnCadastro.disabled = false;
                btnCadastro.textContent = textoOriginalBotao;
            }
        })
    }
});