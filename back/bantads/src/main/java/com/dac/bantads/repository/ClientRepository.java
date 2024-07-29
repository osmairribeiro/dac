package com.dac.bantads.repository;

import com.dac.bantads.model.ClientModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
