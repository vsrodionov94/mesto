
export class Card {
  constructor (
    {
      name,
      link,
      likes,
      id,
      ownerId
    },
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    handleConfirmDeleteCard,
    api) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleConfirmDeleteCard = handleConfirmDeleteCard;
    this._api = api;
  }

  _getTemplate() {
    const photoCardTemplate = document.querySelector(this._templateSelector).content;
    const photoCardElement = photoCardTemplate.cloneNode(true);
    return photoCardElement;
  }

  _setEventListeners(){
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._likeButton, this._id, this._likeCounter);
    })

    this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this._id, this);
    })

    this._photoCardElementImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      })
    })
  }

  _isLiked(userId) {
    let cardIsliked = false;
    this._likes.forEach(like => {
      if (like._id == userId) {
        cardIsliked = true;
      }
    })
    return cardIsliked
  }

  removeCard() {
    this._photoCard.remove();
    this._photoCard = null;
  }
  generateCard() {
    this._photoCardElement = this._getTemplate();
    this._photoCardElementImage = this._photoCardElement.querySelector('.photo__image')
    this._photoCardElementImage.setAttribute('src', this._link);
    this._photoCardElementImage.setAttribute('alt', this._name);
    this._photoCardElement.querySelector('.photo__text').textContent = this._name;
    this._likeButton = this._photoCardElement.querySelector('.photo__like-button');
    this._likeCounter = this._photoCardElement.querySelector('.photo__like-counter');
    this._likeCounter.textContent = this._likes.length;
    this._deleteButton = this._photoCardElement.querySelector('.photo__delete-button');
    //скрываем кнопки удалить и ставим лайки
    this._api.getUserData().then(data=>{
      if (this._ownerId !== data._id) {
        this._deleteButton.style = 'display:none'
      } else {
        this._deleteButton.style = 'display:block'
      }
      if (this._isLiked(data._id)) {
        this._likeButton.classList.add('photo__like-button_active');
      }
    })
    .catch((err) => {
      console.log(err);
    });
    this._photoCard = this._photoCardElement.querySelector('.photo__item');
    this._setEventListeners();
    return this._photoCardElement
  }
}
