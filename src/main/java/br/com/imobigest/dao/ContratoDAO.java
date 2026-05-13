/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.dao;

import br.com.imobigest.model.Contrato;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ghide
 */
public class ContratoDAO {
    private final List<Contrato> contratos;
    
    public ContratoDAO(){
        contratos = new ArrayList<>();
    }
    
    public void salvar(Contrato contrato){
        contratos.add(contrato);
    }
    
    public List<Contrato> listar(){
        return contratos;
    }
    
    public Contrato buscarPorId(int id){
        for(Contrato contrato : contratos){
            if(id == contrato.getId()){
                return contrato;
            }
        }
        return null;
    }
    
    public void remover(int id){
        Contrato contrato = buscarPorId(id);
        
        if(contrato != null){
            contratos.remove(contrato);
        }
    }
}
