/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.model;

/**
 *
 * @author ghide
 */
public class Imovel {
    private final int id;
    private static int contador = 1;
    private String descricao;
    private double valorCompra;
    private double valorAluguel;
    private StatusImovel status;
    private TipoImovel tipo;
    private Endereco endereco;

    public Imovel(
        String descricao, 
        double valorCompra, 
        double valorAluguel, 
        StatusImovel status, 
        TipoImovel tipo,
        Endereco endereco
        ) {
        this.id = contador++;
        this.descricao = descricao;
        this.valorCompra = valorCompra;
        this.valorAluguel = valorAluguel;
        this.status = status;
        this.tipo = tipo;
        this.endereco = endereco;
    }

    public Endereco getEndereco() {
        return endereco;
    }
    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
    public int getId(){
        return id;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public double getValorCompra() {
        return valorCompra;
    }
    public void setValorCompra(float valorCompra) {
        this.valorCompra = valorCompra;
    }
    public double getValorAluguel() {
        return valorAluguel;
    }
    public void setValorAluguel(float valorAluguel) {
        this.valorAluguel = valorAluguel;
    }
    public StatusImovel getStatus() {
        return status;
    }
    public void setStatus(StatusImovel status) {
        this.status = status;
    }
    public TipoImovel getTipo() {
        return tipo;
    }
    public void setTipo(TipoImovel tipo) {
        this.tipo = tipo;
    }
}
