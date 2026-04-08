function showNotification() {
    document.getElementById("notif").style.display = "block";
}

function closeNotification() {
    document.getElementById("notif").style.display = "none";
}

function showFullList() {
    document.getElementById("full_list").style.display = "show";
}

const welcomeBack = document.getElementById("welcome_back");

if (welcomeBack !== null) {
  if (sessionStorage.getItem("userName") === null) {
    welcomeBack.textContent = "John's Home";
  }
  else {
    welcomeBack.textContent = "Jacob's Home";
  }
}

function saveProfile(name, profileType, details) {
  const trimmed = name.trim();
  sessionStorage.setItem("userName", trimmed);
  sessionStorage.setItem("profileType", profileType);
  sessionStorage.setItem("profileDetails", JSON.stringify(details));
  updateCurrentProfileDisplay(trimmed, profileType, details);
}
 
function updateCurrentProfileDisplay(name, profileType, details) {
  const emptyCard  = document.getElementById("profile-card-empty");
  const card       = document.getElementById("profile-card");
  const cardType   = document.getElementById("profile-card-type");
  const cardName   = document.getElementById("profile-card-name");
  const cardDetails = document.getElementById("profile-card-details");
  if (!card) return;
 
  emptyCard.style.display = "none";
  card.style.display = "block";
 
  cardType.textContent = profileType;
  cardName.textContent = name;
 
  cardDetails.innerHTML = "";
  for (const [key, value] of Object.entries(details)) {
    if (value !== "" && value !== null && value !== undefined && value !== "—") {
      const li = document.createElement("li");
      li.innerHTML = `<span class="profile-detail-label">${key}:</span> <span class="profile-detail-value">${value}</span>`;
      cardDetails.appendChild(li);
    }
  }
}
 
function saveHighSchoolProfile() {
  const name        = document.getElementById("hs-name").value;
  const allowance   = document.getElementById("hs-allowance").value;
  const income      = document.getElementById("hs-income").value;
  const spending    = document.getElementById("hs-spending").value;
  const savings     = document.getElementById("hs-savings").value;
  const jobRadio    = document.querySelector('input[name="hs-job"]:checked');
  const hasJob      = jobRadio ? jobRadio.value : "—";
 
  saveProfile(name, "High School Student", {
    "Allowance ($/week)": allowance ? `$${allowance}` : "—",
    "Part-Time Job": hasJob,
    "Weekly Income ($/week)": income ? `$${income}` : "—",
    "Spending Money ($/week)": spending ? `$${spending}` : "—",
    "Savings Goal": savings ? `$${savings}` : "—"
  });
}
 
function saveCollegeProfile() {
  const name       = document.getElementById("college-name").value;
  const housing    = document.getElementById("college-housing").value;
  const rent       = document.getElementById("college-rent").value;
  const grocBudget = document.getElementById("college-groceries-budget").value;
  const income     = document.getElementById("college-income").value;
  const diningRadio   = document.querySelector('input[name="college-dining"]:checked');
  const grocRadio     = document.querySelector('input[name="college-groceries"]:checked');
 
  saveProfile(name, "College Student", {
    "Housing": housing,
    "Rent ($/month)": rent ? `$${rent}` : "—",
    "Dining Plan": diningRadio ? diningRadio.value : "—",
    "Buys Groceries": grocRadio ? grocRadio.value : "—",
    "Groceries Budget ($/week)": grocBudget ? `$${grocBudget}` : "—",
    "Part-Time Income ($/month)": income ? `$${income}` : "—"
  });
}
 
function saveSalaryProfile() {
  const name       = document.getElementById("salary-name").value;
  const salary     = document.getElementById("salary-amount").value;
  const rent       = document.getElementById("salary-rent").value;
  const utilities  = document.getElementById("salary-utilities").value;
  const transport  = document.getElementById("salary-transport").value;
  const groceries  = document.getElementById("salary-groceries").value;
  const savings    = document.getElementById("salary-savings").value;
 
  saveProfile(name, "Salary Worker", {
    "Monthly Salary": salary ? `$${salary}` : "—",
    "Rent/Mortgage ($/month)": rent ? `$${rent}` : "—",
    "Utilities ($/month)": utilities ? `$${utilities}` : "—",
    "Transportation ($/month)": transport ? `$${transport}` : "—",
    "Groceries ($/month)": groceries ? `$${groceries}` : "—",
    "Savings Contribution ($/month)": savings ? `$${savings}` : "—"
  });
}
 
function saveFreelanceProfile() {
  const name        = document.getElementById("freelance-name").value;
  const income      = document.getElementById("freelance-income").value;
  const variability = document.getElementById("freelance-variability").value;
  const rent        = document.getElementById("freelance-rent").value;
  const utilities   = document.getElementById("freelance-utilities").value;
  const emergency   = document.getElementById("freelance-emergency").value;
  const business    = document.getElementById("freelance-business").value;
 
  saveProfile(name, "Freelance Worker", {
    "Avg Weekly Income": income ? `$${income}` : "—",
    "Income Variability": variability,
    "Rent ($/month)": rent ? `$${rent}` : "—",
    "Utilities ($/month)": utilities ? `$${utilities}` : "—",
    "Emergency Fund Goal": emergency ? `$${emergency}` : "—",
    "Business Expenses ($/month)": business ? `$${business}` : "—"
  });
}
 
function saveRetireeProfile() {
  const name       = document.getElementById("retiree-name").value;
  const income     = document.getElementById("retiree-income").value;
  const housing    = document.getElementById("retiree-housing").value;
  const healthcare = document.getElementById("retiree-healthcare").value;
  const groceries  = document.getElementById("retiree-groceries").value;
  const leisure    = document.getElementById("retiree-leisure").value;
  const savings    = document.getElementById("retiree-savings").value;
 
  saveProfile(name, "Retiree", {
    "Monthly Income": income ? `$${income}` : "—",
    "Housing ($/month)": housing ? `$${housing}` : "—",
    "Healthcare ($/month)": healthcare ? `$${healthcare}` : "—",
    "Groceries ($/month)": groceries ? `$${groceries}` : "—",
    "Leisure/Travel ($/month)": leisure ? `$${leisure}` : "—",
    "Savings/Investments ($/month)": savings ? `$${savings}` : "—"
  });
}
 
(function loadSavedProfile() {
  const display = document.getElementById("current_profile_display");
  if (!display) return;
  const savedName = sessionStorage.getItem("userName");
  const savedType = sessionStorage.getItem("profileType");
  const savedDetails = sessionStorage.getItem("profileDetails");
  if (savedName && savedType) {
    const details = savedDetails ? JSON.parse(savedDetails) : {};
    updateCurrentProfileDisplay(savedName, savedType, details);
  }
})();

const switchEl = document.getElementById("iconSwitch");
const graphImage = document.getElementById("graph_image");
const graphDropdown = document.getElementById("graph_dropdown");
let graphBool = false;

function updateGraphImage() {
  if (!graphImage || !graphDropdown) return;

  const selectedRange = graphDropdown.value;

  if (graphBool) {
    graphImage.src = "Icon-Images/pie-chart.png";
  } else {
    if (selectedRange === "Week") {
      graphImage.src = "Icon-Images/line-graph-week.png";
    } else if (selectedRange === "Month") {
      graphImage.src = "Icon-Images/line-graph-week.png";
    } else if (selectedRange === "Year") {
      graphImage.src = "Icon-Images/line-graph-week.png";
    } else if (selectedRange === "All-Time") {
      graphImage.src = "Icon-Images/line-graph-all.png";
    }
  }
}

if (switchEl !== null) {
  switchEl.addEventListener("click", () => {
    switchEl.classList.toggle("on");
    graphBool = !graphBool;
    updateGraphImage();
  });
}

function allTimeView() {
  updateGraphImage();
}

const shortTermBudgetList = document.getElementById("shortTermBudgetList");
const longTermBudgetList = document.getElementById("longTermBudgetList");

const budgetModal = document.getElementById("budgetModal");
const openAddModalBtn = document.getElementById("openAddModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const editMainBudgetBtn = document.getElementById("editMainBudgetBtn");

const budgetForm = document.getElementById("budgetForm");
const modalTitle = document.getElementById("modalTitle");

const budgetType = document.getElementById("budgetType");
const budgetName = document.getElementById("budgetName");
const budgetCategory = document.getElementById("budgetCategory");
const targetAmount = document.getElementById("targetAmount");
const currentAmount = document.getElementById("currentAmount");
const endDate = document.getElementById("endDate");
const milestoneDate = document.getElementById("milestoneDate");
const mainBudgetSubtitleInput = document.getElementById("mainBudgetSubtitleInput");

const shortTermFields = document.getElementById("shortTermFields");
const longTermFields = document.getElementById("longTermFields");
const mainBudgetFields = document.getElementById("mainBudgetFields");

const editIndex = document.getElementById("editIndex");
const editingMainBudget = document.getElementById("editingMainBudget");

const mainBudgetNameEl = document.getElementById("mainBudgetName");
const mainBudgetSubtitleEl = document.getElementById("mainBudgetSubtitle");
const mainBudgetRightTextEl = document.getElementById("mainBudgetRightText");
const mainBudgetProgressFillEl = document.getElementById("mainBudgetProgressFill");
const mainBudgetTargetTextEl = document.getElementById("mainBudgetTargetText");
const mainBudgetPercentTextEl = document.getElementById("mainBudgetPercentText");

const keyboardContainer = document.getElementById("keyboardContainer");
const budgetInputs = document.querySelectorAll("#budgetForm input, #budgetForm select");

const keyboardContainerProfile = document.getElementById("keyboardContainerProfile");
const profileInputs = document.querySelectorAll(".preset-content input, .preset-content select");

let mainBudget = {
  type: "main",
  name: "Weekly Essentials",
  category: "Main Budget",
  target: 500,
  current: 180,
  dateLabel: "this week",
  subtitle: "Stay under your $500 weekly budget"
};

let budgets = [
  {
    type: "short",
    name: "Groceries This Week",
    category: "Food",
    target: 180,
    current: 140,
    dateLabel: "April 20, 2026"
  },
  {
    type: "short",
    name: "Eating Out",
    category: "Food",
    target: 60,
    current: 90,
    dateLabel: ""
  },
  {
    type: "short",
    name: "Nintendo Switch",
    category: "Savings",
    target: 300,
    current: 100,
    dateLabel: "April 30, 2026"
  }
];

function showKeyboard() {
  if (keyboardContainer) {
    keyboardContainer.classList.remove("hidden");
  }
}

function hideKeyboard() {
  if (keyboardContainer) {
    keyboardContainer.classList.add("hidden");
  }
}

function showKeyboardProfile() {
  if (keyboardContainerProfile) {
    keyboardContainerProfile.classList.remove("hidden");
  }
}

function hideKeyboardProfile() {
  if (keyboardContainerProfile) {
    keyboardContainerProfile.classList.add("hidden");
  }
}

function renderMainBudget() {
  if (!mainBudgetNameEl) return;

  const remaining = Math.max(mainBudget.target - mainBudget.current, 0);
  const percentRemaining = mainBudget.target > 0
    ? Math.round((remaining / mainBudget.target) * 100)
    : 0;

  mainBudgetNameEl.textContent = mainBudget.name;
  mainBudgetSubtitleEl.textContent = mainBudget.subtitle || `Stay under your $${mainBudget.target} budget`;
  mainBudgetRightTextEl.textContent = `$${remaining} left`;
  mainBudgetProgressFillEl.style.width = `${Math.min(percentRemaining, 100)}%`;
  mainBudgetTargetTextEl.innerHTML = `<strong>Target:</strong> Stay under $${mainBudget.target} ${mainBudget.dateLabel || ""}`.trim();
  mainBudgetPercentTextEl.textContent = `${percentRemaining}% remaining`;
}

function renderBudgets() {
  if (!shortTermBudgetList || !longTermBudgetList) return;

  shortTermBudgetList.innerHTML = "";
  longTermBudgetList.innerHTML = "";

  budgets.forEach((budget, index) => {
    const card = createBudgetCard(budget, index);

    if (budget.type === "long") {
      longTermBudgetList.appendChild(card);
    } else {
      shortTermBudgetList.appendChild(card);
    }
  });

  if (shortTermBudgetList.children.length === 0) {
    shortTermBudgetList.innerHTML = `
      <div class="card">
        <p class="muted">No short-term budgets yet.</p>
      </div>
    `;
  }

  if (longTermBudgetList.children.length === 0) {
    longTermBudgetList.innerHTML = `
      <div class="card">
        <p class="muted">No long-term budgets yet.</p>
      </div>
    `;
  }
}

function createBudgetCard(budget, index) {
  const card = document.createElement("section");
  card.className = "budget-card";

  const percent = budget.target > 0 ? Math.round((budget.current / budget.target) * 100) : 0;
  const shownPercent = Math.min(percent, 100);

  const isSavingsType =
    budget.category.trim().toLowerCase() === "savings" || budget.type === "long";

  let fillClass = "budget-green";
  let statusClass = "status-good";
  let rightText = "";
  let statusText = "";
  let moneyClass = "positive";

  if (budget.type === "long") {
    rightText = `$${budget.current} / $${budget.target} saved`;
    statusText = budget.dateLabel
      ? `Next milestone: ${budget.dateLabel}`
      : "Long-term progress tracking enabled";
  } else if (budget.current > budget.target) {
    const overAmount = budget.current - budget.target;
    rightText = `$${overAmount} over`;
    statusText = `Over by $${overAmount}`;
    fillClass = "budget-red";
    statusClass = "status-danger";
    moneyClass = "danger";
  } else if (isSavingsType) {
    rightText = `$${budget.current} / $${budget.target} saved`;
    statusText = budget.dateLabel ? `On track for ${budget.dateLabel}` : "On track";
  } else {
    const remaining = budget.target - budget.current;
    rightText = `$${remaining} left`;

    if (percent >= 80) {
      fillClass = "budget-yellow";
      statusClass = "status-warning";
      moneyClass = "warning";
      statusText = budget.dateLabel ? `Close to limit for ${budget.dateLabel}` : "Near limit";
    } else {
      statusText = budget.dateLabel ? `On track for ${budget.dateLabel}` : "On track";
    }
  }

  const metaText = isSavingsType
    ? `$${budget.current} / $${budget.target} saved`
    : `$${budget.current} / $${budget.target} used`;

  card.innerHTML = `
    <div class="budget-top">
      <div>
        <h3>${budget.name}</h3>
        <div class="budget-meta">${metaText}</div>
      </div>
      <div class="money ${moneyClass}">${rightText}</div>
    </div>

    <div class="progress-bar">
      <div class="progress-fill ${fillClass}" style="width: ${shownPercent}%"></div>
    </div>

    <div class="status-text ${statusClass}">${statusText}</div>

    <div class="card-button-row">
      <button class="secondary-btn" type="button" data-index="${index}" data-action="edit">Edit</button>
      <button class="secondary-btn" type="button" data-index="${index}" data-action="delete">Delete</button>
    </div>
  `;

  const buttons = card.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const buttonIndex = Number(button.dataset.index);

      if (action === "edit") {
        startEditBudget(buttonIndex);
      } else if (action === "delete") {
        deleteBudget(buttonIndex);
      }
    });
  });

  return card;
}

function openModal(isEdit = false) {
  if (!budgetModal || !modalTitle) return;
  budgetModal.classList.remove("hidden");
  modalTitle.textContent = isEdit ? "Edit Budget" : "Add Budget";
}

function closeModal() {
  if (!budgetModal || !budgetForm) return;
  budgetModal.classList.add("hidden");
  budgetForm.reset();
  modalTitle.textContent = "Add Budget";
  budgetType.value = "";
  shortTermFields.classList.remove("hidden");
  longTermFields.classList.add("hidden");
  mainBudgetFields.classList.add("hidden");
  editIndex.value = "";
  editingMainBudget.value = "false";
  hideKeyboard();
}

function updateBudgetTypeFields() {
  if (!budgetType) return;

  if (budgetType.value === "long") {
    shortTermFields.classList.add("hidden");
    longTermFields.classList.remove("hidden");
    mainBudgetFields.classList.add("hidden");
  } else if (budgetType.value === "main") {
    shortTermFields.classList.add("hidden");
    longTermFields.classList.add("hidden");
    mainBudgetFields.classList.remove("hidden");
  } else {
    shortTermFields.classList.remove("hidden");
    longTermFields.classList.add("hidden");
    mainBudgetFields.classList.add("hidden");
  }
}

function startEditBudget(index) {
  const budget = budgets[index];

  openModal(true);

  budgetType.value = budget.type;
  updateBudgetTypeFields();

  budgetName.value = budget.name;
  budgetCategory.value = budget.category;
  targetAmount.value = budget.target;
  currentAmount.value = budget.current;

  if (budget.type === "short") {
    endDate.value = budget.dateLabel || "";
    milestoneDate.value = "";
    mainBudgetSubtitleInput.value = "";
  } else {
    milestoneDate.value = budget.dateLabel || "";
    endDate.value = "";
    mainBudgetSubtitleInput.value = "";
  }

  editIndex.value = index;
  editingMainBudget.value = "false";
}

function startEditMainBudget() {
  openModal(true);

  budgetType.value = "main";
  updateBudgetTypeFields();

  budgetName.value = mainBudget.name;
  budgetCategory.value = mainBudget.category;
  targetAmount.value = mainBudget.target;
  currentAmount.value = mainBudget.current;
  mainBudgetSubtitleInput.value = mainBudget.subtitle || "";

  endDate.value = "";
  milestoneDate.value = "";

  editIndex.value = "";
  editingMainBudget.value = "true";
}

function deleteBudget(index) {
  budgets.splice(index, 1);
  renderBudgets();
}

if (budgetForm) {
  budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const type = budgetType.value;
    const name = budgetName.value.trim();
    const category = budgetCategory.value.trim();
    const target = Number(targetAmount.value);
    const current = Number(currentAmount.value);

    if (!type || !name || !category || Number.isNaN(target) || Number.isNaN(current)) {
      return;
    }

    if (editingMainBudget.value === "true" || type === "main") {
      mainBudget = {
        type: "main",
        name,
        category,
        target,
        current,
        dateLabel: "this week",
        subtitle: mainBudgetSubtitleInput.value.trim() || `Stay under your $${target} weekly budget`
      };

      renderMainBudget();
      closeModal();
      return;
    }

    let dateLabel = "";

    if (type === "short") {
      dateLabel = endDate.value.trim();
    } else {
      dateLabel = milestoneDate.value.trim();
    }

    const budgetData = {
      type,
      name,
      category,
      target,
      current,
      dateLabel
    };

    if (editIndex.value !== "") {
      budgets[Number(editIndex.value)] = budgetData;
    } else {
      budgets.push(budgetData);
    }

    renderBudgets();
    closeModal();
  });
}

function togglePreset(button) {
  const content = button.nextElementSibling;

  if (content.style.display === "block") {
    content.style.display = "none";
    hideKeyboardProfile();
  } else {
    content.style.display = "block";
  }
}

function toggleCustom() {
  sessionStorage.setItem('userName', 'Welcome Back, Jacob');
}

if (openAddModalBtn) {
  openAddModalBtn.addEventListener("click", () => {
    openModal(false);
  });
}

if (editMainBudgetBtn) {
  editMainBudgetBtn.addEventListener("click", () => {
    startEditMainBudget();
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    closeModal();
  });
}

if (cancelModalBtn) {
  cancelModalBtn.addEventListener("click", () => {
    closeModal();
  });
}

if (budgetType) {
  budgetType.addEventListener("change", () => {
    updateBudgetTypeFields();
    showKeyboard();
  });
}

if (budgetModal) {
  budgetModal.addEventListener("click", (event) => {
    if (event.target === budgetModal) {
      closeModal();
    }
  });
}

budgetInputs.forEach((field) => {
  field.addEventListener("focus", showKeyboard);
  field.addEventListener("click", showKeyboard);
});

profileInputs.forEach((field) => {
  field.addEventListener("focus", showKeyboardProfile);
  field.addEventListener("click", showKeyboardProfile);
});

document.addEventListener("click", (event) => {
  if (
    keyboardContainerProfile &&
    !event.target.closest(".preset-content") &&
    !event.target.closest(".keyboard-container") &&
    !event.target.closest(".preset-header")
  ) {
    hideKeyboardProfile();
  }
});

function setupBudgetSectionToggles() {
  const collapsibleHeaders = document.querySelectorAll(".collapsible-header");

  collapsibleHeaders.forEach((header) => {
    const toggleBtn = header.querySelector(".expand-toggle");
    const targetId = header.dataset.target;
    const targetSection = document.getElementById(targetId);

    toggleBtn.addEventListener("click", () => {
      const isHidden = targetSection.classList.toggle("hidden");
      toggleBtn.setAttribute("aria-expanded", String(!isHidden));

      const chevron = toggleBtn.querySelector(".chevron");
      chevron.classList.toggle("rotated", isHidden);
    });

    header.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() !== "button" && !event.target.closest("button")) {
        toggleBtn.click();
      }
    });
  });
}

if (budgetModal && budgetForm) {
  closeModal();
  renderMainBudget();
  renderBudgets();
  setupBudgetSectionToggles();
}
