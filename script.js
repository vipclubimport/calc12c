let pilha = [];
let entradaAtual = '';
let memoria = { n: 0, i: 0, pv: 0, pmt: 0, fv: 0, cf: [] }; // Armazena valores financeiros

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
            case '1/x': resultado = 1 / a; break;
            case 'SQRT': resultado = Math.sqrt(a); break;
            case 'Δ%': resultado = ((b - a) / a) * 100; break;
            default: return;
        }
        pilha.push(resultado);
        atualizarTela();
    }
}

function calcularFV() {
    let pv = memoria.pv;
    let i = memoria.i / 100; // Taxa em decimal
    let n = memoria.n;
    let fv = pv * Math.pow(1 + i, n);
    pilha.push(fv);
    atualizarTela();
}

function calcularPV() {
    let fv = memoria.fv;
    let i = memoria.i / 100;
    let n = memoria.n;
    let pv = fv / Math.pow(1 + i, n);
    pilha.push(pv);
    atualizarTela();
}

function calcularNPV() {
    let cf = memoria.cf; // Fluxos de caixa
    let i = memoria.i / 100;
    let npv = cf.reduce((acc, val, idx) => acc + val / Math.pow(1 + i, idx), 0);
    pilha.push(npv);
    atualizarTela();
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const valor = button.textContent;
        
        // Números e ponto
        if (!isNaN(valor) || valor === '.') {
            entradaAtual += valor;
            document.querySelector('.tela').textContent = entradaAtual;
        }
        // Enter empilha o número
        else if (valor === 'ENTER') {
            empilharNumero();
        }
        // Operações matemáticas
        else if (['+', '-', '*', '/', '1/x', 'SQRT', 'Δ%'].includes(valor)) {
            operacao(valor);
        }
        // Funções financeiras
        else if (valor === 'n') {
            empilharNumero();
            memoria.n = pilha.pop();
        }
        else if (valor === 'i') {
            empilharNumero();
            memoria.i = pilha.pop();
        }
        else if (valor === 'PV') {
            empilharNumero();
            memoria.pv = pilha.pop();
            calcularPV();
        }
        else if (valor === 'FV') {
            empilharNumero();
            memoria.fv = pilha.pop();
            calcularFV();
        }
        else if (valor === 'CFj') {
            empilharNumero();
            memoria.cf.push(pilha.pop());
        }
        else if (valor === 'NPV') {
            calcularNPV();
        }
        else if (valor === 'CLX') {
            entradaAtual = '';
            atualizarTela();
        }
        else if (valor === 'CHS') {
            if (entradaAtual) entradaAtual = (-parseFloat(entradaAtual)).toString();
            document.querySelector('.tela').textContent = entradaAtual;
        }
    });
});