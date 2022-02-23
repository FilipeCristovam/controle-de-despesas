const transactionsUl = document.querySelector("#transactions");
const incomeDisplay = document.getElementById("money-plus");
const expenseDisplay = document.getElementById("money-minus");
const balanceDisplay = document.getElementById("balance");
const form = document.getElementById("form");
const inputTransactionName = document.getElementById("text");
const inputTransactionAmount = document.getElementById("amount");

const localStorgeTransaction = JSON.parse(localStorage.getItem("transactions"));
let transactions =
  localStorage.getItem("transactions") !== null ? localStorgeTransaction : [];
const removeTrasnaction = (ID) => {
  transactions = transactions.filter((transaction) => transaction.id !== ID);

  updateLocalStorage();
  init();
};

const addTranssactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";
  const CSSclass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSclass);
  li.innerHTML = `
 ${transaction.name} <span>${operator}R$ ${amountWithoutOperator} </span>
    <button class="delete-btn" onClick="removeTrasnaction(${transaction.id})">x</button>
  `;

  transactionsUl.append(li);
};

const updateBalanceValue = () => {
  const transactionsAmouts = transactions.map(
    (transaction) => transaction.amount
  );

  const total = transactionsAmouts
    .reduce((accummulator, transaction) => accummulator + transaction, 0)
    .toFixed(2);
  const income = transactionsAmouts
    .filter((value) => value > 0)
    .reduce((accummulator, value) => accummulator + value, 0)
    .toFixed(2);
  const expense = Math.abs(
    transactionsAmouts
      .filter((value) => value < 0)
      .reduce((accummulator, value) => accummulator + value, 0)
  ).toFixed(2);

  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
  transactionsUl.innerHTML = "";
  transactions.forEach(addTranssactionIntoDOM);
  updateBalanceValue();
};

init();

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const generateID = () => Math.round(Math.random() * 1000);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmouts = inputTransactionAmount.value.trim();

  if (transactionName === "" || transactionAmouts === "") {
    alert("Por favor, preencha o nome do valor e da transacao");
    return;
  }
  const transaction = {
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmouts),
  };

  transactions.push(transaction);
  init();

  updateLocalStorage();

  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
});
