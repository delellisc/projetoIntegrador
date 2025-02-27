document.addEventListener("DOMContentLoaded", () => {
    async function fazerRequisicao(url, metodo = "GET", dados = null) {
        const config = {
            method: metodo,
            headers: { "Content-Type": "application/json" }
        };
        if (dados) config.body = JSON.stringify(dados);

        const resposta = await fetch(url, config);
        if (!resposta.ok) throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
        return resposta.json();
    }

    // Cadastrar profissional
    document.querySelector("form[action='http://localhost:3000/profissionais']").addEventListener("submit", async (event) => {
        event.preventDefault();
        const botao = event.target.querySelector("button[type='submit']");
        botao.disabled = true;

        const formData = new FormData(event.target);
        const dados = Object.fromEntries(formData.entries());

        try {
            await fazerRequisicao("http://localhost:3000/profissionais", "POST", dados);
            alert("Profissional cadastrado com sucesso!");
            event.target.reset();
        } catch (error) {
            alert("Erro ao cadastrar profissional: " + error.message);
        } finally {
            botao.disabled = false;
        }
    });

    // Listar todos os profissionais
    document.getElementById("listarTodos").addEventListener("click", async () => {
        try {
            const profissionais = await fazerRequisicao("http://localhost:3000/profissionais");
            let html = "<ul>";
            profissionais.forEach(prof => {
                html += `<li>${prof.matricula} - ${prof.nome} - ${prof.especialidade}</li>`;
            });
            html += "</ul>";
            document.getElementById("resultado-lista").innerHTML = html;
        } catch (error) {
            document.getElementById("resultado-lista").innerHTML = `<p>${error.message}</p>`;
        }
    });

    // Listar profissional por matrícula
    document.getElementById("formListarProfissional").addEventListener("submit", async (event) => {
        event.preventDefault();
        const matricula = document.getElementById("matriculaListar").value;

        try {
            const profissional = await fazerRequisicao(`http://localhost:3000/profissionais/${matricula}`);
            document.getElementById("resultado-profissional").innerHTML = `
                <p>Matrícula: ${profissional.matricula}</p>
                <p>Nome: ${profissional.nome}</p>
                <p>Especialidade: ${profissional.especialidade}</p>`;
        } catch (error) {
            document.getElementById("resultado-profissional").innerHTML = `<p>${error.message}</p>`;
        }
    });

    // Atualizar profissional
    document.getElementById("formAtualizarProfissional").addEventListener("submit", async (event) => {
        event.preventDefault();
        const botao = event.target.querySelector("button[type='submit']");
        botao.disabled = true;
        const matricula = document.getElementById("matriculaAtualizar").value;

        const formData = new FormData(event.target);
        const dados = Object.fromEntries(formData.entries());

        try {
            await fazerRequisicao(`http://localhost:3000/profissionais/${matricula}`, "PATCH", dados);
            alert("Profissional atualizado com sucesso!");
            event.target.reset();
        } catch (error) {
            alert("Erro ao atualizar profissional: " + error.message);
        } finally {
            botao.disabled = false;
        }
    });

    // Remover profissional
    document.getElementById("formRemoverProfissional").addEventListener("submit", async (event) => {
        event.preventDefault();
        const botao = event.target.querySelector("button[type='submit']");
        botao.disabled = true;
        const matricula = document.getElementById("matriculaRemover").value;

        try {
            await fazerRequisicao(`http://localhost:3000/profissionais/${matricula}`, "DELETE");
            alert("Profissional removido com sucesso!");
            event.target.reset();
        } catch (error) {
            alert("Erro ao remover profissional: " + error.message);
        } finally {
            botao.disabled = false;
        }
    });
});
