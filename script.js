import { UiDisplayModule, UiElement } from "./module.mjs";


const GameModule = (function () {
    const SYMBOL_X = "url(./svg/x.svg)";
    const SYMBOL_O = "url(./svg/o.svg)";
    let _currentTurn = null;
    let _playerOne = null;
    let _playerTwo = null;
    let _versusPlayer = null;
    let _playing = false;
    console.log('called nodule');
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
            _playerOne =  newPlayer(name, SYMBOL_X);
        } 

        else {
            _playerTwo =  newPlayer(name, SYMBOL_O);
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
            console.log(grid.occupied);
            turnCurrentTurn();
            evaluate();
        }
    }

    function slotHover(event){
        const grid = UiElement.thisElement(event);
        if (grid.occupied){
            return;
        }
        event.target.style.backgroundImage = _currentTurn.symbol;
    }

    function slotHoverOut(event){
        const grid = UiElement.thisElement(event);
        if (grid.occupied){
            return
        }
        event.target.style.backgroundImage = "";
    }

    function turnCurrentTurn(){
        _currentTurn == _playerOne ? _currentTurn = _playerTwo : _currentTurn = _playerOne;
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

        slots.forEach((line)=>{ 
                let symbol;
                for(let i = 0; i < line.length; i++){
                    if(i == 0){
                        if(!line[0].occupied) return;
                        symbol = line[0].occupied;
                    }

                    if(i == 1){
                        if(symbol == line[1].occupied){

                        }
                        else {
                            break;
                        }
                    }

                    if(i == 2){
                        if(line[1].occupied == line[2].occupied){
                            console.log('someone has won');
                        }
                    }
                }
            }
        )
    }

    function playerWon(thisPlayer){
        //set animation
    }

    return { newGame, personSelected, setPlayer, slotSelected, slotHover, slotHoverOut};
})();

const newPlayer = (name, symbol)=>{
    
    return { name, score: 0, symbol}
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



