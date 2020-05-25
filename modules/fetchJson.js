export async function fetchJson(url, callback) {
  const response = await fetch(url);
  const jsonData = await response.json();
  // console.log(jsonData);

  callback(jsonData);
}
