// script.js
document
    .getElementById("converter-form")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const fromCurrency = document.getElementById("from-currency").value;
        const toCurrency = document.getElementById("to-currency").value;

        if (amount === "" || isNaN(amount)) {
            alert("Please enter a valid amount");
            return;
        }

        const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                const result = amount * rate;
                document.getElementById(
                    "result"
                ).innerText = `${amount} ${fromCurrency} = ${result.toFixed(
                    2
                )} ${toCurrency}`;
                const marketRateInfo = `Market rates collected on: ${new Date(
                    data.time_last_updated * 1000
                ).toLocaleString()}`;
                document.getElementById(
                    "market-rate-info"
                ).innerText = marketRateInfo;
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });
