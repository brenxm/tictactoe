const UiModule = (function () {
    //module to change info display
    const displayInfo = (function (infoContainer) {
        const home = () => {
        }

        const opponentSelection = () => {
            UiElement.elements["new-game-info"].style.display = "none";
            UiElement.elements["opponent-selection-info"].style.display = "block";
        }
        return { home, opponentSelection }
    })();

    return {displayInfo}
})();

const UiElement = (function(doc){
    const elements = {

    }

    function getElementByClass(className){
        elements[className] = doc.querySelector(`.${className}`);
    }

    function onStartUp(){
        getElementByClass("start-button");
        getElementByClass("opponent-selection-info");
        getElementByClass("new-game-info");
    };

    return {onStartUp, elements}
})(document);


export {UiModule, UiElement}