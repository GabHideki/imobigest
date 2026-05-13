/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.model;

import java.time.LocalDate;

/**
 *
 * @author ghide
 */
public class Pagamento {
    private final int id;
    private static int contador = 1;
    private double valor;
    private LocalDate data;
    private TipoPagamento tipo;
    private StatusPagamento status;
    
    public Pagamento(
        double valor, 
        LocalDate data, 
        TipoPagamento tipo, 
        StatusPagamento status
        ){
        this.id = contador++;
        this.valor = valor;
        this.data = data;
        this.tipo = tipo;
        this.status = status;
    }
    
    public int getId(){
        return id;
    }
    public double getValor() {
        return valor;
    }
    public void setValor(double valor) {
        this.valor = valor;
    }
    public LocalDate getData() {
        return data;
    }
    public void setData(LocalDate data) {
        this.data = data;
    }
    public TipoPagamento getTipo() {
        return tipo;
    }
    public void setTipo(TipoPagamento tipo) {
        this.tipo = tipo;
    }
    public StatusPagamento getStatus() {
        return status;
    }
    public void setStatus(StatusPagamento status) {
        this.status = status;
    }
}