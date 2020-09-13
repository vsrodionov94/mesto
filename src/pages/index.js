import './index.css';

import {
  editButton,
  addButton,
  fieldName,
  fieldProfession,
  formProfile,
  formAdd,
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

function createCard(item) {
    const card = new Card(item, '#photo-item',
    () =>{
      popupWithImage.open(item.link, item.title);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }

// создаем экземпляр класса для валидации формы редактирования профиля
const validFormEdit = new FormValidator(formData, formProfile);
validFormEdit.enableValidation();
// создаем экземпляр класса для валидации формы добавления
const validFormAdd = new FormValidator(formData, formAdd);
validFormAdd.enableValidation();
// создаем экземпляр класса для контейнера с карточками
const cardList = new Section({
  items: initialCards,
  renderer: createCard},
  photoContainerSelector
);

cardList.renderItems();

// создаем экземпляр класса для информации о пользователе
const userInfo = new UserInfo(
  '.profile__name-text',
  '.profile__profession'
);

// создаем экземпляр класса Попапа с формой профиля
const popupWithFormEdit = new PopupWithForm(
  '.modal_assign_form-eidt',
   (item) => {
     userInfo.setUserInfo(item.name, item.profession);
   }
);

// создаем экземпляр класса Попапа с формой добавления
const popupWithFormAdd = new PopupWithForm(
  '.modal_assign_form-add',
  createCard
)

// создаем экземпляр класса Попапа с картинкой
const popupWithImage = new PopupWithImage('.modal_assign_album');
popupWithImage.setEventListeners();
// Вешаем слушатели на кнопки открытия и формы
popupWithFormEdit.setEventListeners();

editButton.addEventListener('click', function() {
  fillPopupEdit(userInfo.getUserInfo().name, userInfo.getUserInfo().profession);
  popupWithFormEdit.open();
  validFormEdit.activateButton();
});

popupWithFormAdd.setEventListeners();

addButton.addEventListener('click', function() {
  popupWithFormAdd.open();
  validFormAdd.deactivateButton();
});

// получаем информацию о пользователе
fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
  headers: {
    authorization: '87805956-615a-41b3-9626-fd0494106fb1'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });



// получаем карточки
fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
  headers: {
    authorization: '87805956-615a-41b3-9626-fd0494106fb1'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

