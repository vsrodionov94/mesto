import {
  modalAlbum,
  modalAlbumImage,
  modalAlbumCaption,

} from './constants.js';

import {toggleModal} from './utilites.js';

export class Card {
  constructor ({name, link}, templateSelector) {
    this._name = name,
    this._link = link,
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    const photoCardTemplate = document.querySelector(this._templateSelector).content;
    const photoCardElement = photoCardTemplate.cloneNode(true);
    return photoCardElement;
  }

  _handleOpenModalAlbum(){
    modalAlbumImage.setAttribute('src', this._link);
    modalAlbumImage.setAttribute('alt', this._name);
    modalAlbumCaption.textContent = this._name;
    toggleModal(modalAlbum);

  }

  _handleDeleteCard(){
    this._photoCard.remove();
    this._photoCard = null;
  }

  _handleLike(){
    event.target.classList.toggle('photo__like-button_active');
  }

  _setEventListeners(){
    this._likeButton.addEventListener('click', (event) => {
      this._handleLike(event);
    })

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    })

    this._photoCardElementImage.addEventListener('click', () => {
      this._handleOpenModalAlbum();
    })
  }

  generateCard(){
    this._photoCardElement = this._getTemplate();
    this._photoCardElementImage = this._photoCardElement.querySelector('.photo__image')
    this._photoCardElementImage.setAttribute('src', this._link);
    this._photoCardElementImage.setAttribute('alt', this._name);
    this._photoCardElement.querySelector('.photo__text').textContent = this._name;;
    this._likeButton = this._photoCardElement.querySelector('.photo__like-button');
    this._deleteButton = this._photoCardElement.querySelector('.photo__delete-button');
    this._photoCard = this._photoCardElement.querySelector('.photo__item');

    this._setEventListeners();
    return this._photoCardElement

  }
}
