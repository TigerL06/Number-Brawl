function loadgame(){
    const main = document.getElementById('main');

    // Create a style tag to hold the CSS
    const style = document.createElement('style');
    style.textContent = `
        #main {
            disply: flex;
            flex-direction: column;
        }

        .game-container{
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
        }

        .player-container{
            width: 200px;
            border: 2px solid white;
            border-radius: 10px;
            padding: 10px;
            position: relative;
            transition: height 0.3s ease;
        }

        .input-container {
            padding: 0px 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            flex: 1;
        }
    `;
}