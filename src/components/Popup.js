export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMissClick = this._handleMissClick.bind(this)
  }

  open() {
    this._popup.classList.add('modal_opened');
    this._popup.addEventListener('click', this._handleMissClick);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('modal_opened');
    this._popup.removeEventListener('click', this._handleMissClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape'){
      this.close();
    }
  }

  _handleMissClick(event) {
    if(event.target.classList.contains('modal')){
      this.close();
    }
  }

  setEventListeners() {
    const closePopupButton = this._popup.querySelector('.modal__esc-button');
    closePopupButton.addEventListener('click', () => {
      this.close();
    });
  }
}

