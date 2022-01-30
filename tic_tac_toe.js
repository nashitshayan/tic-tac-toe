const domElements = (()=>{
    return {
    gameBoardDiv : document.querySelector('.gameBoard'),
    boxDivs : Array.from(document.querySelector('.gameBoard').children),
    btnsDiv :document.querySelector('.btns'),
    pOneChoice : document.getElementById('pOneChoice'),
    pTwoChoice : document.getElementById('pTwoChoice'),
    choiceX : document.getElementById('choiceX'),
    choiceO :document.getElementById('choiceO'),
    pOneNameHolder : document.getElementById('pOne'),
    pTwoNameHolder : document.getElementById('pTwo'),
    radioOne : document.getElementById('X'),
    raddioTwo :document.getElementById('O'),
    clearBoardBtn : document.getElementById('clearBoard'),
    resetBtn : document.getElementById('resetGame'),
    playAgain  : document.getElementById('playAgain'),
    resultDisplay: document.getElementById('winner'),
    output : document.querySelector('.output'),    
    }
})();


const gameBoard = (()=>{
    const gameBoardArr = [
       undefined, undefined, undefined,
       undefined, undefined, undefined,
       undefined, undefined, undefined ];
   
    const winnerCheck= (p1Choice)=>{
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
                return p1Choice==='X'? 'pOne' : 'pTwo';
            else if(arr.join('')=== 'OOO')
                return p1Choice==='O'? 'pOne' : 'pTwo';
        }

        if(!gameBoardArr.includes(undefined))
            return 'TIE'
        
    }

    const arrDisplay= ()=>{
        for(let index in gameBoardArr)
        {
           domElements.boxDivs[index].textContent= gameBoardArr[index];
        }
    }



    const input = (playerOne, playerTwo, isX)=>{
        let p1Choice = isX? 'O' : 'X';
      //  console.log(isX)
        const handleInputCallback = (e)=>{
            let box= e.target;
            if(!box.textContent)
            {    
                if(!isX)   
                    {   
                        gameBoardArr[box.dataset.arrIndex]= 'X';
                        isX= true;
                        console.log('true')
                    }
                else
                    {
                        gameBoardArr[box.dataset.arrIndex]= 'O';
                        isX= false;  
                        console.log('false')
                    }
                arrDisplay();
              //  console.log(isX)
            }
            
            let result = winnerCheck(p1Choice);
           
            if(result=== 'pOne')
                displayWinner(playerOne.name)
            else if(result=== 'pTwo')
                displayWinner(playerTwo.name)
            else if(result==='TIE')
                displayWinner(result)
        }
        input.handleInputCallback= handleInputCallback;
        domElements.gameBoardDiv.addEventListener('click', (e)=> {
            console.log('isX is' + isX)
            handleInputCallback(e)
        })
        
       domElements.clearBoardBtn.addEventListener('click', ()=> clearBoard())
    }

    const clearBoard= ()=>{
       domElements.boxDivs.forEach(box=> box.textContent='')
        for(let index in gameBoardArr)
           gameBoardArr[index]=undefined;
    }

    const displayWinner = (winner)=>{
        domElements.btnsDiv.style.display='none';
        domElements.output.style.display='flex';
        domElements.playAgain.style.display='block';
        domElements.resultDisplay.textContent= winner==='TIE'? `It's a Tie!` : `${winner.toUpperCase()} is the Winner!`;
       domElements.gameBoardDiv.removeEventListener('click', input.handleInputCallback)
       //console.log(input.handleInputCallback)
    }


    return {input,arrDisplay, clearBoard};
})();


const makePlayer = (name) =>{
    return {name};
}


const playGame = ()=>{
    let p1='';
    let p2= '';
    let isX;
  //  console.log(isX)

    const handleChange= (e) =>{
        if(e.target.id=== 'pOne')
            p1= makePlayer(e.target.value)
        else if(e.target.id=== 'pTwo')
            p2= makePlayer(e.target.value)
        else if(e.target.id==='X')
            {
              domElements.pOneChoice.textContent= 'X';
              domElements.pTwoChoice.textContent= 'O';
                isX=false;
                domElements.choiceO.style.display='none';
               //console.log( isX)
   
            }
        else if (e.target.id==='O')
            {
                domElements.pOneChoice.textContent= 'O';
                domElements.pTwoChoice.textContent= 'X';
                isX=true;
                domElements.choiceX.style.display='none';
             //   console.log(typeof isX)
   
            }  

        if(p1!=='' && p2!=='' && typeof isX!== 'undefined')
        {   
            gameBoard.input(p1,p2, isX);
     //       console.log(isX)
            gameBoard.arrDisplay()
        }
    }
    playGame.handleChange= handleChange;
    domElements.btnsDiv.addEventListener('change', (e)=> handleChange(e));
    
    
}
const resetGame = ()=>{
    gameBoard.clearBoard();
    domElements.pOneNameHolder.value='';
    domElements. pTwoNameHolder.value='';
    domElements. pOneChoice.textContent= '';
    domElements. pTwoChoice.textContent= '';
    domElements. choiceX.style.display='flex';
    domElements. choiceO.style.display='flex';
    domElements. radioOne.checked= false;
    domElements. raddioTwo.checked= false;
    domElements.  playAgain.style.display='none';
    domElements.btnsDiv.style.display='flex';
    domElements.output.style.display='none';
    domElements.btnsDiv.removeEventListener('change', playGame.handleChange);
    playGame();
}

domElements.resetBtn.addEventListener('click', ()=> resetGame())
domElements.playAgain.addEventListener('click', ()=> resetGame())


playGame();