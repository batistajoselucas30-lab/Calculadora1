const display = document.getElementById('display');

// Controla se o conteúdo atual é o resultado de um cálculo anterior
let reinicializarDisplay = false;

// Limite máximo de caracteres permitidos no display
const LIMITE_CARACTERES = 18;

function adicionarCaractere(caractere) {
    // Se o display mostra apenas '0' ou precisa ser reiniciado após um cálculo
    if (display.textContent === '0' || reinicializarDisplay) {
        if (caractere === ',') {
            display.textContent = '0,';
        } else {
            display.textContent = caractere;
        }
        reinicializarDisplay = false;
        return;
    }

    // Trava a digitação se atingir o limite máximo de caracteres
    if (display.textContent.length >= LIMITE_CARACTERES) {
        return;
    }

    display.textContent += caractere;
}

function Limpar() {
    display.textContent = '0';
    reinicializarDisplay = false;
}

function inverterSinal() {
    let valor = display.textContent;

    if (valor !== '0') {
        if (valor.startsWith('-')) {
            display.textContent = valor.substring(1);
        } else {
            // Garante que inverter o sinal não ultrapasse o limite
            if (valor.length < LIMITE_CARACTERES) {
                display.textContent = '-' + valor;
            }
        }
    }
}

function Calcular() {
    try {
        let expressao = display.textContent;

        expressao = expressao.replaceAll('x', '*');
        expressao = expressao.replaceAll(':', '/');
        expressao = expressao.replaceAll(',', '.');
        expressao = expressao.replaceAll('%', '/100');

        let resultado = eval(expressao);

        // Arredonda se o resultado tiver muitas casas decimais para não estourar o display
        if (typeof resultado === 'number' && !Number.isInteger(resultado)) {
            resultado = Number(resultado.toFixed(6)); // Limita a 6 casas decimais
        }

        display.textContent = String(resultado).replaceAll('.', ',');
        
        reinicializarDisplay = true;
    } catch (erro) {
        display.textContent = 'Erro';
        reinicializarDisplay = true;
    }
}