let numerosSorteados = []
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate : 1.2});
}

function textiInicial() {
    exibirTextoNaTela('h1','jogo do número secreto' );
exibirTextoNaTela('p', `escolha um número entre 1 e ${numeroLimite}`);
}

textiInicial()

function verificarChute() {
    let chute=document.querySelector('input').value;
    let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
    let mensagem = `você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

    if(chute == numeroSecreto) {
        exibirTextoNaTela ('h1' , 'acertou');
        exibirTextoNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'o número secreto é menor que o chute');
        } else {
            exibirTextoNaTela('p', 'o número secreto é maior que o chute');
        }
        tentativas++;
        limparCampo()
    }
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadesDeNumeros = numerosSorteados.length;

    if(quantidadesDeNumeros == numeroLimite) {
        numerosSorteados = []
}

   if(numerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    numerosSorteados.push(numeroEscolhido);
    console.log(numerosSorteados);
    return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    textiInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true)
}