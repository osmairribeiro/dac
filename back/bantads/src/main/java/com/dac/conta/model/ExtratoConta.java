package com.dac.conta.model;

import javax.xml.crypto.Data;

public class ExtratoConta {

	private int id;
	private int numeroConta;
	private int digitoConta;
	private String operacao;
	private double valor;
	private Data date;
	
	public ExtratoConta() {}

	public ExtratoConta(int id, int numeroConta, int digitoConta, String operacao, double valor, Data date) {
		super();
		this.id = id;
		this.numeroConta = numeroConta;
		this.digitoConta = digitoConta;
		this.operacao = operacao;
		this.valor = valor;
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getNumeroConta() {
		return numeroConta;
	}

	public void setNumeroConta(int numeroConta) {
		this.numeroConta = numeroConta;
	}

	public int getDigitoConta() {
		return digitoConta;
	}

	public void setDigitoConta(int digitoConta) {
		this.digitoConta = digitoConta;
	}

	public String getOperacao() {
		return operacao;
	}

	public void setOperacao(String operacao) {
		this.operacao = operacao;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

	public Data getDate() {
		return date;
	}

	public void setDate(Data date) {
		this.date = date;
	}	
}
