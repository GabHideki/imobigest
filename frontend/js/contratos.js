document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.getItem('usuarioLogado')) {
        window.location.href = '/login.html';
        return; 
    }

    const inputBusca = document.getElementById('buscar');

    if (inputBusca) {
        inputBusca.addEventListener('input', async (event) => {
            const termoDigitado = event.target.value;
            const contratos = await buscarContratos(termoDigitado);
            mostrarContratos(contratos); 
        });
    }

    const todosContratos = await buscarContratos("");
    mostrarContratos(todosContratos);
});

async function buscarContratos(termo) {
    try {
        const termoBusca = typeof termo === 'string' ? termo.trim() : "";
        
        const url = termoBusca 
            ? `http://localhost:8080/contratos?busca=${encodeURIComponent(termoBusca)}` 
            : `http://localhost:8080/contratos`;

        const response = await fetch(url);

        console.log("URL chamada:", url);
        console.log("Status da resposta:", response.status);

        if (!response.ok) {
            throw new Error(`Erro na requisição dos contratos: ${response.status}`);
        }

        const dados = await response.json();
        return dados;

    } catch (error) {
        console.error("Erro ao buscar contratos:", error);
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
                <button class="btn-acao editar" title="Editar Contrato" onclick="editarContrato(${contrato.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn-acao deletar" title="Excluir Contrato" onclick="deletarContrato(${contrato.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    if (textoPaginacao) {
        textoPaginacao.textContent = `Mostrando ${contratos.length} de ${contratos.length} contratos`;
    }
}