let isCorretor = false;

function obterUsuarioLogado() {
    const usuarioLogadoTexto = localStorage.getItem('usuarioLogado');
    return usuarioLogadoTexto ? JSON.parse(usuarioLogadoTexto) : null;
}

document.addEventListener('DOMContentLoaded', async () => {

    if (!localStorage.getItem('usuarioLogado')) {
        window.location.href = '/login.html';
        return;
    }

    const usuarioLogado = obterUsuarioLogado();
    const tipoLogado = usuarioLogado?.tipo ? usuarioLogado.tipo.toUpperCase() : '';
    isCorretor = tipoLogado === 'CORRETOR';

    const selectFiltro = document.getElementById('filtro');
    const inputBusca = document.getElementById('buscar');

    if (inputBusca) {
        inputBusca.addEventListener('input', async (event) => {
            const termoDigitado = event.target.value;
            
            if (termoDigitado.trim() !== "" && selectFiltro) {
                selectFiltro.value = "";
            }

            const imoveis = await buscarImoveis(termoDigitado, "");
            mostrarImoveis(imoveis);
        });
    }

    if (selectFiltro) {
        selectFiltro.addEventListener('change', async (event) => {
            const statusSelecionado = event.target.value;
            
            if (inputBusca) {
                inputBusca.value = "";
            }

            const imoveis = await buscarImoveis("", statusSelecionado);
            mostrarImoveis(imoveis);
        });
    }

    const todosImoveis = await buscarImoveis("", "");
    mostrarImoveis(todosImoveis);

    const btnAdicionarImovel = document.getElementById('btn-adicionar-cliente');
    if (btnAdicionarImovel) {
        btnAdicionarImovel.addEventListener('click', () => {
            window.location.href = '/formImovel.html';
        });
    }
});

async function buscarImoveis(nome, status) {
    try {
        let url = `http://localhost:8080/imoveis`;

        if (nome && nome.trim() !== "") {
            url = `http://localhost:8080/imoveis/buscar?nome=${encodeURIComponent(nome.trim())}`;
        } else if (status === "disponiveis") {
            url = `http://localhost:8080/imoveis/disponiveis`;
        } else if (status === "alugados") {
            url = `http://localhost:8080/imoveis/alugados`;
        } else if (status === "vendidos") {
            url = `http://localhost:8080/imoveis/vendidos`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        return [];
    }
}

function mostrarImoveis(imoveis) {
    const tbody = document.getElementById('listaClientes');
    const textoPaginacao = document.getElementById('textoPaginacao');

    tbody.innerHTML = '';
    if (!imoveis || imoveis.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #888; padding: 20px;">
                    Nenhum imóvel encontrado.
                </td>
            </tr>
        `;
        if (textoPaginacao) textoPaginacao.textContent = "Mostrando 0 de 0 imóveis";
        return;
    }

    imoveis.forEach(imovel => {
        const tr = document.createElement('tr');

        let enderecoCompleto = 'Não informado';
        if (imovel.endereco) {
            const e = imovel.endereco;
            enderecoCompleto = `${e.rua || ''}, ${e.numero || 'S/N'} - ${e.bairro || ''}, ${e.cidade || ''}/${e.estado || ''}`;
        }

        const statusTexto = imovel.status ? String(imovel.status) : 'INDISPONIVEL';
        const tipoTexto = imovel.tipo ? String(imovel.tipo) : 'N/A';

        const acoesImovel = `
            <button class="btn-acao editar" title="Editar Imóvel" onclick="editarImovel(${imovel.id})">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn-acao deletar" title="Excluir Imóvel" onclick="deletarImovel(${imovel.id})">
                <i class="bi bi-trash"></i>
            </button>
        `;

        tr.innerHTML = `
            <td>${imovel.nome || 'N/A'}</td>
            <td>${enderecoCompleto}</td>
            <td>${tipoTexto}</td>
            <td>
                <span class="status-tag ${statusTexto.toLowerCase()}">
                    ${statusTexto}
                </span>
            </td>
            <td>
                ${acoesImovel}
            </td>
        `;

        tbody.appendChild(tr);
    });

    if (textoPaginacao) {
        textoPaginacao.textContent = `Mostrando ${imoveis.length} de ${imoveis.length} imóveis`;
    }
}

function editarImovel(id) {
    window.location.href = `/formImovel.html?id=${id}`;
}

async function deletarImovel(id) {
    const confirmar = confirm('Deseja realmente excluir este imóvel?');
    if (!confirmar) return;

    try {
        const response = await fetch(`http://localhost:8080/imoveis/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir imóvel: ${response.status}`);
        }

        alert('Imóvel excluído com sucesso.');

        const termoBusca = document.getElementById('buscar')?.value || '';
        const statusSelecionado = document.getElementById('filtro')?.value || '';
        const imoveis = await buscarImoveis(termoBusca, statusSelecionado);
        mostrarImoveis(imoveis);
    } catch (error) {
        alert('Não foi possível excluir o imóvel. Tente novamente.');
    }
}
