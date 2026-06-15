document.addEventListener('DOMContentLoaded', async () => {
    const usuarioLogadoTexto = localStorage.getItem('usuarioLogado');
    if (!usuarioLogadoTexto) {
        window.location.href = '/login.html';
        return;
    }

    const usuarioLogado = JSON.parse(usuarioLogadoTexto);

    await carregarClientes();
    await carregarImoveis();
    
    await configurarCampoCorretor(usuarioLogado);

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
        const idCorretor = document.getElementById('corretorId').value;

        if (!idCorretor) {
            alert("Por favor, selecione ou verifique o corretor responsável.");
            return;
        }

        const contratoPayload = {
            status: document.getElementById('statusContrato').value.toUpperCase(),
            prazoMeses: parseInt(document.getElementById('prazoContrato').value),
            dataInicio: document.getElementById('dataInicio').value,
            dataFim: document.getElementById('dataFim').value,
            tipo: document.getElementById('tipoContrato').value.toUpperCase(),
            cliente: {
                id: document.getElementById('clienteId').value
            },
            corretor: {
                id: idCorretor
            },
            imovel: {
                id: document.getElementById('imovelId').value
            },
            pagamentos: [
                {
                    valor: parseFloat(document.getElementById('valorPagamento').value),
                    data: document.getElementById('dataPagamento').value,
                    tipo: document.getElementById('tipoPagamento').value.toUpperCase(),
                    status: document.getElementById('statusPagamento').value.toUpperCase()
                }
            ]
        };

        const response = await fetch('http://localhost:8080/contratos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contratoPayload)
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        alert('Contrato cadastrado com sucesso!');
        window.location.href = '/contrato.html';

    } catch (error) {
        console.error('Erro ao salvar contrato:', error);
        alert('Erro ao cadastrar o contrato. Verifique os dados.');
    }
}