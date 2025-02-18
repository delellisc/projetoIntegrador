/* script fetch atendimentos por data */
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

/* script para gerar calendário */

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let currentDate = new Date();

async function generateCalendar(date) {
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
        let atendimentosHoje = await fetchAtendimentosData(`${year}-${month+1}-${i}`);
        if (atendimentosHoje[0]) {
            dayElement.classList.add("has-atendimento");
            dayElement.addEventListener("click", () => {
                openModal(atendimentosHoje);
            });
        }
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            dayElement.classList.add("today");
        }
        calendar.appendChild(dayElement);
    }
}

/* function openModal(atendimentos) {
    const modal = document.getElementById("atendimento-modal");
    const atendimentoList = document.getElementById("atendimento-list");

    atendimentoList.innerHTML = "";

    atendimentos.forEach(atendimento => {
        const listItem = document.createElement("li");
        listItem.textContent = 
        `
        Horário: ${atendimento.atendimento_horario} - 
        Profissonal: ${atendimento.profissional_nome} -
        Especialização: ${atendimento.especializacao_nome}
        `;
        atendimentoList.appendChild(listItem);
    });

    modal.style.display = "block";
} */

function openModal(atendimentos) {
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
    

function closeModal() {
    const modal = document.getElementById("atendimento-modal");
    modal.style.display = "none";
}

document.querySelector(".close-modal").addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
    const modal = document.getElementById("atendimento-modal");
    if (event.target === modal) {
        closeModal();
    }
});

function getMonthName(monthIndex) {
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return monthNames[monthIndex];
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
});

generateCalendar(currentDate);

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