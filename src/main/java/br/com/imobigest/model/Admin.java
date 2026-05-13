/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.model;

/**
 *
 * @author ghide
 */
public class Admin extends Usuario{
    public Admin( 
        String usuario, 
        String senha, 
        String nome,
        String cpf, 
        String email, 
        String telefone, 
        Endereco endereco
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
    }
}
