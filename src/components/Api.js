const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Server failed');
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
    }).then((res) => {
      if (res.ok) {
      return res.json();
    }
    return Promise.reject('Server failed');
    })
}

  addData(data) {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(onError)
    .catch(() => alert('server vse'))
  }

  addCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(onError)
    .catch(() => alert('server vse'))
  }
  removeCard(id) {
    return fetch(this._url, {
      method: "DELETE",
      headers: this._headers,
    }).then(onError)
  }
}
