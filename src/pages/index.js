// import './index.css';

import {
  editButton,
  addButton,
  fieldName,
  fieldProfession,
  formProfile,
  formAdd,
  formConfirmDelete,
  photoContainerSelector,
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
import { Popup } from './../components/Popup.js';

//функции

const handleCardClick = (item) => {
  popupWithImage.open(item.link, item.name);
}

const handleLikeClick = (el, id, counter, likes) => {
  if (el.classList.contains('photo__like-button_active')) {
    el.classList.remove('photo__like-button_active');
    apiCard
    .removeLike(id)
    .then(data => {
      counter.textContent = data.likes.length
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  } else {
    el.classList.add('photo__like-button_active');
    apiCard
    .putLike(id)
    .then(data => {
      counter.textContent = data.likes.length
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }
}

const handleConfirmDeleteCard = (id, el) => {
  formConfirmDelete.addEventListener('submit', evt => {
    evt.preventDefault();
      apiCard
      .removeCard(id)
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

      el.remove();
      el = null;
      popupWithConfirmDelete.close();
  })
}

const handleDeleteClick = (id, el) => {
  popupWithConfirmDelete.open();
  handleConfirmDeleteCard(id, el);
}


const fillPopupEdit = (name, profession) => {
  fieldName.value = name;
  fieldProfession.value = profession;
}

const createCard = (item) => {
  const card = new Card(
  item,
  '#photo-item',
  handleCardClick,
  handleLikeClick,
  handleDeleteClick,
  handleConfirmDeleteCard,
  apiInfo);

  const cardElement = card.generateCard();
  document.querySelector(photoContainerSelector).prepend(cardElement); // здесь поправить надо
}

const handlerSubmitEditForm = (data) => {
  userInfo.setUserInfo(data.name, data.about);
}

const handlerSubmitAvatarForm = (data) =>{
  avatar.setAttribute('src', data.avatar);
}
// Экземпляры классов для Api
const apiInfo = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me',
  headers: {
  authorization: '87805956-615a-41b3-9626-fd0494106fb1',
  "Content-type": "application/json"
  }
})

const apiAvatar = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar',
  headers: {
    authorization: '87805956-615a-41b3-9626-fd0494106fb1',
    "Content-type": "application/json"
    }
});

const apiCard = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/cards',
  headers: {
  authorization: '87805956-615a-41b3-9626-fd0494106fb1',
  "Content-type": "application/json"
}
});

// Экземпляр класса информации о пользователе
const userInfo = new UserInfo(
  '.profile__name-text',
  '.profile__profession'
);

// создаем экземпляр класса для валидации формы редактирования профиля
const validFormEdit = new FormValidator(formData, formProfile);
validFormEdit.enableValidation();
// создаем экземпляр класса для валидации формы добавления
const validFormAdd = new FormValidator(formData, formAdd);
validFormAdd.enableValidation();

const validFormAvatar = new FormValidator(formData, formEditAvatar);
validFormAvatar.enableValidation();


// создаем экземпляры для попапов и вешаем слушателя

const popupWithFormEdit = new PopupWithForm(
  '.modal_assign_form-eidt',
  handlerSubmitEditForm,
   apiInfo
);
popupWithFormEdit.setEventListenersPatch();

const popupWithFormAdd = new PopupWithForm(
  '.modal_assign_form-add',
  createCard,
  apiCard
)
popupWithFormAdd.setEventListenersPost();

const popupWithImage = new PopupWithImage('.modal_assign_album');
popupWithImage.setEventListeners();

const popupWithFormAvatar = new PopupWithForm(
  '.modal_assign_form-avatar',
  handlerSubmitAvatarForm,
  apiAvatar
)
popupWithFormAvatar.setEventListenersPatch();

const popupWithConfirmDelete = new Popup('.modal_assign_confirm-delete');
popupWithConfirmDelete.setEventListeners();

// вешаем слушаетели на кнопки
editButton.addEventListener('click', function() {
  fillPopupEdit(userInfo.getUserInfo().name, userInfo.getUserInfo().about);
  popupWithFormEdit.open();
  validFormEdit.activateButton();
});

addButton.addEventListener('click', function() {
  popupWithFormAdd.open();
  validFormAdd.deactivateButton();
});

avatarButton.addEventListener('click', function() {
  popupWithFormAvatar.open();
  validFormAvatar.deactivateButton();
})

// Рендер карточек начальный
apiCard
  .getData()
  .then((data) => {
    const cardSection = new Section({
      items: data.map((item) => {
        return {
          name: item.name,
          link: item.link,
          likes: item.likes,
          id: item._id,
          ownerId: item.owner._id,
        }
      }),
      renderer: createCard},
      photoContainerSelector);
      cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// получаем и устанавливаем информацию о пользователе
apiInfo
  .getData()
  .then((data)=> {
    userInfo.setUserInfo(data.name, data.about);
    avatar.setAttribute('src', data.avatar);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


