
let textPrompt, buttonPrompt, name, question
const character = {
    name : null,
    health : 0,
    attack : 0,
    defense : 0
}

/** This code runs when the page is loaded */
function onBodyLoad(){
    initCharacter()

    textPrompt = document.getElementById("text-prompt")
    buttonPrompt = document.getElementById("button-prompt")
    question = document.getElementById("question")
    
    textPrompt.style.display = "none"
    buttonPrompt.style.display = "none"

}

/** Prompt the user for their name and set the characters name */
function setName(){
    nameInput = "Lucas" //prompt("Hej! Vänligen skriv ditt namn: ")
    name = document.getElementById("character-name").innerHTML = nameInput
    character.name = nameInput
}

/** Lets the player chose a class */
function choseClass(){
    setQuestion("Välj en class att spela som.")
    populateButtons()
    
}

function populateButtons(obj){
    //TODO
}

function setQuestion(str){
    question.innerHTML = str
}

function initCharacter(){
    setName()  
    choseClass()
}

function showButtonPrompt(){
    textPrompt.style.display = "none"
    buttonPrompt.style.display = "block"
}

function showTextPrompt(){ 
    textPrompt.style.display = "block"
    buttonPrompt.style.display = "none"
}