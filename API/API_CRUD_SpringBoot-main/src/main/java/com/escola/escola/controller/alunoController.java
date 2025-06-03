package com.escola.escola.controller;

// Importações necessárias
import java.util.List; // Para lidar com listas de objetos

import org.springframework.beans.factory.annotation.Autowired; // Injeção de dependência
import org.springframework.http.ResponseEntity; // Representa respostas HTTP
import org.springframework.web.bind.annotation.DeleteMapping; // Mapeia requisições DELETE
import org.springframework.web.bind.annotation.GetMapping; // Mapeia requisições GET
import org.springframework.web.bind.annotation.PathVariable; // Captura parâmetros da URL
import org.springframework.web.bind.annotation.PostMapping; // Mapeia requisições POST
import org.springframework.web.bind.annotation.PutMapping; // Mapeia requisições PUT
import org.springframework.web.bind.annotation.RequestBody; // Indica que o corpo da requisição é o objeto
import org.springframework.web.bind.annotation.RequestMapping; // Mapeia o caminho base da API
import org.springframework.web.bind.annotation.RestController; // Indica que esta classe é um Controller REST
import org.springframework.web.bind.annotation.CrossOrigin;

import com.escola.escola.model.alunoModel;
import com.escola.escola.service.alunoService;

@CrossOrigin(origins = "*")


// Anotação que define esta classe como um Controller REST
@RestController

// Caminho base para todas as requisições deste controller
@RequestMapping("/api/aluno")
public class alunoController {

    // Injeção de dependência do serviço que vai realizar a lógica de negócio
    @Autowired
    private alunoService service;

    @GetMapping
    public List<alunoModel> listarTodos() {
        // Chama o método do service que retorna a lista de todas os alunos
        return service.listarTodos();
    }

    /**
     * Método GET para buscar uma pessoa específica pelo ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<alunoModel> buscarPorId(@PathVariable Long id) {
        // Busca a pessoa pelo ID, se encontrar, retorna 200 (OK), se não, retorna 404 (Not Found)
        return service.buscarPorId(id)
                     .map(ResponseEntity::ok) // Converte o resultado em ResponseEntity com status 200
                     .orElse(ResponseEntity.notFound().build()); // Retorna 404 se não encontrar
    }

    /**
     * Método POST para salvar uma nova pessoa.
     */
    @PostMapping
    public alunoModel salvar(@RequestBody alunoModel alunomodel) {
        // Chama o método de salvar do service e retorna o objeto persistido
        return service.salvar(alunomodel);
    }

    /**
     * Método PUT para atualizar os dados de uma pessoa existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<alunoModel> atualizar(@PathVariable Long id, @RequestBody alunoModel alunomodel) {
        // Verifica se o ID existe no banco de dados
        if (!service.buscarPorId(id).isPresent()) {
            // Se não encontrar, retorna 404 (Not Found)
            return ResponseEntity.notFound().build();
        }
        // Define o ID no objeto (caso não tenha sido passado no corpo)
        alunomodel.setId(id);
        // Salva o objeto atualizado e retorna 200 (OK)
        return ResponseEntity.ok(service.salvar(alunomodel));
    }

    /**
     * Método DELETE para excluir uma pessoa do banco de dados.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        // Verifica se o ID existe no banco de dados
        if (!service.buscarPorId(id).isPresent()) {
            // Se não encontrar, retorna 404 (Not Found)
            return ResponseEntity.notFound().build();
        }
        // Se encontrar, chama o método para deletar
        service.deletar(id);
        // Retorna 204 (No Content), que significa que foi deletado com sucesso, mas sem conteúdo
        return ResponseEntity.noContent().build();
    }
}