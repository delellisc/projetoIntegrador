/* script para gerar calendário */

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let currentDate = new Date();

function generateCalendar(date) {
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

        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            dayElement.classList.add("today");
        }
        calendar.appendChild(dayElement);
    }
}

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