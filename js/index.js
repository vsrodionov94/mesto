import {
  editButton,
  name,
  profession,
  addButton,
  modalEdit,
  escButtonModalEdit,
  fieldName,
  fieldProfession,
  formProfile,
  modalAdd,
  escButtonModalAdd,
  fieldTitle,
  fieldLink,
  formAdd,
  popupAlbum,
  popupAlbumImage,
  popupAlbumCaption,
  escButtonPopupAlbum,
  photoContainerSelector,
  initialCards,
  formData
} from './constants.js';

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { toggleModal } from './utilites.js';
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js'
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage.js';

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

function handlerModalMissClick(modalName) {
  modalName.addEventListener('click', (event) => {
    if(event.target.classList.contains('modal')){
      toggleModal(modalName);
    }
  })
}

function startValid (formName) {
  const validForm = new FormValidator(formData, formName);
  validForm.enableValidation();
};

const popupWithImage = new PopupWithImage('.modal_assign_album');



const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#photo-item',
    () =>{
      popupWithImage.open(item.link, item.title);
      popupWithImage.setEventListeners();
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    },
  },
  photoContainerSelector
);

cardList.renderItems();

const userInfo = new UserInfo(
  '.profile__name-text',
  '.profile__profession'
);

const popupWithFormEdit = new PopupWithForm(
  '.modal_assign_form-eidt',
   (item) => {
    userInfo.setUserInfo(item.name, item.profession);
   }
);

const popupWithFormAdd = new PopupWithForm(
  '.modal_assign_form-add',
  (item) => {
    const card = new Card(item, '#photo-item',
    () =>{
      popupWithImage.open(item.link, item.title);
      popupWithImage.setEventListeners();
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
)

editButton.addEventListener('click', function() {
  popupWithFormEdit.open();
  popupWithFormEdit.setEventListeners();
  startValid(formProfile);

});

addButton.addEventListener('click', function() {
  popupWithFormAdd.open();
  popupWithFormAdd.setEventListeners();
  startValid(formAdd);
});

// escButtonModalAlbum.addEventListener('click', () => {
//   toggleModal(modalAlbum);
// })

// formAdd.addEventListener('submit', renderNewCardToBegin);

handlerModalMissClick(modalEdit);
handlerModalMissClick(modalAdd);
handlerModalMissClick(popupAlbum);




