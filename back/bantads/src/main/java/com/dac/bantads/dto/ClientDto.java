package com.dac.bantads.dto;

import com.dac.bantads.model.ClientModel;

public class ClientDto {
    private String name;
    private String cpf;
    private String email;
    private String cellphone;
    private double salary;
    private String password;
    private ClientModel address;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCpf() {
        return cpf;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getCellphone() {
        return cellphone;
    }
    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }
    public double getSalary() {
        return salary;
    }
    public void setSalary(double salary) {
        this.salary = salary;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public ClientModel getAddress() {
        return address;
    }
    public void setAddress(ClientModel address) {
        this.address = address;
    }

    
}
