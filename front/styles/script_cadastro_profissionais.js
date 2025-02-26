document.addEventListener("DOMContentLoaded", () => {
    // Listar todos os profissionais
    document.getElementById("listarTodos").addEventListener("click", async () => {
        const resposta = await fetch("http://localhost:3000/profissionais");
        const profissionais = await resposta.json();
        
        let html = "<ul>";
        profissionais.forEach(prof => {
            html += `<li>${prof.matricula} - ${prof.nome} - ${prof.especialidade}</li>`;
        });
        html += "</ul>";
        
        document.getElementById("resultado-lista").innerHTML = html;
    });

    // Listar profissional pela matricula
    document.getElementById("formListarProfissional").addEventListener("submit", async (event) => {
        event.preventDefault();
        const matricula = document.getElementById("matriculaListar").value;
        
        const resposta = await fetch(`http://localhost:3000/profissionais/${matricula}`);
        const profissional = await resposta.json();
        
        if (resposta.ok) {
            document.getElementById("resultado-profissional").innerHTML = 
                `<p>Matrícula: ${profissional.matricula}</p>
                 <p>Nome: ${profissional.nome}</p>
                 <p>Especialidade: ${profissional.especialidade}</p>`;
        } else {
            document.getElementById("resultado-profissional").innerHTML = "<p>Profissional não encontrado.</p>";
        }
    });

    // Atualizar profissional
    document.getElementById("formAtualizarProfissional").addEventListener("submit", async (event) => {
        event.preventDefault();
        const matricula = document.getElementById("matriculaAtualizar").value;
        const dados = {
            nome: document.getElementById("nomeAtualizar").value,
            registro: document.getElementById("registroAtualizar").value,
            especialidade: document.getElementById("especialidadeAtualizar").value,
            senha: document.getElementById("senhaAtualizar").value
        };
        
        const resposta = await fetch(`http://localhost:3000/profissionais/${matricula}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });
        
        if (resposta.ok) {
            alert("Profissional atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar profissional.");
        }
    });

    // Remover profissional
    document.getElementById("formRemoverProfissional").addEventListener("submit", async (event) => {
        event.preventDefault();
        const matricula = document.getElementById("matriculaRemover").value;
        
        const resposta = await fetch(`http://localhost:3000/profissionais/${matricula}`, {
            method: "DELETE"
        });
        
        if (resposta.ok) {
            alert("Profissional removido com sucesso!");
        } else {
            alert("Erro ao remover profissional.");
        }
    });
});

