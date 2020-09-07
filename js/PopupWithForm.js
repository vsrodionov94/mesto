import { Popup } from './Popup';

export class PopupWithImage extends Popup {

  constructor (popupSelector, handlerSubmit) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
  }

  _getInputValues(firstField, secondField) {
    const fieldsContent = [
      firstField.textcontent, secondField.textcontent
    ]
    return fieldsContent;
  }

  setEventListeners() {
    super.setEventListeners();
    super._popup.addEventListeners('click', this._handlerSubmit);
  }

  close(firstField, secondField){
    firstField.textcontent = '';
    secondField.textcontent = '';
    super.close();
  }
}
