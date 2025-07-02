const apiKey = 'YOUR_API_KEY'; // Replace with a real API key
const apiUrl = `https://open.er-api.com/v6/latest/USD?apikey=${apiKey}`;
let exchangeRates = {};
let currencyData = {}; // Stores currency flags & symbols

// Fetch exchange rates & currency data
document.addEventListener('DOMContentLoaded', async () => {
    await fetchExchangeRates();
    await fetchCurrencyData();
    populateCurrencyDropdowns();
    convertCurrency();
    
   
});

// Fetch latest exchange rates

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
       

        exchangeRates = data.rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        
    }
}

// Fetch currency symbols & flags from REST Countries API
async function fetchCurrencyData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        
        countries.forEach(country => {
            if (country.currencies) {
                Object.keys(country.currencies).forEach(code => {
                    currencyData[code] = {
                        symbol: country.currencies[code].symbol || code,
                        flag: country.flags.svg || ''
                    };
                });
            }
        });

        // Manually set the flag for EUR
        currencyData["EUR"] = {
            symbol: "€",
            flag: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
        };

    } catch (error) {
        console.error('Error fetching currency data:', error);
    }
}
// Populate dropdowns with flags, symbols, and currency codes
function populateCurrencyDropdowns() {
    const currencyList = Object.keys(exchangeRates);
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');

    fromCurrency.innerHTML = toCurrency.innerHTML = '';

    currencyList.forEach(currency => {
        let flagUrl = `https://flagsapi.com/${currency.substring(0, 2).toUpperCase()}/flat/64.png`; // Fetch flag
      
        let symbol = currencyData[currency]?.symbol || currency; // Fetch currency symbol

        let option = document.createElement('option');
        option.value = currency;
        option.textContent = `${currency} (${symbol})`;
        option.setAttribute('data-flag', flagUrl); // Store flag URL

        fromCurrency.appendChild(option);
        toCurrency.appendChild(option.cloneNode(true)); // Clone for second dropdown
    });

    fromCurrency.value = localStorage.getItem("fromCurrency") || "USD";
    toCurrency.value = localStorage.getItem("toCurrency") || "INR";
  
  // **Set both input fields to 0 by default**
    document.getElementById("from-amount").value = "0";
    document.getElementById("to-amount").value = "0";

    convertCurrency(); // Ensures correct exchange rate is shown
    updateDropdownFlags(); // Apply flag styles
}
// Convert currency based on exchange rate
function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const fromAmount = parseFloat(document.getElementById('from-amount').value) || 0;

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return;

    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    document.getElementById('to-amount').value = (fromAmount * rate).toFixed(2);
    document.getElementById('exchange-rate').innerText = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
}
function updateDropdownFlags() {
    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", function () {
            let selectedOption = this.options[this.selectedIndex];
            let flagUrl = selectedOption.getAttribute("data-flag");
            
            if (flagUrl) {
                this.style.backgroundImage = `url(${flagUrl})`;
                this.style.backgroundSize = "25px";
                this.style.backgroundRepeat = "no-repeat";
                this.style.backgroundPosition = "5px center";
                this.style.paddingLeft = "35px"; // Space for flag
            }
        });

        // Trigger change event to apply flag on page load
        select.dispatchEvent(new Event("change"));
    });
}

// Handle number input
function appendNumber(num) {
    let input = document.getElementById('from-amount');
    input.value += num;
    convertCurrency();
}

// Handle decimal input
function appendDecimal() {
    let input = document.getElementById('from-amount');
    if (!input.value.includes('.')) {
        input.value += '.';
        convertCurrency();
    }
}

// Clear input fields
function clearInput() {
    document.getElementById('from-amount').value = '';
    document.getElementById('to-amount').value = '';
}

// Remove last digit
function backspace() {
    let input = document.getElementById('from-amount');
    input.value = input.value.slice(0, -1);
    convertCurrency();
}

// Swap selected currencies
function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    convertCurrency();
}
function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');

    // Swap selected values
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];

    // Update the flags after swapping
    updateDropdownFlags();

    // Convert currency again with swapped values
    convertCurrency();
}

let currentInput = "";
let previousInput = "";
let chooseoperator = "";
let shouldResetInput = false;

// ✅ Append numbers properly
function appendNumber(num) {
    if (shouldResetInput || currentInput === "0") { 
        currentInput = num.toString(); // Replace instead of append
        shouldResetInput = false;
    } else {
        currentInput += num.toString(); // Append normally
    }
    updateDisplay();
    convertCurrency();
}

// ✅ Handle decimal input
function appendDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
        convertCurrency();
    }
}

// ✅ Store the first number & operator
function chooseOperator(op) {
    if (currentInput === "") return; 

    if (previousInput !== "") {
        calculateResult(); // Perform calculation before setting new operator
    }

    chooseoperator = op;  // FIXED: Store the operator correctly
    previousInput = currentInput;
    currentInput = "";  
    shouldResetInput = false;
    updateDisplay();
}

// ✅ Perform calculation
function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+": return firstNumber + secondNumber;
        case "-": return firstNumber - secondNumber;
        case "*": return firstNumber * secondNumber;
        case "/": return secondNumber !== 0 ? firstNumber / secondNumber : "Error"; // Prevent division by zero
        case "%": return firstNumber % secondNumber;
        default: return secondNumber;
    }
}

// ✅ Calculate and show result
function calculateResult() {
    
    if (chooseoperator === "" || previousInput === "") return;

    let result = operate(parseFloat(previousInput), chooseoperator, parseFloat(currentInput)); // FIXED
    currentInput = result.toString();
    chooseoperator = "";
    previousInput = "";
    shouldResetInput = true;
    updateDisplay();
    convertCurrency(); // Update conversion after result
 // ✅ Save to history
 saveCalculationToHistory(previousInput, operator, currentInput, result);
}

// Show history in the new screen
function viewHistory() {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    let historyList = document.getElementById("history-list");
    historyList.innerHTML = ""; // Clear previous history

    if (history.length === 0) {
        historyList.innerHTML = "<li>No history available.</li>";
    } else {
        history.forEach(entry => {
            let li = document.createElement("li");
            li.textContent = entry;
            historyList.appendChild(li);
        });
    }

    document.getElementById("history-screen").style.display = "block";
}

// Close history screen
function closeHistory() {
    document.getElementById("history-screen").style.display = "none";
}

// Function to store calculations in localStorage
function saveCalculationToHistory(num1, op, num2, result) {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    let newEntry = `${num1} ${op} ${num2} = ${result}`;
    history.push(newEntry);
    
    // Store only the last 10 calculations (limit history)
    if (history.length > 10) history.shift();
    
    localStorage.setItem("calcHistory", JSON.stringify(history));
}

function viewHistory() {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    
    if (history.length === 0) {
        alert("No history available.");
        return;
    }

    let historyText = history.join("\n");
    alert("Calculation History:\n\n" + historyText);
}


// ✅ Update the input display
function updateDisplay() {
    document.getElementById("from-amount").value = currentInput || "0";
}

// ✅ Clear everything
function clearInput() {
    currentInput = "";
    previousInput = "";
    chooseoperator = "";
    shouldResetInput = false;
    updateDisplay();
    convertCurrency();
}

// ✅ Remove last digit
function backspace() {
    currentInput = currentInput.slice(0, -1) || "0";
    updateDisplay();
    convertCurrency();
}

// ✅ Convert currency based on "From Amount"
function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const fromAmount = parseFloat(currentInput) || 0;

    if(!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return;

    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    document.getElementById('to-amount').value = fromAmount === 0 ? "0" : (fromAmount * rate).toFixed(2);
    document.getElementById('exchange-rate').innerText = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    saveCalculationToHistory(fromCurrency, toCurrency, fromAmount, document.getElementById('to-amount').value);

}
function updateLastUpdatedTime() {
    const now = new Date();
    const updatedStr = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    document.getElementById('last-updated').textContent = "Last Updated: " + updatedStr;
}
function toggleThemeOptions() {
    let themeMenu = document.getElementById("themeMenu"); // Replace with actual ID
    if (themeMenu) {
        themeMenu.classList.toggle("show"); // Toggle visibility
    } 
}

// Call the function when exchange rates update
updateLastUpdatedTime();

// Toggle menu visibility
function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Close menu when clicking outside
document.addEventListener("click", function(event) {
    const menu = document.getElementById("menuDropdown");
    const button = document.querySelector(".menu-button");

    if (event.target !== button && !button.contains(event.target)) {
        menu.style.display = "none";
    }
});

// Menu functions (Replace alerts with actual functionality)
function openSettings() {
    alert("⚙️ Open settings...");
}

function viewHistory() {
    const historyScreen = document.getElementById("history-screen");
    const historyContent = document.getElementById("history-content");

    // Get saved history from localStorage
    let history = JSON.parse(localStorage.getItem("calculationHistory")) || [];

    // Check if history is empty
    if (history.length === 0) {
        historyContent.innerHTML = "<p>No history available.</p>";
    } else {
        // Generate history list
        historyContent.innerHTML = history.map(entry => `<p>${entry}</p>`).join("");
    }

    // Show history screen
    historyScreen.style.display = "block";
}

// Function to save calculations
let historyTimeout; // Timer to detect when user stops typing

function saveCalculationToHistory(from, to, expression, result) {
    clearTimeout(historyTimeout); // Reset timer if user types again

    historyTimeout = setTimeout(() => {
        if (!String(expression).trim() || result == 0) return;
        // Ignore empty or '0' values
        
        let history = JSON.parse(localStorage.getItem("calculationHistory")) || [];
        
        let entry = `${expression} ${from} = ${result} ${to}`;
        history.push(entry);

        if (history.length > 10) {
            history.shift(); // Keep only last 10 records
        }

        localStorage.setItem("calculationHistory", JSON.stringify(history));
    }, 3000); // Waits 2 seconds after last input
}

// Function to close history screen
function closeHistory() {
    document.getElementById("history-screen").style.display = "none";
}


// Open Settings Screen
function openSettings() {
    document.getElementById("settings-screen").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".btn");
    const icon = document.querySelector(".btn__icon");
    const body = document.body;

    // Load theme preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("darkmode");
        icon.classList.replace("fa-sun", "fa-moon");
    }

 // Toggle Dark Mode
 themeToggle.addEventListener("click", function () {
    if (body.classList.contains("darkmode")) {
        body.classList.remove("darkmode");
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("darkMode", "disabled");
    } else {
        body.classList.add("darkmode");
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("darkMode", "enabled");
    }
});
});


// Close Settings Screen
function closeSettings() {
    document.getElementById("settings-screen").style.display = "none";
}

// Open Privacy Policy
function openPrivacy() {
    window.location.href = "privacy-policy.html"; // Redirects to the Privacy Policy page
}

// Open About Section
function openAbout() {
    window.location.href = "about.html"; // Redirects to the About page
}


// Reset Data
function resetData() {
    let confirmReset = confirm("Are you sure you want to reset all data?");
    if (confirmReset) {
        localStorage.clear(); // Clears all saved settings
        alert("Data has been reset.");
        location.reload(); // Reload page to apply reset
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}


// Apply saved theme
const theme = localStorage.getItem('theme') || 'light-theme';
document.body.className = theme;


const micButton = document.getElementById("micButton");
const voiceInputField = document.getElementById("voiceInputField");

// Check if browser supports speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Default language (Will be user-selectable later)

    micButton.addEventListener("click", () => {
        recognition.start();
        micButton.style.background = "#f44336"; // Change color when listening
    });

    recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        voiceInputField.value = spokenText; // Display spoken text
        document.getElementById("from-amount").value = extractNumber(spokenText) || 0; 
        updateConvertedAmount(); // Trigger conversion
        
        micButton.style.background = "#4CAF50"; // Reset button color
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };

    recognition.onerror = (event) => {
        console.error("Error:", event.error);
        micButton.style.background = "#4CAF50"; // Reset button color
    };
} else {
    micButton.disabled = true;
    micButton.title = "Speech recognition not supported";
}
// Function to Extract Number from Spoken Text
function extractNumber(text) {
    let numberMatch = text.match(/\d+(\.\d+)?/); // Extract first number
    return numberMatch ? parseFloat(numberMatch[0]) : null;
}
async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        let data = await response.json();
        return data.rates[toCurrency];
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("darkmode");

    // Save preference in localStorage
    let isDark = document.body.classList.contains("darkmode");
    localStorage.setItem("darkMode", isDark);
}

// Apply saved theme on page load
window.onload = function () {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("darkmode");
    }
};

// Speech Recognition Function
function startSpeechRecognition() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        let spokenText = event.results[0][0].transcript;
        document.getElementById("voiceInputField").value = spokenText; // Show in text field

        // Extract numbers from spoken text
        let extractedNumber = extractNumber(spokenText);

        if (extractedNumber !== null) {
            document.getElementById("from-amount").value = extractedNumber; // Update currency input
            convertCurrency(); // Trigger conversion
        }
    };

    recognition.start();
}

// Function to Extract Number from Spoken Text
function extractNumber(text) {
    let numberMatch = text.match(/\d+(\.\d+)?/);
    return numberMatch ? parseFloat(numberMatch[0]) : null;
}

function toggleDarkMode() {
    let body = document.body;
    
    if (body.classList.contains("darkmode")) {
        body.classList.remove("darkmode");
        body.classList.add("light-theme");
    } else {
        body.classList.remove("light-theme");
        body.classList.add("darkmode");
    }
}
async function updateConvertedAmount() {
    let fromAmount = parseFloat(document.getElementById("from-amount").value) || 0;
    let fromCurrency = document.getElementById("from-currency").value;
    let toCurrency = document.getElementById("to-currency").value;

    let exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

    if (!isNaN(fromAmount) && exchangeRate) {
        document.getElementById("to-amount").value = (fromAmount * exchangeRate).toFixed(2);
    } else {
        console.error("Failed to fetch exchange rate");
    }
}

function triggerHapticFeedback() {
    if ("vibrate" in navigator) {
        navigator.vibrate(50); // Vibrate for 50ms
    }
}


document.querySelectorAll('.calculator button').forEach(button => {
    button.addEventListener('click', function() {
        let value = this.innerText.trim(); // Trim spaces to avoid issues

        // Check for numbers, %, +, -, /, *, =, ← (Backspace), AC, ÷, and ⇅ (Swap)
        if (/[0-9%+.\-/*=]/.test(value) || value === "AC" || value === "←" || value === "÷" || value === "⇅" ||  value === "−") {  
            triggerHapticFeedback();
        }
    });
});


// Select the sound toggle switch
const soundToggle = document.getElementById("sound-toggle");

// Function to play sound
function playClickSound() {
    if (localStorage.getItem("soundEnabled") === "true") {
        const audio = new Audio("sounds/click.mp3.ogg"); // Replace with actual sound file path
        audio.play();
    }
}

// Add event listener to buttons for click sound
document.querySelectorAll(".calculator button").forEach(button => {
    button.addEventListener("click", playClickSound);
});

// Handle toggle switch change
soundToggle.addEventListener("change", function () {
    localStorage.setItem("soundEnabled", this.checked);
});

// Load saved preference on page load
window.addEventListener("load", function () {
    const isSoundEnabled = localStorage.getItem("soundEnabled") === "true";
    soundToggle.checked = isSoundEnabled;
} );


// Apply the saved theme on page load
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});


function applyTheme() {
    const theme = localStorage.getItem("theme") || "light"; // Default to light mode
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Apply theme when page loads
applyTheme();

// Listen for theme change (so if the user switches themes, all open tabs update)
window.addEventListener("storage", function (event) {
    if (event.key === "theme") {
        applyTheme();
    }
});

document.getElementById("themeToggle").addEventListener("click", function() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
