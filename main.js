
let textPrompt, buttonPrompt, name, question, cHealth, cAttack, cDefense
const character = {
    name : null,
    health : 0,
    attack : 0,
    defense : 0
}

/** This code runs when the page is loaded */
function onBodyLoad(){
    initDivs()
    initCharacter()
}

function initDivs(){
    textPrompt = document.getElementById("text-prompt")
    buttonPrompt = document.getElementById("button-prompt")
    question = document.getElementById("question")
    
    cHealth = document.getElementById("charater-health")
    cAttack = document.getElementById("charater-attack")
    cDefense = document.getElementById("charater-defense")

    textPrompt.style.display = "none"
    buttonPrompt.style.display = "none"
}

function setStats(h, a, d){
    character.health = h
    character.attack = a
    character.defense = d

    cHealth.innerHTML = "Health: " + h
    cAttack.innerHTML = "Attack: " + a
    cDefense.innerHTML = "Defence: " + d
}

/** Prompt the user for their name and set the characters name */
function setName(){
    nameInput = "Lucas" //prompt("Hej! Vänligen skriv ditt namn: ")
    name = document.getElementById("character-name").innerHTML = "Name: " + nameInput
    character.name = nameInput
}

/** Lets the player chose a class */
function choseClass(){
    setQuestion("Välj en class att spela som.")
    let classes = [
        "Rogue", 
        "Druid", 
        "Paladin", 
        "Warrior"
    ]
    let fun = [
        () => {setStats(3,7,4)},
        () => {setStats(6,3,7)}, 
        () => {setStats(5,5,5)}, 
        () => {setStats(5,2,8)} 
    ]
    populateButtons(classes, fun)

}

function populateButtons(options, fun){
    for(let i = 0 ; i < options.length ; i++){
        let button = document.createElement("button")
        button.innerHTML = options[i]
        button.addEventListener("click", () => hideButtonPrompt())
        button.addEventListener("click", fun[i])
        buttonPrompt.appendChild(button)
    }
    showButtonPrompt()
}

function setQuestion(str){
    question.innerHTML = str
}

function initCharacter(){
    setName()  
    choseClass()
}

function showButtonPrompt(){
    buttonPrompt.style.display = "block"
}

function hideButtonPrompt(){
    question.innerHTML = ""
    buttonPrompt.style.display = "none"
}

function showTextPrompt(){ 
    textPrompt.style.display = "block"
}

function hideTextPrompt(){ 
    question.innerHTML = ""
    textPrompt.style.display = "none"
}