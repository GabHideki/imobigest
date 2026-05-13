/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.service;

import br.com.imobigest.dao.UsuarioDAO;
import br.com.imobigest.model.Admin;
import br.com.imobigest.model.Cliente;
import br.com.imobigest.model.Corretor;
import br.com.imobigest.model.Endereco;
import br.com.imobigest.model.Usuario;
import br.com.imobigest.util.Validador;
import java.util.List;

/**
 *
 * @author ghide
 */
public class UsuarioService {
    
    private final UsuarioDAO usuarioDAO;
    private final EnderecoService enderecoService;
    
    public UsuarioService(UsuarioDAO usuarioDAO, EnderecoService enderecoService){
        this.usuarioDAO = usuarioDAO;
        this.enderecoService = enderecoService;
    }
    
    public void cadastrarCliente(
        String usuario,
        String senha,
        String nome,
        String cpf,
        String email,
        String telefone,
        String rua,
        int numero,
        String complemento,
        String bairro,
        String cidade,
        String estado,
        String cep
        ) {
        validarDadosUsuario(
            usuario,
            senha,
            nome,
            cpf,
            email,
            telefone
        );
        Endereco endereco = enderecoService.cadastrarEndereco(
            rua, 
            numero, 
            complemento, 
            bairro, 
            cidade, 
            estado, 
            cep
        );
        
        Cliente cliente = new Cliente(
            usuario, 
            senha, 
            nome, 
            cpf, 
            email, 
            telefone, 
            endereco
        );
        
        usuarioDAO.salvar(cliente);
    }
    
    public void cadastrarAdmin(
        String usuario,
        String senha,
        String nome,
        String cpf,
        String email,
        String telefone,
        String rua,
        int numero,
        String complemento,
        String bairro,
        String cidade,
        String estado,
        String cep
        ) {
        validarDadosUsuario(
            usuario,
            senha,
            nome,
            cpf,
            email,
            telefone
        );
        Endereco endereco = enderecoService.cadastrarEndereco(
            rua, 
            numero, 
            complemento, 
            bairro, 
            cidade, 
            estado, 
            cep
        );
        
        Admin admin = new Admin(
            usuario, 
            senha, 
            nome, 
            cpf, 
            email, 
            telefone, 
            endereco
        );
        
        usuarioDAO.salvar(admin);
    }
    
    public void cadastrarCorretor(
        String usuario,
        String senha,
        String nome,
        String cpf,
        String email,
        String telefone,
        String rua,
        int numero,
        String complemento,
        String bairro,
        String cidade,
        String estado,
        String cep,
        String creci
        ) {
        
        validarDadosUsuario(
            usuario,
            senha,
            nome,
            cpf,
            email,
            telefone
        );
        
        Validador.validarString(creci, "CRECI");
        
        Endereco endereco = enderecoService.cadastrarEndereco(
            rua, 
            numero, 
            complemento, 
            bairro, 
            cidade, 
            estado, 
            cep
        );
        
        Corretor corretor = new Corretor(
            usuario, 
            senha, 
            nome, 
            cpf, 
            email, 
            telefone, 
            endereco,
            creci
        );
        
        usuarioDAO.salvar(corretor);
    }
    
    public List<Usuario> listarUsuarios(){
        return usuarioDAO.listar();
    }
    
    public Usuario buscarUsuarioPorId(int id){
        Usuario usuario = usuarioDAO.buscarPorId(id);
        
        if(usuario == null){
            throw new IllegalArgumentException("Usuario nao Encontrado!");
        }
        
        return usuario;
    }
    
    public void removerUsuario(int id){
        buscarUsuarioPorId(id);
        usuarioDAO.remover(id);
    }
    
    private void validarDadosUsuario(
        String usuario,
        String senha,
        String nome,
        String cpf,
        String email,
        String telefone
        ) {
        Validador.validarString(usuario, "Usuario");
        Validador.validarString(senha, "Senha");
        Validador.validarString(nome, "Nome");
        Validador.validarString(cpf, "CPF");
        Validador.validarString(email, "E-mail");
        Validador.validarString(telefone, "Telefone");
    }
}
