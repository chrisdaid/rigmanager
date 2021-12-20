const truncToTwo = (num) => {
  num = num.toString().split("");
  let indexOfDot = num.indexOf(".");
  let placeholder = Math.trunc(num.join(""));
  placeholder = String(placeholder).split("");
  placeholder.push(num[indexOfDot]);
  placeholder.push(num[indexOfDot + 1]);
  placeholder.push(num[indexOfDot + 2]);
  return placeholder.join("");
};

const truncToFive = (num) => {
  num = num.toString().split("");
  let indexOfDot = num.indexOf(".");
  let placeholder = Math.trunc(num.join(""));
  placeholder = String(placeholder).split("");
  placeholder.push(num[indexOfDot]);
  placeholder.push(num[indexOfDot + 1]);
  placeholder.push(num[indexOfDot + 2]);
  placeholder.push(num[indexOfDot + 3]);
  placeholder.push(num[indexOfDot + 4]);
  placeholder.push(num[indexOfDot + 5]);
  placeholder.push(num[indexOfDot + 6]);
  return placeholder.join("");
};

export { truncToTwo, truncToFive };
