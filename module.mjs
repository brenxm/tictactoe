const UiDisplayModule = (function () {
    //module to change info display
    const displayInfo = (function (infoContainer) {
        const home = () => {
        }

        const opponentSelection = () => {
            UiElement.elements.newGameContainer.style.display = "none";
            UiElement.elements.opponentSelectionInfo.style.display = "block";

        }

        const nameInput = (() => {

            const player = () => { 
                console.log("called");
                UiElement.elements.opponentSelectionInfo.style.display = "none";
                UiElement.elements.namingContainer.style.display = "block";
                console.log(UiElement.elements.namingContainer.firstChild);
            }

            return { player };
        })();
        return { home, opponentSelection, nameInput }
    })();

    return {displayInfo}
})();



const UiElement = (function(doc){
    const elements = {}

    function setElementByClass(varName, className, eventType, clickFn){
        if (elements.hasOwnProperty(varName)) console.error("duplicate obj property", elements);

        elements[varName] = doc.querySelector(`.${className}`);
        
        if (arguments[2]) elements[varName].addEventListener(eventType, clickFn);
    }

    return {elements, setElementByClass};
})(document);


export {UiDisplayModule, UiElement}

