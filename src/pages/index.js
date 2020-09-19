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
import { renderLoading } from './../utils/utils.js';



//функции

const handleSubmitAddNewCard = (inputValues, popup, form, section) => {
  renderLoading(true, popup);
  api
  .addCard(inputValues)
  .then((data) => {
    createCard(data, section);
    form.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(()=>{
    renderLoading(false, popup);
  })
}


const handleCardClick = (item) => {
  popupWithImage.open(item.link, item.name);
}

const handleLikeClick = (el, id, counter) => {
  if (el.classList.contains('photo__like-button_active')) {

    api
    .removeLike(id)
    .then(data => {
      el.classList.remove('photo__like-button_active');
      counter.textContent = data.likes.length
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  } else {

    api
    .putLike(id)
    .then(data => {
      el.classList.add('photo__like-button_active');
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
      api
      .removeCard(id)
      .then(()=>{
        el.removeCard();
        popupWithConfirmDelete.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

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

const createCard = (item, section, isArr) => {
  const card = new Card(
  item,
  '#photo-item',
  handleCardClick,
  handleLikeClick,
  handleDeleteClick,
  handleConfirmDeleteCard,
  api);

  const cardElement = card.generateCard();
  section.addItem(cardElement, isArr)
}

const handlerSubmitEditForm = (inputValues, popup, form) => {
  popup.querySelector('.modal__submit-button').innerText = 'Сохранение...';
    api
    .setUserData(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      form.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(()=>{
      popup.querySelector('.modal__submit-button').textContent = 'Сохранить';

    })

}

const handlerSubmitAvatarForm = (inputValues, popup, form) => {
  popup.querySelector('.modal__submit-button').innerText = 'Сохранение...';
    api
    .setUserAvatar(inputValues)
    .then((data) => {
      avatar.setAttribute('src', data.avatar);
      form.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(()=>{
      popup.querySelector('.modal__submit-button').textContent = 'Сохранить';

    })

}
// Экземпляр класса для Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
  authorization: '87805956-615a-41b3-9626-fd0494106fb1',
  "Content-type": "application/json"
  }
})

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
  api,
  // cardSection
);
popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm(
  '.modal_assign_form-add',
  handleSubmitAddNewCard,
  api
)
popupWithFormAdd.setEventListeners();

const popupWithImage = new PopupWithImage(
  '.modal_assign_album',
  '.modal__image',
  '.modal__caption'
);
popupWithImage.setEventListeners();

const popupWithFormAvatar = new PopupWithForm(
  '.modal_assign_form-avatar',
  handlerSubmitAvatarForm,
  api
)
popupWithFormAvatar.setEventListeners();

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
api
  .getInitialsCards()
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
api
  .getUserData()
  .then((data)=> {
    userInfo.setUserInfo(data.name, data.about);
    avatar.setAttribute('src', data.avatar);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


