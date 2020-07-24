
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
const modalAlbumImage = modalAlbum.querySelector('.modal__image');
const escButtonModalAlbum = modalAlbum.querySelector('.modal__esc-button');
const modalAlbumCaption = modalAlbum.querySelector('.modal__caption');



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

function addCard(elem) {
  const photoCardTemplate = document.querySelector('#photo-item').content;
  const photoCardElement = photoCardTemplate.cloneNode(true);
  const photoCardElementImage = photoCardElement.querySelector('.photo__image');
  const photoCardElementCaption = photoCardElement.querySelector('.photo__text');
  const likeButton = photoCardElement.querySelector('.photo__like-button');
  const deleteButton = photoCardElement.querySelector('.photo__delete-button');
  const photoCard = photoCardElement.querySelector('.photo__item');

  photoCardElementImage.setAttribute('src', elem.link);
  photoCardElementImage.setAttribute('alt', elem.name);
  photoCardElementCaption.textContent = elem.name;

  likeButton.addEventListener('click', () => {event.target.classList.toggle('photo__like-button_active')})
  deleteButton.addEventListener('click', () => {photoCard.remove()})
  photoCardElementImage.addEventListener('click', () => {
    modalAlbumImage.setAttribute('src', elem.link);
    modalAlbumImage.setAttribute('alt', elem.name);
    modalAlbumCaption.textContent = elem.name;
    toggleModal(modalAlbum);
  })

  return targetCard = photoCardElement;
}

function renderNewCard(event) {
  event.preventDefault();
  const newCard = {name: fieldTitle.value, link: fieldLink.value}
  addCard(newCard);
  photo.prepend(targetCard);
  clearFormAdd();
  toggleModal(modalAdd);
}

function renderAllCard() {
  initialCards.forEach( card => {
    addCard(card);
    photo.append(targetCard);
  })
}

window.onload = renderAllCard();

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

formAdd.addEventListener('submit', renderNewCard);

escButtonModalAlbum.addEventListener('click', () => {
  toggleModal(modalAlbum);
})
