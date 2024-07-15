package com.dac.conta.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dac.conta.model.Conta;

@Repository
public interface ContaRepository extends JpaRepository<Conta, Long> {

	List<Conta> findAll();

	Optional<Conta> findById(int id);

	Conta insert(Conta obj);

	Conta save(Conta newObj);

	void deleteById(int id);

}
