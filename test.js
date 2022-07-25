const GridSlot = (()=>{
    const slots = [1,2,3,4,5];
    const removeSlot = (index) => {
        slots.splice(index,1);
    }

    const addSlot = (int) => {
        slots.push(int);
    }

    return {slots, removeSlot, addSlot};
})();


console.log(GridSlot.slots);
GridSlot.removeSlot(0);
console.log(GridSlot.slots);
console.log(GridSlot.addSlot(5));
console.log(GridSlot.slots);
console.log(GridSlot);