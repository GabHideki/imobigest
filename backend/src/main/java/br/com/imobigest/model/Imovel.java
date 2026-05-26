/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author ghide
 */
@Entity
@Table(name = "imoveis")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Imovel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private double valorCompra;
    private double valorAluguel;
    
    @Enumerated(EnumType.STRING)
    private StatusImovel status;
    
    @Enumerated(EnumType.STRING)
    private TipoImovel tipo;
    
    @OneToOne
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;
}
