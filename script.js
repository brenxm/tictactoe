import { UiDisplayModule, UiElement } from "./module.mjs";


const GameModule = (function () {
    function newGame(){
        UiDisplayModule.displayInfo.opponentSelection();
    }

    //opponent selection paths
    function personSelected(){
        //input first name of player
        UiDisplayModule.displayInfo.nameInput.player()
    }

    
    return { newGame, personSelected };
})();


UiElement.setElementByClass("startButton", "start-button", "click", GameModule.newGame);
UiElement.setElementByClass("newGameContainer", "new-game-info");
UiElement.setElementByClass("opponentSelectionInfo", "opponent-selection-info");
UiElement.setElementByClass("personButton", "person-but", "click", GameModule.personSelected)
UiElement.setElementByClass("namingContainer", "naming-player-info");


