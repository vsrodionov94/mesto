import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

  constructor (popupSelector, handlerSubmit, api) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.modal__field'));
    this._api = api;
  }

  _patchInputsData() {
    this._popup.querySelector('.modal__submit-button').innerText = 'Сохранение...';
    this._api
    .addData(this._getInputValues())
    .then((data) => {
      this._handlerSubmit(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(()=>{
      this._popup.querySelector('.modal__submit-button').textContent = 'Сохранить';
      this.close();
    })
  }

  _postInputsData() {
    this._popup.querySelector('.modal__submit-button').innerText = 'Сохранение...';
    this._api
    .addCard(this._getInputValues())
    .then((data) => {
      this._handlerSubmit(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(()=>{
      this._popup.querySelector('.modal__submit-button').textContent = 'Создать';
      this.close();
    })
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;
  }

  setEventListenersPost() {
    super.setEventListeners();
    this._popup.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._postInputsData();
    });
  }

  setEventListenersPatch() {
    super.setEventListeners();
    this._popup.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._patchInputsData();
    });
  }

  close() {
    super.close();
    this._inputList.forEach(input => {
      input.value = '';
    });
  }
}