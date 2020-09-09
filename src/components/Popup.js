export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('modal_opened');
    this._popup.addEventListener('click', () => this._handleMissClick(event));
    document.addEventListener('keydown', () => this._handleEscClose(event));
  }

  close() {
    this._popup.classList.remove('modal_opened');
    // document.removeEventListener('keydown', (event) => this._handleEscClose(event))
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape'){
      this.close();
    }
  }

  _handleMissClick = (event) =>  {
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

