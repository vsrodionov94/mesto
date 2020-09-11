import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

  constructor (popupSelector, handlerSubmit) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.modal__field'));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;
  }

  _hasClearField() {
    return this._inputList.some(inputElement => {
      return (inputElement.value === '');
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._getInputValues());

      this.close();
    });
  }

  close() {
    super.close();
    this._inputList.forEach(input => {
      input.value = '';
    });
  }

  open() {
    super.open();
    if(this._hasClearField()){
      this._popup.querySelector('button').classList.add('modal__submit-button_disabled');
      this._popup.querySelector('button').disabled = true;
    }
    else {
      this._popup.querySelector('button').classList.remove('modal__submit-button_disabled');
      this._popup.querySelector('button').disabled = false;
    }
  }
}
