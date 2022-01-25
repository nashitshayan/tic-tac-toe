

const gameBoard = (()=>{
    const gameBoardArr = [
        'X','O','X',
        'X','O','X',
        'X','O','X',];

    return {gameBoardArr};
})();


const makePlayer = (name,score) =>{

    const getScore = ()=> score;
    const getName = ()=> name;
    return {name, score};
}


let nash = makePlayer('Nashit', 0);
// console.log(gameBoard.gameBoardArr)