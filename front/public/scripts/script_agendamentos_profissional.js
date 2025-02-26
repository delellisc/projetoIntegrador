const id = window.userSession.id;

/* *********************************************** */
/* SCRIPTS CALENDÁRIO */
/* script para gerar calendário */
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

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
    const atendimentosTable = document.getElementById("tabela-atendimentos");
    const atendimentosTableBody = document.createElement("tbody");
    const atendimentosTableHeader = document.createElement("thead");
    let pacientes = await fetchPacientesAtendidos(data, id);
    if(pacientes.length > 0){
        atendimentosTable.innerHTML = '';
        atendimentosTable.appendChild(atendimentosTableHeader);
        atendimentosTable.appendChild(atendimentosTableBody);
        atendimentosTableHeader.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>ID</th>
        </tr>`;
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
    atendimentosTable.innerHTML = '';

    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");
    
    headerRow.innerHTML =         
    '    <th>Horário</th>'+
    '    <th>Status</th>'+
    '    <th>Qtd. Pacientes</th>'+
    '    <th></th>';
    
    header.appendChild(headerRow);

    const tableBody = document.createElement("tbody");

    atendimentosTable.appendChild(header);
    atendimentosTable.appendChild(tableBody);
    
    const listaHorarios = ["07:00", "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    for (const horario of listaHorarios) { 
        let disponibilidade = await fetchAtendimentosHora(`${data} ${horario}`);
        
        let row = document.createElement("tr");
        let hora = document.createElement("td");
        hora.innerText = horario;
        let status = document.createElement("td");
        let qtd = document.createElement("td");
        let botao = document.createElement("td");
        let btn = document.createElement("button");
        btn.style.borderRadius = "5px";
        btn.style.color = "white";
        btn.style.padding = "5px";

        if(disponibilidade.atendimento_id){
            const pacientes = await fetchPacientesAtendimento(disponibilidade.atendimento_id);
            if(disponibilidade.profissional_id == id){
                status.innerText = "Confirmado";
                row.style.color = "#31615F";
                btn.innerText = "Cancelar Atendimento";
                btn.addEventListener("click", () => fetchRemoverAtendimento(`${data} ${horario}`, id));
                btn.style.backgroundColor = "red";
                botao.appendChild(btn);
                qtd.innerText = pacientes.length;
                qtd.addEventListener("click", () => openModalPacientesAtendimento(pacientes, disponibilidade.atendimento_id));
                qtd.style.cursor = "pointer";
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
            /* let input = document.createElement("input");
            input.setAttribute("type", "number");
            qtd.appendChild(input); */
            botao.appendChild(btn);
        }

        row.appendChild(hora);
        row.appendChild(status);
        row.appendChild(qtd);
        row.appendChild(botao);

        tableBody.appendChild(row);
    }

    modal.style.display = "block";
}

// Modal de pacientes atendidos naquele dia pelo profissional
function openModalPacientesAtendimento(pacientes, atendimentoId){
    console.log(pacientes);
    const modal = document.getElementById("modal");

    document.getElementById("titulo-tabela-atendimentos").innerText = `Pacientes cadastrados - Atendimento ID: ${atendimentoId}`;
    const atendimentosTable = document.getElementById("tabela-atendimentos");
    const atendimentosTableBody = document.createElement("tbody");
    const atendimentosTableHeader = document.createElement("thead");
    
    if(pacientes.length > 0){
        atendimentosTable.innerHTML = '';
        atendimentosTable.appendChild(atendimentosTableHeader);
        atendimentosTable.appendChild(atendimentosTableBody);
        atendimentosTableHeader.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>ID</th>
        </tr>`;
        for (const paciente of pacientes) { 
            let row = document.createElement("tr");
            let nome = document.createElement("td");
            let matricula = document.createElement("td");
            let dataNasc = document.createElement("td");
            nome.innerText = paciente.nome;
            matricula.innerText = paciente.id;
            dataNasc.innerText = paciente.data_nascimento;
    
            row.appendChild(nome);
            row.appendChild(matricula);
            row.appendChild(dataNasc);

            row.classList.add("table-row-atendimento");
    
            atendimentosTableBody.appendChild(row);
        }
    }
    else{
        atendimentosTable.innerHTML = '<p>Nenhum paciente cadastrado nesse atendimento.</p>';
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
document.getElementById("fetch-atendimentos-btn").addEventListener("click", () => {
    fetchAtendimentos(id);
});

// Função para exibir tabela de atendimintos do histórico
function renderAtendimentosTable(atendimentos) {
    const atendimentosTable = document.getElementById("tabela-historico");
    const atendimentosTableHeader = document.createElement("thead");
    const atendimentosTableBody = document.createElement("tbody");

    atendimentosTable.innerHTML = '';

    atendimentosTable.appendChild(atendimentosTableHeader);
    atendimentosTable.appendChild(atendimentosTableBody);
    
    atendimentosTableHeader.innerHTML = `
    <tr>
        <th>Paciente</th>
        <th>Data Nasc.</th>
        <th>ID</th>
        <th>Horário</th>
    </tr>`;

    if (atendimentos.length === 0) {
        atendimentosTable.hidden = true;
    } else {
        atendimentos.forEach(atendimento => {
            const row = document.createElement("tr");
            const paciente_nome = document.createElement("td");
            const data = document.createElement("td");
            const atendimento_id = document.createElement("td");
            const horario = document.createElement("td");

            paciente_nome.textContent = `${atendimento.paciente_nome}`
            data.textContent = `${formatDateWithoutTime(atendimento.paciente_data_nascimento)}`
            atendimento_id.textContent = `${atendimento.atendimento_id}`
            horario.textContent = `${formatDate(atendimento.atendimento_horario)}`

            row.appendChild(paciente_nome);
            row.appendChild(data);
            row.appendChild(atendimento_id);
            row.appendChild(horario);

            atendimentosTableBody.appendChild(row);
            atendimentosTable.hidden = false;
        });
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