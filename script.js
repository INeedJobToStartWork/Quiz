const roundTemplate = document.querySelector("[data-round-template]")
const tempContainer = document.querySelector("main");
const timeLine = document.getElementById("timeLine");
// let toDelete;
let roundNumber = 0;

class Quiz{
    constructor(author,title,time,... pytanko){
        this.author = author;
        this.title = title;
        this.time = time;
        this.questions = pytanko;
    }
}
class question{
    constructor(title,answers){
        this.title = title;
        this.answers = answers;
    }
}
const test = new Quiz(
    "INJ",
    "Title",
    3,
    new question("Question 1",["10","12","13","14"]),
    new question("Question 2",["10","12","13","14"]),
    new question("Question 3",["10","12","13","14"]),
    new question("Question 4",["10","12","13","14"]),
    new question("Question 5",["10","12","13","14"]),
    new question("Question 6",["10","12","13","14"]),

)

function roundStart(){
    const card = roundTemplate.content.cloneNode(true)
    questionWrite(card);
    answersWrite(card);
    updateMain(card)
    restartTimer()
    window.timerWorker = setTimeout(() => {
        timer(test.time,timeLine.offsetWidth)
    }, 1000);
    roundNumber++;
    
    let btnOption = document.querySelectorAll(".option");
    btnOption.forEach(item => {
        item.addEventListener("click",() => {
            
            clearTimeout( timerWorker);
            nextRound();
        })
    })
    
}
  

function nextRound(){
    if(roundNumber == test.questions.length){clearTimeout( timerWorker );return console.log("The End")}
    setTimeout(()=>{roundStart()},100)
}
function questionWrite(card){
    return card.querySelector("#question").textContent = test.questions[roundNumber].title
}
function answersWrite(card){
    const answerBtns = [...card.querySelectorAll(".option")];
    answerBtns.forEach((item,index) =>{item.textContent = test.questions[roundNumber].answers[index]})
}
function updateMain(content){
    tempContainer.innerHTML = "";
    tempContainer.append(content);
}
function restartTimer(){timeLine.style.width = "100%";}


function timer(time,basicwidth) {
    duringtime = 10/(time * 1000);
    if(timeLine.offsetWidth < basicwidth * duringtime){timeLine.style.width = 0;return nextRound();}
    if(timeLine.offsetWidth > 0){
        timeLine.style.width = `${timeLine.getBoundingClientRect().width - (basicwidth * duringtime) }px`
        return timerWorker = setTimeout(() => { timer(time,basicwidth) }, 10);
    }
}

roundStart()

