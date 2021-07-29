
export function addDecimal(num) {
  //set everything to at least two decimals; removs 3+ zero decimasl, keep non-zero decimals
  var new_value = num * 1; //removes trailing zeros
  new_value = new_value+''; //casts it to string

  let pos = new_value.indexOf('.');
  if (pos==-1) new_value = new_value + '.00';
  else {
      var integer = new_value.substring(0,pos);
      var decimals = new_value.substring(pos+1);
      while(decimals.length<2) decimals=decimals+'0';
      new_value = integer+'.'+decimals;
  }
  return new_value;
}

export function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}