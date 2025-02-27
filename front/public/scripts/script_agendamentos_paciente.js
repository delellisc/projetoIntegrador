const id = window.userSession.id;

/* *********************************************** */
/* SCRIPTS CALENDÁRIO */
/* script para gerar calendário */

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let currentDate = new Date();

// gera calendário do paciente
async function generateCalendarPaciente(date) {
    calendar.innerHTML = "";
    const month = date.getMonth();
    const year = date.getFullYear();
    monthYear.textContent = `${getMonthName(month)} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    weekdays.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day-name");
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("calendar-day");
        emptyDay.style.background = "transparent";
        calendar.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day");
        dayElement.textContent = i;

        let currentDate = new Date(year, month, i);
        let dayOfWeek = currentDate.getDay();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let atendimentosHoje = await fetchAtendimentosData(`${year}-${month+1}-${i}`);
        if (atendimentosHoje.length > 0){
            dayElement.classList.add("has-atendimento");
        }
        if (dayOfWeek === 0 || dayOfWeek === 6 || currentDate < today) {
            dayElement.style.cursor = "not-allowed";
            dayElement.style.opacity = "0.5";
        }
        if (atendimentosHoje.length > 0 && currentDate > today) {
            dayElement.addEventListener("click", () => {
                openModalPaciente(atendimentosHoje);
            });
        }
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()){
            dayElement.classList.add("today");
        }
        calendar.appendChild(dayElement);
    }
}

/* *********************************************** */
/* SCRIPTS MODAL */
// modal para exibição de atendimentos existentes
function openModalPaciente(atendimentos) {
    const modal = document.getElementById("modal");
    const atendimentoTable = document.getElementById("tabela-atendimentos");
    document.getElementById("titulo-tabela-atendimentos").innerText = `Atendimentos - ${formatDateWithoutTime(atendimentos[0].atendimento_horario)}`;

    atendimentoTable.innerHTML = "";

    const atendimentosTableHeader = document.createElement("thead");
    const atendimentosTableBody = document.createElement("tbody");

    atendimentoTable.appendChild(atendimentosTableHeader);
    atendimentoTable.appendChild(atendimentosTableBody);

    atendimentosTableHeader.innerHTML = `
        <tr>
            <th>Horário</th>
            <th>Profissional</th>
            <th>ID</th>
            <th>Registro</th>
            <th>Especialização</th>
            <th></th>
        </tr>
    `;

    atendimentos.forEach(async atendimento => {
        const row = document.createElement("tr");
        const hora = document.createElement("td");
        const nome = document.createElement("td");
        const atendimento_id = document.createElement("td");
        const registro = document.createElement("td");
        const especializacao = document.createElement("td");
        const botao = document.createElement("td");
        const btn = document.createElement("button");
        hora.innerText = `${extractTimeFromDate(atendimento.atendimento_horario)}`;
        nome.innerText = `${atendimento.profissional_nome}`;
        registro.innerText = `${atendimento.profissional_registro}`;
        especializacao.innerText = `${atendimento.especializacao_nome}`;
        atendimento_id.innerText = `${atendimento.atendimento_id}`
        let pacientes = await fetchPacientesAtendimento(atendimento.atendimento_id);
        let marcacao = await buscarPacienteAtendimento(atendimento.atendimento_id);
        if (pacientes.length >= atendimento.qtd_pacientes){
            botao.innerText = 'Não há vagas';
        }
        else if (!marcacao){
            btn.innerText = `Marcar Consulta`;
            btn.addEventListener("click", () => cadastrarConsulta(atendimento.atendimento_id));
            btn.style.backgroundColor = "#31615F";
            botao.appendChild(btn);
        }
        else {
            btn.innerText = `Cancelar Consulta`;
            btn.addEventListener("click", () => cancelarConsulta(atendimento.atendimento_id));
            btn.style.backgroundColor = "red";
            botao.appendChild(btn);
        }
        btn.style.borderRadius = "5px";
        btn.style.color = "white";
        btn.style.padding = "5px";

        row.appendChild(hora);
        row.appendChild(nome);
        row.appendChild(atendimento_id);
        row.appendChild(registro);
        row.appendChild(especializacao);
        row.appendChild(botao);

        atendimentosTableBody.appendChild(row);
    });

    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

document.querySelector(".close-modal").addEventListener("click", closeModal);

function getMonthName(monthIndex) {
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return monthNames[monthIndex];
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendarPaciente(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendarPaciente(currentDate);
});

generateCalendarPaciente(currentDate);

/* *********************************************** */
/* SCRIPTS HISTÓRICO DE ATENDIMENTOS */
/* script histórico de atendimentos */
document.getElementById("fetch-atendimentos-btn").addEventListener("click", () => {
    fetchAtendimentos(id);
});

function renderAtendimentosTable(atendimentos) {
    const atendimentosTable = document.getElementById("tabela-historico");
    const atendimentosTableHeader = document.createElement("thead");
    const atendimentosTableBody = document.createElement("tbody");
    
    atendimentosTableHeader.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Horário</th>
            <th>Especialização</th>
            <th>Profissional</th>
            <th>Registro</th>
        </tr>
    `;

    atendimentosTable.appendChild(atendimentosTableHeader);
    atendimentosTable.appendChild(atendimentosTableBody);
    
    atendimentosTableBody.innerHTML = "";

    if (atendimentos.length === 0) {
        atendimentosTable.hidden = true;
    } else {
        atendimentos.forEach(atendimento => {
            const row = document.createElement("tr");

            const atendimento_id = document.createElement("td");
            const horario = document.createElement("td");
            const especializacao = document.createElement("td");
            const nome = document.createElement("td");
            const registro = document.createElement("td");
            
            atendimento_id.textContent = `${atendimento.atendimento_id}`;
            horario.textContent = `${formatDate(atendimento.atendimento_horario)}`;
            especializacao.textContent = `${atendimento.especializacao_nome}`;
            nome.textContent = `${atendimento.profissional_nome}`;
            registro.textContent = `${atendimento.profissional_registro}`;

            row.appendChild(atendimento_id);
            row.appendChild(horario);
            row.appendChild(especializacao);
            row.appendChild(nome);
            row.appendChild(registro);

            atendimentosTableBody.appendChild(row);
        });
        
        atendimentosTable.hidden = false;
    }
}

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

// Formatar data no formato dia/mes/ano
function formatDateWithoutTime(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

// Formatar data no formato ano-mes-dia
function removeTimeFromDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

// Formatar data no formato hora:min
function extractTimeFromDate(dateString) {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

/* *********************************************** */
/* SCRIPTS FETCH */
/* script fetch pacientes do atendimento */
async function fetchPacientesAtendimento(atendimentoId) {
    try {
        const response = await fetch(`http://localhost:3000/atendimentos/${atendimentoId}/pacientes`);
        if (!response.ok) {
            throw new Error("Erro ao buscar pacientes do atendimento.");
        }
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar pacientes do atendimento:", error);
    }
}

// Fetch todos as consultas de um paciente (relacionamento atendimento-paciente)
async function fetchAtendimentos(id) {
    try {
        const response = await fetch(`http://localhost:3000/pacientes/atendimentos/${id}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos.");
        }
        const atendimentos = await response.json();
        renderAtendimentosTable(atendimentos);
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

// Fetch de uma consulta específica do paciente (relacionamento atendimento-paciente)
async function buscarPacienteAtendimento(atendimentoId) {
    try {
        const response = await fetch(`http://localhost:3000/atendimentos/consultas/${atendimentoId}/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar relação entre paciente e atendimento. Status: ${response.status}`);
        }
        
        const text = await response.text();

        if (!text.trim()) {
            return false;
        }

        return JSON.parse(text) ? true : false;
    } catch (error) {
        console.error(`Erro ao buscar relação entre paciente e atendimento:`, error);
        return false;
    }
}

// Requisição DELETE para cancelar uma consulta
async function cancelarConsulta(atendimentoId) {
    alert(`Cancelando consulta no atendimento ${atendimentoId} para matrícula: ${id}`);
    await fetch(`http://localhost:3000/atendimentos/removerConsulta/${atendimentoId}/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json"
        },
    })
    .catch(error => console.error("Erro:", error));
    location.reload();
}

// Requisição POST para criar uma consulta
async function cadastrarConsulta(atendimentoId) {
    alert(`Cadastrando consulta no atendimento ${atendimentoId} para matrícula: ${id}`);
    await fetch("http://localhost:3000/atendimentos/consultas", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "pacienteId": id,
            "atendimentoId": atendimentoId
        })
    })
    .catch(error => console.error("Erro:", error));
    location.reload();
}

// Fetch de atendimentos por data
async function fetchAtendimentosData(data) {
    try {
        const response = await fetch(`http://localhost:3000/atendimentos/data/${data}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos.");
        }
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

// Fetch atendimentos em que o paciente foi consultado por data
async function fetchAtendimentosHora(horario) {
    try {
        const response = await fetch(`http://localhost:3000/atendimentos/horario/${horario}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar atendimentos. Status: ${response.status}`);
        }
        const text = await response.text();

        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error(`Erro ao buscar atendimentos para ${horario}:`, error);
    }
}