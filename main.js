
let buttonPrompt, name, monsterInfo, 
cHealth, cAttack, cDefense, cSpeed, 
info, monsterImage, monster, characterImage,
mHealth, mAttack, mDefense, mSpeed
 
const character = {
    name : null,
    health : 0,
    attack : 0,
    defense : 0,
    speed : 0
}

const monsters = [
    {
        name : "varg",
        health : 5,
        attack : 4,
        defense : 0,
        speed : 3,
        info : "En vild varg går till attack!",
        winText : "Grattis! Du dödade vargen och tillagar den. +2 liv.",
        win : (m) => {increaseStats(1,0,0); m.health = 5}
    },
    {
        name : "spöke",
        health : 3,
        attack : 4,
        defense : 1,
        speed : 5,
        info : "Det dök upp ett vilt spöke.",
        winText : "Du har besergrat spöket! Du belönas med +1 attack.",
        win :(m) => {increaseStats(0,1,0); m.health = 3}
    },
    {
        name : "riddare",
        health : 3,
        attack : 3,
        defense : 3,
        speed : 3,
        win : (m) => {increaseStats(0,0,1); m.health = 4},
        info : "Det dök upp en vild Riddare ",
        winText : "Du har besegrat Riddaren och beslag tar hans rustning. +1 försvar"
    },
    {
        name : "troll",
        health : 3,
        attack : 4,
        defense : 2,
        speed : 3,
        win : (m) => {increaseStats(1,0,1); m.health = 3},
        info : "Det dök upp ett vilt troll",
        winText :"Du har besegrat trollet och belönas med ytterligare stats. +1 liv och +1 attack."
    },
    {
        name : "dinosaurie",
        health : 4,
        attack : 3,
        defense : 2,
        speed : 4,
        win : (m) => {increaseStats(0,1,0); m.health = 4},
        info : "Det dök upp en vild dinosaurier", 
        winText :"Du har besegrat dinosaurieren och belönas med ytterligare stats. +2 attack."
    }
]

/** This code runs when the page is loaded */
function onBodyLoad(){
    initDivs()
    initCharacter()
    
}

function startGame(){
    characterImage.style.display = "block";
    monsterImage.style.display = "block";
    fightRandom()
}

function initDivs(){
    buttonPrompt = document.getElementById("button-prompt")
    monsterInfo = document.getElementById("monster-info")
    info = document.getElementById("info")
    
    cHealth = document.getElementById("charater-health")
    cAttack = document.getElementById("charater-attack")
    cDefense = document.getElementById("charater-defense")
    cSpeed = document.getElementById("charater-speed")

    mHealth = document.getElementById("monster-health")
    mAttack = document.getElementById("monster-attack")
    mDefense = document.getElementById("monster-defense")
    mSpeed = document.getElementById("monster-speed")

    monsterImage = document.getElementById("monster-image")
    characterImage = document.getElementById("character-image")

    monsterImage.style.display = "none";
    characterImage.style.display = "none";
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

function updateMonsterStats(){
    mHealth.innerHTML = "Liv: " + monster.health
    mAttack.innerHTML = "Attack: " + monster.attack
    mDefense.innerHTML = "Försvar: " + monster.defense
    mSpeed.innerHTML = "Initiativ: " + monster.speed
}
function increaseStats(h, a, d){
// alert("INCREASE " + character.health)
    if(Math.random() < 0.5){
    character.health += h
    }
    else{
        character.health -= h
    }
    character.attack += a
    character.defense += d
    
// alert("INCREASE " + character.health)
if(character.attack >= 10){
    character.attack = 10;
    }
    if(character.defense >= 10){
        character.defense = 10;
    }
    if(character.health >= 10){
        character.health = 10;
}
updateStats()
}
function decreaseStats(h, a, d){
// alert("DECREASE " - character.health)
    character.health -= h
    character.attack -= a
    character.defense -= d
// alert("DECREASE " - character.health)
    updateStats()
}

/** Prompt the user for their name and set the characters name */
function setName(){
    nameInput = prompt("Hej! Vänligen skriv ditt namn: ")
    name = document.getElementById("character-name").innerHTML = nameInput
    character.name = nameInput
}

/** Lets the player chose a class */
function choseClass(){
    setInfo("Välj en class att spela som:")
    let classes = [
        "Rogue", 
        "Druid", 
        "Paladin", 
        "Warrior",
        "Thrall",
        "Sylvanas"
    ]
    //Sätter stats för karaktärerna 
    let fun = [
        () => {setStats(4,5,0,4); setImage("rogue.jpg"); startGame()},
        () => {setStats(6,3,1,3); setImage("druid.jpg"); startGame()}, 
        () => {setStats(5,4,1,3); setImage("paladin.jpg"); startGame()}, 
        () => {setStats(3,3,5,3); setImage("warrior.jpg"); startGame()},
        () => {setStats(4,4,2,3); setImage("thrall.jpg"); startGame()},
        () => {setStats(3,5,3,3); setImage("sylvanas.jpg"); startGame()} 
    ]
    populateButtons(classes, fun)
}

function setImage(str){
    characterImage.src = str
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

function setMonsterInfo(str){
    monsterInfo.innerHTML = str
}

function setInfo(str){
    info.innerHTML = str
}

function initCharacter(){
    setName()  
    choseClass()
}

function gameOver(){
    alert("You lost thank your playing!")
    location.reload()
    onBodyLoad()
    
}

function fightMonster(){
    let atk = monster.attack - character.defense
    character.health -= atk < 0 ? 0 : atk
    //alert("CHARACTER LOST HEALTH " + atk)
}

function fightCharacter(){
    let atk = character.attack - monster.defense
    monster.health -= atk < 0 ? 0 : atk
    //alert("MONSTER LOST HEALTH " + atk)
}

function attack(){
    if(monster.speed <= character.speed){
        fightCharacter()
        if(monster.health <= 0){
            beat()
            return
        }
        fightMonster()
    }
    else{
        fightMonster()
        if(character.health <= 0){
            gameOver()
            return
        }
        fightCharacter()
    }
    
    if(monster.health <= 0){
        beat()
    }
    else if(character.health <= 0){
        gameOver()
    }
    else{
        fight()
    }
}

function beat(){
    setInfo(monster.winText)
    monster.win(monster)
    populateButtons(["Gå vidare"], [() => fightRandom()] )
}

function changeMonsterImage(){
    monsterImage.src = monster.name + ".jpg"
}

function setMonster(m){
    monster = m
}

function fightRandom(){
    let i = Math.floor(Math.random() * monsters.length);
    setMonster(monsters[i])
    fight()
}

function escape(){
    const rng = Math.random();
    if(rng < 0.5 ){
        decreaseStats(4,0,0); 
    }
    if(character.health <= 0){
        gameOver()
    }
    else {
        setInfo("Du lyckades fly utan att ta extra skada") 
    
    }
    fightRandom()
}

function fight(){
    setInfo(monster.info)
    setMonsterInfo(monster.name)
    updateMonsterStats()
    changeMonsterImage()
   
    updateStats()
    options = [
        "Attackera" , 
        "Fly (50% -4 liv)"
    ]
    fun = [
        () => attack(monster),
        () => escape(monster)
    ]
    populateButtons(options, fun)
}

function showButtonPrompt(){
    buttonPrompt.style.display = "flex"
}

function hideButtonPrompt(){
    setInfo("")
    buttonPrompt.style.display = "none"
}
