for(var i = 1; i < 6; i++) //Rysowanie pawnow i nadanie wartosci, malowanie na bialo reszty pol
    {
        document.getElementById("1"+i).style.backgroundColor="blue";
        document.getElementById("1"+i).value="bluePawn";
        document.getElementById("5"+i).style.backgroundColor="brown";
        document.getElementById("5"+i).value="brownPawn";

        document.getElementById("2"+i).value=null;
        document.getElementById("2"+i).style.backgroundColor="white";
        document.getElementById("3"+i).value=null;
        document.getElementById("3"+i).style.backgroundColor="white";
        document.getElementById("4"+i).value=null;
        document.getElementById("4"+i).style.backgroundColor="white";
    }

    document.getElementById("13").value="blueKing";
    document.getElementById("53").value="brownKing";

        
    var idArray = new Array; //Tablica id wszystkich pol po kolei
    for(var i = 1; i < 6; i++)
    {
        idArray.push(i+"1");
        idArray.push(i+"2");
        idArray.push(i+"3");
        idArray.push(i+"4");
        idArray.push(i+"5");
    }

    //Tablica do przechowywania wszystkich id wykonanych ruchow
    var arrayOfMovedId = new Array;

        
    //Funkcja wstawiania obrazkow
    function insertImage(){
        idArray.forEach(element =>{
            if(document.getElementById(element).value == "brownPawn" || document.getElementById(element).value == "bluePawn")
            {
                document.getElementById(element).innerHTML = '<img src = "Pawn.png" alt = "meh" class = "img">';
            }
            else if(document.getElementById(element).value == "brownKing" || document.getElementById(element).value == "blueKing")
            {
                document.getElementById(element).innerHTML = '<img src = "King.png" alt = "meh" class = "img">';
            }
            else if(document.getElementById(element).style.backgroundColor == "white")
            {
                if(document.getElementById(element).firstChild)
                {
                    document.getElementById(element).firstChild.remove();
                }
            }
        });
    }

    function insertWinSpot(currentElementId){
        if(currentElementId != 33 && document.getElementById(33).style.backgroundColor == "white")
        {
            document.getElementById("33").innerHTML = '<img src = "WinSpot.png" alt = "meh" class = "img">';
        }   
    }

    insertImage();
    insertWinSpot();

        //Zmienne do pozniejszego wykorzystania dla id oraz value, pick - aktywny wybor/ruch 
        var previousElementId;
        var previousElementValue;
        var pick=false;
        var turn=1;
        var selectWinner;

        //Funkcja undo...
        function undoMove(){
            if(arrayOfMovedId.length !== 0)
            {
                if(turn == 1)
                {
                    previousElementId = arrayOfMovedId.pop();
                    currentElementValue = arrayOfMovedId.pop();
                    currentElementId = arrayOfMovedId.pop();
                    turn = 2;

                    document.getElementById(previousElementId).style.backgroundColor="brown";
                    document.getElementById(previousElementId).value=currentElementValue;
                    document.getElementById(currentElementId).style.backgroundColor="white";
                    document.getElementById(currentElementId).value= null;
                    pick = false;
                    document.getElementById('turn').innerHTML = "Tura brązowych";
                
                    idArray.forEach(element => {
                        if(document.getElementById(element).style.backgroundColor == "green")
                        {
                            document.getElementById(element).style.backgroundColor = "white";
                        }
                    });

                    insertImage();
                    insertWinSpot(currentElementId);
                }
                else if(turn == 2)
                {
                    previousElementId = arrayOfMovedId.pop();
                    currentElementValue = arrayOfMovedId.pop();
                    currentElementId = arrayOfMovedId.pop();
                    turn = 1;

                    document.getElementById(previousElementId).style.backgroundColor="blue";
                    document.getElementById(previousElementId).value=currentElementValue;
                    document.getElementById(currentElementId).style.backgroundColor="white";
                    document.getElementById(currentElementId).value= null;
                    pick = false;
                    document.getElementById('turn').innerHTML = "Tura niebieskich";
                
                    idArray.forEach(element => {
                        if(document.getElementById(element).style.backgroundColor == "green")
                        {
                            document.getElementById(element).style.backgroundColor = "white";
                        }
                    });

                    insertImage();
                    insertWinSpot(currentElementId);
                }
            }
        }

        //Wybor trybu gry
        function getListGamemode(){
            var firstOption = document.getElementById("gameModeOptions");
            var mode = firstOption.options[firstOption.selectedIndex].value;
            var gameMode;

            var secondOption = document.getElementById("botModeOptions");
            var botMode = secondOption.options[secondOption.selectedIndex].value;
       
            if(mode == "pvp")
            {
                gameMode = 1;
                alert("Wybrano tryb gracz vs gracz ");
                document.getElementById('turn').innerHTML = "Tura niebieskich";
            }
            else if(mode == "pve")
            {
                gameMode = 2;
                alert("Wybrano tryb gracz vs bot - "+botMode);
                document.getElementById('turn').innerHTML = "Tura niebieskich";
            }
            else if(mode == "eve")
            {
                gameMode = 3;
                alert("Wybrano tryb bot vs bot - "+botMode);
                document.getElementById('turn').innerHTML = "Tura niebieskich";
            }
            
        
        var turnCounter = 0;


        //Randomowe sterowanie - Funkcje dla botow
        var randomPawnArray = new Array();
        var randomPawnId;
        var randomAvailableTileArray = new Array();
        var randomAvailableTileId;

        function selectRandomBrown(){
            idArray.forEach(element => {
                if(document.getElementById(element).style.backgroundColor == "brown")
                {
                    randomPawnArray.push(element);
                }
            });

            randomPawnId = randomPawnArray[Math.floor((Math.random() * randomPawnArray.length))];
            
            selectTile(randomPawnId);

            idArray.forEach(element => {
                if(document.getElementById(element).style.backgroundColor == "green" && document.getElementById(element) !== document.getElementById(randomPawnId))
                {
                    randomAvailableTileArray.push(element);
                }
            });

            if(randomAvailableTileArray.length == 0)
                {
                    document.getElementById(randomPawnId).style.backgroundColor = "brown";
                    randomPawnArray = [];
                    randomAvailableTileArray = [];
                    selectRandomBrown();
                }
            
            randomAvailableTileId = randomAvailableTileArray[Math.floor((Math.random() * randomAvailableTileArray.length))];
            
            currentElementId = randomAvailableTileId;
            previousElementId = randomPawnId;
            previousElementValue = document.getElementById(previousElementId).value;

            moveTile(currentElementId, previousElementId, previousElementValue);
            randomPawnArray = [];
            randomAvailableTileArray = [];
        }

        function selectRandomBlue(){

            if(turnCounter == 0)
            {
                randomPawnArray = ['11', '12', '14', '15'];
            }

            else
            {
                idArray.forEach(element => {
                if(document.getElementById(element).style.backgroundColor == "blue")
                {
                    randomPawnArray.push(element);
                }
            });
            }
            
            
            randomPawnId = randomPawnArray[Math.floor((Math.random() * randomPawnArray.length))];


            selectTile(randomPawnId);


            idArray.forEach(element => {
                if(document.getElementById(element).style.backgroundColor == "green" && document.getElementById(element) !== document.getElementById(randomPawnId))
                {
                    randomAvailableTileArray.push(element);
                }
            });

            if(randomAvailableTileArray.length == 0)
                {
                    document.getElementById(randomPawnId).style.backgroundColor = "blue";
                    randomPawnArray = [];
                    randomAvailableTileArray = [];
                    selectRandomBlue();
                }
            
            randomAvailableTileId = randomAvailableTileArray[Math.floor((Math.random() * randomAvailableTileArray.length))];
            
            currentElementId = randomAvailableTileId;
            previousElementId = randomPawnId;
            previousElementValue = document.getElementById(previousElementId).value;

            moveTile(currentElementId, previousElementId, previousElementValue);
            randomPawnArray = [];
            randomAvailableTileArray = [];
        }



            var board = [
                [], [], [], [], []
            ];

        
            function getBoardState(){
                idArray.forEach(element =>{
                    board[element.slice(0,1)-1][element.slice(1)-1] = document.getElementById(element).value;
                });
            }

            function getPossibleMoves(board, pawnColor){
                var possibleMoves = new Array();
                for(var k = 0; k < 5; k++)
                {
                    for(var l = 0; l < 5; l++)
                    {
                        if(board[k][l] ==  `${pawnColor}Pawn` || board[k][l] == `${pawnColor}King`)
                        {
                            var dozens = parseInt(k);
                            var units = parseInt(l);
                            for(var i = dozens+1; i <= 4; i++)//dol
                            {
                                var previousField = {x: parseInt(units), y: parseInt(i)-1};
                                if(board[i][units] !== null)
                                {   
                                    
                                    if(board[dozens][units] ==  `${pawnColor}Pawn`)
                                    {
                                        
                                        if(previousField.x == 2 && previousField.y == 2 && dozens == 0 && units == 2)
                                        {                                           
                                            previousField.y = 1;
                                            previousField.x = 2;
                                            possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                            break;
                                        }
                                        if(previousField.x == 2 && previousField.y == 2 && dozens == 1 && units == 2)
                                        {
                                            break;
                                        }
                                    }
                                    if(previousField.y !== dozens)
                                    {
                                        
                                        possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                        break;
                                    }
                                    break;
                                }
                                else if(i == 4 && board[i][units] == null)
                                {
                                    possibleMoves.push({x: units, y: i, pawnX: l, pawnY: k, pawn: board[k][l]});
                                    break;
                                }
                            }
                
                        for(var i = dozens-1; i >= 0; i--)//gora
                        {
                            var previousField = {x: parseInt(units), y: parseInt(i)+1};
                            if(board[i][units] !== null)
                            {   
                                if(board[dozens][units] ==  `${pawnColor}Pawn`)
                                {
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 4 && units == 2)
                                    {
                                        previousField.y = 3;
                                        previousField.x = 2;
                                        possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                        break;
                                    }
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 3 && units == 2)
                                    {
                                        break;
                                    }
                                }
                                if(previousField.y !== dozens)
                                {
                                    possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                    break;
                                } 
                                break;
                            }
                            else if(i == 0 && board[i][units] == null)
                            {
                                possibleMoves.push({x: units, y: i, pawnX: l, pawnY: k, pawn: board[k][l]});
                                break;
                            }
                        }

                        for(var i = units+1; i <= 4; i++)//prawo
                        {
                            var previousField = {x: parseInt(i)-1, y: parseInt(dozens)};
                            if(board[dozens][i] !== null)
                            {   
                                if(board[dozens][units] ==  `${pawnColor}Pawn`)
                                {
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 2 && units == 0)
                                    {
                                        previousField.y = 2;
                                        previousField.x = 1;
                                        possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                        break;
                                    }
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 2 && units == 1)
                                    {
                                        break;
                                    }
                                }
                                if(previousField.x !== units)
                                {
                                    possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                    break;
                                }
                                break;
                            }
                            else if(i == 4 && board[dozens][i] == null)
                            {
                                possibleMoves.push({x: i, y: dozens, pawnX: l, pawnY: k, pawn: board[k][l]});
                                break;
                            }
                        }

                        for(var i = units-1; i >= 0; i--)//lewo
                        {
                            var previousField = {x: parseInt(i)+1, y: parseInt(dozens)};
                            if(board[dozens][i] !== null)
                            {   
                                if(board[dozens][units] ==  `${pawnColor}Pawn`)
                                {
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 2 && units == 4)
                                    {
                                        previousField.y = 2;
                                        previousField.x = 3;
                                        possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                        break;
                                    }
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 2 && units == 3)
                                    {
                                        break;
                                    }
                                }
                                if(previousField.x !== units)
                                {
                                    possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                    break;
                                }
                                break;
                            }
                            else if(i == 0 && board[dozens][i] == null)
                            {
                                possibleMoves.push({x: i, y: dozens, pawnX: l, pawnY: k, pawn: board[k][l]});
                                break;
                            }
                        }


                        var i = dozens;
                        var j = units;
                        while(i < 4 && j < 4)//prawo-dol
                        {
                            i++;
                            j++;
                            var previousField = {x: parseInt(j)-1, y: parseInt(i)-1};
                            if(board[i][j] !== null)
                            {   
                                if(board[dozens][units] ==  `${pawnColor}Pawn`)
                                {
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 0 && units == 0)
                                    {
                                        previousField.y = 1;
                                        previousField.x = 1;
                                        possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                        break;
                                    }
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 1 && units == 1)
                                    {
                                        break;
                                    }
                                }
                                if(previousField.y !== dozens && previousField.x !== units)
                                {
                                    possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                    break;
                                }
                                break;
                            }
                            else if((i == 4 || j == 4) && board[i][j] == null)
                            {
                                possibleMoves.push({x: j, y: i, pawnX: l, pawnY: k, pawn: board[k][l]})
                                break;
                            }
                        }

                        var i = dozens;
                        var j = units;
                        while(i < 4 && j > 0)//lewo-dol
                        {
                            i++;
                            j--;
                            var previousField = {x: parseInt(j)+1, y: parseInt(i)-1};
                            if(board[i][j] !== null)
                            {   
                                if(board[dozens][units] ==  `${pawnColor}Pawn`)
                                {
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 0 && units == 4)
                                    {
                                        previousField.y = 1;
                                        previousField.x = 3;
                                        possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                        break;
                                    }
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 1 && units == 3)
                                    {
                                        break;
                                    }
                                }
                                if(previousField.y !== dozens && previousField.x !== units)
                                {
                                    possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                    break;
                                }
                                break;
                            }
                            else if((j == 0 || i == 4) && board[i][j] == null)
                            {
                                possibleMoves.push({x: j, y: i, pawnX: l, pawnY: k, pawn: board[k][l]})
                                break;
                            }
                        }

                        var i = dozens;
                        var j = units;
                        while(i > 0 && j < 4)//prawo-gora
                        {
                            i--;
                            j++;
                            var previousField = {x: parseInt(j)-1, y: parseInt(i)+1};
                            if(board[i][j] !== null)
                            {   
                                if(board[dozens][units] ==  `${pawnColor}Pawn`)
                                {
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 4 && units == 0)
                                    {
                                        previousField.y = 3;
                                        previousField.x = 1;
                                        possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                        break;
                                    }
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 3 && units == 1)
                                    {
                                        break;
                                    }
                                }
                                if(previousField.y !== dozens && previousField.x !== units)
                                {
                                    possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                    break;
                                }
                                break;
                            }
                            else if((j == 4 || i == 0) && board[i][j] == null)
                            {
                                possibleMoves.push({x: j, y: i, pawnX: l, pawnY: k, pawn: board[k][l]})
                                break;
                            }
                        }

                        var i = dozens;
                        var j = units;
                        while(i > 0 && j > 0)//lewo-gora
                        {
                            i--;
                            j--;
                            var previousField = {x: parseInt(j)+1, y: parseInt(i)+1};
                            if(board[i][j] !== null)
                            {   
                                if(board[dozens][units] ==  `${pawnColor}Pawn`)
                                {
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 4 && units == 4)
                                    {
                                        previousField.y = 3;
                                        previousField.x = 3;
                                        possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                        break;
                                    }
                                    if(previousField.x == 2 && previousField.y == 2 && dozens == 3 && units == 3)
                                    {
                                        break;
                                    }
                                }
                                if(previousField.y !== dozens && previousField.x !== units)
                                {
                                    possibleMoves.push({x: previousField.x, y: previousField.y, pawnX: l, pawnY: k, pawn: board[k][l]});
                                    break;
                                }
                                break;
                            }
                            else if((j == 0 || i == 0) && board[i][j] == null)
                            {
                                possibleMoves.push({x: j, y: i, pawnX: l, pawnY: k, pawn: board[k][l]})
                                break;
                            }
                        }
                    }
                }
            }       
            return possibleMoves;
        }
        

        function evaluate(board){
            var score = 0;
            if(board[2][2] == "brownKing") 
            {
                score-=1000; 
                return score;
            }
            if(board[2][2] == "blueKing") 
            {
                score+=1000;
                return score;
            }
            if(board[1][2] !== null)
            {
                if(board[3][2] == "brownKing" || board[4][2] == "brownKing") 
                {
                    score-=20;
                }
                if(board[3][2] == "blueKing" || board[4][2] == "blueKing")
                {
                    score+=20;
                }
                score--;
            }
            if(board[1][3] !== null)
            {
                if(board[3][1] == "brownKing" || board[4][0] == "brownKing")
                {
                    score-=20;
                }
                if(board[3][1] == "blueKing" || board[4][0] == "blueKing")
                {
                    score+=20;
                }
                score--;
            }
            if(board[2][3] !== null)
            {
                if(board[2][1] == "brownKing" || board[2][0] == "brownKing")
                {
                    score-=20;
                }
                if(board[2][1] == "blueKing" || board[2][0] == "blueKing")
                {
                    score+=20;
                }
                score--;
            }
            if(board[3][3] !== null)
            {
                if(board[1][1] == "brownKing" || board[0][0] == "brownKing")
                {
                    score-=20;
                }
                if(board[1][1] == "blueKing" || board[0][0] == "blueKing")
                {
                    score+=20;
                }
                score--;
            }
            if(board[3][2] !== null)
            {
                if(board[1][2] == "brownKing" || board[0][2] == "brownKing")
                {
                    score-=20;
                }
                if(board[1][2] == "blueKing" || board[0][2] == "blueKing")
                {
                    score+=20;
                }
                score--;
            }
            if(board[3][1] !== null)
            {
                if(board[1][3] == "brownKing" || board[0][4] == "brownKing")
                {
                    score-=20;
                }
                if(board[1][3] == "blueKing" || board[0][4] == "blueKing")
                {
                    score+=20;
                }
                score--;
            }
            if(board[2][1] !== null)
            {
                if(board[2][3] == "brownKing" || board[2][4] == "brownKing")
                {
                    score-=20;
                }
                if(board[2][3] == "blueKing" || board[2][4] == "blueKing")
                {
                    score+=20;
                }
                score--;
            }
            if(board[1][1] !== null)
            {
                if(board[3][3] == "brownKing" || board[4][4] == "brownKing")
                {
                    score-=20;
                }
                if(board[3][3] == "blueKing" || board[4][4] == "blueKing")
                {
                    score+=20;
                }
                score--;
            }
            
            return score;
        }
        

        //Algorytm MINIMAX
        function bestMove(){
            var score = minimax(board, 3, false, null, null);
            
            
            moveTile(`${score[2].y+1}${score[2].x+1}`, `${score[2].pawnY+1}${score[2].pawnX+1}`, score[2].pawn, true);
            
        }

        
        function minimax(board, depth, isMaximizing, currentMove, beginingMove){
            var boardCopy = JSON.parse(JSON.stringify(board));
            if(evaluate(boardCopy) == -1000)
            {
                return [evaluate(boardCopy), currentMove, beginingMove, depth];
            }
            else if(depth == 0)
            {
                return [evaluate(boardCopy), currentMove, beginingMove];
            }
            

            if(isMaximizing)
            {
                var testArray = new Array();
                var scoreArray = new Array();
                var possibleMoves = getPossibleMoves(boardCopy, "blue");
                possibleMoves.forEach(element => {
                    var boardCopyCopy = JSON.parse(JSON.stringify(boardCopy));
                    boardCopyCopy[element.y][element.x] = element.pawn;
                    boardCopyCopy[element.pawnY][element.pawnX] = null;  
                    testArray.push(minimax(boardCopyCopy, depth - 1, false, element, (depth == 3) ? element: beginingMove)); 
                });
                testArray.forEach(element => {
                    scoreArray.push(element[0]);
                });         
                return testArray[scoreArray.indexOf(Math.max(...scoreArray))];
            }
            else
            {
                var testArray = new Array();
                var scoreArray = new Array();
                var possibleMoves = getPossibleMoves(boardCopy, "brown");
                possibleMoves.forEach(element => {
                    var boardCopyCopy = JSON.parse(JSON.stringify(boardCopy));
                    boardCopyCopy[element.y][element.x] = element.pawn;
                    boardCopyCopy[element.pawnY][element.pawnX] = null;  
                    testArray.push(minimax(boardCopyCopy, depth - 1, true, element, (depth == 3) ? element: beginingMove)); 
                });
                testArray.forEach(element => {
                    scoreArray.push(element[0]);
                });     
                  
                return testArray[scoreArray.indexOf(Math.min(...scoreArray))];
            }   
        }


        //Algorytm NEGAMAX
        function bestMoveNegamax(){
            var score = negamax(board, 4, sign = 1, null, null);
            

            moveTile(`${score[2].y+1}${score[2].x+1}`, `${score[2].pawnY+1}${score[2].pawnX+1}`, score[2].pawn, true);
            
        }

        var pawnColorNegamax;

        function negamax(board, depth, sign, currentMove, beginingMove){
            var boardCopy = JSON.parse(JSON.stringify(board));
            if(evaluate(boardCopy) == -1000)
            {    
                return [sign*evaluate(boardCopy), currentMove, beginingMove, depth];      
            }
            else if(depth == 0)
            {
                return [sign*evaluate(boardCopy), currentMove, beginingMove];
            }
            
                
                
                
            if(sign === 1)
            {
                pawnColorNegamax = "brown";                   
            }
            else
            {
                pawnColorNegamax = "blue"; 
            }

            var testArray = new Array();
            var scoreArray = new Array();
            var possibleMoves = getPossibleMoves(boardCopy, pawnColorNegamax);
            
            possibleMoves.forEach(element => {
                var boardCopyCopy = JSON.parse(JSON.stringify(boardCopy));
                boardCopyCopy[element.y][element.x] = element.pawn;
                boardCopyCopy[element.pawnY][element.pawnX] = null;  
                var value = negamax(boardCopyCopy, depth - 1, -sign, element, (depth == 4) ? element: beginingMove)
                testArray.push([-value[0], value[1], value[2]]); 
            });
            testArray.forEach(element => {
                scoreArray.push(element[0]);
            });    
                
            return testArray[scoreArray.indexOf(Math.min(...scoreArray))];
        }


        //Algorytm Alpha-Beta pruning negamax
        function bestMoveAbnegamax(){
            var score = abnegamax(board, 4, sign = 1, alpha = 1000, beta = -1000, null, null);
            
            
            moveTile(`${score[2].y+1}${score[2].x+1}`, `${score[2].pawnY+1}${score[2].pawnX+1}`, score[2].pawn, true);
            
        }

        var pawnColorAbnegamax;

        function abnegamax(board, depth, sign, alpha, beta, currentMove, beginingMove){
            var boardCopy = JSON.parse(JSON.stringify(board));
            if(evaluate(boardCopy) == -1000)
            {    
                return [sign*evaluate(boardCopy), currentMove, beginingMove, depth];      
            }
            else if(depth == 0)
            {
                return [sign*evaluate(boardCopy), currentMove, beginingMove];
            }
            
            
            
            
            if(sign === 1)
            {
                pawnColorAbnegamax = "brown";                   
            }
            else
            {
                pawnColorAbnegamax = "blue"; 
            }

            
            var possibleMoves = getPossibleMoves(boardCopy, pawnColorAbnegamax);
            possibleMoves = possibleMoves.reverse();
            let score = [Infinity];

            for(let i = 0; i < possibleMoves.length; ++i)
            {
                var boardCopyCopy = JSON.parse(JSON.stringify(boardCopy));
                boardCopyCopy[possibleMoves[i].y][possibleMoves[i].x] = possibleMoves[i].pawn;
                boardCopyCopy[possibleMoves[i].pawnY][possibleMoves[i].pawnX] = null;  
                var value = abnegamax(boardCopyCopy, depth - 1, -sign, -beta, -alpha, possibleMoves[i], (depth == 4) ? possibleMoves[i]: beginingMove);
                value[0] *= -1;
                score = (Math.min(score[0], value[0]) == value[0]) ? value : score;
                
                alpha = Math.min(alpha, score[0]);
                
                if(alpha < beta)
                {
                    
                    break;
                }
            }   
               
            return score;
        }







    if(gameMode == 1)//Sterowanie dla 'gracz vs gracz'
    {
        //Funkcja dotyczaca podnoszenia pawna
        document.addEventListener('click', clickChecker);
        function clickChecker(e)
        {
            function MyMovingTile()
            {
                if(currentElementId == 13 && turnCounter == 0)
                {
                    alert("You cannot move King on first move!");
                }

                else
                {
                    selectTile(currentElementId);
                    previousElementId = currentElementId;
                    previousElementValue = currentElementValue;
                    pick=true;
                }
            }

            
            //Przypisanie id oraz value do zmiennych
            var currentElementId = e.target.id;
            var currentElementValue = e.target.value;
            //Sprawdzenie czy nie podnosimy wiecej niz jednego pawna oraz czy nie klikamy w puste pole i czy mamy juz podniesiony pionek
            if(currentElementId !== '' && previousElementId !== currentElementId && pick == false)
            {
                if(turn == 1)
                {
                    if(currentElementValue == "bluePawn" || currentElementValue == "blueKing")
                    {
                        MyMovingTile();
                    }  
                }

                else if(turn == 2)
                {
                    if(currentElementValue == "brownPawn" || currentElementValue == "brownKing")
                    {
                        MyMovingTile();
                    }
                } 
            }

            else if(currentElementId !== '' && previousElementId == currentElementId && pick == true)
            {
                unselectTile(currentElementId, currentElementValue, previousElementValue);
                previousElementId = '';
                previousElementValue = '';
                pick = false;
            }

            else if(currentElementId !== '' && previousElementId !== currentElementId && pick == true)
            {
                if(currentElementValue !== "bluePawn" || currentElementValue !== "brownPawn" || currentElementValue !== "blueKing" || currentElementValue !== "brownKing")
                {
                    moveTile(currentElementId, previousElementId, previousElementValue);            
                }
            }
        }
    }

    if(gameMode == 2)//Sterowanie dla 'gracz vs bot'
    {
        checkTurn();
        function checkTurn(){
            if(turn == 1)
            {
                document.addEventListener('click', clickChecker);
                function clickChecker(e)
                {
                    function MyMovingTile()
                    {
                        if(currentElementId == 13 && turnCounter == 0)
                        {
                            alert("You cannot move King on first move!");
                        }

                        else
                        {
                            selectTile(currentElementId);
                            previousElementId = currentElementId;
                            previousElementValue = currentElementValue;
                            pick=true;
                        }
                    }

                    var currentElementId = e.target.id;
                    var currentElementValue = e.target.value;

                    if(currentElementId !== '' && pick == false)
                    {
                        if(currentElementValue == "bluePawn" || currentElementValue == "blueKing")
                            {
                                MyMovingTile();
                            }  
                    }

                    else if(currentElementId !== '' && previousElementId == currentElementId && pick == true)
                    {
                        unselectTile(currentElementId, currentElementValue, previousElementValue);
                        previousElementId = '';
                        previousElementValue = '';
                        pick = false;
                    }
            
                    else if(currentElementId !== '' && currentElementId !== previousElementId && pick == true)
                    {
                        if(currentElementValue !== "bluePawn" || currentElementValue !== "brownPawn" || currentElementValue !== "blueKing" || currentElementValue !== "brownKing")
                        {
                            moveTile(currentElementId, previousElementId, previousElementValue);
                            document.removeEventListener("click", clickChecker);
                            checkTurn();
                            getBoardState();
                        }
                    }
                }
            }
            else if(turn == 2)
            {
                if(botMode == "minimax")
                {
                    setTimeout(function(){
            
                        bestMove();
                        checkTurn();
    
                    }, 1000); 
                }
                else if(botMode == "random")
                {
                    setTimeout(function(){
            
                        selectRandomBrown();
                        checkTurn();
    
                    }, 1000); 
                } 
                else if(botMode == "negamax")
                {
                    setTimeout(function(){
            
                        bestMoveNegamax();
                        checkTurn();
    
                    }, 1000);
                }
                else if(botMode == "abnegamax")
                {
                    setTimeout(function(){
            
                        bestMoveAbnegamax();
                        checkTurn();
    
                    }, 1000);
                }
            }
        }
    }

    if(gameMode == 3)
    {
        checkTurn2();
        function checkTurn2(){
            if(turn == 1)
            {
                setTimeout(function(){
            
                    selectRandomBlue();
                    checkTurn2();

                }, 1000);
            }
            else if(turn == 2)
            {
                if(botMode == "minimax")
                {
                    setTimeout(function(){
                        
                        getBoardState();
                        bestMove();
                        checkTurn2();
    
                    }, 1000); 
                }
                else if(botMode == "random")
                {
                    setTimeout(function(){
            
                        selectRandomBrown();
                        checkTurn2();
    
                    }, 1000); 
                }
                else if(botMode == "negamax")
                {
                    setTimeout(function(){
            
                        getBoardState();
                        bestMoveNegamax();
                        checkTurn2();
    
                    }, 1000);
                }
                else if(botMode == "abnegamax")
                {
                    setTimeout(function(){
            
                        getBoardState();
                        bestMoveAbnegamax();
                        checkTurn2();
    
                    }, 1000);
                } 
            }
        }
    }

    
        

        //Kolorowanie podniesionego pola na zielono oraz wszystkie mozliwe do przeniesienia pionka pola
        function selectTile(currentElementId){
            document.getElementById(currentElementId).style.backgroundColor="green";
            

            //MALOWANIE DOSTEPNYCH RUCHOW NA ZIELONO
            var dozens = currentElementId.slice(0, 1); //Wyjecie z id dziesiatek
            var units = currentElementId.slice(1); //Wyjecie z id jednosci
            var virtualDozens = dozens;
            var virtualUnits = units;

            var availableTile = currentElementId; //Zmienna pomocnicza do ponizszej petli (aby nie modyfikowac currentElementId)
            
            for(var i = dozens; i < 6; i++) //Poruszanie w dol
            {
                availableTile = i + units;
                if(document.getElementById(availableTile).style.backgroundColor == "blue" || document.getElementById(availableTile).style.backgroundColor == "brown")
                {   
                    i--;
                    availableTile = i + units;
                    document.getElementById(availableTile).style.backgroundColor = "green";
                    if(document.getElementById(33).style.backgroundColor == "green")
                    {
                        if(document.getElementById(currentElementId).value == "bluePawn" || document.getElementById(currentElementId).value == "brownPawn")
                        {
                            document.getElementById(33).style.backgroundColor = "white";
                            document.getElementById(23).style.backgroundColor = "green";
                        } 
                    }
                break;
                }
                else if(document.getElementById(availableTile).style.backgroundColor == "white" && i == 5)
                {
                    availableTile = i + units;
                    document.getElementById(availableTile).style.backgroundColor = "green";
                    break;
                }
            }
            
            for(var i = dozens; i > 0; i--) //Poruszanie w gore
            {
                availableTile = i + units;
                if(document.getElementById(availableTile).style.backgroundColor == "blue" || document.getElementById(availableTile).style.backgroundColor == "brown")
                {   
                    i++;
                    availableTile = i + units;
                    document.getElementById(availableTile).style.backgroundColor = "green";
                    if(document.getElementById(33).style.backgroundColor == "green")
                    {
                        if(document.getElementById(currentElementId).value == "bluePawn" || document.getElementById(currentElementId).value == "brownPawn")
                        {
                            document.getElementById(33).style.backgroundColor = "white";
                            document.getElementById(43).style.backgroundColor = "green";
                        } 
                    }
                    break;
                }
                else if(document.getElementById(availableTile).style.backgroundColor == "white" && i == 1)
                {
                    availableTile = i + units;
                    document.getElementById(availableTile).style.backgroundColor = "green";
                    break;
                }
            }
            
            for(var i = units; i < 6; i++) //Poruszanie w prawo
            {
                availableTile = dozens + i;
                if(document.getElementById(availableTile).style.backgroundColor == "blue" || document.getElementById(availableTile).style.backgroundColor == "brown")
                {   
                    i--;
                    availableTile = dozens + i;
                    document.getElementById(availableTile).style.backgroundColor = "green";
                    if(document.getElementById(33).style.backgroundColor == "green")
                    {
                        if(document.getElementById(currentElementId).value == "bluePawn" || document.getElementById(currentElementId).value == "brownPawn")
                        {
                            document.getElementById(33).style.backgroundColor = "white";
                            document.getElementById(32).style.backgroundColor = "green";
                        } 
                    }
                    break;
                }
                else if(document.getElementById(availableTile).style.backgroundColor == "white" && i == 5)
                {
                    availableTile = dozens + i;
                    document.getElementById(availableTile).style.backgroundColor = "green";
                    break;
                }
            }

            for(var i = units; i > 0; i--) //Poruszanie w lewo
            {
                availableTile = dozens + i;
                if(document.getElementById(availableTile).style.backgroundColor == "blue" || document.getElementById(availableTile).style.backgroundColor == "brown")
                {   
                    i++;
                    availableTile = dozens + i;
                    document.getElementById(availableTile).style.backgroundColor = "green";
                    if(document.getElementById(33).style.backgroundColor == "green")
                    {
                        if(document.getElementById(currentElementId).value == "bluePawn" || document.getElementById(currentElementId).value == "brownPawn")
                        {
                            document.getElementById(33).style.backgroundColor = "white";
                            document.getElementById(34).style.backgroundColor = "green";
                        } 
                    }
                    break;
                }
                else if(document.getElementById(availableTile).style.backgroundColor == "white" && i == 1)
                {
                    availableTile = dozens + i;
                    document.getElementById(availableTile).style.backgroundColor = "green";
                    break;
                }
            }


            for(var i = 1; i < 6; i++) //Poruszanie prawo-dol
            {
                if(units < 5 && dozens < 5)
                {
                    virtualUnits++;
                    virtualDozens++;
                    availableTile = '' + virtualDozens + virtualUnits;
                    if(document.getElementById(availableTile).style.backgroundColor == "blue" || document.getElementById(availableTile).style.backgroundColor == "brown")
                    {   
                        virtualUnits--;
                        virtualDozens--;
                        availableTile = '' + virtualDozens + virtualUnits;
                        virtualUnits = units;
                        virtualDozens = dozens;
                        document.getElementById(availableTile).style.backgroundColor = "green";
                        if(document.getElementById(33).style.backgroundColor == "green")
                    {
                        if(document.getElementById(currentElementId).value == "bluePawn" || document.getElementById(currentElementId).value == "brownPawn")
                        {
                            document.getElementById(33).style.backgroundColor = "white";
                            document.getElementById(22).style.backgroundColor = "green";
                        } 
                    }
                        break;
                    }
                    else if(document.getElementById(availableTile).style.backgroundColor == "white" && virtualUnits == 5 || virtualDozens == 5)
                    {
                        availableTile = '' + virtualDozens + virtualUnits;
                        virtualUnits = units;
                        virtualDozens = dozens;
                        document.getElementById(availableTile).style.backgroundColor = "green";
                        break;
                    }
                }
            }
            
            for(var i = 1; i < 6; i++) //Poruszanie lewo-dol
            {
                if(dozens < 5 && units > 1)
                {
                    virtualUnits--;
                    virtualDozens++;
                    availableTile = '' + virtualDozens + virtualUnits;
                    if(document.getElementById(availableTile).style.backgroundColor == "blue" || document.getElementById(availableTile).style.backgroundColor == "brown")
                    {   
                        virtualDozens--;
                        virtualUnits++;
                        availableTile = '' + virtualDozens + virtualUnits;
                        virtualUnits = units;
                        virtualDozens = dozens;
                        document.getElementById(availableTile).style.backgroundColor = "green";
                        if(document.getElementById(33).style.backgroundColor == "green")
                    {
                        if(document.getElementById(currentElementId).value == "bluePawn" || document.getElementById(currentElementId).value == "brownPawn")
                        {
                            document.getElementById(33).style.backgroundColor = "white";
                            document.getElementById(24).style.backgroundColor = "green";
                        } 
                    }
                        break;
                    }
                    else if(document.getElementById(availableTile).style.backgroundColor == "white" && virtualDozens == 5 || virtualUnits == 1)
                    {
                        availableTile = '' + virtualDozens + virtualUnits;
                        virtualUnits = units;
                        virtualDozens = dozens;
                        document.getElementById(availableTile).style.backgroundColor = "green";
                        break;
                    }
                }
            }

            for(var i = 1; i < 6; i++) //Poruszanie prawo-gora
            {
                if(dozens > 1 && units < 5)
                {
                    virtualDozens--;
                    virtualUnits++;
                    availableTile = '' + virtualDozens + virtualUnits;
                    
                    if(document.getElementById(availableTile).style.backgroundColor == "blue" || document.getElementById(availableTile).style.backgroundColor == "brown")
                    {   
                        virtualDozens++;
                        virtualUnits--;
                        availableTile = '' + virtualDozens + virtualUnits;
                        virtualUnits = units;
                        virtualDozens = dozens;
                        document.getElementById(availableTile).style.backgroundColor = "green";
                        if(document.getElementById(33).style.backgroundColor == "green")
                    {
                        if(document.getElementById(currentElementId).value == "bluePawn" || document.getElementById(currentElementId).value == "brownPawn")
                        {
                            document.getElementById(33).style.backgroundColor = "white";
                            document.getElementById(42).style.backgroundColor = "green";
                        } 
                    }
                        break;
                    }
                    else if(document.getElementById(availableTile).style.backgroundColor == "white" && virtualDozens == 1 || virtualUnits == 5)
                    {
                        availableTile = '' + virtualDozens + virtualUnits;
                        virtualUnits = units;
                        virtualDozens = dozens;
                        document.getElementById(availableTile).style.backgroundColor = "green";
                        break;
                    }
                }
            }

            for(var i = 1; i < 6; i++) //Poruszanie lewo-gora
            {
                if(dozens > 1 && units > 1)
                {
                    virtualDozens--;
                    virtualUnits--;
                    availableTile = '' + virtualDozens + virtualUnits;
                    
                    if(document.getElementById(availableTile).style.backgroundColor == "blue" || document.getElementById(availableTile).style.backgroundColor == "brown")
                    {   
                        virtualDozens++;
                        virtualUnits++;
                        availableTile = '' + virtualDozens + virtualUnits;
                        virtualUnits = units;
                        virtualDozens = dozens;
                        document.getElementById(availableTile).style.backgroundColor = "green";
                        if(document.getElementById(33).style.backgroundColor == "green")
                    {
                        if(document.getElementById(currentElementId).value == "bluePawn" || document.getElementById(currentElementId).value == "brownPawn")
                        {
                            document.getElementById(33).style.backgroundColor = "white";
                            document.getElementById(44).style.backgroundColor = "green";
                        } 
                    }
                        break;
                    }
                    else if(document.getElementById(availableTile).style.backgroundColor == "white" && virtualDozens == 1 || virtualUnits == 1)
                    {
                        availableTile = '' + virtualDozens + virtualUnits;
                        virtualUnits = units;
                        virtualDozens = dozens;
                        document.getElementById(availableTile).style.backgroundColor = "green";
                        break;
                    }
                }
            }
        }
        

        //Funkcja do odkolorowywania wszystkich dostepnych/zielonych kwadratow na biale
        function uncolorAllGreen(){
            idArray.forEach(element => {
                if(document.getElementById(element).style.backgroundColor == "green")
                {
                    document.getElementById(element).style.backgroundColor = "white";
                }
            });
        }
        


        //Odkolorowywanie uprzednio kliknietego pawna na jego bazowy kolor
        function unselectTile(currentElementId, currentElementValue, previousElementValue){
            if(previousElementValue == "bluePawn" || previousElementValue == "blueKing")
            {
                document.getElementById(currentElementId).style.backgroundColor="blue";
                uncolorAllGreen(); 
            } 

            else if(previousElementValue == "brownPawn" || previousElementValue == "brownKing")
            {
                document.getElementById(currentElementId).style.backgroundColor="brown";
                uncolorAllGreen();
            } 
        }



        //Przenoszenie elementow / zakolorowywanie i nadawanie/zerowanie value
        function moveTile(currentElementId, previousElementId, currentElementValue, isAiMove = false){
            if(!isAiMove)
            {
                if(previousElementValue == "bluePawn" && document.getElementById(currentElementId).value == null && document.getElementById(currentElementId).style.backgroundColor == "green")
                {
                    arrayOfMovedId.push(currentElementId);//Rzeczy wkladane do tablicy undoMove...
                    arrayOfMovedId.push(currentElementValue);
                    arrayOfMovedId.push(previousElementId);
                    

                    document.getElementById(currentElementId).style.backgroundColor="blue";
                    document.getElementById(currentElementId).value="bluePawn";
                    document.getElementById(previousElementId).style.backgroundColor="white";
                    document.getElementById(previousElementId).value= null;
                    pick = false;
                    document.getElementById('turn').innerHTML = "Tura brązowych";
                    turn = 2;
                    turnCounter++;
                    uncolorAllGreen(); 
                    insertImage();
                    insertWinSpot(currentElementId);
                }

                else if(currentElementValue == "brownPawn" && document.getElementById(currentElementId).value == null && document.getElementById(currentElementId).style.backgroundColor == "green")
                {
                    arrayOfMovedId.push(currentElementId);//Rzeczy wkladane do tablicy undoMove...
                    arrayOfMovedId.push(currentElementValue);
                    arrayOfMovedId.push(previousElementId);
                    

                    document.getElementById(currentElementId).style.backgroundColor="brown";
                    document.getElementById(currentElementId).value="brownPawn";
                    document.getElementById(previousElementId).style.backgroundColor="white";
                    document.getElementById(previousElementId).value= null;
                    pick = false;
                    document.getElementById('turn').innerHTML = "Tura niebieskich";
                    turn = 1;
                    uncolorAllGreen(); 
                    insertImage();
                    insertWinSpot(currentElementId);
                }

                else if(previousElementValue == "blueKing" && document.getElementById(currentElementId).value == null && document.getElementById(currentElementId).style.backgroundColor == "green")
                {
                    arrayOfMovedId.push(currentElementId);//Rzeczy wkladane do tablicy undoMove...
                    arrayOfMovedId.push(currentElementValue);
                    arrayOfMovedId.push(previousElementId);
                    

                    document.getElementById(currentElementId).style.backgroundColor="blue";
                    document.getElementById(currentElementId).value="blueKing";
                    document.getElementById(previousElementId).style.backgroundColor="white";
                    document.getElementById(previousElementId).value= null;
                    win();
                    pick = false;
                    document.getElementById('turn').innerHTML = "Tura brązowych";
                    turn = 2;
                    uncolorAllGreen(); 
                    insertImage();
                    insertWinSpot(currentElementId);
                }

                else if(currentElementValue == "brownKing" && document.getElementById(currentElementId).value == null && document.getElementById(currentElementId).style.backgroundColor == "green")
                {
                    arrayOfMovedId.push(currentElementId);//Rzeczy wkladane do tablicy undoMove...
                    arrayOfMovedId.push(currentElementValue);
                    arrayOfMovedId.push(previousElementId);
                    

                    document.getElementById(currentElementId).style.backgroundColor="brown";
                    document.getElementById(currentElementId).value="brownKing";
                    document.getElementById(previousElementId).style.backgroundColor="white";
                    document.getElementById(previousElementId).value= null;
                    win();
                    pick = false;
                    document.getElementById('turn').innerHTML = "Tura niebieskich";
                    turn = 1;
                    uncolorAllGreen(); 
                    insertImage();
                    insertWinSpot(currentElementId);
                }
            }

            else
            {
                arrayOfMovedId.push(currentElementId);//Rzeczy wkladane do tablicy undoMove...
                arrayOfMovedId.push(currentElementValue);
                arrayOfMovedId.push(previousElementId);
                

                document.getElementById(currentElementId).style.backgroundColor="brown";
                if(currentElementValue == "brownKing")
                {
                    document.getElementById(currentElementId).value="brownKing";
                }
                else
                {
                    document.getElementById(currentElementId).value="brownPawn";
                }
                document.getElementById(previousElementId).style.backgroundColor="white";
                document.getElementById(previousElementId).value= null;
                win();
                pick = false;
                document.getElementById('turn').innerHTML = "Tura niebieskich";
                turn = 1;
                uncolorAllGreen(); 
                insertImage();
                insertWinSpot(currentElementId);
            }
        }


        
        function win(){//Funkcja oglaszajaca zwyciezce i reset
            if(document.getElementById(33).value == "blueKing")
            {
                setTimeout(function(){
                    alert("Blue Won!!!");
                    location.reload();
                }, 10);
            }
            else if(document.getElementById(33).value == "brownKing")
            {
                setTimeout(function(){
                    alert("Brown Won!!!");
                    location.reload();
                }, 10);
            }
        }


    }//Klamerka zamykajaca (aby zlapac wszystko powyzsze w funkcje tryb gry)