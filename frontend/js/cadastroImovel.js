let imovelId = null;
let finalidade = null;
let inputVenda = null;
let inputAluguel = null;
let isCorretor = false;

function gerenciarCamposValores() {
    if (!finalidade || !inputVenda || !inputAluguel) {
        return;
    }

    let finalidadeValue = finalidade.value;
    const inputInsideVenda = inputVenda.querySelector('input');
    const inputInsideAluguel = inputAluguel.querySelector('input');

    if (finalidadeValue === 'ALUGUEL') {
        inputVenda.style.display = 'none';
        inputInsideVenda.value = '';
        inputInsideVenda.removeAttribute('required');

        inputAluguel.style.display = 'block';
        inputInsideAluguel.setAttribute('required', '');

    } else if (finalidadeValue === 'VENDA') {
        inputVenda.style.display = 'block';
        inputInsideVenda.setAttribute('required', '');

        inputAluguel.style.display = 'none';
        inputInsideAluguel.value = '';
        inputInsideAluguel.removeAttribute('required');

    } else if (finalidadeValue === 'AMBOS') {
        inputVenda.style.display = 'block';
        inputInsideVenda.setAttribute('required', '');

        inputAluguel.style.display = 'block';
        inputInsideAluguel.setAttribute('required', '');

    } else {
        inputVenda.style.display = 'none';
        inputAluguel.style.display = 'none';
        inputInsideVenda.value = '';
        inputInsideAluguel.value = '';

        inputInsideVenda.removeAttribute('required');
        inputInsideAluguel.removeAttribute('required');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    if(!localStorage.getItem('usuarioLogado')){
        window.location.href = '/login.html';
        return;
    }

    const usuarioLogadoTexto = localStorage.getItem('usuarioLogado');
    const usuarioLogado = usuarioLogadoTexto ? JSON.parse(usuarioLogadoTexto) : null;
    const tipoLogado = usuarioLogado?.tipo ? usuarioLogado.tipo.toUpperCase() : '';
    isCorretor = tipoLogado === 'CORRETOR';

    const params = new URLSearchParams(window.location.search);
    imovelId = params.get('id')?.trim();

    finalidade = document.getElementById('finalidade');
    inputVenda = document.getElementById('campoVenda');
    inputAluguel = document.getElementById('campoAluguel');

    if (finalidade) {
        finalidade.addEventListener('change', gerenciarCamposValores);
        gerenciarCamposValores();
    }

    if (imovelId) {
        await carregarImovelParaEdicao(imovelId);
        const btnCadastrar = document.getElementById('btnCadastrar');
        if (btnCadastrar) {
            btnCadastrar.textContent = 'Salvar alterações';
        }
    }

    const formCadastro = document.getElementById('formCadastro');
    const btnCadastro = document.getElementById('btnCadastrar');

    if(formCadastro){
        formCadastro.addEventListener('submit', async (event) =>{
            event.preventDefault(); 

            btnCadastro.disabled = true;
            const textoOriginalBotao = btnCadastro.textContent;
            btnCadastro.textContent = imovelId ? 'Salvando...' : 'Cadastrando...';

            let nome = document.getElementById('nome').value;
            let cep = document.getElementById('cep').value;
            let estado = document.getElementById('estado').value;
            let cidade = document.getElementById('cidade').value;
            let bairro = document.getElementById('bairro').value;
            let rua = document.getElementById('rua').value;
            let numero = document.getElementById('num').value;
            let complemento = document.getElementById('comple').value;
            let descricao = document.getElementById('descricao').value;
            let status = document.getElementById('status').value.toUpperCase();
            let tipo = document.getElementById('finalidade').value.toUpperCase();
            
            let campoVenda = inputVenda.querySelector('input').value;
            let campoAluguel = inputAluguel.querySelector('input').value;

            try {
                const url = imovelId ? `http://localhost:8080/imoveis/${imovelId}` : 'http://localhost:8080/imoveis';
                const method = imovelId ? 'PUT' : 'POST';

                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nome,
                        descricao: descricao,
                        status: status,
                        tipo: tipo,
                        valorCompra: campoVenda ? parseFloat(campoVenda) : null,
                        valorAluguel: campoAluguel ? parseFloat(campoAluguel) : null,
                        endereco: {
                            cep: cep,
                            estado: estado,
                            cidade: cidade,
                            bairro: bairro,
                            rua: rua,
                            numero: numero,
                            complemento: complemento
                        }
                    })
                });

                console.log("Status:", response.status);

                let mensagemCadastro = document.getElementById('mensagem-cadastro');
                if (mensagemCadastro) {
                    mensagemCadastro.innerHTML = '';
                    let paragrafo = document.createElement('p');

                    if(!response.ok){
                        paragrafo.textContent = imovelId ? 'Falha ao salvar imóvel!' : 'Falha ao cadastrar imóvel!';
                        mensagemCadastro.appendChild(paragrafo);

                        btnCadastro.disabled = false;
                        btnCadastro.textContent = textoOriginalBotao;

                        throw new Error('Falha no cadastro');
                    } else {
                        paragrafo.textContent = imovelId ? 'Imóvel atualizado com sucesso!' : 'Imóvel cadastrado com sucesso!';
                        mensagemCadastro.appendChild(paragrafo);
                        
                        setTimeout(() => {
                            window.location.href = '/imovel.html';
                        }, 1500);
                    }
                }
            } catch (error) {
                console.error(error);
                btnCadastro.disabled = false;
                btnCadastro.textContent = textoOriginalBotao;
            }
        })
    }
});

async function carregarImovelParaEdicao(id) {
    try {
        const response = await fetch(`http://localhost:8080/imoveis/${id}`);
        if (!response.ok) {
            throw new Error(`Imóvel não encontrado: ${response.status}`);
        }

        const imovel = await response.json();

        document.getElementById('nome').value = imovel.nome || '';
        document.getElementById('cep').value = imovel.endereco?.cep || '';
        document.getElementById('estado').value = imovel.endereco?.estado || '';
        document.getElementById('cidade').value = imovel.endereco?.cidade || '';
        document.getElementById('bairro').value = imovel.endereco?.bairro || '';
        document.getElementById('rua').value = imovel.endereco?.rua || '';
        document.getElementById('num').value = imovel.endereco?.numero || '';
        document.getElementById('comple').value = imovel.endereco?.complemento || '';
        document.getElementById('descricao').value = imovel.descricao || '';
        document.getElementById('status').value = imovel.status || '';
        document.getElementById('finalidade').value = imovel.tipo || '';
        gerenciarCamposValores();

        if (imovel.valorCompra) {
            document.getElementById('valorVenda').value = imovel.valorCompra;
        }
        if (imovel.valorAluguel) {
            document.getElementById('valorAluguel').value = imovel.valorAluguel;
        }
    } catch (error) {
        console.error('Erro ao carregar imóvel para edição:', error);
        const mensagemCadastro = document.getElementById('mensagem-cadastro');
        if (mensagemCadastro) {
            mensagemCadastro.innerHTML = '<p>Não foi possível carregar os dados do imóvel para edição.</p>';
        }
    }
}
