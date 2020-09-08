import {
  editButton,
  addButton,
  modalEdit,
  fieldName,
  fieldProfession,
  formProfile,
  modalAdd,
  formAdd,
  popupAlbum,
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

function fillModalEdit(name, profession) {
  fieldName.value = name;
  fieldProfession.value = profession;
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
     console.log(item)
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

  fillModalEdit(userInfo.getUserInfo().name, userInfo.getUserInfo().profession);

  startValid(formProfile);
  popupWithFormEdit.setEventListeners();
  ;
});

addButton.addEventListener('click', function() {
  popupWithFormAdd.open();
  popupWithFormAdd.setEventListeners();
  startValid(formAdd);
});

handlerModalMissClick(modalEdit);
handlerModalMissClick(modalAdd);
handlerModalMissClick(popupAlbum);




