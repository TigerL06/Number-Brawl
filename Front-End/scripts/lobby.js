function loadLobby(){
    const main = document.getElementById('main');

    // Create a style tag to hold the CSS
    const style = document.createElement('style');
    style.textContent = `
        #main {
            width: 200px;
            border: 2px solid white;
            border-radius: 10px;
            padding: 10px;
            position: relative;
            transition: height 0.3s ease;
        }

        .buttonStart {
            margin: 7px;
            padding: 3px;
            text-align: center;
            background-color: white;
            color: black;
            border: 1px solid white;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .input-container {
            padding: 0px 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            flex: 1;
        }

        p{
            padding: 7px;
            border-radius: 5px;
            border: 2px solid;
            margin: 5px;
        }

        .showKey{
            background-color: white;
            color: black;
            border: white;
            text-align: center;
        }
        
        .host{
            color: gold;
        }
    `;

    //Append style to head of document
    document.head.appendChild(style);

    //Create container for the important fields
    const inputContainer = document.createElement('div');
    inputContainer.id = 'input-container';
    inputContainer.className = 'input-container';

    let roomKey = getRoomKey();
    let playerData = getPlayerData();

    const showKey = document.createElement('p');
    showKey.textContent = "Room-Key: " + roomKey
    showKey.className = 'showKey'

    inputContainer.appendChild(showKey)

    for (let i = 0; i < playerData.length; i++){ 
        const player = document.createElement('p');
        player.textContent = playerData[i];

        if(i == 0){
            player.className = 'host';
        }

        inputContainer.appendChild(player);
    }

    //Needs changing with implementation of Back-End
    let isHost = true;

    if(isHost == true){
        const button = document.createElement('div');
        button.className = 'buttonStart';
        button.textContent = 'Start game';
        button.onclick = StartGame();
        inputContainer.appendChild(button);
    }

    main.appendChild(inputContainer);

    adjustMainHeight();
}

//Ugly code duplication I know... :) 
//didn't want to waste time figuring this out, as I had better to do.
function adjustMainHeight() {
    const inputContainer = document.getElementById('input-container');
    const newHeight = inputContainer ? inputContainer.offsetHeight + 15 : 0;
    main.style.height = `${newHeight}px`;
}

function cleanup() {
    // Remove the dynamically added style tag
    const styleTag = document.querySelector('style');
    if (styleTag) {
        styleTag.remove();
    }

    // Select the main container
    const main = document.getElementById('main');

    // Remove the button container if it exists
    const buttonContainer = document.getElementById('button-container');
    if (buttonContainer) {
        buttonContainer.remove();
    }

    // Remove the input container if it exists
    const inputContainer = document.getElementById('input-container');
    if (inputContainer) {
        inputContainer.remove();
    }
}
//Doubled code stops here, have a nice day

function getRoomKey(){
    //Back-End needed!

    //Example Data
    let key = "JoeWho"
    return key;
}

function getPlayerData(){
    //Back-End needed!

    //Example Data
    let players = ["Alice", "Bob", "Charlie", "Diana"];
    return players;
}

function StartGame(){
    //Back-End needed!

    //Example Code
}