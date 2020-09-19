import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector, imageSelector, captionSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }
  open(link, name) {
    super.open();
    this._image.setAttribute('src', link);
    this._image.setAttribute('alt', name);
    this._caption.textContent = name;
  }
}
