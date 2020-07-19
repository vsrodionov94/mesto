const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const name = profile.querySelector('.profile__name-text');
const profession = profile.querySelector('.profile__profession');
const addButton = profile.querySelector('.profile__add-button')

const modalEdit = document.querySelector('.modal_form_edit');
const escButtonModalEdit = modalEdit.querySelector('.modal__esc-button');
const fieldName = modalEdit.querySelector('.modal__field_assign_name');
const fieldprofession = modalEdit.querySelector('.modal__field_assign_profession');
const formProfile = modalEdit.querySelector('.modal__container');

const modalAdd = document.querySelector('.modal_form_add');
const escButtonModalAdd = modalAdd.querySelector('.modal__esc-button');
const fieldTitle = modalAdd.querySelector('.modal__field_assign_title');
const fieldLink = modalAdd.querySelector('.modal__field_assign_link');
const formAdd = modalAdd.querySelector('.modal__container');
const photo = document.querySelector('.photo');

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
  console.log(initialCards);
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
}



window.onload = startPhoto();

editButton.addEventListener('click', function(){toggleModal(modalEdit)});
escButtonModalEdit.addEventListener('click', function(){toggleModal(modalEdit)});
formProfile.addEventListener('submit', submitModalEdit);

addButton.addEventListener('click', function(){toggleModal(modalAdd)});
escButtonModalAdd.addEventListener('click', function(){toggleModal(modalAdd)});
formAdd.addEventListener('submit', newInitialCards);
