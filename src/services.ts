export function removeArrayElement<T>(arr: T[], elem: T) {
  const index = arr.indexOf(elem);

  if (index === -1) {
    return;
  }

  arr.splice(index, 1);
}