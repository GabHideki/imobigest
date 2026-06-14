document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.getItem('usuarioLogado')){
        window.location.href = '/login.html';
    }

    let finalidade = document.getElementById('finalidade');
    const inputVenda = document.getElementById('campoVenda');
    const inputAluguel = document.getElementById('campoAluguel');

    function gerenciarCamposValores() {
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
            inputInsideAluguel.removeAttribute('removeAttribute');
        }
    }

    if (finalidade) {
        finalidade.addEventListener('change', gerenciarCamposValores);
        gerenciarCamposValores(); 
    }
    
    const formCadastro = document.getElementById('formCadastro');
    const btnCadastro = document.getElementById('btnCadastrar');

    if(formCadastro){
        formCadastro.addEventListener('submit', async (event) =>{
            event.preventDefault(); 

            btnCadastro.disabled = true;
            const textoOriginalBotao = btnCadastro.textContent;
            btnCadastro.textContent = 'Cadastrando...';

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
                const response = await fetch(
                    'http://localhost:8080/imoveis',
                    {
                        method: 'POST',
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
                    }
                );

                console.log("Status:", response.status);

                let mensagemCadastro = document.getElementById('mensagem-cadastro');
                if (mensagemCadastro) {
                    mensagemCadastro.innerHTML = '';
                    let paragrafo = document.createElement('p');

                    if(!response.ok){
                        paragrafo.textContent = 'Falha ao cadastrar imóvel!';
                        mensagemCadastro.appendChild(paragrafo);

                        btnCadastro.disabled = false;
                        btnCadastro.textContent = textoOriginalBotao;

                        throw new Error('Falha no cadastro');
                    } else {
                        paragrafo.textContent = 'Imóvel cadastrado com sucesso!';
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