


const gameBoard = (()=>{
    const gameBoardDiv = document.querySelector('.gameBoard');
    const clearBoardBtn = document.getElementById('clearBoard');
    const boxDivs = Array.from(gameBoardDiv.children);
    const gameBoardArr = [
       undefined, undefined, undefined,
       undefined, undefined, undefined,
       undefined, undefined, undefined ];
    let isX= false;

    const arrDisplay= ()=>{
        for(let i=0; i< gameBoardArr.length; i++)
        {
            boxDivs[i].textContent= gameBoardArr[i];
        };
    }


    const input = ()=>{
        gameBoardDiv.addEventListener('click', (e)=>{
            let box= e.target;
            if(!box.textContent)
            {    
                if(!isX)   
                    {   
                        gameBoardArr[box.dataset.arrIndex]= 'X';
                        isX= true;
                    }
                else
                    {
                        gameBoardArr[box.dataset.arrIndex]= 'O';
                        isX= false;  
                    }
                   arrDisplay();
                   //console.log(gameBoardArr)
            }
        })
        clearBoardBtn.addEventListener('click', ()=>{
            boxDivs.forEach(box=> box.textContent='')
            for(let i=0; i<9;i++)
                gameBoardArr[i]=undefined;
            //console.log(gameBoardArr)
        })
    }
    return {gameBoardArr, input,arrDisplay };
})();

console.log()



//displayController.arrDisplay(gameBoard.gameBoardArr)
gameBoard.input();
gameBoard.arrDisplay()

const makePlayer = (name,score) =>{

    const getScore = ()=> score;
    const getName = ()=> name;
    return {name, score};
}


let nash = makePlayer('Nashit', 0);
// console.log(gameBoard.gameBoardArr)

