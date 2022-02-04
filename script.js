let images =[
    
    'images/bobrossparrot.gif',
    'images/explodyparrot.gif',
    'images/fiestaparrot.gif',
    'images/metalparrot.gif',
    'images/revertitparrot.gif',
    'images/tripletsparrot.gif',
    'images/unicornparrot.gif',
    
]
let imageCont = 0
let numeroCartas ='';
let arrayImageSorted = []
let lengthArrayImage =''
let matchCard = [undefined,undefined]
let cardWay = []
let matchCount = 0
let contPLays=0

let jogador  = 1
let jogador1 = 0
let jogador2 = 0
let contp1 = 0
let contp2 = 0
let winnerplayer = 0
let whowin = ''

let minutes = ''
let seconds = 0
contarCartas()

setInterval(() => {
    seconds ++;
    if (seconds ===60) {
        minutes ++;
        seconds =0
    }
    if (minutes >= 1) {
        document.querySelector('.minutes').innerHTML = `${minutes}:`
    }
    document.querySelector('.seconds').innerHTML = seconds
}, 1000);


function sortingImages(img,lengthArrayImage) {
    for (let i = 0; i < lengthArrayImage; i++) {
        arrayImageSorted.push(img[i])
        arrayImageSorted.push(img[i])     
    }
   return  arrayImageSorted.sort(comparador)
}

function contarCartas() {
    numeroCartas = Number(prompt('Com quantas cartas deseja jogar?(4 a 14)'))
    if( numeroCartas < 4 || numeroCartas > 14 || numeroCartas % 2 != 0){
        contarCartas()
    }else{
        lengthArrayImage = numeroCartas/2
        sortingImages(images,lengthArrayImage)
        createCard(numeroCartas)
        
    }
}

function createCard(numeroCartas) {
    for (let cont = 0; cont < numeroCartas; cont++) {
     
        // criador de cartas
        let divMae = document.querySelector('.game')
        divMae.innerHTML += 
        `   <div class="card" onclick='turnCard(this)'>
        <div class ='card front-face'>
        <img class ='image-papagaio' src="images/front.png" alt="papagaio"/>  
        </div>     
        <div class ='card back-face hidden'>
        <img class='imagem-desvirada' src='${arrayImageSorted[cont]}' alt='' />
        </div>  
        </div>`
    }
}

function turnCard(cardRotate) {
        cardRotate.classList.add('rotate')
    let cardBackFace = cardRotate.querySelector('.back-face')
    let cardFrontFace = cardRotate.querySelector('.front-face')
    cardBackFace.classList.remove('hidden')
    cardFrontFace.classList.add('hidden')
    cardRotate.removeAttribute('onclick')
    if (jogador == 1) {
        let cardchoice = cardRotate.querySelector('.back-face')
        cardchoice.classList.add('borderp1')
        
    }else{
        let cardchoice = cardRotate.querySelector('.back-face')
        cardchoice.classList.add('borderp2')
    }
    cardWay.push(cardRotate)
    verifyCards()
    contPLays += 1;
}

function verifyCards() {
    // ADICIONA A ARRAY MATCHCARD OS VALORES CLICKADOS 1 E 2
    let cardFront1 = cardWay[0].querySelector('.front-face')
    let cardBack1 = cardWay[0].querySelector('.back-face')
    let cardFront2 = cardWay[1].querySelector('.front-face')
    let cardBack2 = cardWay[1].querySelector('.back-face')
    if (cardWay[0].innerHTML == cardWay[1].innerHTML && cardWay[1] != undefined) {
        cardWay.splice(0)
        cardWay.splice(1)
        matchCount++;
        if (jogador ==1) {
            jogador1 ++;
            contp1++;
            document.querySelector('.scorep1').innerHTML =contp1
        }else{
            jogador2 ++;
            contp2++;
            document.querySelector('.scorep2').innerHTML =contp2
        }
        verifyFinished()
    }else if(cardWay[1] != undefined) {
        setTimeout( () => {
                cardFront1.classList.remove('hidden')
                cardBack1.classList.add('hidden')
                cardFront2.classList.remove('hidden')
                cardBack2.classList.add('hidden')
                cardWay[0].classList.toggle('rotate')
                cardWay[1].classList.toggle('rotate')
                cardWay[0].setAttribute('onclick','turnCard(this)')
                cardWay[1].setAttribute('onclick','turnCard(this)')
                cardWay.splice(0)
                cardWay.splice(1)
            },1000)
            if (jogador == 1) {
                jogador = 2
                contp1++
               cardBack1.classList.remove('borderp1')
               cardBack2.classList.remove('borderp1')
               document.querySelector('.scorep1').innerHTML =contp1
            }else{
                jogador =1
                contp2++;
                cardBack1.classList.remove('borderp2')
               cardBack2.classList.remove('borderp2')
               document.querySelector('.scorep2').innerHTML =contp2
            }
        }
}

function comparador() {
    return Math.random() - 0.5; 
}

function verifyFinished() {
    setTimeout(()=>{
            if (jogador1 >jogador2) {
                winnerplayer = contp1
                whowin ='Player1'
            }else{
                winnerplayer = contp2
                whowin ='Player2'
            }
           if(matchCount == lengthArrayImage){
               if(minutes != ''){
                alert(`${whowin} venceu em ${winnerplayer} tentativas e ${minutes}minutos em ${seconds} segundos!`)
               }else{
                alert(`${whowin} venceu em ${winnerplayer} tentativas em ${seconds} segundos!`)}
        let question = prompt('Voces desejam começar um novo jogo? [y]/[n]?')
        if (question.toUpperCase() == 'Y') {
            resetGame()
        }
    }
    },500)
   
}

function resetGame() {
    let documentall = document.querySelector('.game')
    documentall.innerHTML =''
    numeroCartas ='';
    imageCont = 0
    arrayImageSorted = []
    lengthArrayImage =''
    matchCard = [undefined,undefined]
    cardWay = []
    matchCount = 0
    contPLays=0
    jogador  = 1
    jogador1 = 0
    jogador2 = 0
    winnerplayer = 0
    whowin = ''
    contp1 = 0
    contp2 = 0
    minutes = ''
    seconds = 0
    document.querySelector('.scorep1').innerHTML =contp1
    document.querySelector('.scorep2').innerHTML =contp2
    contarCartas()
}