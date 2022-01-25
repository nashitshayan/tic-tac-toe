const gameBoardDiv = document.querySelector('.gameBoard');

const gameBoard = (()=>{
    const gameBoardArr = [
        'X','O','X',
        'X','O','X',
        'X','O','X',];

    return {gameBoardArr};
})();



const displayController = (()=>{
    
        const arrDisplay= (gameArr)=>{
            gameArr.forEach(item => {
            let box= document.createElement('div');
            box.textContent= item;
            gameBoardDiv.appendChild(box);
             //console.log()
        });
    }
    return {arrDisplay};
})();

displayController.arrDisplay(gameBoard.gameBoardArr)


const makePlayer = (name,score) =>{

    const getScore = ()=> score;
    const getName = ()=> name;
    return {name, score};
}


let nash = makePlayer('Nashit', 0);
// console.log(gameBoard.gameBoardArr)

