package com.dac.conta.rest;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dac.conta.model.Conta;
import com.dac.conta.dto.ContaDTO;
import com.dac.conta.service.ContaService;

@CrossOrigin
@RestController
public class ContaREST {

	@Autowired
	private ContaService service;
	
	@GetMapping("/contas")
	public ResponseEntity<List<ContaDTO>> findAll() {
		List<Conta> list = service.findAll();
		List<ContaDTO> listDTO = list.stream().map(x -> new ContaDTO(x)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
	}
	
	@GetMapping("/contas/{id}")
	public ResponseEntity<ContaDTO> findById(@PathVariable int id) {
		Conta obj = service.findById(id);
		return ResponseEntity.ok().body(new ContaDTO(obj));
	}
	
	@PostMapping("/contas")
	public ResponseEntity<Void> insert(@RequestBody ContaDTO objDTO) {
		Conta obj = service.fromDTO(objDTO);
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getIdConta()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping("/contas/{id}")
	public ResponseEntity<Void> insert(@RequestBody ContaDTO objDTO, @PathVariable int id) {
		Conta obj = service.fromDTO(objDTO);
		obj.setIdConta(id);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/contas/{id}")
	public ResponseEntity<Void> insert(@PathVariable int id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
//	@RequestMapping(value="/{id}/posts", method=RequestMethod.GET)
//	public ResponseEntity<List<Post>> findPosts(@PathVariable String id) {
//		Usuario obj = service.findById(id);
//		return ResponseEntity.ok().body(obj.getPosts());
//	}
}
