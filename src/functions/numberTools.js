
export function addDecimal(num) {
  if(num % 1 == 0) {
    return parseFloat(num).toFixed(2);
  }

  return num
}

export function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}