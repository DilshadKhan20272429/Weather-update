// Function to parse sentence and extract currency details
function parseSentence(sentence) {
    const regex = /(\d+)\s*(\w{3})\s*(to|in)\s*(\w{3})/i;
    const match = sentence.match(regex);

    if (match) {
        const amount = parseInt(match[1]);
        const fromCurrency = match[2].toUpperCase();
        const toCurrency = match[4].toUpperCase();
        
        return {
            amount: amount,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency
        };
    } else {
        return null;
    }
}

// Function to fetch conversion rate from API
async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        return convertedAmount;
    } catch (error) {
        console.error("Error fetching conversion rate:", error);
        return null;
    }
}

// Function to display messages in the chat box
function displayMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to show or hide the loader
function displayLoader(show) {
    const loader = document.getElementById("loader");
    loader.style.display = show ? 'block' : 'none';
}

// Function to handle user input and bot responses
async function processInput() {
    const userInput = document.getElementById("userInput").value;
    displayMessage(userInput, "user");
    displayLoader(true); // Show loader

    // Simulate response time
    setTimeout(async () => {
        const parsedData = parseSentence(userInput);

        if (parsedData) {
            const { amount, fromCurrency, toCurrency } = parsedData;
            const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
            if (convertedAmount) {
                displayMessage(`Converted Amount: ${convertedAmount} ${toCurrency}`, "bot");
            } else {
                displayMessage("Sorry, I couldn't fetch the conversion rate.", "bot");
            }
        } else {
            displayMessage("Please provide a valid conversion request.", "bot");
        }

        displayLoader(false); // Hide loader
    }, 5000); // Simulate 5 seconds response time

    document.getElementById("userInput").value = "";
}

// Function to handle pressing Enter key
function handleKeyDown(event) {
    if (event.key === "Enter") {
        processInput();
    }
}

// Function to initialize the chatbot with a greeting message
function initializeChat() {
    setTimeout(() => displayMessage("Hello!", "bot"), 1000);
    setTimeout(() => displayMessage("How can I assist you today?", "bot"), 3000);
    setTimeout(() => displayMessage("You can ask me to convert currencies like '100 INR to USD'.", "bot"), 5000);
}

// Initialize the chat with a greeting
initializeChat();

// Function to toggle the dropdown menu
function toggleMenu() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
}

// Close the menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.menu-icon')) {
        const dropdownMenu = document.getElementById("dropdownMenu");
        if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
        }
    }
};
