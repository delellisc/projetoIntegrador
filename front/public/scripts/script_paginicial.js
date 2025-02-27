const id = window.userSession.id;

/*****************************/
async function getUserData() {
    try {
        const response = await fetch('/auth/user')
        if (!response.ok) {
            throw new Error("Falha ao obter dados do usuário");
        }
        return await response.json()
    } catch (erro) {
        console.log("este foi o erro:", erro)
        return 
    }
}

async function fetchAtendimentosPendentes(){
    try {
        console.log(`http://localhost:3000/pacientes/atendimentosPendentes/${id}`);
        const response = await fetch(`http://localhost:3000/pacientes/atendimentosPendentes/${id}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos pendentes.");
        }
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar atendimentos pendentes:", error);
    }
}

async function fetchAtendimentos(){
    try {
        console.log(`http://localhost:3000/pacientes/atendimentos/${id}`);
        const response = await fetch(`http://localhost:3000/pacientes/atendimentos/${id}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos.");
        }
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    const ultimosAtendimentos = await fetchAtendimentos();
    const proximosAtendimentos = await fetchAtendimentosPendentes();
    console.log(proximosAtendimentos)
    const data = {
        ultimosAtendimentos: ultimosAtendimentos.slice(0, 3),
        proximosAtendimentos: proximosAtendimentos.slice(0, 3),
        mensagens: [
            "Os atendimentos do dia 28/02 foram adiados devido a manutenção na unidade de saúde.",
            "A partir do próximo mês, novos horários estarão disponíveis para agendamento.",
            /* "Chegue com pelo menos 15 minutos de antecedência para evitar atrasos no atendimento." */
        ]
    };

    function renderTable(containerId, atendimentos) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        
        if (atendimentos.length > 0) {
            const table = document.createElement("table");
            table.innerHTML = `
                <thead>
                    <tr>
                        <th id="celula-id">ID</th>
                        <th>Horário</th>
                        <th>Profissional</th>
                        <th>Especialização</th>
                    </tr>
                </thead>
                <tbody>
                    ${atendimentos.map(atendimento => `
                        <tr>
                            <td id="celula-id">${atendimento.atendimento_id}</td>
                            <td>${formatDate(atendimento.atendimento_horario)}</td>
                            <td>${atendimento.profissional_nome}</td>
                            <td>${atendimento.especializacao_nome}</td>
                        </tr>
                    `).join("")}
                </tbody>
            `;
            container.appendChild(table);
        } else {
            if (containerId === 'consulta-pendente'){
                container.innerHTML = '<p class="sem-atendimentos">Não há consultas pendentes.</p>';    
            }
            else {
                container.innerHTML = '<p class="sem-atendimentos">Não há consultas registradas.</p>';
            }
        }
    }

    renderTable("consulta-ultimas", data.ultimosAtendimentos);
    renderTable("consulta-pendente", data.proximosAtendimentos);

    const avisosContainer = document.getElementById("avisos-container");
    avisosContainer.innerHTML = "";

    if (data.mensagens.length > 0) {
        data.mensagens.forEach(msg => {
            const avisoDiv = document.createElement("div");
            avisoDiv.classList.add("avisos");
            avisoDiv.innerHTML = `<p>${msg}</p>`;
            avisosContainer.appendChild(avisoDiv);
        });
    }

    while (avisosContainer.children.length < 3) {
        const noNotifDiv = document.createElement("div");
        noNotifDiv.classList.add("avisos");
        noNotifDiv.innerHTML = "<p>Você não tem novas notificações.</p>";
        avisosContainer.appendChild(noNotifDiv);
    }
});

/* *********************************************** */
// FORMATAÇÃO DE DATAS
// Formatar data no formato dia/mes/ano, hora:min
function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}