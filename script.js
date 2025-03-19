let pilha = [];
let entradaAtual = '';

function atualizarTela() {
    const tela = document.querySelector('.tela');
    if (pilha.length > 0) {
        tela.textContent = pilha[pilha.length - 1].toFixed(2);
    } else {
        tela.textContent = '0.00';
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
            case '+': resultado = a + b; break;
            case '-': resultado = a - b; break;
            case '*': resultado = a * b; break;
            case '/': resultado = a / b; break;
            default: return;
        }
        pilha.push(resultado);
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
        } else if (['+', '-', '*', '/'].includes(valor)) {
            operacao(valor);
        } else if (valor === 'CLX') {
            entradaAtual = '';
            atualizarTela();
        }
        // Adicione mais lógica para outros botões conforme necessário
    });
});