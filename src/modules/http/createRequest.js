export default async function createRequest(args) {
  const { method = 'GET', data, url } = args;
  const urlBase = 'http://localhost:8080';
  const params = new URLSearchParams();
  let response = null;
  if (method === 'GET') {
    params.append('data', data);
    response = await fetch(`${urlBase}/${url}?${params}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  if (response.ok) {
    const json = await response.json();
    return json;
  }
  throw new Error(`Ошибка HTTP ${response.status}`);
}
