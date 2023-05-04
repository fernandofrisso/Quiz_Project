//INITIAL DATA

let currentQuestion = 0; //variável que vai armazenar a questão atual (o array começa do zero, por isso a questão 1 é a 0)

let correctAnswers = 0; //respostas corretas

showQuestion();

//events

document.querySelector(".scoreArea button").addEventListener('click', resetEvent)


//FUNCTION

function showQuestion(){

    if(questions[currentQuestion]) { // se existe a questão

        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);; // faço uma conta matematica para saber a movimentação da barra verde - questão atual dividido pelo numero de questoes, vezes 100

        document.querySelector('.progress--bar').style.width = `${pct}%`; //minha barra vai andar conforme a porcentagem

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block'; //faz aparecer a questão

        // Pra fica didático isso aquivale a = document.querySelector('.questionArea').innerHtml = questions[0].question (ou seja, vamos até o json queestions e pegamos a question do primeiro array)
        // no caso usamos a currentQuest para ficar dinamico
        document.querySelector('.question').innerHTML = q.question;
        
        let optionsHtml = "";

        for(let i in q.options){ // dei um loop para buscar todas as opções de respostas

            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`; // parseInt tem a função de tranformar em numero inteiro para que ele faça a soma e apareça a numeração das alternativas de forma correta

        }

        document.querySelector('.options').innerHTML = optionsHtml

        // evento do click nas alternativas(options)

        document.querySelectorAll(".options .option").forEach(item =>{

            item.addEventListener('click', optionClickEvent)
        })


    } else { // caso contrário acabou as questões 

        finishQuiz();
    }

}

function optionClickEvent(e){

    let clickedOption = parseInt(e.target.getAttribute('data-op')) //quando eu clicar eu pego o atributo de data-op // parseInt é pra deixar como inteiro, visto que sem a função vai retorna um string

    if(questions[currentQuestion].answer === clickedOption){

        correctAnswers++; // toda vez que eu acertar uma pergunta eu vou aumentar 1 acerto

    } else{

        finishQuiz()

    }

    //agora toda vez que eu responder um pergunta, eu preciso que o sistema me leve para a proxima pergunta

    currentQuestion++; // isso fara com que toda vez que eu clicar na resposta, o index da pergunta vai aumentar + 1 e me levará até a proxima pergunta

    showQuestion()

}


function finishQuiz(){

    let points = Math.floor((correctAnswers / questions.length) * 100);


    if ( points >= 80) {

        document.querySelector('.scoreText1').innerHTML = 'Parabéns'
        document.querySelector('.scorePct').style.color = "blue"

    } else if (points >= 50){

        document.querySelector('.scoreText1').innerHTML = 'Muito Bom';
        document.querySelector('.scorePct').style.color = "green"

    } else { 

        document.querySelector('.scoreText1').innerHTML = 'Precisa Melhorar';
        document.querySelector('.scorePct').style.color = "red"

    }


    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

 


    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none'; 
    document.querySelector('.progress--bar').style.width = '100%';

}

//função para limpar tudo

function resetEvent() {
    
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}