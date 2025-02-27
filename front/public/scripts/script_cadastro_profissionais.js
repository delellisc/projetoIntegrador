async function fazerRequisicao(url = "http://localhost:3000/profissionais", metodo = "GET", dados = null) {
    const config = {
        method: metodo,
        headers: { "Content-Type": "application/json" }
    };
    if (dados) config.body = JSON.stringify(dados);

    const resposta = await fetch(url, config);

    if (!resposta.ok) {
        const mensagemErro = await resposta.text();
        throw new Error(`Erro ${resposta.status}: ${mensagemErro}`);
    }

    if (resposta.status === 204) {
        return null;
    }

    return resposta.json();
}

// Função do formulário para JSON
function obterDadosFormulario(form) {
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    // Converter números e booleanos
    for (const chave in dados) {
        if (!isNaN(dados[chave])) {
            dados[chave] = Number(dados[chave]);
        } else if (dados[chave].toLowerCase() === "true" || dados[chave].toLowerCase() === "false") {
            dados[chave] = dados[chave].toLowerCase() === "true";
        }
    }

    return dados;
}

// Cadastrar profissional
document.querySelector("form[action='http://localhost:3000/profissionais']").addEventListener("submit", async (event) => {
    event.preventDefault();
    const botao = event.target.querySelector("button[type='submit']");
    botao.disabled = true;
    botao.textContent = "Enviando...";

    const dados = obterDadosFormulario(event.target);
    dados.status = 'ativo';
    console.log(dados)

    try {
        await fazerRequisicao("http://localhost:3000/profissionais", "POST", dados);
        alert("Profissional cadastrado com sucesso!");
        event.target.reset();
    } catch (error) {
        alert("Erro ao cadastrar profissional: " + error.message);
    } finally {
        botao.disabled = false;
        botao.textContent = "Cadastrar";
    }
});

// Listar todos os profissionais
document.getElementById("listarTodos").addEventListener("click", async () => {
    try {
        const profissionais = await fazerRequisicao("http://localhost:3000/profissionais");
        let html = "<ul>";
        profissionais.forEach(prof => {
            html += `<li>${prof.id} - ${prof.nome} - ${prof.registro_profissional}</li>`;
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
        if (!profissional) {
            throw new Error("Profissional não encontrado.");
        }
        document.getElementById("resultado-profissional").innerHTML = `
                <p>Matrícula: ${profissional.id}</p>
                <p>Nome: ${profissional.nome}</p>
                <p>Registro Profissional: ${profissional.registro_profissional}</p>`;
    } catch (error) {
        document.getElementById("resultado-profissional").innerHTML = `<p>${error.message}</p>`;
    }
});

// Atualizar profissional
document.getElementById("formAtualizarProfissional").addEventListener("submit", async (event) => {
    event.preventDefault();
    const botao = event.target.querySelector("button[type='submit']");
    botao.disabled = true;
    botao.textContent = "Atualizando...";
    const matricula = document.getElementById("matriculaAtualizar").value;

    const dados = obterDadosFormulario(event.target);

    try {
        await fazerRequisicao(`http://localhost:3000/profissionais/${matricula}`, "PATCH", dados);
        alert("Profissional atualizado com sucesso!");
        event.target.reset();
    } catch (error) {
        alert("Erro ao atualizar profissional: " + error.message);
    } finally {
        botao.disabled = false;
        botao.textContent = "Atualizar";
    }
});

// Remover profissional
document.getElementById("formRemoverProfissional").addEventListener("submit", async (event) => {
    event.preventDefault();
    const botao = event.target.querySelector("button[type='submit']");
    botao.disabled = true;
    botao.textContent = "Removendo...";
    const matricula = document.getElementById("matriculaRemover").value;

    try {
        await fazerRequisicao(`http://localhost:3000/profissionais/${matricula}`, "DELETE");
        alert("Profissional removido com sucesso!");
        event.target.reset();
    } catch (error) {
        alert("Erro ao remover profissional: " + error.message);
    } finally {
        botao.disabled = false;
        botao.textContent = "Remover";
    }
});


async function obterEspecialidades() {
    resposta = await fetch('http://localhost:3000/especializacoes');

    if (!resposta.ok) {
        const mensagemErro = await resposta.text();
        throw new Error(`Erro ${resposta.status}: ${mensagemErro}`);
    }

    if (resposta.status === 204) {
        return null;
    }

    var res = await resposta.json();
    /* console.log(res); */

    return res;
}

async function preencherEspecialidades() {
    const especialidades = await obterEspecialidades();
    document.querySelectorAll("select[name='especializacao']").forEach(select => {
        select.innerHTML = "";
         especialidades.forEach(especialidade => {
            console.log(especialidade);
            const option = document.createElement("option");
            option.value = especialidade.id;
            option.textContent = especialidade.nome;
            select.appendChild(option);
        });
    });
}

document.addEventListener("DOMContentLoaded", preencherEspecialidades);
