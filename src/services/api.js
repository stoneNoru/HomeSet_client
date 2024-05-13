export function fetchData() {
  return fetch("").then((response) => response.json());
}
