
let textPrompt, buttonPrompt, name, question, cHealth, cAttack, cDefense, cSpeed, info
const character = {
    name : null,
    health : 0,
    attack : 0,
    defense : 0,
    speed : 0
}

const monsters = [
    {
        name : "Varg",
        health : 5,
        attack : 4,
        defense : 0,
        speed : 3,
        info : "En vild varg går till attack!",
        winText : "Grattis! Du dödade vargen och tillagar den. +2 liv.",
        win : (m) => {increaseStats(2,0,0); m.health = 5}
    },
    {
        name : "Spöke",
        health : 3,
        attack : 7,
        defense : 1,
        speed : 4,
        info : "Det dök upp ett vilt spöke.",
        winText : "Du har besergrat spöket! Du belönas med +1 attack.",
        win :(m) => {increaseStats(0,1,0); m.health = 3}
    },
    {
        name : "Riddare",
        health : 4,
        attack : 5,
        defense : 2,
        speed : 3,
        win : (m) => {increaseStats(0,0,1); m.health = 4},
        info : "Det dök upp en vild Riddare ",
        winText : "Du har besegrat Riddaren och beslag tar hans rustning. +1 försvar"
    },
    {
        name : "Troll",
        health : 3,
        attack : 5,
        defense : 2,
        speed : 3,
        win : (m) => {increaseStats(1,1,0); m.health = 3},
        info : "Det dök upp ett vilt troll",
        winText :"Du har besegrat trollet och belönas med ytterligare stats. +1 liv och +1 attack."
    }
]

/** This code runs when the page is loaded */
function onBodyLoad(){
    initDivs()
    initCharacter()
}


function startGame(){
    fightRandom()
}

function initDivs(){
    textPrompt = document.getElementById("text-prompt")
    buttonPrompt = document.getElementById("button-prompt")
    question = document.getElementById("question")
    info = document.getElementById("info")
    
    cHealth = document.getElementById("charater-health")
    cAttack = document.getElementById("charater-attack")
    cDefense = document.getElementById("charater-defense")
    cSpeed = document.getElementById("charater-speed")

    textPrompt.style.display = "none"
    buttonPrompt.style.display = "none"
}

function setStats(h, a, d, s){
    character.health = h
    character.attack = a
    character.defense = d
    character.speed = s
    updateStats()
}

function updateStats(){
    cHealth.innerHTML = "Liv: " + character.health
    cAttack.innerHTML = "Attack: " + character.attack
    cDefense.innerHTML = "Försvar: " + character.defense
    cSpeed.innerHTML = "Initiativ: " + character.speed
}

function increaseStats(h, a, d){
// alert("INCREASE " + character.health)
    character.health += h
    character.attack += a
    character.defense += d
// alert("INCREASE " + character.health)
    updateStats()
}

/** Prompt the user for their name and set the characters name */
function setName(){
    nameInput = prompt("Hej! Vänligen skriv ditt namn: ")
    name = document.getElementById("character-name").innerHTML = "Namn: " + nameInput
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
        () => {setStats(4,5,0,5); startGame()},
        () => {setStats(6,3,1,3); startGame()}, 
        () => {setStats(5,5,1,4); startGame()}, 
        () => {setStats(8,3,2,2); startGame()} 
    ]
    populateButtons(classes, fun)

}

function populateButtons(options, fun){
    buttonPrompt.innerHTML = ""

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

function setInfo(str){
    info.innerHTML = str
}

function initCharacter(){
    setName()  
    choseClass()
}

function gameOver(){
    prompt("You lost")
}

function fightMonster(monster){
    let atk = monster.attack - character.defense
    character.health -= atk < 0 ? 0 : atk
    //alert("CHARACTER LOST HEALTH " + atk)
}

function fightCharacter(monster){
    let atk = character.attack - monster.defense
    monster.health -= atk < 0 ? 0 : atk
    //alert("MONSTER LOST HEALTH " + atk)
}

function attack(monster){
    if(monster.speed <= character.speed){
        fightCharacter(monster)
        if(monster.health <= 0){
            beat(monster)
            return
        }
        fightMonster(monster)
    }
    else{
        fightMonster(monster)
        if(character.health <= 0){
            gameOver()
            return
        }
        fightCharacter(monster)
    }
    
    if(monster.health <= 0){
        beat(monster)
    }
    else if(character.health <= 0){
        gameOver()
    }
    else{
        fight(monster)
    }

}

function beat(monster){
    setInfo(monster.winText)
    monster.win(monster)
    populateButtons(["Gå vidare"], [() => fightRandom()] )
}

function fightRandom(){
    let i = Math.floor(Math.random() * monsters.length);
    fight(monsters[i])
}

function escape(monster){
    // TODO
}

function getMonsterStats(monster){
    let str = "Liv: " + monster.health + ", "
    str += "Attack: " + monster.attack + ", "
    str += "Försvar: " + monster.defense + ", "
    str += "Initiativ: " + monster.speed + "<br/> <br>"
    return str
}

function fight(monster){
    setInfo(monster.info)
    setQuestion(getMonsterStats(monster))
    updateStats()
    options = [
        "Attckera" , 
        "Fly (50% -4 liv)"
    ]
    fun = [
        () => attack(monster),
        () => escape(monster)
    ]
    populateButtons(options, fun)
}

function showButtonPrompt(){
    buttonPrompt.style.display = "block"
}

function hideButtonPrompt(){
    setQuestion("")
    buttonPrompt.style.display = "none"
}

function showTextPrompt(){ 
    textPrompt.style.display = "block"
}

function hideTextPrompt(){ 
    setQuestion("")
    textPrompt.style.display = "none"
}