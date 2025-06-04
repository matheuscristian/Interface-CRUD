//API GET
fetch("http://localhost:8080/api/aluno", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
        addlinha(data);
    })
    .catch((error) => {
        Swal.fire(
            "Erro ao carregar dados",
            "Não foi possível carregar os dados da API.",
            "error"
        );
    });

//Adicionar Linha na Tabela
function addlinha(dadosAPI) {
    const tabela = document.getElementById("tabelaCorpo");
    dadosAPI.forEach((element) => {
        const linha = document.createElement("tr");
        //Adicionando HTML
        linha.innerHTML = /*html*/ `
          <tr>
            <td class="px-4 py-2 id-col w-full border-r">${element.id}</td>
            <td class="px-4 py-2 name-col">${element.name}</td>
            <td class="px-4 py-2 email-col">${element.email}</td>
            <td class="px-4 py-2 flex justify-center gap-3">
                <button title="Editar" class="bg-yellow-500 text-white px-2 py-1 rounded size-[30px]" onclick="editar(this)"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M12 20H21M3.00003 20H4.67457C5.16376 20 5.40835 20 5.63852 19.9447C5.84259 19.8957 6.03768 19.8149 6.21663 19.7053C6.41846 19.5816 6.59141 19.4086 6.93732 19.0627L19.5001 6.49998C20.3285 5.67156 20.3285 4.32841 19.5001 3.49998C18.6716 2.67156 17.3285 2.67156 16.5001 3.49998L3.93729 16.0627C3.59139 16.4086 3.41843 16.5816 3.29475 16.7834C3.18509 16.9624 3.10428 17.1574 3.05529 17.3615C3.00003 17.5917 3.00003 17.8363 3.00003 18.3255V20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg></button>
                <button title="Remover" class="bg-red-500 text-white px-2 py-1 rounded size-[30px]" onclick="remover(this)"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg></button>
            </td>
          </tr>
        `;

        linha.className =
            "grid grid-cols-[0.3fr,1fr,1fr,1fr] text-center w-full text-center";

        tabela.appendChild(linha);
    });
}

//Cadastrar Novas pessoas do formulario
function cadastrar(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    if (nome && email) {
        //Adicionando Linha com nosso Cadastro
        // this.addlinha([{ "name": nome.trim(), "email": email.trim() }]);

        //Limpando os campos
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";

        //API POST
        fetch("http://localhost:8080/api/aluno", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: nome.trim(), email: email.trim() }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Resposta da API:", data);
                addlinha([data]);
                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: "Cadastro feito com sucesso",
                });
            })
            .catch((error) => {
                console.error("Erro ao enviar dados:", error);
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Ocorreu um erro ao cadastrar",
                });
            });
    } else {
        Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Falta dados para cadastar",
        });
    }
}

const form = document.getElementById("formCadastro");
form.addEventListener("submit", cadastrar);

//Remover Alguma Linha da tabela
function remover(dadosbotao) {
    Swal.fire({
        icon: "question",
        title: "Você tem certeza?",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
    }).then((result) => {
        if (result.isConfirmed) {
            const linharemover = dadosbotao.closest("tr");
            const id = linharemover.querySelector(".id-col").textContent.trim();
            fetch(`http://localhost:8080/api/aluno/${id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        Swal.fire("Confirmado!", "", "success");
                        linharemover.remove();
                        return;
                    }

                    throw new Error("Erro ao remover o item");
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire("Erro ao excluir!", "", "error");
                });
        } else {
            Swal.fire("Cancelado", "", "info");
        }
    });
}

async function editar(dadosbotao) {
    const linhaEditar = dadosbotao.closest("tr");
    const id = linhaEditar.querySelector(".id-col").textContent.trim();
    const nome = linhaEditar.querySelector(".name-col").textContent.trim();
    const email = linhaEditar.querySelector(".email-col").textContent.trim();

    const { value, isConfirmed } = await Swal.fire({
        title: "Editar",
        html: /*html*/`
            <div class="space-y-5 flex flex-col items-center">
                <div class="flex flex-col justify-center text-left gap-3 w-[80%]">
                    <label>Nome</label>
                    <input value=${nome} id="swal-input1" class="swal2-input m-0">
                </div>
                <div class="flex flex-col justify-center text-left gap-3 w-[80%]">
                    <label>Email</label>
                    <input value=${email} id="swal-input2" class="swal2-input m-0">
                </div>
            </div>
        `,
        focusConfirm: false,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        preConfirm: () => {
            return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value,
            ];
        },
    });

    //name = value[0]; email = value[1];

    if (!isConfirmed) return;

    fetch(`http://localhost:8080/api/aluno/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name: value[0], email: value[1] }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.ok) {
                Swal.fire("Confirmado!", "", "success");
                linhaEditar.querySelector(".name-col").textContent = value[0];
                linhaEditar.querySelector(".email-col").textContent = value[1];
                return;
            }

            throw new Error("Erro ao editar o item");
        })
        .catch((err) => {
            Swal.fire("Erro ao editar!", "", "error");
        });
}
