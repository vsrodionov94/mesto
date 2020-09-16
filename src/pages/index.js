// import './index.css';

import {
  editButton,
  addButton,
  fieldName,
  fieldProfession,
  formProfile,
  formAdd,
  photoContainerSelector,
  initialCards,
  formData,
  avatar,
  avatarButton, formEditAvatar
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';

const apiInfo = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me',
  headers: {
  authorization: '87805956-615a-41b3-9626-fd0494106fb1',
  "Content-type": "application/json"
  }
})

const userInfo = new UserInfo(
  '.profile__name-text',
  '.profile__profession'
);

apiInfo
.getData()
.then((data)=> {
  userInfo.setUserInfo(data.name, data.about);
})

const apiCard = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/cards',
  headers: {
  authorization: '87805956-615a-41b3-9626-fd0494106fb1',
  "Content-type": "application/json"
}
});

// Рендер карточек начальный
apiCard
.getData()
.then((data) => {
  const cardSection = new Section({
    items: data.map((item) => {
      return {
        name: item.name,
        link: item.link
      }
    }),
    renderer: createCard},
    photoContainerSelector);
    cardSection.renderItems();
});

function fillPopupEdit(name, profession) {
  fieldName.value = name;
  fieldProfession.value = profession;
}

function createCard(item) {
    const card = new Card(item, '#photo-item',
    () =>{
      popupWithImage.open(item.link, item.name);
    });
    const cardElement = card.generateCard();
    document.querySelector(photoContainerSelector).prepend(cardElement); // здесь поправить надо
}

// создаем экземпляр класса для валидации формы редактирования профиля
const validFormEdit = new FormValidator(formData, formProfile);
validFormEdit.enableValidation();
// создаем экземпляр класса для валидации формы добавления
const validFormAdd = new FormValidator(formData, formAdd);
validFormAdd.enableValidation();

const validFormAvatar = new FormValidator(formData, formEditAvatar);
validFormAvatar.enableValidation();


// создаем экземпляр класса для информации о пользователе

// создаем экземпляр класса Попапа с формой профиля
const popupWithFormEdit = new PopupWithForm(
  '.modal_assign_form-eidt',
  (data) => {
    userInfo.setUserInfo(data.name, data.about);
  },
   apiInfo
);

// создаем экземпляр класса Попапа с формой добавления
const popupWithFormAdd = new PopupWithForm(
  '.modal_assign_form-add',
  createCard,
  apiCard
)

// создаем экземпляр класса Попапа с картинкой
const popupWithImage = new PopupWithImage('.modal_assign_album');
popupWithImage.setEventListeners();
// Вешаем слушатели на кнопки открытия и формы
popupWithFormEdit.setEventListeners();

// создаем экземпляр для попапа с редактированием аватара
const popupWithFormAvatar = new PopupWithForm(
  '.modal_assign_form-avatar',

)
popupWithFormAvatar.setEventListeners();

editButton.addEventListener('click', function() {
  fillPopupEdit(userInfo.getUserInfo().name, userInfo.getUserInfo().about);
  popupWithFormEdit.open();
  validFormEdit.activateButton();
});

popupWithFormAdd.setEventListeners();

addButton.addEventListener('click', function() {
  popupWithFormAdd.open();
  validFormAdd.deactivateButton();
});

avatarButton.addEventListener('click', function() {
  popupWithFormAvatar.open();
  validFormAvatar.deactivateButton();
})



// получаем информацию о пользователе с сервера


// const cardSection = new Section({
//   items: listItems,
//   renderer: createCard},
//   photoContainerSelector);

// cardSection.renderItems()

// получаем информацию о пользователе
// fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
//   headers: {
//     authorization: '87805956-615a-41b3-9626-fd0494106fb1'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });




