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

  // const params = new URLSearchParams();
  // const xhr = new XMLHttpRequest();
  // if (method === 'POST') {
  //   Array.from(data.elements)
  //     .filter(({ name }) => name)
  //     .forEach(({ name, value }) => params.append(name, value));
  //   params.append('action', action);
  //   if (id) params.append('id', id);
  //   if (action === 'changeTicket') params.append('status', status);

  //   xhr.open(method, 'http://localhost:8080', true);
  // } else {
  //   params.append('action', action);
  //   params.append('id', id);
  //   if (action === 'changeTicket') params.append('status', status);
  //   xhr.open(method, `http://localhost:8080/?${params}`, true);
  // }

  // xhr.addEventListener('load', () => { callback(xhr); });
  // // eslint-disable-next-line no-console
  // xhr.addEventListener('error', (err) => (console.log(err)));
  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // xhr.send(method !== 'GET' && params);
}

// export default class CreateRequest {
//   constructor(data = {}, metod, URL, callback) {
//     // this.form = document.querySelector('.form');
//     this.data = data;
//     this.metod = metod;
//     this.URL = URL;
//     this.callback = callback;
//   }
//   static GETrequest() {
//     const params = new URLSearchParams();
//     Array.from(subscribeForm.elements) // Заменить объект
//       .filter(({ name }) => name)
//       .forEach(({ name, value }) => params
//         .append(name, value));
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', `http://localhost:7070/?${params}`); // заменить адрес
//     xhr.send();
//   }

//   static POSTrequest() {
//     const params = new URLSearchParams();
//     Array.from(form.elements) // Заменить объект
//       .filter(({ name }) => name)
//       .forEach(({ name, value }) => params
//         .append(name, value));
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost:7070'); // заменить адрес
//     xhr.send(params);
//   }
// }

// const createRequest = (data = {}, metod, URL, callback) => {
//   const xhr = new XMLHttpRequest();
//   const form = new FormData();
//   xhr.responseType = 'json';
//   if (metod === 'GET') {
//     if (typeof data === 'string') {
//       URL += `/${data}`;
//     } else {
//       URL += '?';
//       for (const key in data) {
//         URL += `${key}=${data[key]}&`;
//       }
//     }
//   } else {
//     for (const key in data) {
//       form.append(key, data[key]);
//     }
//   }
//   try {
//     xhr.open(metod, URL, true);
//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         callback(null, xhr.response);
//       }
//     };
//     xhr.onerror = () => {
//       callback(err, xhr.response);
//     };
//   } catch (e) {
//     // перехват сетевой ошибки
//     callback(e);
//   }

//   xhr.send(metod !== 'GET' && form);
// };
