/* *********************************************** */
/* SCRIPTS FETCH */
/* script fetch atendimentos do paciente por data */
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

/* script fetch atendimentos do profissional por data */
async function fetchAtendimentosProfissionalData(data, id) {
    try {
        const response = await fetch(`http://localhost:3000/profissionais/agendamentos/${data}/${id}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos do profissional.");
        }
        return response.json();
    } catch (error) {
        console.error("Erro ao buscar atendimentos do profissional:", error);
    }
}

/* *********************************************** */
/* SCRIPTS CALENDÁRIO */
/* script para gerar calendário */

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

const id = 20231038060018;

let currentDate = new Date();

// gera calendário do profissional
async function generateCalendarProfissional(date) {
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
        let atendimentosHoje = await fetchAtendimentosProfissionalData(`${year}-${month+1}-${i}`, id);
        if (atendimentosHoje[0]) {
            dayElement.classList.add("has-atendimento");
            dayElement.addEventListener("click", () => {
                openModalProfissional(atendimentosHoje);
            });
        }
        else {
            dayElement.addEventListener("click", () => {
                openModalCadastro();
            });
            dayElement.style.cursor = "pointer";
        }
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            dayElement.classList.add("today");
        }
        calendar.appendChild(dayElement);
    }
}

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
        let atendimentosHoje = await fetchAtendimentosProfissionalData(`${year}-${month+1}-${i}`, id);
        if (atendimentosHoje[0]) {
            dayElement.classList.add("has-atendimento");
            dayElement.addEventListener("click", () => {
                openModalPaciente(atendimentosHoje);
            });
        }
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            dayElement.classList.add("today");
        }
        calendar.appendChild(dayElement);
    }
}

/* *********************************************** */
/* SCRIPTS MODAL */
// modal para exibição de atendimentos existentes
function openModalPaciente(atendimentos) {
    const modal = document.getElementById("atendimento-modal");
    const atendimentoList = document.getElementById("atendimento-list");

    atendimentoList.innerHTML = "";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    table.innerHTML = `
        <thead>
            <tr>
                <th>Horário</th>
                <th>Profissional</th>
                <th>Registro</th>
                <th>Especialização</th>
            </tr>
        </thead>
        <tbody id="atendimento-body">
        </tbody>
    `;

    const tbody = table.querySelector("#atendimento-body");

    atendimentos.forEach(atendimento => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${atendimento.atendimento_horario}</td>
            <td>${atendimento.profissional_nome}</td>
            <td>${atendimento.profissional_registro}</td>
            <td>${atendimento.especializacao_nome}</td>
        `;

        row.style.borderBottom = "1px solid #ddd";
        row.style.textAlign = "left";
        row.style.padding = "8px";

        tbody.appendChild(row);
    });

    atendimentoList.appendChild(table);
    modal.style.display = "block";
}

// modal de cadastro para profissionais
function openModalProfissional(atendimentos){
    const modal = document.getElementById("atendimento-modal");
    const atendimentoList = document.getElementById("atendimento-list");

    atendimentoList.innerHTML = "";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    table.innerHTML = `
        <thead>
            <tr>
                <th>Horário</th>
                <th>Atendimento ID</th>
                <th>Nome profissional</th>
            </tr>
        </thead>
        <tbody id="atendimento-body">
        </tbody>
    `;

    const tbody = table.querySelector("#atendimento-body");

    atendimentos.forEach(atendimento => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${atendimento.atendimento_horario}</td>
            <td>${atendimento.atendimento_id}</td>
            <td>${atendimento.profissional_nome}</td>
        `;

        row.style.borderBottom = "1px solid #ddd";
        row.style.textAlign = "left";
        row.style.padding = "8px";

        tbody.appendChild(row);
    });

    atendimentoList.appendChild(table);
    modal.style.display = "block";
}

function openModalCadastro(){
    const modal = document.getElementById("cadastro-modal");
    /*
    const form = document.getElementById("form-cadastro");

    form.innerHTML = "";
    form.appendChild(document.createElement("input"));
    form.appendChild(document.createElement("button"));
    
    */

    modal.style.display = "block";
}

function closeModalCadastro() {
    const modal = document.getElementById("cadastro-modal");
    modal.style.display = "none";
}

function closeModal() {
    const modal = document.getElementById("atendimento-modal");
    modal.style.display = "none";
}

document.querySelector(".close-modal").addEventListener("click", closeModal);
document.getElementById("modal-cadastro").addEventListener("click", closeModalCadastro);

/* window.addEventListener("click", (event) => {
    const modal = document.getElementById("atendimento-modal");
    if (event.target === modal) {
        closeModal();
    }
}); */

function getMonthName(monthIndex) {
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return monthNames[monthIndex];
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendarProfissional(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendarProfissional(currentDate);
});

generateCalendarProfissional(currentDate);

/* *********************************************** */
/* SCRIPTS HISTÓRICO DE ATENDIMENTOS */

/* script histórico de atendimentos */
const atendimentosTable = document.getElementById("atendimentos-table");
const atendimentosTableBody = document.querySelector("#atendimentos-table tbody");
document.getElementById("fetch-atendimentos-btn").addEventListener("click", () => {
    const matriculaPaciente = document.getElementById("user-id").value;
    fetchAtendimentos(matriculaPaciente);
});

async function fetchAtendimentos(pacienteId) {
    try {
        const response = await fetch(`http://localhost:3000/pacientes/atendimentos/${pacienteId}`);
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

function removeTimeFromDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}