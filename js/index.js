const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const name = profile.querySelector('.profile__name-text');
const profession = profile.querySelector('.profile__profession');
const addButton = profile.querySelector('.profile__add-button')

const modalEdit = document.querySelector('.modal_assign_form-eidt');
const escButtonModalEdit = modalEdit.querySelector('.modal__esc-button');
const fieldName = modalEdit.querySelector('.modal__field_assign_name');
const fieldprofession = modalEdit.querySelector('.modal__field_assign_profession');
const formProfile = modalEdit.querySelector('.modal__container');

const modalAdd = document.querySelector('.modal_assign_form-add');
const escButtonModalAdd = modalAdd.querySelector('.modal__esc-button');
const fieldTitle = modalAdd.querySelector('.modal__field_assign_title');
const fieldLink = modalAdd.querySelector('.modal__field_assign_link');
const formAdd = modalAdd.querySelector('.modal__container');
const photos = document.querySelector('.photos');
const photo = photos.querySelector('.photo');

const modalAlbum = document.querySelector('.modal_assign_album');
const imageAlbum = modalAlbum.querySelector('.modal__large-photo');


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
  fieldName.value = name.textContent;
  fieldprofession.value = profession.textContent;
}

function submitModalEdit(event){
  event.preventDefault();
  name.textContent = fieldName.value;
  profession.textContent = fieldprofession.value;
  toggleModal(modalEdit);
}

function newInitialCards(event) {
  event.preventDefault();
  initialCards.unshift({name: fieldTitle.value, link: fieldLink.value});
  toggleModal(modalAdd);
  addNewPhoto();
}

function addNewPhoto() {
  photo.insertAdjacentHTML('afterbegin', `
         <div class="photo__item">
            <button class="photo__delete-button" type="button"></button>
            <img class="photo__image" src="${initialCards[0].link}" alt="${initialCards[0].name}">
            <div class="photo__caption">
              <h2 class="photo__text">${initialCards[0].name}</h2>
              <button class="photo__like-button" type="button"></button>
            </div>
         </div>`)
}

function startPhoto() {
  for (let card of initialCards) {
    photo.innerHTML += `
        <div class="photo__item">
            <button class="photo__delete-button" type="button"></button>
            <img class="photo__image" src="${card.link}" alt="${card.name}">
            <div class="photo__caption">
              <h2 class="photo__text">${card.name}</h2>
              <button class="photo__like-button" type="button"></button>
            </div>
         </div>`
  }
  like();
  deleteCard();
  openPhoto();
}

function like() {
  photo.onclick = function (event) {
    if (!event.target.classList.contains('photo__like-button')) return;
    let likeButton = event.target.closest('.photo__like-button');
    likeButton.classList.toggle('photo__like-button_active');
    console.log(likeButton)
  };
}

function deleteCard() {
  photos.onclick = function(event) {
    if (event.target.className != 'photo__delete-button') return;
    let photoCard = event.target.closest('.photo__item');
    photoCard.remove();
  }
}

function openPhoto() {
  document.onclick = function(event) {
    if (event.target.className != 'photo__image') return;
    let openedPhoto = event.target.closest('.photo__image');
    let srcImage = openedPhoto.getAttribute('src');
    imageAlbum.innerHTML = `
    <img class="modal__image" src="${srcImage}">
    <button class="modal__esc-button" type="button" aria-label="Закрыть"></button>`
    toggleModal(modalAlbum);
    closeModalAlbum();
  }
}

function closeModalAlbum() {
  modalAlbum.onclick = function(event) {
    if (event.target.className != 'modal__esc-button') return;
    modalAlbum.classList.remove('modal_opened');
}}

window.onload = startPhoto();

editButton.addEventListener('click', function(){toggleModal(modalEdit)});
escButtonModalEdit.addEventListener('click', function(){toggleModal(modalEdit)});
formProfile.addEventListener('submit', submitModalEdit);

addButton.addEventListener('click', function(){toggleModal(modalAdd)});
escButtonModalAdd.addEventListener('click', function(){toggleModal(modalAdd)});
formAdd.addEventListener('submit', newInitialCards);

