function OnStart(){
    // Select the main container where the box will be placed
    const main = document.getElementById('main');

    // Create a style tag to hold the CSS
    const style = document.createElement('style');
    style.textContent = `
        /* Style for the main container */
        #main {
            width: 200px;
            border: 2px solid white;
            border-radius: 10px;
            padding: 10px;
            position: relative;
            transition: height 0.3s ease;
        }

        /* Style for the box containing buttons */
        #button-container {
            display: flex;
            justify-content: space-between;
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            padding: 0 10px;
        }

        /* Base style for each button */
        .button {
            flex: 1;
            margin: 0 5px;
            padding: 10px;
            text-align: center;
            background-color: transparent;
            color: white;
            border: 1px solid white;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
        }
    
        .button3 {
            flex: 1;
            margin: 5 5px;
            padding: 3px;
            text-align: center;
            background-color: white;
            color: black;
            border: 1px solid white;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
        }

        /* Active state for the selected button */
        .active {
            background-color: white;
            color: black;
            border: none;
        }

        /* Style for input and dropdown boxes */
        .input-container {
            margin-top: 60px;
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        input, select {
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
    `;

    // Append the style to the document's head
    document.head.appendChild(style);

    // Create a container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'button-container';

    // Create the first button
    const button1 = document.createElement('div');
    button1.className = 'button active'; // Set the first button as active by default
    button1.textContent = 'Join';

    // Create the second button
    const button2 = document.createElement('div');
    button2.className = 'button';
    button2.textContent = 'Create';

    // Function to handle the button toggle and input display
    function toggleButton(event) {
        if (!event.target.classList.contains('active')) {
            button1.classList.toggle('active');
            button2.classList.toggle('active');
        }
        renderInputFields();
    }

    // Function to render input fields based on the active button
    function renderInputFields() {
        // Clear any existing input fields
        const existingContainer = document.getElementById('input-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Create a new input container
        const inputContainer = document.createElement('div');
        inputContainer.id = 'input-container';
        inputContainer.className = 'input-container';

        // Create the two text input boxes
        const input1 = document.createElement('input');
        input1.type = 'text';
        input1.id = 'input1';
        input1.placeholder = 'Name';

        // Append the inputs to the container
        inputContainer.appendChild(input1);

        const button3 = document.createElement('div');
        button3.className = 'button3';

        // If Button 1 is active, add Room-Key text-field
        if (button1.classList.contains('active')){
            const input2 = document.createElement('input');
            input2.type = 'text';
            input2.id = 'input2';
            input2.placeholder = 'Room-Key';

            inputContainer.appendChild(input2);

            button3.textContent = 'Join Room';
            button3.onclick = JoinRoom;
        }

        // If Button 2 is active, add a dropdown box
        if (button2.classList.contains('active')) {
            const dropdown = document.createElement('select');
            const option1 = document.createElement('option');
            option1.value = '2 Player';
            option1.text = '2 Players';

            const option2 = document.createElement('option');
            option2.value = '3 Player';
            option2.text = '3 Players';

            const option3 = document.createElement('option');
            option3.value = '4 Player';
            option3.text = '4 Players';

            dropdown.appendChild(option1);
            dropdown.appendChild(option2);
            dropdown.appendChild(option3);

            inputContainer.appendChild(dropdown);

            button3.textContent = 'Create Room';
            button3.onclick = CreateRoom;
        }

        inputContainer.appendChild(button3)

        // Append the input container to the main div
        main.appendChild(inputContainer);

        // Adjust the height of the main container based on the content
        adjustMainHeight();
    }

    // Function to adjust the height of the main container
    function adjustMainHeight() {
        const inputContainer = document.getElementById('input-container');
        const newHeight = inputContainer ? inputContainer.offsetHeight + 100 : 100;
        main.style.height = `${newHeight}px`;
    }

    // Add event listeners to both buttons
    button1.addEventListener('click', toggleButton);
    button2.addEventListener('click', toggleButton);

    // Append the buttons to the container
    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);

    // Append the container to the main div
    main.appendChild(buttonContainer);

    // Render the initial state for Button 1
    renderInputFields();
}

function JoinRoom(){
    const name = document.getElementById('input1').value;
    const roomKey = document.getElementById('input2').value;

    cleanup();
}

function CreateRoom(){
    const name = document.getElementById('input1').value;

    cleanup();
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
