let contratoId = null;
let isCorretor = false;

document.addEventListener('DOMContentLoaded', async () => {
    const usuarioLogadoTexto = localStorage.getItem('usuarioLogado');
    if (!usuarioLogadoTexto) {
        window.location.href = '/login.html';
        return;
    }

    const usuarioLogado = JSON.parse(usuarioLogadoTexto);
    const tipoLogado = usuarioLogado.tipo ? usuarioLogado.tipo.toUpperCase() : '';
    isCorretor = tipoLogado === 'CORRETOR';

    await carregarClientes();
    await carregarImoveis();
    await configurarCampoCorretor(usuarioLogado);

    const params = new URLSearchParams(window.location.search);
    contratoId = params.get('id');

    if (contratoId) {
        await carregarContratoParaEdicao(contratoId);
        const botaoSubmit = document.querySelector('#formContrato button[type="submit"]');
        if (botaoSubmit) {
            botaoSubmit.textContent = 'Salvar alterações';
        }
    }

    const selectImovel = document.getElementById('imovelId');
    if (selectImovel) {
        selectImovel.addEventListener('change', async (event) => {
            const idImovel = event.target.value;
            if (idImovel) {
                await atualizarValorSugerido(idImovel);
            } else {
                document.getElementById('valorPagamento').value = "";
            }
        });
    }

    const formContrato = document.getElementById('formContrato');
    if (formContrato) {
        formContrato.addEventListener('submit', async (event) => {
            event.preventDefault();
            await salvarContrato();
        });
    }
});

async function carregarContratoParaEdicao(id) {
    try {
        const response = await fetch(`http://localhost:8080/contratos/${id}`);
        if (!response.ok) {
            throw new Error(`Contrato não encontrado: ${response.status}`);
        }

        const contrato = await response.json();

        document.getElementById('statusContrato').value = contrato.status || '';
        document.getElementById('tipoContrato').value = contrato.tipo || '';
        document.getElementById('prazoContrato').value = contrato.prazoMeses || '';
        document.getElementById('dataInicio').value = contrato.dataInicio || '';
        document.getElementById('dataFim').value = contrato.dataFim || '';
        document.getElementById('clienteId').value = contrato.cliente?.id || '';
        document.getElementById('imovelId').value = contrato.imovel?.id || '';

        if (contrato.corretor?.id) {
            const corretorId = document.getElementById('corretorId');
            if (corretorId) {
                corretorId.value = contrato.corretor.id;
            }
        }

        if (contrato.pagamentos && contrato.pagamentos.length > 0) {
            const pagamento = contrato.pagamentos[contrato.pagamentos.length - 1];
            document.getElementById('valorPagamento').value = pagamento.valor ?? '';
            document.getElementById('dataPagamento').value = pagamento.data || '';
            document.getElementById('tipoPagamento').value = pagamento.tipo || '';
            document.getElementById('statusPagamento').value = pagamento.status || '';
        }
    } catch (error) {
        console.error('Erro ao carregar contrato para edição:', error);
        alert('Não foi possível carregar os dados do contrato para edição.');
    }
}

async function configurarCampoCorretor(usuarioLogado) {
    const container = document.getElementById('containerCorretor');
    
    const tipoUsuario = usuarioLogado.tipo ? usuarioLogado.tipo.toUpperCase() : "";

    if (tipoUsuario === "ADMIN") {
        container.innerHTML = `
            <label for="corretorId">Corretor Responsável</label>
            <select id="corretorId" name="corretorId" required>
                <option value="">Selecione o corretor</option>
            </select>
        `;
        await carregarListaDeCorretores();
    } else {
        container.innerHTML = `
            <label for="corretorNome">Corretor Responsável</label>
            <input type="text" id="corretorNome" value="${usuarioLogado.nome}" readonly>
            <input type="hidden" id="corretorId" name="corretorId" value="${usuarioLogado.id}">
        `;
    }
}

async function carregarListaDeCorretores() {
    try {
        const response = await fetch('http://localhost:8080/usuarios/corretores');
        if (!response.ok) throw new Error('Falha ao buscar corretores');
        
        const corretores = await response.json();
        const selectCorretor = document.getElementById('corretorId');

        corretores.forEach(corretor => {
            const option = document.createElement('option');
            option.value = corretor.id;
            option.textContent = corretor.nome;
            selectCorretor.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar corretores para o Admin:', error);
    }
}

async function carregarClientes() {
    try {
        const response = await fetch('http://localhost:8080/usuarios/clientes');
        if (!response.ok) throw new Error('Falha ao buscar clientes');
        
        const clientes = await response.json();
        const selectCliente = document.getElementById('clienteId');

        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nome} (CPF: ${cliente.cpf})`;
            selectCliente.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao popular lista de clientes:', error);
    }
}

async function carregarImoveis() {
    try {
        const response = await fetch('http://localhost:8080/imoveis');
        if (!response.ok) throw new Error('Falha ao buscar imóveis');
        
        const imoveis = await response.json();
        const selectImovel = document.getElementById('imovelId');

        imoveis.forEach(imovel => {
            const option = document.createElement('option');
            option.value = imovel.id;
            option.textContent = `${imovel.nome} - ${imovel.tipo || 'Imóvel'}`;
            selectImovel.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao popular lista de imóveis:', error);
    }
}

async function atualizarValorSugerido(idImovel) {
    try {
        const response = await fetch(`http://localhost:8080/imoveis/${idImovel}`);
        if (!response.ok) return;

        const imovel = await response.json();
        const tipoContrato = document.getElementById('tipoContrato').value;
        const inputValor = document.getElementById('valorPagamento');
        
        if (tipoContrato === "aluguel" && imovel.valorAluguel) {
            inputValor.value = imovel.valorAluguel;
        } else if (tipoContrato === "venda" && imovel.valorCompra) {
            inputValor.value = imovel.valorCompra;
        }
    } catch (error) {
        console.error('Erro ao atualizar valor sugerido:', error);
    }
}

async function salvarContrato() {
    try {
        // Validação de campos obrigatórios
        const statusContrato = document.getElementById('statusContrato').value.trim();
        const tipoContrato = document.getElementById('tipoContrato').value.trim();
        const prazoContrato = document.getElementById('prazoContrato').value.trim();
        const dataInicio = document.getElementById('dataInicio').value.trim();
        const dataFim = document.getElementById('dataFim').value.trim();
        const clienteId = document.getElementById('clienteId').value.trim();
        const imovelId = document.getElementById('imovelId').value.trim();
        const idCorretor = document.getElementById('corretorId').value.trim();
        const valorPagamento = document.getElementById('valorPagamento').value.trim();
        const dataPagamento = document.getElementById('dataPagamento').value.trim();
        const tipoPagamento = document.getElementById('tipoPagamento').value.trim();
        const statusPagamento = document.getElementById('statusPagamento').value.trim();

        // Validações
        if (!statusContrato) {
            alert("Por favor, selecione o status do contrato.");
            return;
        }
        if (!tipoContrato) {
            alert("Por favor, selecione o tipo do contrato.");
            return;
        }
        if (!prazoContrato || isNaN(prazoContrato) || parseInt(prazoContrato) <= 0) {
            alert("Por favor, insira um prazo válido (maior que 0).");
            return;
        }
        if (!dataInicio) {
            alert("Por favor, insira a data de início.");
            return;
        }
        if (!dataFim) {
            alert("Por favor, insira a data de fim.");
            return;
        }
        if (!clienteId || isNaN(clienteId)) {
            alert("Por favor, selecione um cliente válido.");
            return;
        }
        if (!imovelId || isNaN(imovelId)) {
            alert("Por favor, selecione um imóvel válido.");
            return;
        }
        if (!idCorretor || isNaN(idCorretor)) {
            alert("Por favor, selecione ou verifique o corretor responsável.");
            return;
        }
        if (!valorPagamento || isNaN(valorPagamento) || parseFloat(valorPagamento) <= 0) {
            alert("Por favor, insira um valor de pagamento válido.");
            return;
        }
        if (!dataPagamento) {
            alert("Por favor, insira a data do pagamento.");
            return;
        }
        if (!tipoPagamento) {
            alert("Por favor, selecione o tipo de pagamento.");
            return;
        }
        if (!statusPagamento) {
            alert("Por favor, selecione o status do pagamento.");
            return;
        }

        const contratoPayload = {
            status: statusContrato,
            prazoMeses: parseInt(prazoContrato),
            dataInicio: dataInicio,
            dataFim: dataFim,
            tipo: tipoContrato.toUpperCase(),
            cliente: {
                id: parseInt(clienteId)
            },
            corretor: {
                id: parseInt(idCorretor)
            },
            imovel: {
                id: parseInt(imovelId)
            },
            pagamentos: [
                {
                    valor: parseFloat(valorPagamento),
                    data: dataPagamento,
                    tipo: tipoPagamento,
                    status: statusPagamento
                }
            ]
        };

        console.log('Payload a ser enviado:', JSON.stringify(contratoPayload, null, 2));

        const url = contratoId
            ? `http://localhost:8080/contratos/${contratoId}`
            : 'http://localhost:8080/contratos';

        const method = contratoId ? 'PUT' : 'POST';

        console.log(`Enviando ${method} para ${url}`);

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contratoPayload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Resposta do servidor:', errorBody);
            
            // Tenta fazer parse de JSON se possível
            try {
                const jsonError = JSON.parse(errorBody);
                console.error('Erro formatado:', jsonError);
            } catch (e) {
                console.error('Resposta bruta:', errorBody);
            }
            
            throw new Error(`Erro: ${response.status}`);
        }

        const mensagem = contratoId ? 'Contrato atualizado com sucesso!' : 'Contrato cadastrado com sucesso!';
        alert(mensagem);
        window.location.href = '/contrato.html';

    } catch (error) {
        console.error('Erro ao salvar contrato:', error);
        alert('Erro ao salvar o contrato. Verifique os dados e tente novamente.');
    }
}