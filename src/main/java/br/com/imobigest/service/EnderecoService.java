// EnderecoService.java

package br.com.imobigest.service;

import br.com.imobigest.dao.EnderecoDAO;
import br.com.imobigest.model.Endereco;
import br.com.imobigest.util.Validador;

import java.util.List;

public class EnderecoService {

    private final EnderecoDAO enderecoDAO;

    public EnderecoService(EnderecoDAO enderecoDAO) {
        this.enderecoDAO = enderecoDAO;
    }

    public Endereco cadastrarEndereco(
        String rua, 
        int numero, 
        String complemento, 
        String bairro, 
        String cidade, 
        String estado, 
        String cep
        ) {
        Validador.validarString(rua, "Rua");
        Validador.validarInteiroPositivo(numero, "Numero");
        Validador.validarString(bairro, "Bairro");
        Validador.validarString(cidade, "Cidade");
        Validador.validarString(estado, "Estado");
        Validador.validarString(cep, "CEP");
        
        Endereco endereco = new Endereco(
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep
        );
        enderecoDAO.salvar(endereco);
        return endereco;
    }

    public List<Endereco> listarEnderecos() {
        return enderecoDAO.listar();
    }

    public Endereco buscarEnderecoPorId(int id) {
        Endereco endereco = enderecoDAO.buscarPorId(id);
        if(endereco == null) {
            throw new IllegalArgumentException(
                "Endereço não encontrado"
            );
        }
        return endereco;
    }

    public void removerEndereco(int id) {
        buscarEnderecoPorId(id);
        enderecoDAO.remover(id);
    }
}