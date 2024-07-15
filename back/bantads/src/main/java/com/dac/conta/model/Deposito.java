package com.dac.conta.model;

public class Deposito {

	private int id;
	private int numeroConta;
	private int digitoConta;
	private double valor;
	
	public Deposito() {}

	public Deposito(int id, int numeroConta, int digitoConta, double valor) {
		super();
		this.id = id;
		this.numeroConta = numeroConta;
		this.digitoConta = digitoConta;
		this.valor = valor;
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

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}
}
