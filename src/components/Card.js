
export class Card {
  constructor (
    {
      name,
      link,
      likes,
      id,
      owner
    },
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
    ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const photoCardTemplate = document.querySelector(this._templateSelector).content;
    const photoCardElement = photoCardTemplate.cloneNode(true);
    return photoCardElement;
  }

  _setEventListeners(){
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._likeButton, this._id, this);
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

  howManylikes(like) {
    this._likeCounter.textContent = like;

  }

  removeCard() {
    this._photoCard.remove();
    this._photoCard = null;
  }

  generateCard(user) {
    this._photoCardElement = this._getTemplate();
    this._photoCardElementImage = this._photoCardElement.querySelector('.photo__image')
    this._photoCardElementImage.setAttribute('src', this._link);
    this._photoCardElementImage.setAttribute('alt', this._name);
    this._photoCardElement.querySelector('.photo__text').textContent = this._name;
    this._likeButton = this._photoCardElement.querySelector('.photo__like-button');
    this._likeCounter = this._photoCardElement.querySelector('.photo__like-counter');

    this._deleteButton = this._photoCardElement.querySelector('.photo__delete-button');
    this.howManylikes(this._likes.length);
    //скрываем кнопки удалить и ставим лайки
    if (this._owner._id === user._id) {
      this._deleteButton.classList.add('card__delete-button_state_visible');
      this._deleteButton.classList.remove('card__delete-button_state_hidden');

    } else {
      this._deleteButton.classList.add('card__delete-button_state_hidden');
      this._deleteButton.classList.remove('card__delete-button_state_visible');
    }
    if (this._isLiked(user._id)) {
      this._likeButton.classList.add('photo__like-button_active');
    }

    this._photoCard = this._photoCardElement.querySelector('.photo__item');
    this._setEventListeners();
    return this._photoCardElement
  }
}
