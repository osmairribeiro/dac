package com.dac.bantads.service;

import com.dac.bantads.dto.ClientDto;
import com.dac.bantads.model.ClientModel;
import com.dac.bantads.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    private ClientRepository clientRepository;

    public void createCliente(ClientDto clienteDTO) {
        Client client = new Client();
        client.setName(clienteDTO.getName());
        client.setCpf(clienteDTO.getCpf());
        client.setEmail(clienteDTO.getEmail());
        client.setCellphone(clienteDTO.getCellphone());
        client.setSalary(clienteDTO.getSalary());
        client.setPassword(clienteDTO.getPassword());
        client.setAddress(clienteDTO.getAddress());
        clientRepository.save(cliente);
    }
}
