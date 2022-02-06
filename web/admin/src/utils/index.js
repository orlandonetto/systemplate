const moment = require("moment");

export function displayAlert(message, type = 0, fixed = false) {
  this.$root.$emit("display-alert", {
    message: message,
    type: type,
    fixed: fixed,
  });
}

export function formatAmount(data, decimal = 2) {
  // change number of digits decimal point
  if (!data) return data;

  const og = Math.pow(10, decimal);

  data = Math.floor(data * og) / og;

  return Number(data.toFixed(decimal));
}

export function moneyMask(data, max = 2, min = 2, locale = "usd") {
  // add currency mask formatting
  if (!data) return data;

  data = data.toString().replace(",", ".");

  return Number(data).toLocaleString(locale, {
    maximumFractionDigits: max,
    minimumFractionDigits: min,
  });
}

export function parseNumber(data) {
  if (!data) return data;

  // remove money mask
  try {
    return Number(data.replace(/,/g, ""));
    // return Number(data.replace(/\,/g, ""));
  } catch {
    return Number(data);
  }
}

export function formatDate(date, format = "YYYY-MM-DD HH:mm") {
  if (!date) return "";
  return moment(date).format(format);
}

// capitalize all words
export function capitalizeAll(value) {
  if (!value) return "";

  const values = value.split(" ");

  return values
    .map((e) => capitalize(e))
    .toString()
    .replaceAll(",", " ");
}

// capitalize first word
export function capitalize(value) {
  if (!value) return "";

  value = value.toString();

  return value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
}

// set all to uppercase
export function upperCase(value) {
  if (!value) return "";

  return value.toString().toUpperCase();
}

// set all to lowerCase
export function lowerCase(value) {
  if (!value) return "";

  return value.toString().toLowerCase();
}

export function isNumber(evt) {
  //verifica se possui apenas números
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;

  if (charCode < 48 || charCode > 57) {
    evt.preventDefault();
  } else {
    return true;
  }
}

export function notNumber(evt) {
  //bloqueia números
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;

  if (charCode < 48 || charCode > 57) {
    return true;
  } else {
    evt.preventDefault();
  }
}
