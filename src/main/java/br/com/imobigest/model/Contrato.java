/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.model;

import java.util.List;

/**
 *
 * @author ghide
 */
public class Contrato {
    private final int id;
    private static int contador = 1;
    private StatusContrato status;
    private int prazoContrato;
    private TipoContrato tipo;
    
    private Cliente cliente;
    private Corretor corretor;
    private Imovel imovel;
    private List<Pagamento> pagamentos;
    
    public Contrato(
        StatusContrato status, 
        int prazoContrato,
        TipoContrato tipo,
        Cliente cliente, 
        Corretor corretor, 
        Imovel imovel, 
        List<Pagamento> pagamentos
        ){
        this.id = contador++;
        this.status = status;
        this.prazoContrato = prazoContrato;
        this.cliente = cliente;
        this.corretor = corretor;
        this.imovel = imovel;
        this.pagamentos = pagamentos;
    }
    
    public int getId(){
        return id;
    }
    public StatusContrato getStatus() {
        return status;
    }
    public void setStatus(StatusContrato status) {
        this.status = status;
    }
    public int getPrazoContrato() {
        return prazoContrato;
    }
    public void setPrazoContrato(int prazoContrato) {
        this.prazoContrato = prazoContrato;
    }
    public Cliente getCliente() {
        return cliente;
    }
    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    public Corretor getCorretor() {
        return corretor;
    }
    public void setCorretor(Corretor corretor) {
        this.corretor = corretor;
    }
    public Imovel getImovel() {
        return imovel;
    }
    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }
    public List<Pagamento> getPagamentos() {
        return pagamentos;
    }
    public void setPagamentos(List<Pagamento> pagamentos) {
        this.pagamentos = pagamentos;
    }
    public void adicionarPagamento(Pagamento pagamento) {
        pagamentos.add(pagamento);
    }
    public void removerPagamento(Pagamento pagamento){
        pagamentos.remove(pagamento);
    }
}