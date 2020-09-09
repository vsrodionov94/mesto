import './index.css';

import {
  editButton,
  addButton,
  popupEdit,
  fieldName,
  fieldProfession,
  formProfile,
  popupAdd,
  formAdd,
  popupAlbum,
  photoContainerSelector,
  initialCards,
  formData
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

function fillPopupEdit(name, profession) {
  fieldName.value = name;
  fieldProfession.value = profession;
}

// function handlerPopupMissClick(popupName) {
//   popupName.addEventListener('click', (event) => {
//     if(event.target.classList.contains('modal')){
//       toggleModal(popupName);
//     }
//   })
// }

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

popupWithFormEdit.setEventListeners();

editButton.addEventListener('click', function() {
  popupWithFormEdit.open();
  fillPopupEdit(userInfo.getUserInfo().name, userInfo.getUserInfo().profession);
  startValid(formProfile);
});

popupWithFormAdd.setEventListeners();

addButton.addEventListener('click', function() {
  popupWithFormAdd.open();
  startValid(formAdd);
});

// handlerPopupMissClick(popupEdit);
// handlerPopupMissClick(popupAdd);
// handlerPopupMissClick(popupAlbum);




