


const gameBoard = (()=>{
    const gameBoardDiv = document.querySelector('.gameBoard');
    const clearBoardBtn = document.getElementById('clearBoard');
    const boxDivs = Array.from(gameBoardDiv.children);


    const gameBoardArr = [
       undefined, undefined, undefined,
       undefined, undefined, undefined,
       undefined, undefined, undefined ];
    // const gameBoardArr= [
    //     'X', 'O', 'X',
    //     'O', 'X', 'O',
    //     'X', 'O', 'X',
    // ]
    
    
    const winnerCheck= ()=>{
        const threeInARow = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        
       for(let combo of threeInARow)
        {   
            let threeConsecutiveBoxes= [];
            for(let index of combo)
                threeConsecutiveBoxes.push(gameBoardArr[index])
            
            if(threeConsecutiveBoxes.join('')=== 'XXX')
                return 'pOne';
            else if(threeConsecutiveBoxes.join('')=== 'OOO')
                return 'pTwo';
        }

        if(!gameBoardArr.includes(undefined))
            return 'TIE'
        
    }

    const arrDisplay= ()=>{
        for(let index in gameBoardArr)
            boxDivs[index].textContent= gameBoardArr[index];
    }




    const input = (playerOne, playerTwo, isX)=>{

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
            let result = winnerCheck();
            
            if(result=== 'pOne')
                displayWinner(playerOne.name)
            else if(result=== 'pTwo')
                displayWinner(playerTwo.name)
            else if(result==='TIE')
                displayWinner(result)
        })

        clearBoardBtn.addEventListener('click', ()=> clearBoard())
    }

   

    const clearBoard= ()=>{
        boxDivs.forEach(box=> box.textContent='')
        for(let index in gameBoardArr)
           gameBoardArr[index]=undefined;
    }



    const displayWinner = (winner)=>{
        clearBoard();
        document.querySelector('.btns').style.display='none';
        let output=document.getElementById('winner');
        let playAgain = document.getElementById('playAgain');
        output.style.display='flex';
        playAgain.style.display='block';

        output.textContent= winner==='TIE'? `It's a Tie!` : 
        `${winner.toUpperCase()} is the Winner!`;
    }

    const computerMove=(move)=> {
        let availableSpaces = [];
        gameBoardArr.filter((arrItem, index)=>{
            if(typeof arrItem === 'undefined')
                availableSpaces.push(index);
        })

        let cpuChoice = availableSpaces[Math.floor(Math.random()* availableSpaces.length)]

        setTimeout(()=>{
            gameBoardArr[cpuChoice]= move;
            arrDisplay();
        }, 500);
        
}

    const vsCPU = ()=>{
        gameBoardDiv.addEventListener('click', (e)=>{
            let box= e.target;
            
            if(!box.textContent)
            {    
                gameBoardArr[box.dataset.arrIndex]= 'X';
                computerMove('O');
                arrDisplay();
            }
        })
    }

    

    return {input,arrDisplay, clearBoard,vsCPU};
})();



const playGame = ()=>{
    let p1='';
    let p2= '';
    let isX;

    //
    gameBoard.vsCPU(false);
   // console.log(typeof isX)
    const btnsDiv= document.querySelector('.btns');
    const pOneChoice = document.getElementById('pOneChoice');
    const pTwoChoice = document.getElementById('pTwoChoice');
    const choiceX = document.getElementById('choiceX');
    const choiceO= document.getElementById('choiceO');
    const resetBtn= document.getElementById('resetGame');
    const pOneNameHolder = document.getElementById('pOne');
    const pTwoNameHolder = document.getElementById('pTwo');
    const radioOne= document.getElementById('X');
    const raddioTwo= document.getElementById('O');
    let playAgain = document.getElementById('playAgain');


   btnsDiv.addEventListener('change', (e)=>{
        if(e.target.id=== 'pOne') 
            p1= makePlayer(e.target.value)

        else if(e.target.id=== 'pTwo') 
            p2= makePlayer(e.target.value)
        
        else if(e.target.id==='X')
            {
                pOneChoice.textContent= 'X';
                pTwoChoice.textContent= 'O';
                choiceO.style.display='none';
                isX=false;
            }

        else if (e.target.id==='O')
            {
                pOneChoice.textContent= 'O';
                pTwoChoice.textContent= 'X';
                choiceX.style.display='none';  
                isX=true;
            }  
        
       

        if(p1!=='' && p2!=='' && typeof isX!== 'undefined')
        {   
            gameBoard.input(p1,p2, isX);
            gameBoard.arrDisplay()
        }
    })
    


    const resetGame = ()=>{
        gameBoard.clearBoard();
        pOneNameHolder.value='';
        pTwoNameHolder.value='';
        pOneChoice.textContent= '';
        pTwoChoice.textContent= '';
        choiceX.style.display='flex';
        choiceO.style.display='flex';
        radioOne.checked= false;
        raddioTwo.checked= false;
        playAgain.style.display='none';
        btnsDiv.style.display='flex';
        document.getElementById('winner').style.display='none';
    }
    resetBtn.addEventListener('click', ()=> resetGame())
    playAgain.addEventListener('click', ()=> resetGame())
    
}




const makePlayer = (name) =>{
    return {name};
}


const domElements = (()=>{
    
    return {
        btnsDiv : document.querySelector('.btns'),
        pOneChoice : document.getElementById('pOneChoice'),
        pTwoChoice : document.getElementById('pTwoChoice'),
        choiceX : document.getElementById('choiceX'),
        choiceO : document.getElementById('choiceO'),
        resetBtn : document.getElementById('resetGame'),
        pOneNameHolder : document.getElementById('pOne'),
        pTwoNameHolder : document.getElementById('pTwo'),
        radioOne : document.getElementById('X'),
        raddioTwo : document.getElementById('O'),
        playAgain : document.getElementById('playAgain'),
    }
    
})();

playGame();