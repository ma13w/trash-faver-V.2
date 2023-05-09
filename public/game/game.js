const carta = document.getElementById('carta')
const plastica = document.getElementById('plastica')
const indf = document.getElementById('indf')
const pointText = document.getElementById('point')
const pointTextAll = document.getElementById('point')
const start = document.getElementById('start')
const bar = document.getElementById('bar')
const writeAll = document.getElementById('writeAll')
const writeTitle = document.getElementById('writeTitle')
const writeDesc = document.getElementById('writeDesc')

var startGame = false
var time = 30
function startFunction(){
    localStorage.setItem('point', 0)
    const lastPoint = localStorage.getItem('userPoint')
    localStorage.setItem('lastPoint',lastPoint)
    startGame = true
    start.style.display = 'none'
    
    const tempoIntervalGame = setInterval(() => {
        time = time - 4
        bar.style.width = time + "%"
        if(time <= 0){
            pointTextAll.style.color = 'red'
            // pointTextAll.innerHTML = 'GAME OVER'
            clearInterval(tempoIntervalGame)
            writeClick('FINITE TIME', point)
            localStorage.setItem('point', point)
            createUser()
            startGame = false
        }else if(time <= 50){
            bar.style.backgroundColor = 'red'
        }
    }, 1000);    
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

const rifiutiCarta = ['giornale', 'cartone']
const rifiutiPlastica = ['bottiglia', 'cannuccia']
const rifiutiIndf = ['pile', 'mascherina']

var rifiuti = [...rifiutiCarta, ...rifiutiPlastica]
rifiuti = [...rifiuti, ...rifiuti, ...rifiuti, ...rifiuti]
var rifiutiReload = [...rifiuti]
shuffle(rifiuti)
shuffle(rifiutiReload)

console.log(rifiuti);

for(i=0; i<6; i++){
    var element = document.getElementById(`img${i}`)
    element.classList.add(`${rifiuti[i]}`)
    element.src = `../assets/${rifiuti[i]}.png`
}
function cliccamiCarta(){
    var rifuito = document.getElementById('img0').classList[0]
    var carta = rifiutiCarta.includes(rifuito);
    removeLastItem(carta,'left')
}
function cliccamiPlastica(){
    var rifuito = document.getElementById('img0').classList[0]
    var plastica = rifiutiPlastica.includes(rifuito);
    removeLastItem(plastica, 'right')
}
function cliccamiIndf(){
    var rifuito = document.getElementById('img0').classList[0]
    var indf = rifiutiIndf.includes(rifuito);
    removeLastItem(indf, 'left')
}

var check = true
var check2 = true
var point = 0
var myTimeout
function removeLastItem(boolean, type){
    // if(boolean) {point++; move()}
    // if(!boolean) {point--; moveNegative()}

    if(startGame){
        if(boolean) {point++; checkHole()}
        if(!boolean) {point--;}
        pointText.innerText = point
        localStorage.setItem('point', point)
        createUser()
        
        if(boolean) {
            var element = document.getElementById('img0')
            if(type == 'right') element.classList.add('cliccatoR')
            if(type == 'left') element.classList.add('cliccatoL')
            myTimeout = setTimeout(removeLastItemDef, 300)
        }
    }
}

function removeLastItemDef(){
    pointText.innerText = point
    localStorage.setItem('point', point)
    createUser()
    time = time + 1

    var element = document.getElementById('img0')
    element.classList.remove(...element.classList)
    clearTimeout(myTimeout);

    const length = rifiuti.length
    for(i=0; i<length; i++){
        rifiuti[i] = rifiuti[i+1]
    }

    var random = Math.floor(Math.random() * rifiutiReload.length)
    rifiuti[length-1] = rifiutiReload[random]

    for(i=0; i<6; i++){
        var element = document.getElementById(`img${i}`)
        element.classList.remove(...element.classList)
        element.classList.add(rifiuti[i])
        element.src = `../assets/${rifiuti[i]}.png`
    }

    if (point == length/2 && check){
        rifiutiPlastica.push('penna')
        rifiutiPlastica.push('guanti')
        rifiutiCarta.push('libro')
        
        rifiutiReload = [...rifiutiCarta, ...rifiutiPlastica, ...rifiutiIndf]
        rifiutiReload = [...rifiutiReload, ...rifiutiReload, ...rifiutiIndf]
        shuffle(rifiutiReload)
        console.log(rifiutiReload, 'reload');

        indf.classList.remove('invisible')

        check = false
    }

    // if (point >= 40 && check2){
    //     console.log('Finish')
    //     writeClick('YOU ARE WIN', point)
    //     startGame = false
    //     check2 = false
    //     time = 0;

    //     localStorage.setItem('point', point)
    //     createUser()
    // }
}

function writeClick(title, description){
    writeTitle.innerText = title
    writeDesc.innerText = "point: " + description
    writeAll.style.display = 'block'
}

function restartGame(){
    window.location.reload()
}

const classificaDisp = document.getElementById('classificaAll')
function openClassifica(){
    // const fUserPoint = localStorage.getItem('userPoint')
    // if(fUserPoint > lastPoint){
    //     localStorage.setItem('lastPoint',fUserPoint)
    //     console.log(fUserPoint);
    // }

    writeAll.style.display = 'none'
    classificaDisp.style.display = 'block'
    printClassifica();
}

const hole = document.getElementById('hole')
hole.style.display = 'none'
var holeView = 1

function checkHole(){
    if(point === 8){
        hole.style.display = 'block'
        holeView++;
        const timeOut = setTimeout(() => {
            hole.style.display = 'none'
            clearTimeout(timeOut)
        }, 3000);
    }else if(point >= 15*holeView){
        hole.style.display = 'block'
        holeView++;
        const timeOut = setTimeout(() => {
            hole.style.display = 'none'
            clearTimeout(timeOut)
        }, 3000);
    }
}

function holeClick(){
    var element = document.getElementById('img0')
    element.classList.add('cliccatoS')
    setTimeout(() => {
        point++;
        pointText.innerText = point
        removeLastItemDef()
    }, 400);
    i = 0;
}


// TODO cercare di collegare firebase al progetto (col metodo del video yt per le richieste dati) e creare un realtime database su cui mettere la classifica di tutte le persone che giocano. Generare un nome random per ogni persona da salvare poi nel localStorage di chrome e quindi prenderlo ogni volta controllarlo nella lista dei giocatori (classifica) e poi se c'è indicare che quel giocatore sei tu










// const bar = document.getElementById('bar')
// const progress = document.getElementById('progress')
// var i = 0;
// var width = 0;
// var clickToggle = 0;
// function move() {
//     if (width <= 80) {
//         width = width + 10;
//         bar.style.width = width + "%";
//         bar.innerText = width + "%";

//         progress.style.backgroundColor = "black"
//         progress.style.padding = "0"
//     }
//     else if (width > 80) {
//         // bar.style.display = 'none'
//         // setInterval(() => {
//         //     hole.style.display = 'none'
//         //     bar.style.display = 'block'
//         // }, 4000);
//         progress.style.backgroundColor = "red"
//         if (clickToggle == 0) {  
//             progress.style.padding = "4px"
//             clickToggle = 1;
//         }
//         else {
//             progress.style.padding = "2px"  
//             clickToggle = 0;
//         }
//     }
// }
// var controll = false
// function checkBO(){
//     if (width>80) {
//         controll = true
//         hole.style.display = 'block'
//         bar.style.display = 'none'
//         setInterval(() => {
//             hole.style.display = 'none'
//             bar.style.display = 'block'
//         }, 4000);
//     }
// }
// function moveNegative() {
//     if (width >= 0) {
//         width = width - 5;
//         bar.style.width = width + "%";
//         bar.innerText = width + "%";
//     }
// }