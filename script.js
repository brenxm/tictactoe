import { UiDisplayModule, UiElement } from "./module.mjs";


const GameModule = (function () {
    const SYMBOL_X = 'url("./svg/x.svg")';
    const SYMBOL_O = 'url("./svg/o.svg")';
    let _currentTurn = null;
    let _playerOne = null;
    let _playerTwo = null;
    let _versusPlayer = null;
    let _playing = false;

    function newGame(){
        UiDisplayModule.displayInfo.opponentSelection();
    }

    function personSelected(){
        _versusPlayer = true;
        UiDisplayModule.displayInfo.nameInput.player();
    }

    function setPlayer(){
        const name = UiElement.elements.nameInput.value;
        if (!_playerOne) {
            _playerOne =  newPlayer(name, SYMBOL_X, 1);
        } 

        else {
            _playerTwo =  newPlayer(name, SYMBOL_O, 2);
            newRound();
            return;
        }


        if (_versusPlayer){
            UiElement.elements.nameInput.value = "";
            UiElement.elements.namingContainer.firstElementChild.textContent = "player two's name"           
            return;
        }
    }

    function newRound(){
        UiDisplayModule.displayInfo.scoreboard(_playerOne.name, _playerTwo.name);

        //pick who's turn randomly
        Math.random() < 0.5 ? _currentTurn = _playerOne : _currentTurn = _playerTwo;

        UiElement.elements.announcerText.textContent = `It's ${_currentTurn.name} move.`

        _playing = true;
    }

    function slotSelected(event){
        if(!_playing) return;
        const grid = UiElement.thisElement(event);

        if(!grid.occupied){
            grid.element.style.backgroundImage = _currentTurn.symbol;
            grid.occupied = _currentTurn.symbol;
            evaluate();
            if(_playing) turnCurrentTurn();
        }
    }

    function slotHover(event){
        if(!_playing) return;
        const grid = UiElement.thisElement(event);
        if (grid.occupied) return;
        event.target.style.backgroundImage = _currentTurn.symbol;
    }

    function slotHoverOut(event){
        if(!_playing) return;
        const grid = UiElement.thisElement(event);
        if (grid.occupied) return;
        event.target.style.backgroundImage = "";
    }

    function turnCurrentTurn(){
        _currentTurn == _playerOne ? _currentTurn = _playerTwo : _currentTurn = _playerOne;
        UiDisplayModule.updateAnnouncer(`It's player ${_currentTurn.name} turn`);
    }

    function evaluate(){
        const slots = [
            [UiElement.gridSlots[0], UiElement.gridSlots[1], UiElement.gridSlots[2]],
            [UiElement.gridSlots[3], UiElement.gridSlots[4], UiElement.gridSlots[5]],
            [UiElement.gridSlots[6], UiElement.gridSlots[7], UiElement.gridSlots[8]],
            [UiElement.gridSlots[0], UiElement.gridSlots[3], UiElement.gridSlots[6]],
            [UiElement.gridSlots[1], UiElement.gridSlots[4], UiElement.gridSlots[7]],
            [UiElement.gridSlots[2], UiElement.gridSlots[5], UiElement.gridSlots[8]],
            [UiElement.gridSlots[0], UiElement.gridSlots[4], UiElement.gridSlots[8]],
            [UiElement.gridSlots[2], UiElement.gridSlots[4], UiElement.gridSlots[6]],
        ]

        slots.forEach((line) => {
            const allEqual = line.every( (value, i, arr) => value.occupied === arr[0].occupied && arr[0].occupied != false);
            if(allEqual) return playerWon(_currentTurn);
        })

        const trueth = UiElement.gridSlots.every((slot) => slot.occupied != false);
        if (trueth) console.log("no wan won");
    }
    function playerWon(thisPlayer){
        console.log(`${thisPlayer.name} has won!`);
        _playing = false;
        updateScore(_currentTurn);
        UiDisplayModule.updateAnnouncer(`${_currentTurn.name} has WON! YAY!`);
        UiDisplayModule.displayInfo.togglePopupContainer(_currentTurn);
    };

    function updateScore(thisPlayer){
        thisPlayer.score++;
        console.log(thisPlayer.score);
        console.log(thisPlayer.playerNumber)
        UiDisplayModule.updateScore(thisPlayer);
    }

    return { newGame, personSelected, setPlayer, slotSelected, slotHover, slotHoverOut};
})();

const newPlayer = (name, symbol, playerNumber)=>{
    
    return { name, score: 0, symbol ,playerNumber}
};


UiElement.setElementByClass("startButton", "start-button", "click", GameModule.newGame);
UiElement.setElementByClass("newGameContainer", "new-game-info");
UiElement.setElementByClass("opponentSelectionInfo", "opponent-selection-info");
UiElement.setElementByClass("personButton", "person-but", "click", GameModule.personSelected)
UiElement.setElementByClass("namingContainer", "naming-player-info");
UiElement.setElementByClass("nameInput", "name-input");
UiElement.setElementByClass("acceptNameBut", "accept-name-but", "click", GameModule.setPlayer);
UiElement.setElementByClass("scoreboardContainer", "score-board-info");
UiElement.setElementByClass("playerOneName", "player-one-name");
UiElement.setElementByClass("playerTwoName", "player-two-name");
UiElement.setElementByClass("playerOneScore", "score-A");
UiElement.setElementByClass("playerTwoScore", "score-B");
UiElement.setElementByClass("announcerText", "announcer-text");
UiElement.setElementsByClass("gridSlot", "grid-slot", "click", GameModule.slotSelected); 
UiElement.enableEventListeners("gridSlot", "mouseover", GameModule.slotHover);
UiElement.enableEventListeners("gridSlot", "mouseout", GameModule.slotHoverOut);
UiElement.setGridSlot(UiElement.elements.gridSlot);
UiElement.setElementByClass("popupContainer", "popup-container");
UiElement.setElementByClass("popupText", "popup-announcer-text");



