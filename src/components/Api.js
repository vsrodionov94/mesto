const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}` );
}

export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getData() {
    return fetch(this._url, {
      headers: this._headers,
      method: "GET"
    }).then(onError)
}

  addData(data) {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(onError)
  }

  addCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(onError)
  }

  removeCard(id) {
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onError)
  }

  putLike(id) {
    return fetch(`${this._url}/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(onError)
  }

  removeLike(id) {
    return fetch(`${this._url}/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onError)
  }
}
