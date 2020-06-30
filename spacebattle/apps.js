//Build a Space Battle JS Game

//PSEUDO CODE
//Goal: defeat the alien ships
//Create USS Schwarzenegger object
//Create Alien class
//Make ATTACK functions for USS Schwarzenegger & alien ships using Math.random
//Make an Array with the alien ship specifications
//Make a Function that builds the alien ships using the alien array parameters using Math.random
//Make a Function for the Spaceship battle
//Use While Loop for Battle function
//Create a Function to check user prompts


let game = {
    round: 0,
    targetShip: 0,
    userResponse: ""
}
let ussSchwartz = {
    name: "USS Schwarzenegger",
    hull: 20,
    firePower: 5,
    accuracy: 0.7,
    attack: function() {
        let attackChance = Math.random();
        if(attackChance <= this.accuracy) {
            return true;
        }
        else {
            return false;
        }
    }
};

// create a class for the alien ships
class AlienShip {
    constructor(name,hull,firePower,accuracy) {
        this.name = name;
        this.hull = hull;
        this.firePower = firePower;
        this.accuracy = accuracy;
    };
    attack() {
        let attackChance = Math.random();
        if(attackChance <= this.accuracy) {
            return true;
        }
        else {
            return false;
        }
    };
};

// Alien ship arrays
let alienShips = [];                    //there should be 6 ships - 1 at a time
let alienHullValues = [3,4,5,6];        //hull should be between 3 & 6
let alienFirePowerValues = [2,3,4];     //firepower should be between 2 & 4
let alienAccValues = [.6,.7,.8];        //firepower should be between 2 & 4

// function to build alien ships
let buildAlienShips = () => {
    for(let i=0;i<6;i++) {
        let name = "Alien Ship "+(i+1);
        let hull = alienHullValues[Math.floor(Math.random() * 4)];
        let firePower = alienFirePowerValues[Math.floor(Math.random() * 3)];
        let accuracy = alienAccValues[Math.floor(Math.random() * 3)];
        alienShips[i] = new AlienShip(name,hull,firePower,accuracy);
    };
};

// funcion to battle
let battleWithShip = (ship1,ship2) => {
    // put the ships into an array
    let ships = [ship1,ship2];
    let attack = false;
    let attacking = 0;
    let beingAttacked = 1;
    let temp;
    console.log("Attack begins");
    while(ships[beingAttacked].hull > 0)
    {
        // attacking sequence
        if(ships[beingAttacked].hull > 0)
        {
            // log the attack information
            console.log("\n");
            console.log(`${ships[attacking].name} attacked ${ships[beingAttacked].name}`);
            // generate an attack on the enemy ship
            attack = ships[attacking].attack();
            if(attack === true) {
                ships[beingAttacked].hull -= ships[attacking].firePower;
                console.log(`Attack Successful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull}`);
            }
            else {
                console.log(`Attack Unsuccessful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull}`);
            }
            // check if the ship being attack is still alive
            if(ships[beingAttacked].hull <= 0) {
                console.log(`${ships[beingAttacked].name} has been destroyed`);
                if(ships[beingAttacked] === ussSchwartz) {
                    alert("Game Over!!!");
                }
                else if(ships[beingAttacked].name === alienShips[alienShips.length-1].name) {
                    alert(`${ships[beingAttacked].name} destroyed!\nAlien fleet has been destroyed!\nyou have been victorious`);
                }
                else {
                    game.userResponse = prompt(`${alienShips[game.targetShip].name} destroyed!!\n${ussSchwartz.name} Hull: ${ussSchwartz.hull}\nWould you like to attack the next ship or retreat from battle?`,"");
                    game.targetShip += 1;
                    checkUserPrompt();
                    return ;
                }
            }
            else {
                // swap the attacking and being attacked ships
                temp = attacking;
                attacking = beingAttacked;
                beingAttacked = temp;
            }
        }
    }
}
// function to check user prompt 
let checkUserPrompt = () => {
    let responseUpperCase = game.userResponse.toUpperCase();
    if(responseUpperCase === "ATTACK") {
        battleWithShip(ussSchwartz,alienShips[game.targetShip]);
    }
    else if(responseUpperCase === "RETREAT"){
        alert("Game Over! You Retreated!");
    }
}

let startGame = () => {
    // build alien fleets
    buildAlienShips();
    //battleWithShip(ussSchwartz,alienShips[game.targetShip]);
    game.userResponse = prompt("Alien fleet approaching\nWould you like to attack the first ship or retreat?","");
    checkUserPrompt();
}


// Initialize game
startGame();