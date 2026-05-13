/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.dao;

import br.com.imobigest.model.Usuario;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ghide
 */
public class UsuarioDAO {
    private final List<Usuario> usuarios;
    
    public UsuarioDAO(){
        usuarios = new ArrayList<>();
    }
    
    public void salvar(Usuario usuario){
        usuarios.add(usuario);
    }
    
    public List<Usuario> listar(){
        return usuarios;
    }
    
    public Usuario buscarPorId(int id){
        for(Usuario usuario : usuarios){
            if(id == usuario.getId()){
                return usuario;
            }
        }
        return null;
    }
    
    public void remover(int id){
        Usuario usuario = buscarPorId(id);
        if(usuario != null){
            usuarios.remove(usuario);
        }
    }
}
