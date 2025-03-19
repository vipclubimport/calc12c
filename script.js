let pilha = [];
let entradaAtual = '';

function atualizarTela() {
    const tela = document.querySelector('.tela');
    if (pilha.length > 0) {
        tela.textContent = pilha[pilha.length - 1];
    } else {
        tela.textContent = '0';
    }
}

function empilharNumero() {
    if (entradaAtual !== '') {
        pilha.push(parseFloat(entradaAtual));
        entradaAtual = '';
        atualizarTela();
    }
}

function operacao(op) {
    if (pilha.length >= 2) {
        let b = pilha.pop();
        let a = pilha.pop();
        let resultado;
        switch (op) {
            case '+':
                resultado = a + b;
                break;
            case '-':
                resultado = a - b;
                break;
            case '*':
                resultado = a * b;
                break;
            case '/':
                resultado = a / b;
                break;
            default:
                return;
        }
        pilha.push(resultado);
        atualizarTela();
    }
}

function calcularFV() {
    if (pilha.length >= 3) {
        let n = pilha.pop();
        let i = pilha.pop();
        let pv = pilha.pop();
        let fv = pv * Math.pow(1 + i, n);
        pilha.push(fv);
        atualizarTela();
    }
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const valor = button.textContent;
        if (!isNaN(valor) || valor === '.') {
            entradaAtual += valor;
            document.querySelector('.tela').textContent = entradaAtual;
        } else if (valor === 'ENTER') {
            empilharNumero();
        } else if (valor === 'FV') {
            calcularFV();
        } else {
            operacao(valor);
        }
    });
});