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

// async function getAtendimentos(matricula) {
//     const dados = await getUserData()
//     const matricula = dados.matricula
//     try {
//         return
//     }
// // }

//tentativa de mostrar ultimas consultas

// document.addEventListener("DOMContentLoaded", async () => {
//     const dados = await getUserData()
//     if (!dados || !dados.matricula){
//         document.getElementById("consulta-ultimas").textContent = "SEM MATRICULA";
//     }
//     const matricula = dados.matricula
//     const response = await fetch(`/pacientes/atendimentos/${matricula}`)
//     const atendimentos = await response.json()
//     // document.getElementById("consulta-ultimas").textContent = atendimentos;
//     const consultaElement = document.getElementById("consulta-ultimas");

//     if (Array.isArray(atendimentos) && atendimentos.length > 0) {
//         //estrutura de exibição
//         consultaElement.innerHTML = `
//             <ul>
//                 ${atendimentos.map(atendimento => `
//                     <li>
//                         <strong>Data:</strong> ${atendimento.horario || 'Não informada'}<br>
//                         <strong>Profissional:</strong> ${atendimento.profissional || 'Não informado'}<br>
//                         <strong>Status:</strong> ${atendimento.status || 'Sem descrição'}<br>
//                     </li>
//                 `).join('')}
//             </ul>
//         `;
//     } else {
//         consultaElement.textContent = "Nenhum atendimento encontrado.";
//     }

// })