export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open () {
    this._popup.classList.add('modal_opened');
  }

  close () {
    this._popup.classList.remove('modal_opened');
  }

  _handleEscClose () {
    const isOpen = this._popup.classList.contains('modal_opened');
    if (isOpen) {
      this._popup.classList.remove('modal_opened');
      document.removeEventListener('keydown', (event) =>{
        if (event.key === 'Escape'){
          this._popup.classList.remove('modal_opened');
        }
      })
    } else {
      this._popup.classList.add('modal_opened');
      document.addEventListener('keydown', (event) =>{
        if (event.key === 'Escape'){
          this._popup.classList.remove('modal_opened');
        }
      })
    }
  }

  setEventListeners() {
    this._handleEscClose();
    const closePopupButton = this._popup.querySelector('.modal__esc-button');
    closePopupButton.addEventListener('click', () => {
      this.close();
    })
  }
}

