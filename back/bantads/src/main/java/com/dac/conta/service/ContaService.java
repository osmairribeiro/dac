package com.dac.conta.service;

import java.util.List;
import java.util.Optional;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dac.conta.dto.ContaDTO;
import com.dac.conta.model.Conta;
import com.dac.conta.repository.ContaRepository;

@Service
public class ContaService {

	@Autowired
	private ContaRepository repo;
	
	public List<Conta> findAll() {
		return repo.findAll();
	}
	
	public Conta findById(int id) {
		Optional<Conta> obj = repo.findById(id);		
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado", obj));
	}
	
	public Conta insert(Conta obj) {
		return repo.insert(obj);
	}

	public void delete(int id) {
		findById(id);
		repo.deleteById(id);
	}

	public Conta update(Conta obj) {
		Conta newObj = findById(obj.getNumeroConta());
		updateData(newObj, obj);
		return repo.save(newObj);
	}

	private void updateData(Conta newObj, Conta obj) {
		newObj.setValorLimite(obj.getValorLimite());
		newObj.setSaldoConta(obj.getSaldoConta());
		newObj.setGerente(obj.getGerente());
	}

	public Conta fromDTO(ContaDTO objDto) {
		return new Conta(objDto.getIdConta(), 
						 objDto.getNumeroConta(), 
						 objDto.getValorLimite(), 
						 objDto.getSaldoConta(), 
						 objDto.getDataAbertura(), 
						 objDto.getCliente(), 
						 objDto.getGerente());
	}
}
