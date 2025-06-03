package com.escola.escola.service;


// Importações necessárias para manipulação de listas e objetos opcionais
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;  // Injeção de dependência
import org.springframework.stereotype.Service;               // Define a classe como um Service do Spring

import com.escola.escola.model.alunoModel;
import com.escola.escola.repository.alunoRepository;

/**
 * Anotação @Service indica que esta classe é um componente do Spring,
 * responsável por conter a lógica de negócio da aplicação.
 */
@Service
public class alunoService {

    @Autowired
    private alunoRepository repository;

    public List<alunoModel> listarTodos() {
        // Chama o método findAll() do repository para buscar todos os alunos
        return repository.findAll();
    }

    public Optional<alunoModel> buscarPorId(Long id) {
        // Chama o método findById() do repository para buscar a pessoa pelo ID
        return repository.findById(id);
    }

    public alunoModel salvar(alunoModel alunomodal) {
        // Chama o método save() do repository para salvar os dados no banco
        return repository.save(alunomodal);
    }

    public void deletar(Long id) {
        // Chama o método deleteById() do repository para remover o registro
        repository.deleteById(id);
    }
}