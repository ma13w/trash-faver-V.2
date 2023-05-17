//SCRIPT PER FUNZIONAMENTO VIDEOGIOCO

//dichiarazione variabili di tutti gli elementi di gioco
const carta = document.getElementById('carta')
const plastica = document.getElementById('plastica')
const metallo = document.getElementById('metallo')
const vetro = document.getElementById('vetro')
const pointText = document.getElementById('point')
const pointTextAll = document.getElementById('point')
const start = document.getElementById('start')
const bar = document.getElementById('bar')
const writeAll = document.getElementById('writeAll')
const writeTitle = document.getElementById('writeTitle')
const writeDesc = document.getElementById('writeDesc')

//configurazione impostazioni videogioco
var startGame = false
var time = 160
function startFunction(){
    localStorage.setItem('point', 0)
    const lastPoint = localStorage.getItem('userPoint')
    localStorage.setItem('lastPoint',lastPoint)
    startGame = true
    start.style.display = 'none'
    
    //inizializzazione timer videogioco
    const tempoIntervalGame = setInterval(() => {
        time = time - 4
        bar.style.width = time + "%"
        if(time <= 0){

            //controllo fine del tempo, fine del videogioco
            pointTextAll.style.color = 'red'
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

//smistamento dei vari rifiuti nel tutnnel verde
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

//generazione dei rifiuti
const rifiutiCarta = ['giornale', 'cartone', 'pizza', 'sacchettoC']
const rifiutiPlastica = ['bottigliaP', 'succo', 'contenitoreP']
const rifiutiMetallo = ['lattina', 'lattina2', 'latta', 'latta2', 'bomboletta']
const rifiutiVetro = ['bottigliaV', 'bottigliaV2', 'contenitoreV']

var rifiuti = [...rifiutiCarta, ...rifiutiPlastica]
rifiuti = [...rifiuti, ...rifiuti, ...rifiuti, ...rifiuti]
var rifiutiReload = [...rifiuti]
shuffle(rifiuti)
shuffle(rifiutiReload)

console.log(rifiuti);

//collegamento immagini ad ogni rifiuto
for(i=0; i<6; i++){
    var element = document.getElementById(`img${i}`)
    element.classList.add(`${rifiuti[i]}`)
    element.src = `./image/trash/${rifiuti[i]}.png`
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
function cliccamiMetallo(){
    var rifuito = document.getElementById('img0').classList[0]
    var metallo = rifiutiMetallo.includes(rifuito);
    removeLastItem(metallo, 'left')
}
function cliccamiVetro(){
    var rifuito = document.getElementById('img0').classList[0]
    var vetro = rifiutiVetro.includes(rifuito);
    removeLastItem(vetro, 'right')
}

//dichiarazione variabili di controllo
var check = true
var check2 = true
var point = 0
var myTimeout

//funzione "click" di ogni bidone
function removeLastItem(boolean, type){
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

//rimozione grafica dell'ultimo elemento nella lista al "click" del bidone corretto
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
        element.src = `./image/trash/${rifiuti[i]}.png`
    }

    //aggiunta di ulteriori rifiuti e bidoni all'elenco iniziale
    if (point == length/2 && check){
        rifiutiReload = [...rifiutiCarta, ...rifiutiPlastica, ...rifiutiMetallo]
        rifiutiReload = [...rifiutiReload, ...rifiutiMetallo]

        shuffle(rifiutiReload)
        console.log(rifiutiReload, 'reload');

        metallo.classList.remove('invisible')

        check = false
    }

    if(point >= length/1.5 && check){
        rifiutiReload = [...rifiutiCarta, ...rifiutiPlastica, ...rifiutiVetro]
        rifiutiReload = [...rifiutiReload, ...rifiutiVetro]

        shuffle(rifiutiReload)
        console.log(rifiutiReload, 'reload');

        vetro.classList.remove('invisible')

        check = false
    }
}

//aggiornamento del punteggio
function writeClick(title, description){
    writeTitle.innerText = title
    writeDesc.innerText = "point: " + description
    writeAll.style.display = 'block'
}

//funzione per ricomniciare il gioco
function restartGame(){
    window.location.reload()
}

//alla fine della partita, stampa della classifica con punteggi
//classifica generata assieme agli utenti in "script.js"
const classificaDisp = document.getElementById('classificaAll')
function openClassifica(){
    writeAll.style.display = 'none'
    classificaDisp.style.display = 'block'
    printClassifica();
}


const hole = document.getElementById('hole')
hole.style.display = 'none'
var holeView = 1

//creazione buco nero, indifferenziata
function checkHole(){
    if(point === 10){
        hole.style.display = 'block'
        holeView++;
        const timeOut = setTimeout(() => {
            hole.style.display = 'none'
            clearTimeout(timeOut)
        }, 2000);
    }else if(point >= 15*holeView){
        hole.style.display = 'block'
        holeView++;
        const timeOut = setTimeout(() => {
            hole.style.display = 'none'
            clearTimeout(timeOut)
        }, 2000);
    }
}

//rimozione ultimo elemento al "click" del buco nero
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