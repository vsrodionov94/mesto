
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const name = profile.querySelector('.profile__name-text');
const profession = profile.querySelector('.profile__profession');
const addButton = profile.querySelector('.profile__add-button')

const modalEdit = document.querySelector('.modal_assign_form-eidt');
const escButtonModalEdit = modalEdit.querySelector('.modal__esc-button');
const fieldName = modalEdit.querySelector('.modal__field_assign_name');
const fieldProfession = modalEdit.querySelector('.modal__field_assign_profession');
const formProfile = modalEdit.querySelector('.modal__container');

const modalAdd = document.querySelector('.modal_assign_form-add');
const escButtonModalAdd = modalAdd.querySelector('.modal__esc-button');
const fieldTitle = modalAdd.querySelector('.modal__field_assign_title');
const fieldLink = modalAdd.querySelector('.modal__field_assign_link');
const formAdd = modalAdd.querySelector('.modal__container');

const photos = document.querySelector('.photos');
const photo = photos.querySelector('.photo');

const modalAlbum = document.querySelector('.modal_assign_album');


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

function appendPhotoCard(card) {
    photo.append(card);
}

function preendPhotoCard(card) {
  photo.prepend(card);

}

function addPhoto(elem, funcAddCard) {
  const photoCardTemplate = document.querySelector('#photo-item').content;
  const photoCardElement = photoCardTemplate.cloneNode(true);
  photoCardElement.querySelector('.photo__image').setAttribute('src', elem.link);
  photoCardElement.querySelector('.photo__image').setAttribute('alt', elem.name);
  photoCardElement.querySelector('.photo__text').textContent = elem.name;
  toggleLike(photoCardElement);
  deleteCard(photoCardElement)
  setAttributeModalAlbum(photoCardElement)
  funcAddCard(photoCardElement);
}

function newInitialCards() {initialCards.push({name: fieldTitle.value, link: fieldLink.value})}

function addNewPhoto(event) {
  event.preventDefault();
  newInitialCards();
  addPhoto(initialCards[initialCards.length - 1], preendPhotoCard);
  clearFormAdd();
  toggleModal(modalAdd);
}

function startPhoto() {
  initialCards.forEach((card) => {
    addPhoto(card, appendPhotoCard);
  })
}

function toggleLike(elem) {
  const likeButton = elem.querySelector('.photo__like-button');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo__like-button_active');
  })
}

function deleteCard(elem) {
  const deleteButton = elem.querySelector('.photo__delete-button');
  const photoCard = elem.querySelector('.photo__item');
  deleteButton.addEventListener('click', function (evt) {
    photoCard.remove();
  })
}

function setAttributeModalAlbum(elem) {
  const photoOpened = elem.querySelector('.photo__image');
  const imageSrc = photoOpened.getAttribute('src');
  const imageAlt = photoOpened.getAttribute('alt');
  const modalPhotoTemplate = document.querySelector('#photo-large').content;
  const modalPhotoElement = modalPhotoTemplate.cloneNode(true);
  const closeButton = modalPhotoElement.querySelector('.modal__esc-button');
  const modalLargePhoto = modalPhotoElement.querySelector('.modal__large-photo');
  modalPhotoElement.querySelector('.modal__image').setAttribute('src', imageSrc);
  modalPhotoElement.querySelector('.modal__image').setAttribute('alt', imageAlt);
  modalPhotoElement.querySelector('.modal__caption').textContent = imageAlt;
  openModalAlbum(photoOpened, modalPhotoElement);
  closeModalAlbum(closeButton, modalLargePhoto);
}

function openModalAlbum(elemOpen, elemAppend) {
  elemOpen.addEventListener('click', function (evt) {
    modalAlbum.append(elemAppend);
    toggleModal(modalAlbum);

  })
}

function closeModalAlbum(elemBtn, modalElem) {
  elemBtn.addEventListener('click', function (evt) {
    modalElem.remove()
    toggleModal(modalAlbum);
  })
}

window.onload = startPhoto();

editButton.addEventListener('click', function(){
  toggleModal(modalEdit);
  fillModalEdit();
});

escButtonModalEdit.addEventListener('click', function(){
  toggleModal(modalEdit);
});

formProfile.addEventListener('submit', submitModalEdit);

addButton.addEventListener('click', function(){
  toggleModal(modalAdd);
});

escButtonModalAdd.addEventListener('click', function(){
  toggleModal(modalAdd);
  clearFormAdd();
});

formAdd.addEventListener('submit', addNewPhoto);


