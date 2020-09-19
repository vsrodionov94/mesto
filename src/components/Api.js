
export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}` ));
  }
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "GET"
    }).then(this._handleResponseData)
  }

  setUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(this._handleResponseData)
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(this._handleResponseData)
  }

  getInitialsCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "GET"
    }).then(this._handleResponseData)
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(this._handleResponseData)
  }

  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponseData)
  }

  putLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponseData)
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponseData)
  }
}
