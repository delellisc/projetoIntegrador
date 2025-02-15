//pegar id da url
function getPacienteIdFromUrl() {
    const pathSegments = window.location.pathname.split('/');  
    const pacienteId = pathSegments[pathSegments.length - 1];
    return pacienteId;
}


document.addEventListener('DOMContentLoaded', () => {
    const pacienteId = getPacienteIdFromUrl();

    if (pacienteId) {
        //chamando função quando pegar o id
        fetchAtendimentos(pacienteId);
    } else {
        console.error("ID do paciente não encontrado.");
    }
});



async function fetchAtendimentos(pacienteId) {
    try {
        const response = await fetch(`http://localhost:3000/pacientes/atendimentos/${pacienteId}`);
        
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos.");
        }
        
        const atendimentos = await response.json();
        
        //renderizar os resultados na tela
        renderAtendimentos(atendimentos);
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

function renderAtendimentos(atendimentos) {
    const ultimasConsultas = document.getElementById("consulta-ultimas");
    ultimasConsultas.innerHTML = '';

    //pega so os com status 'confirmado' (não sei exatamente qual o status para as consultas já realizadas)
    const atendimentosConfirmados = atendimentos.filter(atendimento => atendimento.atendimento_status === 'confirmado');
    
    //pega os 3 ultimos (numero tirado do ânus)
    const ultimosAtendimentos = atendimentosConfirmados.slice(0, 3);

    if (ultimosAtendimentos.length === 0) {
        ultimasConsultas.innerHTML = "<p>Nenhuma consulta confirmada encontrada.</p>";
        return;
    }

    //percorre o resultado e - deveria - mostra atendimentos
    ultimosAtendimentos.forEach(atendimento => {
        const atendimentoDiv = document.createElement('div');
        atendimentoDiv.classList.add('atendimento-item'); 

        atendimentoDiv.innerHTML = `
            <p><strong>Profissional:</strong> ${atendimento.profissional_nome}</p>
            <p><strong>Horário:</strong> ${formatDate(atendimento.atendimento_horario)}</p>
            <p><strong>Status:</strong> ${atendimento.atendimento_status}</p>
            <hr>
        `;

        ultimasConsultas.appendChild(atendimentoDiv);
    });
}

//fromatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}
