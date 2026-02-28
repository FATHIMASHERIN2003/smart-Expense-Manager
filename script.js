let alertPercentage = localStorage.getItem("alertPercent") || 80;
function setAlert() {
    alertPercentage = document.getElementById("alertPercent").value;
    localStorage.setItem("alertPercent", alertPercentage);
    alert("Alert percentage updated!");
}
let let currentUser = localStorage.getItem("loggedInUser");
let expenses = JSON.parse(localStorage.getItem(currentUser + "_expenses")) || [];
let budget = localStorage.getItem("budget") || 0;

function setBudget() {
    budget = document.getElementById("budgetInput").value;
        
    alert("Budget Set Successfully!");
    updateUI();
}

function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (amount === "") {
        alert("Enter amount");
        return;
    }

    let today = new Date().toISOString().split('T')[0];

expenses.push({ 
    amount: parseFloat(amount), 
    category: category,
    date: today
});
    localStorage.setItem(currentUser + "_expenses", JSON.stringify(expenses));

    updateUI();
}

function updateUI() {
    let total = expenses.reduce((sum, item) => sum + item.amount, 0);
    document.getElementById("total").innerText = total;

    let percentage = (total / budget) * 100;
    document.getElementById("progress").style.width = percentage + "%";

    if (percentage >= alertPercentage) {
        alert("⚠ Warning! You have used 80% of your budget!");
    }

    updateChart();
}

function updateChart() {
    let categories = {};
    expenses.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + item.amount;
    });

    let ctx = document.getElementById('pieChart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories)
            }]
        }
    });
}

updateUI();
function generateMonthlyReport() {
    let selectedMonth = document.getElementById("monthPicker").value;
    if (!selectedMonth) return;

    let total = 0;

    expenses.forEach(exp => {
        if (exp.date.startsWith(selectedMonth)) {
            total += exp.amount;
        }
    });

    document.getElementById("monthlyTotal").innerText = total;
}

window.onload = function () {

    let budgetUsed = 65; // Change percentage here

    // Animate progress bar
    document.getElementById("progressBar").style.width = budgetUsed + "%";

    // Animate percentage counter
    let count = 0;
    let counter = setInterval(function () {
        if (count >= budgetUsed) {
            clearInterval(counter);
        } else {
            count++;
            document.getElementById("percentText").innerText = count + "%";
        }
    }, 20);

};
<script>
window.onload = function () {

    let totalExpense = 5000; // Change your expense value here
    let count = 0;
    let speed = 20; // lower = faster

    let counter = setInterval(function () {

        count += 50;  // Increase step

        