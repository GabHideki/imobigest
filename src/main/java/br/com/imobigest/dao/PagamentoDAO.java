/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.dao;

import br.com.imobigest.model.Pagamento;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ghide
 */
public class PagamentoDAO {
    private final List<Pagamento> pagamentos;
    
    public PagamentoDAO(){
        pagamentos = new ArrayList<>();
    }
    
    public void salvar(Pagamento pagamento){
        pagamentos.add(pagamento);
    }
    
    public List<Pagamento> listar(){
        return pagamentos;
    }
    
    public Pagamento buscarPorId(int id){
        for(Pagamento pagamento : pagamentos){
            if(id == pagamento.getId()){
                return pagamento;
            }
        }
        return null;
    }
    
    public void remover(int id){
        Pagamento pagamento = buscarPorId(id);
        if(pagamento != null){
            pagamentos.remove(pagamento);
        }
    }
}
