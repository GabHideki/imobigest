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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author ghide
 */

@Entity
@Table(name = "contratos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Contrato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @Enumerated(EnumType.STRING)
    private StatusContrato status;
    
    private int prazoContrato;
    
    @Enumerated(EnumType.STRING)
    private TipoContrato tipo;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Usuario cliente;
    
    @ManyToOne
    @JoinColumn(name = "corretor_id")
    private Usuario corretor;
    
    @ManyToOne
    @JoinColumn(name = "imovel_id")
    private Imovel imovel;
    
    @OneToMany
    @JoinColumn(name = "contrato_id")
    private List<Pagamento> pagamentos;
}
