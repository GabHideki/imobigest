/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.dao;

import br.com.imobigest.model.Endereco;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ghide
 */
public class EnderecoDAO {
    private final List<Endereco> enderecos;
    
    public EnderecoDAO(){
        enderecos = new ArrayList<>();
    }
    
    public void salvar(Endereco endereco){
        enderecos.add(endereco);
    }
    
    public List<Endereco> listar(){
        return enderecos;
    }
    
    public Endereco buscarPorId(int id){
        for(Endereco endereco : enderecos){
            if(id == endereco.getId()){
                return endereco;
            }
        }
        return null;
    }
    
    public void remover(int id){
        Endereco endereco = buscarPorId(id);
        if(endereco != null){
            enderecos.remove(endereco);
        }
    }
}
