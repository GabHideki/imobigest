function exibirMensagem(texto, ehSucesso) {
    const msgDiv = document.getElementById('mensagem-cadastro');
    if (!msgDiv) return;
    
    msgDiv.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = texto;
    p.style.color = ehSucesso ? 'green' : 'red';
    msgDiv.appendChild(p);
}

function voltarParaListagem(tipoLogado) {
    if (tipoLogado === 'ADMIN') {
        window.location.href = '/usuario.html'; 
    } else {
        window.location.href = '/usuario.html'; 
    }
}

function configurarObrigatoriedadeCredenciais(obrigatorio) {
    const inputUser = document.getElementById('usuarioLogin');
    const inputSenha = document.getElementById('senhaLogin');
    if (inputUser) inputUser.required = obrigatorio;
    if (inputSenha) inputSenha.required = obrigatorio;
}

function configurarInterfacePorPerfil(tipoLogado) {
    const titulo = document.getElementById('tituloPagina');
    const containerTipo = document.getElementById('containerTipoUsuario');
    const camposCredenciais = document.getElementById('camposCredenciais');

    if (!titulo || !containerTipo || !camposCredenciais) return;

    if (tipoLogado === 'ADMIN') {
        titulo.textContent = 'Cadastro de Usuário';
        
        containerTipo.innerHTML = `
            <div style="margin-bottom: 15px;">
                <label for="tipo">Tipo de Perfil</label>
                <select id="tipo" name="tipo" required>
                    <option value="CLIENTE">Cliente</option>
                    <option value="CORRETOR">Corretor</option>
                    <option value="ADMIN">Administrador</option>
                </select>
            </div>
        `;

        const selectTipo = document.getElementById('tipo');
        if (selectTipo) {
            selectTipo.addEventListener('change', (e) => {
                if (e.target.value === 'CLIENTE') {
                    camposCredenciais.style.display = 'none';
                    configurarObrigatoriedadeCredenciais(false);
                } else {
                    camposCredenciais.style.display = 'block';
                    configurarObrigatoriedadeCredenciais(true);
                }
            });
        }
    } else {
        titulo.textContent = 'Cadastro de Cliente';
        containerTipo.innerHTML = '';
        camposCredenciais.style.display = 'none';
        configurarObrigatoriedadeCredenciais(false);
    }
}

function obterNomePerfilAmigavel(tipo) {
    if (tipo === 'CORRETOR') return 'Corretor';
    if (tipo === 'ADMIN') return 'Administrador';
    return 'Cliente';
}


document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogadoTexto = localStorage.getItem('usuarioLogado');
    
    if (!usuarioLogadoTexto) {
        window.location.href = '/login.html';
        return;
    }

    const usuarioLogado = JSON.parse(usuarioLogadoTexto);
    const tipoLogado = usuarioLogado.tipo ? usuarioLogado.tipo.toUpperCase() : "CORRETOR";

    configurarInterfacePorPerfil(tipoLogado);

    const btnCadastro = document.getElementById('btnCadastrar');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnFechar = document.getElementById('btnFechar');

    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => voltarParaListagem(tipoLogado));
    }
    if (btnFechar) {
        btnFechar.addEventListener('click', () => voltarParaListagem(tipoLogado));
    }

    if (btnCadastro) {
        const formCadastro = document.getElementById('formCadastro');
        formCadastro.addEventListener('submit', async (event) => {
            event.preventDefault();

            btnCadastro.disabled = true;
            const textoOriginalBotao = btnCadastro.textContent;
            btnCadastro.textContent = 'Cadastrando...';

            let nome = document.getElementById('nome').value;
            let cpf = document.getElementById('cpf').value;
            let telefone = document.getElementById('tell').value;
            let email = document.getElementById('email').value;

            const selectTipo = document.getElementById('tipo');
            let tipoCadastro = selectTipo ? selectTipo.value : 'CLIENTE';
            
            const perfilAmigavel = obterNomePerfilAmigavel(tipoCadastro);

            let novoUsuario = {
                nome: nome,
                cpf: cpf,
                telefone: telefone,
                email: email,
                tipo: tipoCadastro
            };

            if (tipoCadastro !== 'CLIENTE') {
                novoUsuario.usuario = document.getElementById('usuarioLogin').value;
                novoUsuario.senha = document.getElementById('senhaLogin').value;

                if (!novoUsuario.usuario || !novoUsuario.senha) {
                    exibirMensagem('Usuário e Senha são obrigatórios para este perfil.', false);
                    btnCadastro.disabled = false;
                    btnCadastro.textContent = textoOriginalBotao;
                    return;
                }
            }

            try {
                const response = await fetch('http://localhost:8080/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoUsuario)
                });

                if (!response.ok) {
                    if (response.status === 409) {
                        exibirMensagem(`Conflito: CPF, E-mail ou Login digitado já pertencem a um ${perfilAmigavel.toLowerCase()} cadastrado!`, false);
                    } else {
                        exibirMensagem(`Erro no cadastro! Código HTTP: ${response.status}`, false);
                    }
                    
                    btnCadastro.disabled = false;
                    btnCadastro.textContent = textoOriginalBotao;
                    throw new Error('Falha no cadastro');
                } else {
                    exibirMensagem(`${perfilAmigavel} cadastrado com sucesso!`, true);
                    
                    setTimeout(() => {
                        voltarParaListagem(tipoLogado);
                    }, 1500);
                }
            } catch (error) {
                console.error(error);
                btnCadastro.disabled = false;
                btnCadastro.textContent = textoOriginalBotao;
            }
        });
    }
});