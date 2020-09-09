import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

  constructor (popupSelector, handlerSubmit) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.modal__field');
    this._formValues = {};
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;

  });
  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._getInputValues());
      this.close();
    });
  }

  close(){
    super.close();
    this._inputList = this._popup.querySelectorAll('.modal__field');
    this._inputList.forEach(input => {
      input.value = '';
    });
  }
}
