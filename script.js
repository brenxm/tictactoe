const GameModule = (function(){

    let _previousPlayer = '';

    const newGame = () => {

    }

    const playerWon = (player) => {
        //announce who won
    }

    const backToHome = () => {
        //equiv to restarting game
    }

    const evaluateBoard = () => {
        //check if someone won

    }

})();


const Player = (name, assignedScoreboard) => {

    let score = 0;

    const select = (grid) => {
        //player selected this grid
    }

    return { name, assignedScoreboard, select };
}


const uiModule = (function(){
    const touchGrid = () => {

    }

    const updateScore = (player) => {

    }
})();