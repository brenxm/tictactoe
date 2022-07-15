import { UiModule, UiElement } from "./module.mjs";

//process all ui element
UiElement.onStartUp();

const GameModule = (function () {
    function newGame(){
        UiModule.displayInfo.opponentSelection();
    }
    
    return { newGame };
})();

UiElement.elements["start-button"].addEventListener("click", GameModule.newGame);




