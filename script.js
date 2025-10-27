/* * ===================================================
 * STEP 1: DEFINE YOUR POEM
 * (Using the poem you provided)
 * ===================================================
*/
const poemLines = [
    "to the girl whose birth flowers are chrysanthemum,",
    "to the girl who sounds like taylor swift songs,",
    "to the girl who i see green when i look at her,",
    "to the girl who sounds like a literary when she talks,",
    "to the girl who thinks with her empathetic heart,",
    "to the girl who cries when someone cries,",
    "to the girl who cares for everyone,",
    "to the girl who takes care for her loved ones with no expectation of reciprocity,",
    "to the girl who learned how to survive at young age, ",
    "to the girl who saw everything when she was a little girl,",
    "to the girl who endured it all,",
    "to the girl who overcame all her challenges,",
    "to the girl who's the definition of strong woman,",
    "to the girl who became God's strongest soldier",
    "to the girl i adore,",
    "to the girl i think about all the time,",
    "to the girl i wish my day always ends with her,",
    "to the girl i wish to be with in every living seconds of my day,",
    "to the girl i really like,",
    "to the girl i love.",
    "to ellisa,",
    "you are my city of joy.",
    "and i would like you to be my partner in everything,",
    "would you like to do experience life with me?",
    "(be my girlfriend pls, and future wife.)"
];

/* * ===================================================
 * STEP 2: THE NEW WEBSITE LOGIC (Drag and Drop)
 * ===================================================
*/

// Get all the elements
const scene = document.getElementById('scene');
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const prompt = document.getElementById('prompt');

let currentLine = 0; // Tracks poem lines

// --- State variables for dragging ---
let isDragging = false;     // Is the user currently dragging?
let hasPulledOut = false;   // Has the letter been pulled out yet?
let wasJustClicked = true;  // Used to differentiate a 'click' from a 'drag'
let offsetX, offsetY;       // Mouse position offset relative to the letter

// 1. Listen for the first click on the envelope
envelope.addEventListener('click', openEnvelope, { once: true });

function openEnvelope() {
    scene.classList.add('open');
    prompt.textContent = 'Drag the letter to pull it out.';
    
    // 2. Add 'mousedown' listener to the letter to START the drag
    letter.addEventListener('mousedown', onLetterMouseDown);
}

// 3. Called when the user presses the mouse button on the letter
function onLetterMouseDown(event) {
    // This is a 'click', not a drag yet
    wasJustClicked = true;
    letter.classList.add('dragging');

    // Get the initial position of the mouse relative to the letter
    const rect = letter.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    // 4. Add listeners to the whole document to track mouse movement
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
}

// 5. Called every time the mouse moves *after* mousedown
function onDocumentMouseMove(event) {
    // The user is moving the mouse, so it's a 'drag', not a 'click'
    wasJustClicked = false;
    
    // This is the first moment the user starts dragging
    if (!hasPulledOut) {
        hasPulledOut = true;
        
        // Pin the letter's position *before* changing its class
        const rect = letter.getBoundingClientRect();
        letter.classList.add('pulled-out'); // This makes it 'position: fixed'
        
        // Set its top/left so it doesn't "jump"
        letter.style.top = rect.top + 'px';
        letter.style.left = rect.left + 'px';

        // Fade out the envelope and hide the prompt
        scene.classList.add('letter-out');
        prompt.style.display = 'none';

        // Show the very first line of the poem
        showNextLine();
    }
    
    // Update the letter's position based on mouse movement
    let newX = event.clientX - offsetX;
    let newY = event.clientY - offsetY;
    letter.style.left = newX + 'px';
    letter.style.top = newY + 'px';
}

// 6. Called when the user releases the mouse button
function onDocumentMouseUp(event) {
    letter.classList.remove('dragging');

    // Remove the global listeners
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);

    // 7. Check if it was a 'click' (no drag)
    // We only show the next line if it's *after* it was pulled out
    if (wasJustClicked && hasPulledOut) {
        showNextLine();
    }
}

// 8. This function now just adds the poem line
function showNextLine() {
    if (currentLine < poemLines.length) {
        const lineElement = document.createElement('p');
        lineElement.classList.add('poem-line');
        lineElement.textContent = poemLines[currentLine];
        letter.appendChild(lineElement);
        
        // Auto-scroll the letter to the bottom
        letter.scrollTop = letter.scrollHeight;
        currentLine++;
    }
}