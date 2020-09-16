import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

  constructor (popupSelector, handlerSubmit, api) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.modal__field'));
    this._api = api;
  }

  _patchInputsData() { // решить проблему с пост и паф
    this._api
    .addData(this._getInputValues())
    .then((data) => {
      console.log(data)
      this._handlerSubmit(data);
    })
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
    console.log(this._formValues);
  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._patchInputsData();
      this.close();
    });
  }

  close() {
    super.close();
    this._inputList.forEach(input => {
      input.value = '';
    });
  }
}
