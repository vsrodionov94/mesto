
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

function newInitialCards() {initialCards.unshift({name: fieldTitle.value, link: fieldLink.value})}

function clearCards() {
  const cards = document.querySelectorAll('.photo__item');
  cards.forEach((card) => {card.remove()});
}

function addNewPhoto(event) {
  event.preventDefault();
  newInitialCards();
  clearCards();
  startPhoto();
  clearFormAdd();
  toggleModal(modalAdd);
}

function addPhoto(elem) {
  const photoCardTemplate = document.querySelector('#photo-item').content;
  const photoCardElement = photoCardTemplate.cloneNode(true);
  photoCardElement.querySelector('.photo__image').setAttribute('src', elem.link);
  photoCardElement.querySelector('.photo__image').setAttribute('alt', elem.name);
  photoCardElement.querySelector('.photo__text').textContent = elem.name;
  photo.append(photoCardElement);
}



function startPhoto() {
  initialCards.forEach((card) => {
    addPhoto(card);
})}

function toggleLike() {
  photo.onclick = function (event) {
    if (!event.target.classList.contains('photo__like-button')) return;
    let likeButton = event.target.closest('.photo__like-button');
    likeButton.classList.toggle('photo__like-button_active');
  };
}

function deleteCard() {
  photos.onclick = function(event) {
    if (!event.target.classList.contains('photo__delete-button')) return;
    let photoCard = event.target.closest('.photo__item');
    photoCard.remove();
  }
}

function openPhoto() {
  document.onclick = function(event) {
    if (!event.target.classList.contains('photo__image')) return;
    const photoOpened = event.target.closest('.photo__image');
    const imageSrc = photoOpened.getAttribute('src');
    const imageAlt = photoOpened.getAttribute('alt');
    const modalPhotoTemplate = document.querySelector('#photo-large').content;
    const modalPhotoElement = modalPhotoTemplate.cloneNode(true);
    modalPhotoElement.querySelector('.modal__image').setAttribute('src', imageSrc);
    modalPhotoElement.querySelector('.modal__image').setAttribute('alt', imageAlt);
    modalPhotoElement.querySelector('.modal__caption').textContent = imageAlt;
    modalAlbum.append(modalPhotoElement);
    toggleModal(modalAlbum);
    closeModalAlbum();

  }
}

function closeModalAlbum() {
  modalAlbum.onclick = function(event) {
    if (!event.target.classList.contains('modal__esc-button')) return;
    toggleModal(modalAlbum);
    const modalLargePhoto = document.querySelector('.modal__large-photo')
    modalLargePhoto.remove()
  }
}

window.onload = startPhoto();

toggleLike();
deleteCard();
openPhoto();


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

