
var players = [];
var numOfPlayers;
var numOfBaseRounds;
var numOfBasePlayers = 1;
var additionalRound = false;
var numOfPlayersLeft;
var numOfGames;

var cellSpace = 80;
var pDivHeight = 20;
var pDivWidth = 90;
var lDivWidth = 8;


//Gets the player names from submit form and appends it to players[]
function GetPlayers(){
    players.push($('inputTeam').value);
    numOfPlayers = players.length;   //updates amount of players
    numOfGames = numOfPlayers - 1;     //Calculates number of games to be played
}

//Calculates the number of rounds to be played
function GetNumRounds(){
    while(numOfBasePlayers <= numOfPlayers) {
        numOfBasePlayers = numOfBasePlayers * 2;
    }
    numOfBasePlayers = numOfBasePlayers/2;

    if(numOfBasePlayers != numOfPlayers){additionalRound = true;}
    numOfBaseRounds = Math.log(numOfBasePlayers) / Math.log(2) + 1;
}

function CreateDiv(parent, id, height, width){

    var div =  $('<div>', { id: id});
    div.css('height', height);
    div.css('max-height', height);
    div.css('width', width);
    div.css('max-width', width);
    div.css('position', 'relative');
    div.css('float', 'right');

    parent.append(div);
}

function CreateLineDivSpace(parentStr, playersInRound, round){
    var parent = $('#'+parentStr);
    var id = 'none';
    var playersInNextRound = playersInRound*2;
    var height = ((cellSpace * numOfBasePlayers)-(pDivHeight*playersInNextRound))/Math.pow(2,round)+5.3+ 'px';
    var width = lDivWidth + 'px';

    CreateDiv(parent, id, height, width);
}

function CreateLineDiv(parentStr, playersInRound, round, placement){
    var parent = $('#'+parentStr);
    var id = 'l'+round+'d'+placement;
    var playersInNextRound = playersInRound*2;
    var height = (((cellSpace * numOfBasePlayers)-(pDivHeight*playersInNextRound))/Math.pow(2,round)+(2*pDivHeight))-14.15 + 'px';
    var width = lDivWidth + 'px';


    CreateDiv(parent, id, height, width);


    var lineDiv = $('#'+id);
    lineDiv.css('border-top', 'solid');
    lineDiv.css('border-right', 'solid');
    lineDiv.css('border-bottom', 'solid');
    lineDiv.css('border-width', '2px')

}

function CreateSpaceDiv(parentStr, playersInRound, round, sectionStr){

    var parent = $('#'+parentStr);
    var id = 'none';
    var height;
    var width = pDivWidth-3 + "px"; //subtract 3 to increase space between live div

    if(sectionStr  == 'a'){
        height = (((cellSpace * numOfBasePlayers)-(pDivHeight*playersInRound))/Math.pow(2,round)+.3)/2 + 'px';
    }else{height = ((cellSpace * numOfBasePlayers)-(pDivHeight*playersInRound))/Math.pow(2,round)+.3+ 'px';}

    CreateDiv(parent, id, height, width);
}

function CreatePlayerDiv(parentStr, round, placement, sectionStr){
    var parent = $('#' + parentStr);
    var id = sectionStr+"r" + round + "p"+ placement;
    var height = pDivHeight + "px";
    var width = pDivWidth-3 + "px"; //subtract 3 to increase space between live div


    CreateDiv(parent, id, height, width);
    var playerDiv = $('#'+id);
    playerDiv.css('background-image', 'url("square.png")');
}

function CreateAddRound(parentStr){
    var parent  = $('#' + parentStr);
    var playerId = 'AddPlayerDiv';
    var lineId = 'AddLineDiv';
    var height = cellSpace *numOfBasePlayers + 'px';
    var playerWidth = pDivWidth + 'px';
    var lineWidth = lDivWidth + 'px';

    var playersInRoundHolder = Math.pow(2,numOfBaseRounds-1);


    CreateDiv(parent, playerId,height, playerWidth);
    CreateDiv(parent, lineId, height, lineWidth);

    while(numOfPlayersLeft != 0){
        CreateSpaceDiv(playerId, playersInRoundHolder, numOfBaseRounds, 'a');
        CreatePlayerDiv(playerId, 1,numOfPlayersLeft,'a');
        CreateSpaceDiv(playerId, playersInRoundHolder, numOfBaseRounds, 'a');
        numOfPlayersLeft = numOfPlayersLeft-1;
        window.alert(numOfPlayersLeft);
    }
}

function CreateRoundDiv(parentStr,round){
    var parent = $('#' + parentStr);
    var id = 'rd' + round;
    var id2 = 'rl' + round;
    var height = cellSpace * numOfBasePlayers + 'px';
    var width = pDivWidth + 'px';
    var width2 = lDivWidth + 'px';
    CreateDiv(parent, id, height, width);

    var playersInRound = Math.pow(2,round-1);
    for(var i = 0; i < playersInRound; i++){
        CreateSpaceDiv(id, playersInRound, round, 'b');
        CreatePlayerDiv(id, round, i, 'b');  //include b within id to separate base from 1st round div
        CreateSpaceDiv(id, playersInRound, round, 'b');
    }
    var n = 0;
    if(round!= numOfBaseRounds){CreateDiv(parent, id2, height, width2);} //Container to hold lines and line space divs
    while((n < playersInRound)&&(round != numOfBaseRounds) ){
        CreateLineDivSpace(id2, playersInRound,round+1);
        CreateLineDiv(id2, playersInRound, (round), n);
        CreateLineDivSpace(id2, playersInRound, round+1);
        n++;
    }
}

function CreateBracket() {
    //calculates and sets the numRounds variable
    GetNumRounds();

    //set parent node of bracket div, height, and width
    var parent = $('Body');
    var height = (cellSpace * numOfBasePlayers) + 'px';
    var baseWidth = (numOfBaseRounds * pDivWidth) + (numOfBaseRounds * lDivWidth) + 'px';

    if(additionalRound == true){
        var addWidth = pDivWidth+lDivWidth + 'px';
        var addRound =  $('<div>', { id: 'Add'});
        addRound.css('height', height);
        addRound.css('max-height', height);
        addRound.css('width', addWidth);
        addRound.css('max-width', addWidth);
        addRound.css('position', 'relative');
        addRound.css('float', 'left');
        parent.append(addRound);
    }

    //the container to hold entire base bracket
    var baseRounds =  $('<div>', { id: 'Base'});
    baseRounds.css('height', height);
    baseRounds.css('max-height', height);
    baseRounds.css('width', baseWidth);
    baseRounds.css('max-width', baseWidth);
    baseRounds.css('position', 'relative');
    baseRounds.css('float', 'left');

    parent.append(baseRounds);


    //Loops from last round until first
    for(var i = 1; i <= numOfBaseRounds; i++){
        CreateRoundDiv('Base', i); //Create a round with parent 'bracketDiv' and i as round#
    }

    numOfPlayersLeft = numOfPlayers - numOfBasePlayers;
   if(additionalRound == true) {
       CreateAddRound('Add');
   }


}