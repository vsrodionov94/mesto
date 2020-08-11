const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const name = profile.querySelector('.profile__name-text');
const profession = profile.querySelector('.profile__profession');
const addButton = profile.querySelector('.profile__add-button')

const modalEdit = document.querySelector('.modal_assign_form-eidt');
const escButtonModalEdit = modalEdit.querySelector('.modal__esc-button');
const fieldName = modalEdit.querySelector('.modal__field_assign_name');
const fieldProfession = modalEdit.querySelector('.modal__field_assign_profession');
const formProfile = modalEdit.querySelector('.modal__form');

const modalAdd = document.querySelector('.modal_assign_form-add');
const escButtonModalAdd = modalAdd.querySelector('.modal__esc-button');
const fieldTitle = modalAdd.querySelector('.modal__field_assign_title');
const fieldLink = modalAdd.querySelector('.modal__field_assign_link');
const formAdd = modalAdd.querySelector('.modal__form');



const modalAlbum = document.querySelector('.modal_assign_album');
const modalAlbumImage = modalAlbum.querySelector('.modal__image');
const escButtonModalAlbum = modalAlbum.querySelector('.modal__esc-button');
const modalAlbumCaption = modalAlbum.querySelector('.modal__caption');


const photo = document.querySelector('.photo');
const photoCards = photo.querySelector('.photo__cards');
const photoCardTemplate = document.querySelector('#photo-item').content;




class Card {
  constructor ({name, link}) {
    this._name = name,
    this._link = link
  }

  _getTemplate() {
    const photoCardElement = photoCardTemplate.cloneNode(true);
    return photoCardElement;
  }

  _handleOpenModalAlbum(){
    modalAlbumImage.setAttribute('src', this._link);
    modalAlbumImage.setAttribute('alt', this._name);
    modalAlbumCaption.textContent = this._name;
    modalAlbum.classList.add('modal_opened');

  }
  _handleCloseModalAlbum(){
    modalAlbumImage.setAttribute('src', '');
    modalAlbumImage.setAttribute('alt', '');
    modalAlbumCaption.textContent = '';
    modalAlbum.classList.remove('modal_opened');

  }

  _handleDeleteCard(){
    this._photoCard.remove();
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

    escButtonModalAlbum.addEventListener('click', () => {
      this._handleCloseModalAlbum();
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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function toggleModal(modalName) {
  const isOpen = modalName.classList.contains('modal_opened');
  if (isOpen) {
    document.removeEventListener('keydown', (event) =>{
      if (event.key === 'Escape'){
        modalName.classList.remove('modal_opened');
      }
    })
  } else {
    document.addEventListener('keydown', (event) =>{
      if (event.key === 'Escape'){
        modalName.classList.remove('modal_opened');
      }
    })
  }
  modalName.classList.toggle('modal_opened');
}

function fillModalEdit() {
  fieldName.value = name.textContent;
  fieldProfession.value = profession.textContent;
}

function clearFormAdd() {
  fieldTitle.value = '';
  fieldLink.value = '';
}

function submitModalEdit(event){
  event.preventDefault();
  name.textContent = fieldName.value;
  profession.textContent = fieldProfession.value;
  toggleModal(modalEdit);
}


function createNewCard() {
  const newCard = new Card({
    name: fieldTitle.value,
    link: fieldLink.value
  });
    cardNew = newCard.generateCard();

  return cardNew;
}

function prependNewCard(card){
  photoCards.prepend(card);
}

function renderNewCardToBegin(event) {
  event.preventDefault();
  prependNewCard(createNewCard());
  clearFormAdd();
  toggleModal(modalAdd);
}

function renderAllCard() {
  initialCards.forEach( (item) => {
    const card = new Card(item)
    const cardElement = card.generateCard();
    photoCards.append(cardElement)
    });

  };

function handlerModalMissClick(modalName) {
  modalName.addEventListener('click', (event) => {
    if(event.target.classList.contains('modal')){
      toggleModal(modalName);
    }
  })
}

window.onload = renderAllCard();

editButton.addEventListener('click', function() {
  toggleModal(modalEdit);
  fillModalEdit();
});

escButtonModalEdit.addEventListener('click', function() {
  toggleModal(modalEdit);
});

formProfile.addEventListener('submit', function () {
  submitModalEdit(event);
});

addButton.addEventListener('click', function() {
  toggleModal(modalAdd);
});

escButtonModalAdd.addEventListener('click', function() {
  toggleModal(modalAdd);
  clearFormAdd();
});

formAdd.addEventListener('submit', renderNewCardToBegin);



handlerModalMissClick(modalEdit);
handlerModalMissClick(modalAdd);
handlerModalMissClick(modalAlbum);





