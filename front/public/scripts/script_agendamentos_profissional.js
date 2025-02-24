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
async function fetchAtendimentosProfissionalData(data) {
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

/* script fetch atendimentos do paciente por data */
async function fetchAtendimentosHora(horario) {
    try {
        const response = await fetch(`http://localhost:3000/atendimentos/horario/${horario}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar atendimentos. Status: ${response.status}`);
        }

        const text = await response.text();
        // console.log(`Resposta recebida para ${horario}:`, text);

        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error(`Erro ao buscar atendimentos para ${horario}:`, error);
    }
}

/* script fetch pacientes atendidos no dia por um profissional */
async function fetchPacientesAtendidos(data) {
    try {
        const response = await fetch(`http://localhost:3000/profissionais/agendamentos/${data}/${id}/pacientes`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar atendimentos. Status: ${response.status}`);
        }

        const text = await response.text();
        // console.log(`Resposta recebida para ${horario}:`, text);

        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error(`Erro ao buscar atendimentos para ${horario}:`, error);
    }
}

// Remover atendimento
async function fetchRemoverAtendimento(horario) {
    alert(`Cadastrando atendimento para ${horario} | Matrícula: ${id}`);
    await fetch(`http://localhost:3000/atendimentos/data/${horario}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json"
        }
    })
    .catch(error => console.error("Erro:", error));
    location.reload();
}

// Cadastrar novo atendimento
async function cadastrarAtendimento(horario) {
    alert(`Cadastrando atendimento para ${horario} | Matrícula: ${id}`);
    await fetch("http://localhost:3000/atendimentos", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        "horario": horario,
        "status": "confirmado",
        "profissional": id
        })
    })
    .catch(error => console.error("Erro:", error));
    location.reload();
}

// Retornar todos os atendimentos de um profissional
async function fetchAtendimentos(id) {
    try {
        const response = await fetch(`http://localhost:3000/profissionais/atendimentos/${id}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos.");
        }
        const atendimentos = await response.json();
        renderAtendimentosTable(atendimentos);
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

/* *********************************************** */
/* SCRIPTS CALENDÁRIO */
/* script para gerar calendário */
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

const id = parseInt(document.getElementById("matricula").textContent);

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

        let currentDate = new Date(year, month, i);
        let dayOfWeek = currentDate.getDay();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let atendimentosHoje = await fetchAtendimentosProfissionalData(`${year}-${month+1}-${i}`, id);
        if (atendimentosHoje[0]) {
            dayElement.classList.add("has-atendimento");
        }
        if (dayOfWeek === 0 || dayOfWeek === 6 || currentDate < today) {
            if (dayElement.classList.contains("has-atendimento")){
                dayElement.addEventListener("click", () => {
                    openModalPacientesAtendidos(`${year}-${month+1}-${i}`);
                });
            }
            else{
                dayElement.style.cursor = "not-allowed";
            }
            dayElement.style.opacity = "0.5";
        }
        else if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()){
            dayElement.classList.add("today");
            dayElement.style.cursor = "not-allowed";
        }
        else {
            dayElement.addEventListener("click", () => {
                openModalCadastro(`${year}-${month+1}-${i}`);
            });
            dayElement.style.cursor = "pointer";
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
    generateCalendarProfissional(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendarProfissional(currentDate);
});

generateCalendarProfissional(currentDate);

/* *********************************************** */
/* SCRIPTS MODAL */
// Modal de pacientes atendidos naquele dia pelo profissional
async function openModalPacientesAtendidos(data){
    const modal = document.getElementById("modal");

    document.getElementById("titulo-tabela-atendimentos").innerText = `Pacientes atendidos - ${formatDateWithoutTime(data)}`;
    atendimentosTable = document.getElementById("tabela-atendimentos");
    let pacientes = await fetchPacientesAtendidos(data, id);
    if(pacientes.length > 0){
        atendimentosTable.innerHTML = ''+
        '<thead>'+
        '<tr>'+
        '    <th>Nome</th>'+
        '    <th>Matrícula</th>'+
        '    <th>Atendimento ID</th>'+
        '</tr>'+
        '</thead>'+
        '<tbody id="atendimento-body">'+
        '</tbody>';
        atendimentosTableBody = document.getElementById("atendimento-body");
        for (const paciente of pacientes) { 
            let row = document.createElement("tr");
            let nome = document.createElement("td");
            let matricula = document.createElement("td");
            let atendimento = document.createElement("td");
            nome.innerText = paciente.paciente_nome;
            matricula.innerText = paciente.paciente_id;
            atendimento.innerText = paciente.atendimento_id;
    
            row.appendChild(nome);
            row.appendChild(matricula);
            row.appendChild(atendimento);

            row.classList.add("table-row-atendimento");
    
            atendimentosTableBody.appendChild(row);
        }
    }
    else{
        atendimentosTable.innerHTML = '<p>Nenhum paciente foi atendido.</p>';
    }

    modal.style.display = "block";
}

// Função para abrir o modal de cadastro de atendimentos
async function openModalCadastro(data){
    const modal = document.getElementById("modal");

    document.getElementById("titulo-tabela-atendimentos").innerText = `Tabela de Atendimentos - ${formatDateWithoutTime(data)}`;
    const atendimentosTable = document.getElementById("tabela-atendimentos");
    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");
    
    headerRow.innerHTML =         
    '    <th>Horário</th>'+
    '    <th>Status</th>'+
    '    <th></th>';
    
    header.appendChild(headerRow);

    const tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", "atendimento-body");

    atendimentosTable.appendChild(header);
    atendimentosTable.appendChild(tableBody);

    const atendimentosTableBody = document.getElementById("atendimento-body");
    
    const listaHorarios = ["07:00", "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    for (const horario of listaHorarios) { 
        let disponibilidade = await fetchAtendimentosHora(`${data} ${horario}`);
        
        let row = document.createElement("tr");
        let hora = document.createElement("td");
        hora.innerText = horario;
        let status = document.createElement("td");
        let botao = document.createElement("td");
        let btn = document.createElement("button");
        btn.style.borderRadius = "5px";
        btn.style.color = "white";
        btn.style.padding = "5px";

        if(disponibilidade.atendimento_id){
            if(disponibilidade.profissional_id == id){
                status.innerText = "Confirmado";
                row.style.color = "#31615F";
                btn.innerText = "Cancelar Atendimento";
                btn.addEventListener("click", () => fetchRemoverAtendimento(`${data} ${horario}`, id));
                btn.style.backgroundColor = "red";
                botao.appendChild(btn);
            }
            else{
                status.innerText = "Indisponível";
                row.style.color = "red";
            }
        }
        else{
            status.innerText = "Disponível";
            btn.innerText = "Cadastrar Atendimento";
            btn.addEventListener("click", () => cadastrarAtendimento(`${data} ${horario}`, id))
            btn.style.backgroundColor = "#31615F";
            botao.appendChild(btn);
        }

        row.appendChild(hora);
        row.appendChild(status);
        row.appendChild(botao);

        atendimentosTableBody.appendChild(row);
    }

    modal.style.display = "block";
}

// Função para fechar o Modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

document.querySelector(".close-modal").addEventListener("click", closeModal);

/* *********************************************** */
/* SCRIPTS HISTÓRICO DE ATENDIMENTOS */
// Linhas para exibir tabela de atendimentos quando botão for clicado
const atendimentosTable = document.getElementById("atendimentos-table");
const atendimentosTableBody = document.querySelector("#atendimentos-table tbody");
document.getElementById("fetch-atendimentos-btn").addEventListener("click", () => {
    fetchAtendimentos(id);
});

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