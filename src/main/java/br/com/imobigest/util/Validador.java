/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.util;

/**
 *
 * @author ghide
 */
public class Validador {
    public static void validarString(String valor, String campo){
        if(valor == null || valor.isBlank()){
            throw new IllegalArgumentException(campo + " invalido");
        }
    }
    
    public static void validarNumeroPositivo(double valor, String campo){
        if(valor <= 0){
            throw new IllegalArgumentException(campo + " invalido");
        }
    }
    
    public static void validarInteiroPositivo(int valor, String campo){
        if(valor <= 0){
            throw new IllegalArgumentException(campo + " invalido");
        }
    }
}
