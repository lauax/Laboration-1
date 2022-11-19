
let buttonPrompt, name, monsterInfo, 
cHealth, cAttack, cDefense, cSpeed, 
info, monsterImage, monster, characterImage,
mHealth, mAttack, mDefense, mSpeed, left, right
 
/** Object chracter defines what values chracter should consist of */
const character = {
    name : null,
    health : 0,
    attack : 0,
    defense : 0,
    speed : 0
}

/** List of monster objects which defines the diffrent monsters in the game*/ 
const monsters = [
    {
        name : "Varg",
        health : 5,
        attack : 4,
        defense : 0,
        speed : 3,
        info : "En vild varg går till attack!",
        winText : "Grattis! Du dödade vargen och tillagar den. +2 liv.",
        win : (m) => {increaseStats(1,0,0); m.health = 5}
    },
    {
        name : "Spöke",
        health : 3,
        attack : 4,
        defense : 1,
        speed : 5,
        info : "Det dök upp ett vilt spöke.",
        winText : "Du har besergrat spöket! Du belönas med +1 attack.",
        win :(m) => {increaseStats(0,1,0); m.health = 3}
    },
    {
        name : "Riddare",
        health : 3,
        attack : 3,
        defense : 3,
        speed : 3,
        win : (m) => {increaseStats(0,0,1); m.health = 4},
        info : "Det dök upp en vild Riddare ",
        winText : "Du har besegrat Riddaren och beslag tar hans rustning. +1 försvar"
    },
    {
        name : "Troll",
        health : 3,
        attack : 4,
        defense : 2,
        speed : 3,
        win : (m) => {increaseStats(1,0,1); m.health = 3},
        info : "Det dök upp ett vilt troll",
        winText :"Du har besegrat trollet och belönas med ytterligare stats. +1 liv och +1 attack."
    },
    {
        name : "Dinosaurie",
        health : 4,
        attack : 3,
        defense : 2,
        speed : 4,
        win : (m) => {increaseStats(0,1,0); m.health = 4},
        info : "Det dök upp en vild dinosaurie", 
        winText :"Du har besegrat dinosaurieren och belönas med ytterligare stats. +2 attack."
    }
]

/** This code runs when the page has finished loading. */
function onBodyLoad(){
    initDivs()
    setName()  
    choseClass()
}


/** Game begins when class is chosen monsterImage and chrachterImage will display. */
function startGame(){
    characterImage.style.display = "block";
    monsterImage.style.display = "block";

    left.style.display = "block";
    right.style.display = "block";
    
    fightRandom()
}

/** Identifies and sets all the different HTML elements that is used in the code. */
function initDivs(){
    left = document.getElementById("left")
    right = document.getElementById("right")

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

    monsterImage.style.display = "none"
    characterImage.style.display = "none"
    buttonPrompt.style.display = "none"
    left.style.display = "none"
    right.style.display = "none"
}

/**
 * Initialize the character with given values.
 * @param {string} name - name
 * @param {int} h - health
 * @param {int} a - attack
 * @param {int} d - defence
 * @param {int} s - speed
 */
function initCharacter(name, h, a, d, s){
    character.name = name
    character.health = h
    character.attack = a
    character.defense = d
    character.speed = s
    setCharacterImage()
    updateStats()
    startGame()
}

/** Graphically updates the character stats */
function updateStats(){
    cHealth.innerHTML = "Liv: " + character.health
    cAttack.innerHTML = "Attack: " + character.attack
    cDefense.innerHTML = "Försvar: " + character.defense
    cSpeed.innerHTML = "Initiativ: " + character.speed
}

/** Graphically updates the monster stats */
function updateMonsterStats(){
    mHealth.innerHTML = "Liv: " + monster.health
    mAttack.innerHTML = "Attack: " + monster.attack
    mDefense.innerHTML = "Försvar: " + monster.defense
    mSpeed.innerHTML = "Initiativ: " + monster.speed
}

/**
 * Increase the stats for the character.
 * @param {int} h - health
 * @param {int} a - attack
 * @param {int} d - defense 
 */
function increaseStats(h, a, d){
    if(Math.random() < 0.5){
    character.health += h
    }
    else{
        character.health -= h
    }
    character.attack += a
    character.defense += d
    
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

/**
 * Deacreasestats of chrachter 
 * @param {int} h - health
 * @param {int} a - attack
 * @param {int} d - defense 
 */
function decreaseStats(h, a, d){
    character.health -= h
    character.attack -= a
    character.defense -= d
    updateStats()
}

/** Prompt the user for their name and set the characters name */
function setName(){
    nameInput = prompt("Hej! Vänligen skriv ditt namn: ")
    name = document.getElementById("character-name").innerHTML = nameInput
    character.name = nameInput
}

/** Lets the player chose a class and then sets the stats for the chosen class. */
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
    let fun = [
        () => {initCharacter("Rogue",4,5,0,4)},
        () => {initCharacter("Druid",6,3,1,3)}, 
        () => {initCharacter("Paladin",5,4,1,3)}, 
        () => {initCharacter("Warrior",3,3,5,3)},
        () => {initCharacter("Thrall",4,4,2,3)},
        () => {initCharacter("Sylvanas",3,5,3,3)} 
    ]
    populateButtons(classes, fun)
}
/**
 * Sets the characters image.
 */
function setCharacterImage(){
    characterImage.src = character.name + ".jpg"
}

/**
 * Populates and shows the buttons by taking one array of strings with text for each button and one array of the same size with functions to call for each corresponding text.
 * @param {string[]} options - Array of text for each button.
 * @param {function[]} fun  - Array of functions to be called by corresponding text.
 */
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

/**
 * Sets monster info to show the player. The text is shown under the monster image.
 * @param {string} str - Text to display.
 */
function setMonsterInfo(str){
    monsterInfo.innerHTML = str
}

/**
 * Sets info to show the player. The text is shown over the buttons.
 * @param {string} str - Text to display.
 */
function setInfo(str){
    info.innerHTML = str
}

/** Alerts the player that the game is over and resets the game.  */
function gameOver(){
    alert("You lost thank you for playing!")
    resetGame()
}

/** Reset the game */
function resetGame(){
    left.style.display = "none"
    right.style.display = "none"
    choseClass()
}

/**
 * Decreases the characters health by the monsters attack.
 */
function monsterAttackCharacter(){
    let atk = monster.attack - character.defense
    character.health -= atk < 0 ? 0 : atk
}

/**
 * Decrease the monsters health by the characters attack.
 */
function characterAttackMonster(){
    let atk = character.attack - monster.defense
    monster.health -= atk < 0 ? 0 : atk
}

/**
 * One round of attack. The one with highest speed begins to attack first.
 */
function attackRound(){
    if(monster.speed <= character.speed){
        characterAttackMonster()
        if(monster.health <= 0){
            beat()
            return
        }
        monsterAttackCharacter()
        if(character.health <= 0){
            gameOver()
            return
        }
    }
    else{
        monsterAttackCharacter()
        if(character.health <= 0){
            gameOver()
            return
        }
        characterAttackMonster()
        if(monster.health <= 0){
            beat()
            return
        }
    }
    fight()
}

/**
 * When monster is beaten continues game and rewards player 
 */
function beat(){
    setInfo(monster.winText)
    monster.win(monster)
    populateButtons(["Gå vidare"], [() => fightRandom()] )
}

/**
 * Updates the monster image.
 */
function updateMonsterImage(){
    monsterImage.src = monster.name + ".jpg"
}

/** */
function setMonster(m){
    monster = m
}

/**
 * Randomly choses and sets a random monster from the monsters list to fight.
 */
function fightRandom(){
    let i = Math.floor(Math.random() * monsters.length);
    setMonster(monsters[i])
    fight()
}

/**
 * Escape from a monster.
 * There is a 50% chance to successfully escape without losing 4 hp.
 */
function escape(){
    const rng = Math.random();
    if(rng < 0.5 ){
        decreaseStats(4,0,0); 
    }
    if(character.health <= 0){
        gameOver()
        return
    }
    else {
        setInfo("Du lyckades fly utan att ta extra skada") 
    }
    confirm(fightRandom)
}

function confirm(func){

    options = [
        "Gå vidare"  
    ]
    fun = [
        () => func()
    ]
    populateButtons(options, fun)


}
/**
 * Gives options in uppcoming fight beetween chracter and monster
 */
function fight(){
    setInfo(monster.info)
    setMonsterInfo(monster.name)
    updateMonsterStats()
    updateMonsterImage()
   
    updateStats()
    options = [
        "Attackera" , 
        "Fly (50% -4 liv)"
    ]
    fun = [
        () => attackRound(),
        () => escape()
    ]
    populateButtons(options, fun)
}

/** Displays the div containing all the option buttons. */
function showButtonPrompt(){
    buttonPrompt.style.display = "flex"
}

/** Hides the div containing all the option buttons and resets the info text. */
function hideButtonPrompt(){
    setInfo("")
    buttonPrompt.style.display = "none"
}
