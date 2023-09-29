// Examples
// getFormattedStringFromArray(["abc", "bcd"]) => 'abc, bcd';
// getFormattedStringFromArray(["abc""]) => 'abc';
export function getFormattedStringFromArray(arr: string[]): string {
  if (arr.length <= 1) {
    return arr[0];
  }

  let result = "";

  arr.forEach((el, index) => {
    if (index === arr.length - 1) {
      result = result.concat(el);
    } else {
      result = result.concat(el).concat(", ");
    }
  });

  return result;
}
