
let imageCont = 0
let numeroCartas ='';
let images =[
    'images/bobrossparrot.gif',
    'images/explodyparrot.gif',
    'images/fiestaparrot.gif',
    'images/metalparrot.gif',
    'images/revertitparrot.gif',
    'images/tripletsparrot.gif',
    'images/unicornparrot.gif',

]
let arrayImageSorted = []
let lengthArrayImage =''
let matchCard = [undefined,undefined]
let cardWay = []
let matchCount = 0
let contTests=0
contarCartas()

function sortingImages(img,lengthArrayImage) {
    for (let i = 0; i < lengthArrayImage; i++) {
        arrayImageSorted.push(img[i])
        arrayImageSorted.push(img[i])     
    }
    return arrayImageSorted.sort(comparador)
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
        if(cont % 2 == 0 ){
            imageCont = imageCont +1
        }
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
    cardRotate.classList.toggle('rotate')
    let cardBackFace = cardRotate.querySelector('.back-face')
    let cardFrontFace = cardRotate.querySelector('.front-face')
    cardBackFace.classList.remove('hidden')
    cardFrontFace.classList.add('hidden')
    cardWay.push(cardRotate)
    verifyCards(cardRotate)
    contTests += 1;
  
}

function verifyCards(cardRotate) {
    // ADICIONA A ARRAY MATCHCARD OS VALORES CLICKADOS 1 E 2
    let cardFront1 = cardWay[0].querySelector('.front-face')
    let cardBack1 = cardWay[0].querySelector('.back-face')
    let cardFront2 = cardWay[1].querySelector('.front-face')
    let cardBack2 = cardWay[1].querySelector('.back-face')
    if (cardWay[0].innerHTML == cardWay[1].innerHTML && cardWay[1] != undefined) {
        console.log('acertou');
        cardWay.splice(0)
        cardWay.splice(1)
        matchCount++;
        verifyFinished()

    }else if(cardWay[1] != undefined) {
        setTimeout(()=>{
                cardFront1.classList.remove('hidden')
                cardBack1.classList.add('hidden')
                cardFront2.classList.remove('hidden')
                cardBack2.classList.add('hidden')
                cardWay[0].classList.toggle('rotate')
                cardWay[1].classList.toggle('rotate')
                cardWay.splice(0)
                cardWay.splice(1)
            },1000)
    

    }else{
        console.log('nada acontece');
    }
    
}
function comparador() {
    return Math.random() - 0.5; 
}
function verifyFinished() {
    setTimeout(()=>{
           if(matchCount == lengthArrayImage){
        alert(`VocÊ conseguiu em ${contTests} tentativas`)
    }
    },500)
   
}