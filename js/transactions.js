const welcomeBack = document.getElementById("welcome_back");
const transactionsList = document.getElementById("transactions_list");

const addTransactionBtn = document.getElementById("add_transaction_btn");
const transactionModal = document.getElementById("transaction_modal");
const closeModalBtn = document.getElementById("close_modal");
const transactionForm = document.getElementById("transaction_form");

const transactionNameInput = document.getElementById("name");
const transactionAmountInput = document.getElementById("amount");
const transactionTypeInput = document.getElementById("type");
const transactionCategoryInput = document.getElementById("category");

const fullListDialog = document.getElementById("full_list");
const openFullListBtn = document.getElementById("open_full_list");
const closeFullListBtn = document.getElementById("close_full_list");
const allTransactionsContainer = document.getElementById("all_transactions");

const deleteConfirmModal = document.getElementById("delete_confirm_modal");
const confirmDeleteBtn = document.getElementById("confirm_delete_btn");
const cancelDeleteBtn = document.getElementById("cancel_delete_btn");

const keyboardContainerHome = document.getElementById("keyboardContainerHome");
const homeTypingFields = document.querySelectorAll("#transaction_form input, #transaction_form select");

let pendingDeleteIndex = null;

if (welcomeBack) {
  const storedName = sessionStorage.getItem("userName");
  welcomeBack.textContent = storedName
    ? `Welcome Back, ${storedName}`
    : "Welcome Back, John";
}

let transactions = [
  { date: "4/6", name: "Stussy", amount: 45, type: "expense", category: "clothes" },
  { date: "3/29", name: "McDonalds", amount: 15, type: "expense", category: "food" },
  { date: "3/29", name: "Work", amount: 300, type: "income", category: "other" },
  { date: "3/27", name: "Groceries", amount: 120, type: "expense", category: "food" },
  { date: "3/27", name: "Snacks", amount: 30, type: "expense", category: "food" },
];

function showKeyboardHome() {
  if (keyboardContainerHome) {
    keyboardContainerHome.classList.remove("hidden");
  }
}

function hideKeyboardHome() {
  if (keyboardContainerHome) {
    keyboardContainerHome.classList.add("hidden");
  }
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
  const stored = localStorage.getItem("transactions");
  if (stored) {
    transactions = JSON.parse(stored).map((t) => ({
      ...t,
      category: t.category || "other"
    }));
  }
}

function getCurrentDate() {
  const now = new Date();
  return `${now.getMonth() + 1}/${now.getDate()}`;
}

function formatAmount(amount, type) {
  const value = Number(amount).toFixed(2);
  return type === "income" ? `+$${value}` : `-$${value}`;
}

function askToDeleteTransaction(index) {
  pendingDeleteIndex = index;
  deleteConfirmModal.showModal();
}

function confirmDeleteTransaction() {
  if (pendingDeleteIndex === null) return;

  transactions.splice(pendingDeleteIndex, 1);
  saveTransactions();
  renderTransactions();
  renderFullList();

  closeDeleteModal();
}

function closeDeleteModal() {
  pendingDeleteIndex = null;
  deleteConfirmModal.close();
}

function renderTransactions() {
  transactionsList.innerHTML = "";

  const recent = transactions.slice(0, 5);

  if (recent.length === 0) {
    transactionsList.innerHTML = `<li class="empty_state">No transactions yet.</li>`;
    return;
  }

  recent.forEach((t, index) => {
    const li = document.createElement("li");
    li.className =
      t.type === "income"
        ? "transaction_card transaction_green"
        : "transaction_card transaction_red";

    li.innerHTML = `
      <span class="transaction_date">${t.date}</span>
      <span class="transaction_name">${t.name}</span>
      <span class="transaction_amount">${formatAmount(t.amount, t.type)}</span>
      <button class="delete_btn">✕</button>
    `;

    li.querySelector(".delete_btn").addEventListener("click", () => {
      askToDeleteTransaction(index);
    });

    transactionsList.appendChild(li);
  });
}

function renderFullList() {
  allTransactionsContainer.innerHTML = "";

  if (transactions.length === 0) {
    allTransactionsContainer.innerHTML = `<div class="empty_state">No transactions yet.</div>`;
    return;
  }

  transactions.forEach((t, index) => {
    const item = document.createElement("div");
    item.className =
      t.type === "income"
        ? "full_transaction_item transaction_green"
        : "full_transaction_item transaction_red";

    item.innerHTML = `
      <div>
        <div>${t.date}</div>
        <div>${t.name}</div>
      </div>
      <div>
        <span>${formatAmount(t.amount, t.type)}</span>
        <button class="full_delete_btn">✕</button>
      </div>
    `;

    item.querySelector(".full_delete_btn").addEventListener("click", () => {
      askToDeleteTransaction(index);
    });

    allTransactionsContainer.appendChild(item);
  });
}

function addTransaction(name, amount, type, category) {
  transactions.unshift({
    date: getCurrentDate(),
    name,
    amount,
    type,
    category
  });

  saveTransactions();
  renderTransactions();
  renderFullList();
}

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = transactionNameInput.value.trim();
  const amount = Number(transactionAmountInput.value);
  const type = transactionTypeInput.value;
  const category = transactionCategoryInput.value;

  if (!name || amount <= 0) return;

  addTransaction(name, amount, type, category);
  transactionModal.close();
  transactionForm.reset();
  hideKeyboardHome();
});

addTransactionBtn.addEventListener("click", () => {
  transactionModal.showModal();
  transactionNameInput.focus();
  showKeyboardHome();
});

closeModalBtn.addEventListener("click", () => {
  transactionModal.close();
  hideKeyboardHome();
});

openFullListBtn.addEventListener("click", () => {
  renderFullList();
  fullListDialog.showModal();
});

closeFullListBtn.addEventListener("click", () => {
  fullListDialog.close();
});

confirmDeleteBtn.addEventListener("click", confirmDeleteTransaction);
cancelDeleteBtn.addEventListener("click", closeDeleteModal);

homeTypingFields.forEach((field) => {
  field.addEventListener("focus", showKeyboardHome);
  field.addEventListener("click", showKeyboardHome);
});

transactionModal.addEventListener("click", (event) => {
  const rect = transactionModal.getBoundingClientRect();
  const clickedInside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!clickedInside) {
    transactionModal.close();
    hideKeyboardHome();
  }
});


loadTransactions();
renderTransactions();
renderFullList();
