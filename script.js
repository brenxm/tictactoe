import { UiDisplayModule, UiElement } from "./module.mjs";


const GameModule = (function () {
    let playerOne = null;
    let playerTwo = null;
    let _versusPlayer = null;
    console.log('called nodule');
    function newGame(){
        UiDisplayModule.displayInfo.opponentSelection();
    }

    function personSelected(){
        _versusPlayer = true;
        UiDisplayModule.displayInfo.nameInput.player();
    }

    function setPlayer(name){
        if (!playerOne) {
            playerOne = newPlayer(name);
        } 

        else {
            playerTwo = newPlayer(name);
            console.log('start game');
            return;
        }


        if (_versusPlayer){
            UiElement.elements.nameInput.value = "";
            UiElement.elements.namingContainer.firstElementChild.textContent = "player two's name"           
            return;
        }
    }
    
    return { newGame, personSelected, setPlayer, playerOne, playerTwo };
})();

const newPlayer = (name)=>{
    
    return { name, score: 0 }
};


UiElement.setElementByClass("startButton", "start-button", "click", GameModule.newGame);
UiElement.setElementByClass("newGameContainer", "new-game-info");
UiElement.setElementByClass("opponentSelectionInfo", "opponent-selection-info");
UiElement.setElementByClass("personButton", "person-but", "click", GameModule.personSelected)
UiElement.setElementByClass("namingContainer", "naming-player-info");
UiElement.setElementByClass("nameInput", "name-input");
UiElement.setElementByClass("acceptNameBut", "accept-name-but", "click", GameModule.setPlayer.bind(this, UiElement.elements.nameInput.value));


