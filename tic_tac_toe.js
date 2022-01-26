


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
            let arr= [];
            for(let index of combo)
              arr.push(gameBoardArr[index])
            
            if(arr.join('')=== 'XXX')
                return 'pOne';
            else if(arr.join('')=== 'OOO')
                return 'pTwo';
        }

        if(!gameBoardArr.includes(undefined))
            return 'TIE'
        
    }

    const arrDisplay= ()=>{
        for(let index in gameBoardArr)
        {
            boxDivs[index].textContent= gameBoardArr[index];
        }
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
                console.log(playerOne.name)
            else if(result=== 'pTwo')
                console.log(playerTwo.name)
            else if(result==='TIE')
                console.log(result)
        })

        clearBoardBtn.addEventListener('click', ()=> clearBoard())
    }
    const clearBoard= ()=>{
        boxDivs.forEach(box=> box.textContent='')
            for(let index in gameBoardArr)
                gameBoardArr[index]=undefined;
    }
    return {input,arrDisplay, clearBoard};
})();



const makePlayer = (name) =>{
    return {name};
}


let nash = makePlayer('Nashit');

const playGame = ()=>{
    let p1='';
    let p2= '';
    let isX;
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

    btnsDiv.addEventListener('change', (e)=>{
        if(e.target.id=== 'pOne')
            p1= makePlayer(e.target.value)
        else if(e.target.id=== 'pTwo')
            p2= makePlayer(e.target.value)
        else if(e.target.id==='X')
            {
                pOneChoice.textContent= 'X';
                pTwoChoice.textContent= 'O';
                isX=false;
                choiceO.style.display='none';
            //    console.log(typeof isX)
   
            }
        else if (e.target.id==='O')
            {
                pOneChoice.textContent= 'O';
                pTwoChoice.textContent= 'X';
                isX=true;
                choiceX.style.display='none';
             //   console.log(typeof isX)
   
            }  
        
       

        if(p1!=='' && p2!=='' && typeof isX!== 'undefined')
        {   
            gameBoard.input(p1,p2, isX);
            gameBoard.arrDisplay()
        }
    })
     
    resetBtn.addEventListener('click', ()=>{
        gameBoard.clearBoard();
        pOneNameHolder.textContent='';
        pTwoNameHolder.textContent='';
        pOneChoice.textContent= '';
        pTwoChoice.textContent= '';
        choiceX.style.display='flex';
        choiceO.style.display='flex';
        radioOne.checked= false;
        raddioTwo.checked= false;

    })
    
}


playGame();