document.addEventListener("DOMContentLoaded", function () { const form = document.getElementById("compra-form"); const lista = document.getElementById("numeros-lista"); const adminWhatsApp = "61991641211"; // Seu número de WhatsApp let numerosComprados = JSON.parse(localStorage.getItem("numerosComprados")) || {}; // Recupera os números salvos

function atualizarLista() {
    lista.innerHTML = "";
    for (const numero in numerosComprados) {
        const { nome, whatsapp } = numerosComprados[numero];
        const item = document.createElement("li");
        item.innerHTML = `${numero} - ${nome} <a href="https://wa.me/${whatsapp}" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" alt="WhatsApp">
        </a>`;
        lista.appendChild(item);
    }
}

atualizarLista(); // Atualiza a lista ao carregar a página

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const numero = document.getElementById("numero").value;
    const nome = document.getElementById("nome").value;
    const whatsapp = document.getElementById("whatsapp").value;

    if (numerosComprados[numero]) {
        alert("Esse número já foi comprado. Escolha outro.");
        return;
    }

    numerosComprados[numero] = { nome, whatsapp };
    localStorage.setItem("numerosComprados", JSON.stringify(numerosComprados)); // Salva no LocalStorage

    atualizarLista();

    // Enviar os dados para o WhatsApp do administrador
    const mensagem = `Nova compra!%0A%0ANúmero: ${numero}%0ANome: ${nome}%0AWhatsApp: ${whatsapp}`;
    window.open(`https://wa.me/${adminWhatsApp}?text=${mensagem}`, "_blank");

    form.reset();
});

});

