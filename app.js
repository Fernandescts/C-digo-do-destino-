document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("compra-form");
    const lista = document.getElementById("numeros-lista");
    const numerosComprados = {};
    const adminWhatsApp = "61991641211"; // Seu número de WhatsApp

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

        const item = document.createElement("li");
        item.innerHTML = `${numero} - ${nome} <a href="https://wa.me/${whatsapp}" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" alt="WhatsApp">
        </a>`;
        lista.appendChild(item);

        // Enviar os dados para o WhatsApp do administrador
        const mensagem = `Nova compra!%0A%0ANúmero: ${numero}%0ANome: ${nome}%0AWhatsApp: ${whatsapp}`;
        window.open(`https://wa.me/${adminWhatsApp}?text=${mensagem}`, "_blank");

        form.reset();
    });
});
