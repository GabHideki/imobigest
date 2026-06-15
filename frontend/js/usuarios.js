document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.getItem('usuarioLogado')) {
        window.location.href = '/login.html';
        return;
    }

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

        return await response.json();

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
                <button class="btn-acao editar" title="Editar Usuário" onclick="editarUsuario(${usuario.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn-acao deletar" title="Excluir Usuário" onclick="deletarUsuario(${usuario.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    if (textoPaginacao) {
        textoPaginacao.textContent = `Mostrando ${usuarios.length} de ${usuarios.length} usuários`;
    }
}