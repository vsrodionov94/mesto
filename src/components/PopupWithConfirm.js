import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {

  constructor (popupSelector, handlerSubmit, api) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._api = api;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
        this._api
      this.close();
    });
  }
}
