document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("compra-form");
    const lista = document.getElementById("numeros-lista");
    const numerosDisponiveis = document.getElementById("numeros-disponiveis");
    const valorTotal = document.getElementById("valor-total");
    const campoNumeroEscolhido = document.getElementById("numero");
    const adminWhatsApp = "61991641211";
    let numerosComprados = JSON.parse(localStorage.getItem("numerosComprados")) || {}; 
    let numerosSelecionados = [];
    const totalNumeros = 500; 
    const precoPorNumero = 10;

    function atualizarListas() {
        lista.innerHTML = "";
        numerosDisponiveis.innerHTML = "";
        
        for (let i = 1000; i < 1000 + totalNumeros; i++) {
            const numeroStr = i.toString();
            const item = document.createElement("li");
            
            if (numerosComprados[numeroStr]) {
                item.textContent = `${numeroStr} - ${numerosComprados[numeroStr].nome}`;
                lista.appendChild(item);
            } else {
                item.textContent = numeroStr;
                item.classList.add("disponivel");
                item.addEventListener("click", function () {
                    if (numerosSelecionados.includes(numeroStr)) {
                        numerosSelecionados = numerosSelecionados.filter(num => num !== numeroStr);
                        item.style.backgroundColor = "white";
                    } else {
                        numerosSelecionados.push(numeroStr);
                        item.style.backgroundColor = "#28a745";
                    }
                    atualizarValorTotal();
                    atualizarCampoNumeroEscolhido();
                });
                numerosDisponiveis.appendChild(item);
            }
        }
    }

    function atualizarValorTotal() {
        const total = numerosSelecionados.length * precoPorNumero;
        valorTotal.textContent = `Valor Total: R$ ${total},00`;
    }

    function atualizarCampoNumeroEscolhido() {
        campoNumeroEscolhido.value = numerosSelecionados.join(", ");
    }

    atualizarListas(); 

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const whatsapp = document.getElementById("whatsapp").value.trim();

        if (numerosSelecionados.length === 0 || !nome || !whatsapp) {
            alert("Por favor, selecione pelo menos um número e preencha todos os campos.");
            return;
        }

        for (const numero of numerosSelecionados) {
            if (numerosComprados[numero]) {
                alert(`O número ${numero} já foi comprado. Escolha outro.`);
                return;
            }
            numerosComprados[numero] = { nome, whatsapp };
        }

        localStorage.setItem("numerosComprados", JSON.stringify(numerosComprados)); 
        atualizarListas();

        const totalPagar = numerosSelecionados.length * precoPorNumero;
        const mensagem = `Nova compra!%0A%0ANúmeros: ${numerosSelecionados.join(", ")}%0ANome: ${nome}%0AWhatsApp: ${whatsapp}%0AValor Total: R$ ${totalPagar},00`;
        window.location.href = `https://wa.me/${adminWhatsApp}?text=${mensagem}`;

        form.reset();
        numerosSelecionados = [];
        atualizarValorTotal();
        atualizarCampoNumeroEscolhido();
    });
});
