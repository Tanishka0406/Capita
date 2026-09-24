const currencies = {
  USD: { name: "US Dollar", symbol: "$", rate: 1 },
  EUR: { name: "Euro", symbol: "€", rate: 0.921 },
  GBP: { name: "British Pound", symbol: "£", rate: 0.774 },
  JPY: { name: "Japanese Yen", symbol: "¥", rate: 148.7 },
  CAD: { name: "Canadian Dollar", symbol: "CA$", rate: 1.359 },
  AUD: { name: "Australian Dollar", symbol: "A$", rate: 1.511 },
  INR: { name: "Indian Rupee", symbol: "₹", rate: 83.12 },
  CHF: { name: "Swiss Franc", symbol: "CHF", rate: 0.897 }
};

const amountInput = document.querySelector("#amount");
const fromSelect = document.querySelector("#from-currency");
const toSelect = document.querySelector("#to-currency");
const result = document.querySelector("#result");
const snapshotResult = document.querySelector("#snapshot-result");
const rateText = document.querySelector("#rate-text");
const amountError = document.querySelector("#amount-error");

function populateCurrencies() {
  Object.entries(currencies).forEach(([code, currency]) => {
    const option = `<option value="${code}">${code}</option>`;
    fromSelect.insertAdjacentHTML("beforeend", option);
    toSelect.insertAdjacentHTML("beforeend", option);
  });
  fromSelect.value = "USD";
  toSelect.value = "EUR";
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value);
}

function convert() {
  const amount = Number(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amountInput.value || Number.isNaN(amount) || amount < 0) {
    result.textContent = "0.00";
    snapshotResult.textContent = `${currencies[to].symbol}0.00`;
    amountError.textContent = "Enter an amount of 0 or more.";
    return;
  }

  amountError.textContent = "";
  const converted = amount * (currencies[to].rate / currencies[from].rate);
  const rate = currencies[to].rate / currencies[from].rate;
  result.textContent = formatNumber(converted);
  snapshotResult.textContent = `${currencies[to].symbol}${formatNumber(converted)}`;
  rateText.textContent = `1 ${from} = ${formatNumber(rate)} ${to}`;
}

document.querySelector("#swap-button").addEventListener("click", () => {
  const currentFrom = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = currentFrom;
  convert();
});

[amountInput, fromSelect, toSelect].forEach((control) => control.addEventListener("input", convert));
populateCurrencies();
convert();
