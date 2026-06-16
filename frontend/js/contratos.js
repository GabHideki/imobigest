let isCorretor = false;

function obterUsuarioLogado() {
    const usuarioLogadoTexto = localStorage.getItem('usuarioLogado');
    return usuarioLogadoTexto ? JSON.parse(usuarioLogadoTexto) : null;
}

document.addEventListener('DOMContentLoaded', async () => {
    const usuarioLogadoTexto = localStorage.getItem('usuarioLogado');
    if (!usuarioLogadoTexto) {
        window.location.href = '/login.html';
        return; 
    }

    const usuarioLogado = obterUsuarioLogado();
    const tipoLogado = usuarioLogado?.tipo ? usuarioLogado.tipo.toUpperCase() : '';
    isCorretor = tipoLogado === 'CORRETOR';

    const inputBusca = document.getElementById('buscar');
    const selectFiltro = document.getElementById('filtro');

    if (inputBusca) {
        inputBusca.addEventListener('input', async (event) => {
            const termoDigitado = event.target.value;

            if (termoDigitado.trim() !== "" && selectFiltro) {
                selectFiltro.value = "todos";
            }

            const contratos = await buscarContratos(termoDigitado, selectFiltro?.value || "todos");
            mostrarContratos(contratos); 
        });
    }

    if (selectFiltro) {
        selectFiltro.addEventListener('change', async (event) => {
            const statusSelecionado = event.target.value;
            const contratos = await buscarContratos(inputBusca?.value || "", statusSelecionado);
            mostrarContratos(contratos);
        });
    }

    const todosContratos = await buscarContratos("", "todos");
    mostrarContratos(todosContratos);

    const btnAdicionarContrato = document.getElementById('btn-adicionar-cliente');
    if (btnAdicionarContrato) {
        btnAdicionarContrato.addEventListener('click', () => {
            window.location.href = '/formContrato.html';
        });
    }
});

async function buscarContratos(termo, status) {
    try {
        const termoBusca = typeof termo === 'string' ? termo.trim() : "";
        const statusSelecionado = typeof status === 'string' ? status : "";

        const url = termoBusca
            ? `http://localhost:8080/contratos?busca=${encodeURIComponent(termoBusca)}`
            : `http://localhost:8080/contratos`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição dos contratos: ${response.status}`);
        }

        let dados = await response.json();

        if (statusSelecionado === 'ativos') {
            dados = dados.filter(contrato => String(contrato.status || '').toUpperCase() === 'ATIVO');
        } else if (statusSelecionado === 'inativos') {
            dados = dados.filter(contrato => String(contrato.status || '').toUpperCase() !== 'ATIVO');
        }

        return dados;

    } catch (error) {
        return [];
    }
}

function mostrarContratos(contratos) {
    const tbody = document.getElementById('listaClientes');
    const textoPaginacao = document.getElementById('textoPaginacao');
    
    tbody.innerHTML = '';

    if (!contratos || contratos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: #888; padding: 20px;">
                    Nenhum contrato encontrado.
                </td>
            </tr>
        `;
        if (textoPaginacao) textoPaginacao.textContent = "Mostrando 0 de 0 contratos";
        return;
    }

    contratos.forEach(contrato => {
        const tr = document.createElement('tr');

        const valorExibido = contrato.pagamentos && contrato.pagamentos.length > 0
            ? contrato.pagamentos[contrato.pagamentos.length - 1].valor
            : (contrato.imovel ? contrato.imovel.valorAluguel : 0);

        const valorFormatado = new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }).format(valorExibido);

        const acoesContrato = `
            <button class="btn-acao editar" title="Editar Contrato" onclick="editarContrato(${contrato.id})">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn-acao deletar" title="Excluir Contrato" onclick="deletarContrato(${contrato.id})">
                <i class="bi bi-trash"></i>
            </button>
        `;

        const statusTexto = contrato.status ? String(contrato.status) : 'INATIVO';
        const tipoTexto = contrato.tipo ? String(contrato.tipo) : 'N/A';
        const nomeCliente = contrato.cliente ? contrato.cliente.nome : 'Não informado';
        const nomeImovel = contrato.imovel ? contrato.imovel.nome : 'Não informado';

        tr.innerHTML = `
            <td><strong>#${contrato.id}</strong></td>
            <td>${nomeCliente}</td>
            <td>${nomeImovel}</td>
            <td>${tipoTexto}</td>
            <td>${valorFormatado}</td>
            <td>
                <span class="status-tag ${statusTexto.toLowerCase()}">
                    ${statusTexto}
                </span>
            </td>
            <td>
                ${acoesContrato}
            </td>
        `;

        tbody.appendChild(tr);
    });

    if (textoPaginacao) {
        textoPaginacao.textContent = `Mostrando ${contratos.length} de ${contratos.length} contratos`;
    }
}

function editarContrato(id) {
    window.location.href = `/formContrato.html?id=${id}`;
}

async function deletarContrato(id) {
    const confirmar = confirm('Deseja realmente excluir este contrato?');
    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/contratos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir contrato: ${response.status}`);
        }

        alert('Contrato excluído com sucesso.');

        const termoBusca = document.getElementById('buscar')?.value || '';
        const contratos = await buscarContratos(termoBusca);
        mostrarContratos(contratos);
    } catch (error) {
        alert('Não foi possível excluir o contrato. Tente novamente.');
    }
}