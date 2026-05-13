/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.service;

import br.com.imobigest.dao.PagamentoDAO;
import br.com.imobigest.model.Pagamento;
import br.com.imobigest.model.StatusPagamento;
import br.com.imobigest.model.TipoPagamento;
import br.com.imobigest.util.Validador;
import java.time.LocalDate;
import java.util.List;

/**
 *
 * @author ghide
 */
public class PagamentoService {
    private final PagamentoDAO pagamentoDAO;
    
    public PagamentoService(PagamentoDAO pagamentoDAO){
        this.pagamentoDAO = pagamentoDAO;
    }
    
    public void cadastrarPagamento(
        double valor, 
        LocalDate data, 
        TipoPagamento tipo, 
        StatusPagamento status
        ) {
        validarDadosPagamento(
            valor, 
            data, 
            tipo, 
            status
        );
        
        Pagamento pagamento = new Pagamento(
            valor, 
            data, 
            tipo, 
            status
        );
        pagamentoDAO.salvar(pagamento);
    }
    
    private void validarDadosPagamento(
        double valor, 
        LocalDate data, 
        TipoPagamento tipo, 
        StatusPagamento status
        ) {
        Validador.validarNumeroPositivo(valor, "Valor");
        if(data == null){
            throw new IllegalArgumentException("Data invalida");
        }
        if(tipo == null){
            throw new IllegalArgumentException("Tipo invalido");
        }
        if(status == null){
            throw new IllegalArgumentException("Status invalido");
        }
    }
    
    public List<Pagamento> listarPagamentos(){
        return pagamentoDAO.listar();
    }
    
    public Pagamento buscarPagamentoPorId(int id){
        Pagamento pagamento = pagamentoDAO.buscarPorId(id);
        if(pagamento == null){
            throw new IllegalArgumentException("Pagamento nao encontrado");
        }
        return pagamento;
    }
    
    public void removerPagamento(int id){
        buscarPagamentoPorId(id);
        pagamentoDAO.remover(id);
    }
}