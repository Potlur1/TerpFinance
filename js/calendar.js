let transactions = [];

// Load text file
async function loadData() {
    try {
        const response = await fetch("data.txt");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();

        if (text.trim() === "") {
            transactions = [];
        } else {
            transactions = text.trim().split("\n").map(line => {
                const [date, type, name, amount] = line.split(",");
                return {
                    date,
                    type,
                    name,
                    amount: parseFloat(amount)
                };
            });
        }
    } catch (error) {
        console.log("Could not load data.txt:", error);
        transactions = [];
    }

    generateCalendar();
}

// Calculate net for a day
function getNet(date) {
    let total = 0;

    transactions.forEach(t => {
        if (t.date === date) {
            if (t.type === "income") total += t.amount;
            else total -= t.amount;
        }
    });

    return total;
}

// Generate calendar
function generateCalendar() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    monthYear.textContent = today.toLocaleString("default", {
        month: "long",
        year: "numeric"
    });

    calendar.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty spaces before the first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.classList.add("day");
        empty.style.visibility = "hidden";
        calendar.appendChild(empty);
    }

    // Actual day boxes
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const net = getNet(dateStr);

        const div = document.createElement("div");
        div.classList.add("day");

        if (net > 0) div.classList.add("gain");
        else if (net < 0) div.classList.add("loss");
        else div.classList.add("neutral");

        div.textContent = day;
        div.onclick = () => showDay(dateStr);

        calendar.appendChild(div);
    }
}

// Show clicked day details
function showDay(date) {
    const list = document.getElementById("list");
    const selectedDate = document.getElementById("selectedDate");
    const netResult = document.getElementById("netResult");

    selectedDate.textContent = date;
    list.innerHTML = "";

    let total = 0;
    const filtered = transactions.filter(t => t.date === date);

    if (filtered.length === 0) {
        netResult.textContent = "No data";
        netResult.style.color = "black";
        return;
    }

    filtered.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.name}: $${t.amount}`;
        list.appendChild(li);

        if (t.type === "income") total += t.amount;
        else total -= t.amount;
    });

    if (total > 0) {
        netResult.textContent = `Net Gain: $${total.toFixed(2)}`;
        netResult.style.color = "green";
    } else if (total < 0) {
        netResult.textContent = `Net Loss: $${Math.abs(total).toFixed(2)}`;
        netResult.style.color = "red";
    } else {
        netResult.textContent = "Break Even";
        netResult.style.color = "black";
    }
}

loadData();