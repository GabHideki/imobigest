/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.dao;

import br.com.imobigest.model.Imovel;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ghide
 */
public class ImovelDAO {
    private final List<Imovel> imoveis;
    
    public ImovelDAO(){
        imoveis = new ArrayList<>();
    }
    
    public void salvar(Imovel imovel){
        imoveis.add(imovel);
    }
    
    public List<Imovel> listar(){
        return imoveis;
    }
    
    public Imovel buscarPorId(int id){
        for(Imovel imovel : imoveis){
            if(id == imovel.getId()){
                return imovel;
            }
        }
        return null;
    }
    
    public void remover(int id){
        Imovel imovel = buscarPorId(id);
        
        if(imovel != null){
            imoveis.remove(imovel);
        }
    }
}
