const roundTemplate = document.querySelector("[data-round-template]")
const tempContainer = document.querySelector("main");
const timeLine = document.getElementById("timeLine");
// let toDelete;
let timerStatus;
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
    timerStatus = true
    questionWrite(card);
    answersWrite(card);
    updateMain(card)
    restartTimer()
    setTimeout(() => {timer(test.time,timeLine.offsetWidth)},1000)
    
    roundNumber++;
    
    let btnOption = document.querySelectorAll(".option");
    btnOption.forEach(item => {
        item.addEventListener("click",() => {
            timerStatus = false;
            setTimeout(()=>{nextRound()},500)
        })
    })    
}
  

function nextRound(){
    if(roundNumber == test.questions.length){return console.log("The End")}
    roundStart()
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
    // toDelete = toDelete ?? Math.floor(basicwidth * duringtime);
    duringtime = 10/(time * 1000);
    if(timerStatus){
        if(timeLine.offsetWidth < basicwidth * duringtime){timeLine.style.width = 0;timeStatus = false;return nextRound();}
        if(timeLine.offsetWidth > 0){
            timeLine.style.width = `${timeLine.getBoundingClientRect().width - (basicwidth * duringtime) }px`
            return setTimeout(() => { timer(time,basicwidth) }, 10);
        }
    }
}

roundStart()

