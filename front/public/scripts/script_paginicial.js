document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/auth/user'); //requisicao pra rota que pega o usuario logado
        if (!response.ok) {
            throw new Error("Falha ao obter dados do usuário");
        }
        
        const userData = await response.json();
        console.log("Dados do usuário:", userData);
        
        // Exibir os dados do usuário na interface
        document.getElementById("user-name").textContent = userData.vinculo.nome;
    } catch (error) {
        console.error(error);
    }
});
