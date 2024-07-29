package com.dac.bantads.model;

import jakarta.persistence.*;

@Entity
public class ClientModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String cpf;
    private String email;
    private String cellphone;
    private double salary;
    private String password;

    @Embedded
    private ClientModel address;


}

@Embeddable
public class ClientModel {
    private String cep;
    private String logradouro;
    private String bairro;
    private String localidade;
    private String uf;


}
