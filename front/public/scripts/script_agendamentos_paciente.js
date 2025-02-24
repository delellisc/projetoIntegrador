/* *********************************************** */
/* SCRIPTS CALENDÁRIO */
/* script para gerar calendário */

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

const id = parseInt(document.getElementById("matricula").textContent);

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
        if (atendimentosHoje[0]) {
            dayElement.classList.add("has-atendimento");
        }
        if (dayOfWeek === 0 || dayOfWeek === 6 || currentDate < today) {
            dayElement.style.cursor = "not-allowed";
            dayElement.style.opacity = "0.5";
        }
        else if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()){
            dayElement.classList.add("today");
            dayElement.addEventListener("click", () => {
                openModalPaciente(atendimentosHoje);
            });
        }
        else {
            dayElement.addEventListener("click", () => {
                openModalPaciente(atendimentosHoje);
            });
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

    atendimentoTable.innerHTML = `
        <thead>
            <tr>
                <th>Horário</th>
                <th>Profissional</th>
                <th>Atendimento ID</th>
                <th>Registro</th>
                <th>Especialização</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="atendimento-body">
        </tbody>
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
        let marcacao = await buscarPacienteAtendimento(atendimento.atendimento_id);
        /* console.log(marcacao); */
        if (!marcacao){
            btn.innerText = `Marcar Consulta`;
            btn.addEventListener("click", () => cadastrarConsulta(atendimento.atendimento_id));
            btn.style.backgroundColor = "#31615F";
        }
        else {
            btn.innerText = `Cancelar Consulta`;
            btn.addEventListener("click", () => cancelarConsulta(atendimento.atendimento_id));
            btn.style.backgroundColor = "red";
        }
        btn.style.borderRadius = "5px";
        btn.style.color = "white";
        btn.style.padding = "5px";
        botao.appendChild(btn);

        row.appendChild(hora);
        row.appendChild(nome);
        row.appendChild(atendimento_id);
        row.appendChild(registro);
        row.appendChild(especializacao);
        row.appendChild(botao);

        atendimentoTable.appendChild(row);
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
const atendimentosTable = document.getElementById("atendimentos-table");
const atendimentosTableBody = document.querySelector("#atendimentos-table tbody");
document.getElementById("fetch-atendimentos-btn").addEventListener("click", () => {
    fetchAtendimentos(id);
});

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

function renderAtendimentosTable(atendimentos) {
    atendimentosTableBody.innerHTML = "";

    if (atendimentos.length === 0) {
        atendimentosTable.hidden = true;
    } else {
        atendimentos.forEach(atendimento => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${atendimento.paciente_nome}</td>
                <td>${new Date(atendimento.paciente_data_nascimento).toLocaleDateString()}</td>
                <td>${atendimento.atendimento_id}</td>
                <td>${formatDate(atendimento.atendimento_horario)}</td>
                <td>${atendimento.profissional_nome}</td>
                <td>${atendimento.profissional_registro}</td>
            `;

            atendimentosTableBody.appendChild(row);
        });
        
        atendimentosTable.hidden = false;
    }
}

// FORMATAÇÃO DE DATAS
function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

function formatDateWithoutTime(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function removeTimeFromDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

function extractTimeFromDate(dateString) {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

/* *********************************************** */
/* SCRIPTS FETCH */
/* script fetch atendimentos do paciente por data */

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

// CANCELAR CONSULTA
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

// CRIAR NOVA CONSULTA
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

/* script fetch atendimentos do paciente por data */
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