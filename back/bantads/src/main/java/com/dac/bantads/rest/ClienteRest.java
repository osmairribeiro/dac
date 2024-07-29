package com.dac.bantads.rest;

import com.dac.bantads.dto.ClienteDTO;
import com.dac.bantads.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente")
public class ClienteRest {

    @Autowired
    private ClientService clientService;

    @PostMapping("/autocadastro")
    public ResponseEntity<String> autocadastro(@RequestBody ClienteDTO clienteDTO) {
        try {
            clientService.createCliente(clienteDTO);
            return ResponseEntity.ok("{\"message\":\"Cadastro efetuado com sucesso.\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\":\"Problema no envio dos dados, favor tentar novamente.\"}");
        }
    }
}
