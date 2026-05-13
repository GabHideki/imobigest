/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.model;

/**
 *
 * @author ghide
 */
public class Corretor extends Usuario{
    private final String creci;
    
    public Corretor( 
        String usuario, 
        String senha, 
        String nome,
        String cpf, 
        String email, 
        String telefone, 
        Endereco endereco,
        String creci
        ){ 
        super( 
            usuario, 
            senha, 
            nome, 
            cpf, 
            email, 
            telefone, 
            endereco 
        );
        this.creci = creci;
    }
    
    public String getCreci() {
        return creci;
    }
}
