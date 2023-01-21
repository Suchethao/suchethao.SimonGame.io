//Game logic: the computer's array and human array should be compared and an equal value returned will allow th eplayer to progress onwards upto 10 rounds. If the value is inequal at any point, the game is reset. The levels should increase in difficulty, so an array element should be added to the computer's sequence in each level, upto a total of 10 array elements. These array elements carry a color/ sound value. When the game is ove r(either all 10 levels are complete OR the player entered an incorrect value), the game is brought back to it's original state, and can start again.
//Create an empty array for the computer to pick the sequence, and another empty array for the user's input. The game play will compare both.
let sequence=[];
let humanSequence=[];
//keep track of rounds
let level =0;
//Create the start button to inititate the game. It should be hidden once it's clicked.
const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector ('.js-heading');
const tileContainer = document.querySelector ('.js-container');
const loserSound = document.querySelector('loser');

//play round by activating the tiles on the screen
function activateTile(simpson){
    const tile = document.querySelector(`[data-tile='${simpson}']`);
    const sound = document.querySelector(`[data-sound='${simpson}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(()=> {
        tile.classList.remove('activated');
    },300);
}
//create subsequent rounds 
function playRound(nextSequence) {
    nextSequence.forEach((simpson,index)=> {
        setTimeout(() =>{
            activateTile(simpson);
            //create an artificial delay between the buttons going off
        }, (index+1)*600);
    });
}
function nextStep() {
    const tiles=['barney','burns','homer','bart'];
    const random = tiles[Math.floor(Math.random()*tiles.length)];
    
    return random;
}
//create function to count rounds
function nextRound(){
    level +=1;
    //add the unclickable class and edit info and heading every time a new round starts
    tileContainer.classList.add('unclickable');
    infotextContent= 'Wait for the Computer';
    heading.textContent = `Season ${level} of 10`;
   //copy all the elements to the next sequence so that it's just an extension vs. a new sequence each time
   const nextSequence=[...sequence];
   nextSequence.push(nextStep());
   playRound(nextSequence);
//add a delay before the humanTurn is executed
   sequence = [...nextSequence];
   setTimeout(()=> {
    humanTurn(level);
   }, level*600+1000);
}
function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = 'Wait for the computer';
  nextRound();
}
// push the tile value to the humanSequence array and store the index in the index variable.
function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();  
    const remainingTaps = sequence.length - humanSequence.length;
    //restore the game to orginal state if the user input and computer input do not match
    if (humanSequence[index] !== sequence[index]) {
        resetGame('Oops! Game over, you pressed the wrong tile');
        sound.play(loserSound);
        return
      }

    if (humanSequence.length === sequence.length) {
// add end state
    if (humanSequence.length===10){
        resetGame ('Congrats!You completed all the levels');
        return
    }
      humanSequence = [];
      info.textContent = 'Success! Keep going!';
      setTimeout(() => {
        nextRound();
      }, 1000);
      return
    }
  //show how many taps are remaining in the round
    info.textContent = `Your turn: ${remainingTaps} Tap${
      remainingTaps > 1 ? 's' : ''
    }`;
  }
startButton.addEventListener('click', startGame);
//decide if the player should move to the next round or end the game.
tileContainer.addEventListener ('click',event=> {
    const { tile } = event.target.dataset;
    if (tile)handleClick (tile);
})
//create a function to compare the user input and computer input
function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Simon Game';
    info.classList.add('hidden');
    tileContainer.classList.add('unclickable');
  }
// create a function to indicate the computer is done, and it's time for the human to replicate the sequence
function humanTurn(level){
//removing the unclickable class so that the buttons can't be pressed while the game hasn't started yet
    tileContainer.classList.remove('unclickable');
//change info element to show player it's their turn. Show how many taps need to be entered.
    info.textContent=`Your turn: ${level} Tap${level>1?'s':''}`;
}
