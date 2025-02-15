const ultimasConsultas = document.getElementById("consulta-ultimas");
async function fetchAtendimentos(pacienteId) {
    try {
        const response = await fetch(`http://localhost:3000/pacientes/atendimentos/${pacienteId}`);
        
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos.");
        }
        
        // Parse da resposta como JSON
        const atendimentos = await response.json();
        renderAtendimentos(atendimentos);
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

// Iterar sobre os atendimentos e exibir os dados diretamente na div
function renderAtendimentos(atendimentos) {
    ultimasConsultas.innerHTML = '';

    // Filtrando os atendimentos para pegar apenas os com status 'confirmado'
    const atendimentosConfirmados = atendimentos.filter(atendimento => atendimento.atendimento_status === 'confirmado');

    // Pegando os 3 últimos atendimentos
    const ultimosAtendimentos = atendimentosConfirmados.slice(0, 3);


    if (ultimosAtendimentos.length === 0) {
        ultimasConsultas.innerHTML = "<p>Nenhuma consulta confirmada encontrada.</p>";
        return;
    }

    ultimosAtendimentos.forEach(atendimento => {
        const atendimentoDiv = document.createElement('div');
        atendimentoDiv.classList.add('atendimento-item');

        atendimentoDiv.innerHTML = `
        <p><strong>Profissional:</strong> ${atendimento.profissional_nome}</p>
        <p><strong>Horário:</strong> ${formatDate(atendimento.atendimento_horario)}</p>
        <p><strong>Status:</strong> ${atendimento.atendimento_status}</p>
        <hr>
        `;
        
        // Adicionar cada atendimento na div principal
        ultimasConsultas.appendChild(atendimentoDiv);
    })
}

// Função para formatar a data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}