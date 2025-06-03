
//API GET
fetch('http://localhost:8080/api/aluno', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        addlinha(data);
    })
    .catch(error => {
        Swal.fire("Erro ao carregar dados", "Não foi possível carregar os dados da API.", "error");
    });


//Adicionar Linha na Tabela
function addlinha(dadosAPI) {
    const tabela = document.getElementById('tabelaCorpo');
    dadosAPI.forEach(element => {
        const linha = document.createElement('tr');
        //Adicionando HTML
        linha.innerHTML = `
          <tr>
            <td class="px-4 py-2 id-col">${element.id}</td>
            <td class="px-4 py-2">${element.name}</td>
            <td class="px-4 py-2">${element.email}</td>
            <td class="px-4 py-2"><button  class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this)">remover</button></td>
          </tr>
        `;

        tabela.appendChild(linha);
    });
}

//Cadastrar Novas pessoas do formulario
function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    if (nome && email) {
        //Adicionando Linha com nosso Cadastro
        // this.addlinha([{ "name": nome.trim(), "email": email.trim() }]);

        //Limpando os campos
        document.getElementById('nome').value = "";
        document.getElementById('email').value = "";

        //API POST  
        fetch('http://localhost:8080/api/aluno', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name": nome.trim(), "email": email.trim() })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Resposta da API:", data);
                this.addlinha([data]);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Cadastro feito com sucesso'
                });
            })
            .catch(error => {
                console.error("Erro ao enviar dados:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao cadastrar'
                });
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Falta dados para cadastar'
        });
    }
}

//Remover Alguma Linha da tabela
function remover(dadosbotao) {
    Swal.fire({
        icon: 'question',
        title: 'Você tem certeza?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.isConfirmed) {
            const linharemover = dadosbotao.closest('tr');
            const id = linharemover.querySelector('.id-col').textContent.trim();
            fetch(`http://localhost:8080/api/aluno/${id}`, {
                method: 'DELETE',
            }).then((res) => {
                if (res.ok) {
                    Swal.fire('Confirmado!', '', 'success');
                    linharemover.remove();
                    return;
                }

                throw new Error('Erro ao remover o item');
            }).catch((err) => {
                Swal.fire('Erro ao excluir!', '', 'error');
            });
        } else {
            Swal.fire('Cancelado', '', 'info');
        }
    });

}