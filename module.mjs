const UiDisplayModule = (function () {
    //module to change info display
    const displayInfo = (function (infoContainer) {
        const home = () => {
            UiElement.elements.newGameContainer.style.display = "block";
            UiElement.elements.popupContainer.style.display = "none";
            UiElement.elements.scoreboardContainer.style.display = "none";
        }

        const opponentSelection = () => {
            UiElement.elements.newGameContainer.style.display = "none";
            UiElement.elements.opponentSelectionInfo.style.display = "block";

        }

        const nameInput = (() => {

            const player = () => { 
                UiElement.elements.opponentSelectionInfo.style.display = "none";
                UiElement.elements.namingContainer.style.display = "block";
                UiElement.elements.namingContainer.firstElementChild.textContent = "player one's name";
            }

            return { player };
        })();

        const scoreboard = (playerOneName, playerTwoName) => {
            UiElement.elements.namingContainer.style.display = "none";
            UiElement.elements.scoreboardContainer.style.display = "block";
            UiElement.elements.playerOneName.textContent = playerOneName;
            UiElement.elements.playerTwoName.textContent = playerTwoName;
            UiElement.elements.playerOneScore.textContent = 0;
            UiElement.elements.playerTwoScore.textContent = 0;
        }

        const togglePopupContainer = (player) => {
            const active = UiElement.elements.popupContainer.style.display == "block";
            if (active) return UiElement.elements.popupContainer.style.display = "none";
            UiElement.elements.popupContainer.style.display = "block";
            if (!player) return;
            UiElement.elements.popupText.textContent = `Player ${player.name} has WON!`;  
        }

        return { home, opponentSelection, nameInput, scoreboard, togglePopupContainer }
    })();

    function updateScore(player){
        if(player.playerNumber == 1) UiElement.elements.playerOneScore.textContent = player.score;
        if (player.playerNumber == 2) UiElement.elements.playerTwoScore.textContent = player.score;

    }

    function updateAnnouncer(message){
        UiElement.elements.announcerText.textContent = message;
    }

    return {displayInfo, updateScore, updateAnnouncer}
})();

const UiElement = (function(doc){
    const elements = {}
    const gridSlots = [];

    function setGridSlot(nodeList){
        nodeList.forEach( elem => {
            gridSlots.push( {element: elem, occupied: false});
        });
    }

    function clearGridSlot(){
        gridSlots.forEach((grid) => {
            grid.occupied = false;
            grid.element.style.backgroundImage = "";
        });
    }

    function setElementByClass(varName, className, eventType, clickFn){
        if (elements.hasOwnProperty(varName)) throw new error("existed");

        elements[varName] = doc.querySelector(`.${className}`);
        
        if (arguments[2]) elements[varName].addEventListener(eventType, clickFn);
    }

    function setElementsByClass(varName, className, eventType, clickFn){
        elements[varName] = doc.querySelectorAll(`.${className}`);

        if (arguments[2]) elements[varName].forEach(element => {
          element.addEventListener(eventType, clickFn)  ;
        });
    };

    function enableEventListeners(varName, eventType, fn){
        elements[varName].forEach(element => element.addEventListener(eventType, fn));
    }

    function thisElement(clicked){
        return gridSlots.find(elem => clicked.target == elem.element);
    }

    return {elements, setElementByClass, setElementsByClass, enableEventListeners, setGridSlot, gridSlots, thisElement, clearGridSlot};
})(document);


export {UiDisplayModule, UiElement}



