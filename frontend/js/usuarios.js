function obterUsuarioLogado() {
    const usuarioLogadoTexto = localStorage.getItem('usuarioLogado');
    return usuarioLogadoTexto ? JSON.parse(usuarioLogadoTexto) : null;
}

let isCorretor = false;

function obterAcoesUsuario(usuario) {
    const tipoUsuario = usuario.tipo ? String(usuario.tipo).toUpperCase() : 'CLIENTE';
    const permiteEditar = !isCorretor || tipoUsuario === 'CLIENTE';
    const permiteDeletar = !isCorretor || tipoUsuario === 'CLIENTE';

    let html = '';
    if (permiteEditar) {
        html += `
            <button class="btn-acao editar" title="Editar Usuário" onclick="editarUsuario(${usuario.id})">
                <i class="bi bi-pencil"></i>
            </button>`;
    }
    if (permiteDeletar) {
        html += `
            <button class="btn-acao deletar" title="Excluir Usuário" onclick="deletarUsuario(${usuario.id})">
                <i class="bi bi-trash"></i>
            </button>`;
    }
    if (!html) {
        html = `<span class="text-muted">Sem ações</span>`;
    }
    return html;
}

document.addEventListener('DOMContentLoaded', async () => {
    const usuarioLogado = obterUsuarioLogado();
    if (!usuarioLogado) {
        window.location.href = '/login.html';
        return;
    }

    const tipoLogado = usuarioLogado.tipo ? usuarioLogado.tipo.toUpperCase() : '';
    isCorretor = tipoLogado === 'CORRETOR';

    const selectFiltro = document.getElementById('filtro');
    const inputBusca = document.getElementById('buscar');

    if (inputBusca) {
        inputBusca.addEventListener('input', async (event) => {
            const termoDigitado = event.target.value;

            if (termoDigitado.trim() !== "" && selectFiltro) {
                selectFiltro.value = "";
            }

            const usuarios = await buscarUsuarios(termoDigitado, "");
            mostrarUsuarios(usuarios);
        });
    }

    if (selectFiltro) {
        selectFiltro.addEventListener('change', async (event) => {
            const perfilSelecionado = event.target.value;

            if (inputBusca) {
                inputBusca.value = "";
            }

            const usuarios = await buscarUsuarios("", perfilSelecionado);
            mostrarUsuarios(usuarios);
        });
    }

    const todosUsuarios = await buscarUsuarios("", "");
    mostrarUsuarios(todosUsuarios);

    const btnAdicionarUsuario = document.getElementById('btn-adicionar-cliente');
    if (btnAdicionarUsuario) {
        btnAdicionarUsuario.addEventListener('click', () => {
            window.location.href = '/formCliente.html';
        });
    }
});

async function buscarUsuarios(nome, perfil) {
    try {
        let url = `http://localhost:8080/usuarios`;

        if (nome && nome.trim() !== "") {
            url = `http://localhost:8080/usuarios/buscar?nome=${encodeURIComponent(nome.trim())}`;
        } else if (perfil === "clientes") {
            url = `http://localhost:8080/usuarios/clientes`;
        } else if (perfil === "corretores") {
            url = `http://localhost:8080/usuarios/corretores`;
        } else if (perfil === "admins") {
            url = `http://localhost:8080/usuarios/admins`;
        }

        const response = await fetch(url);

        console.log("URL chamada:", url);
        console.log("Status da resposta:", response.status);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        let usuarios = await response.json();

        if (isCorretor) {
            usuarios = usuarios.filter(usuario =>
                String(usuario.tipo || '').toUpperCase() === 'CLIENTE'
            );
        }

        if (nome && nome.trim() !== "") {
            const termo = nome.trim().toLowerCase();
            usuarios = usuarios.filter(usuario =>
                String(usuario.nome || '').toLowerCase().includes(termo)
            );
        }

        return usuarios;

    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return [];
    }
}
function mostrarUsuarios(usuarios) {
    const tbody = document.getElementById('listaClientes');
    const textoPaginacao = document.getElementById('textoPaginacao');

    tbody.innerHTML = '';

    if (!usuarios || usuarios.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #888; padding: 20px;">
                    Nenhum usuário encontrado.
                </td>
            </tr>
        `;
        if (textoPaginacao) textoPaginacao.textContent = "Mostrando 0 de 0 usuários";
        return;
    }

    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');

        const tipoUsuario = usuario.tipo ? String(usuario.tipo) : 'CLIENTE';

        tr.innerHTML = `
            <td>${usuario.nome || 'N/A'}</td>
            <td>${usuario.cpf || 'N/A'}</td>
            <td>${usuario.email || 'N/A'}</td>
            <td>${usuario.telefone || 'N/A'}</td>
            <td>
                <span class="status-tag ${tipoUsuario.toLowerCase()}">
                    ${tipoUsuario}
                </span>
            </td>
            <td>
                ${obterAcoesUsuario(usuario)}
            </td>
        `;

        tbody.appendChild(tr);
    });

    if (textoPaginacao) {
        textoPaginacao.textContent = `Mostrando ${usuarios.length} de ${usuarios.length} usuários`;
    }
}

function editarUsuario(id) {
    window.location.href = `/formCliente.html?id=${id}`;
}

async function deletarUsuario(id) {
    const confirmar = confirm('Deseja realmente excluir este usuário?');
    if (!confirmar) return;

    try {
        const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir usuário: ${response.status}`);
        }

        alert('Usuário excluído com sucesso.');

        const termoBusca = document.getElementById('buscar')?.value || '';
        const perfilSelecionado = document.getElementById('filtro')?.value || '';
        const usuarios = await buscarUsuarios(termoBusca, perfilSelecionado);
        mostrarUsuarios(usuarios);
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Não foi possível excluir o usuário. Tente novamente.');
    }
}
