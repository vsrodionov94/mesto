import './index.css';

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
  avatarButton,
  formEditAvatar
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

// Экземпляр класса для Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
  authorization: '87805956-615a-41b3-9626-fd0494106fb1',
  "Content-type": "application/json"
  }
});

// начинаем создавать все только когда полностью загрузится страница
Promise.all([
  api.getUserData(),
  api.getInitialCards()
])
.then((values)=>{

  //функции
  const handleSubmitAddNewCard = (inputValues, popup, form) => {
    renderLoading(true, popup);
    api
    .addCard(inputValues)
    .then((data) => {
      createCard(data);
      form.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      renderLoading(false, popup);
    })
  }

  const handleCardClick = (item) => {
    popupWithImage.open(item.link, item.name);
  }

  const handleLikeClick = (el, id, card) => {
    if (el.classList.contains('photo__like-button_active')) {
      api
      .removeLike(id)
      .then((data) => {
        el.classList.remove('photo__like-button_active');
        card.howManylikes(data.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {

      api
      .putLike(id)
      .then(data => {
        el.classList.add('photo__like-button_active');
        card.howManylikes(data.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  const handleConfirmDeleteCard = (evt, id, el) => {
      evt.preventDefault();
        api
        .removeCard(id)
        .then(()=>{
          el.removeCard();
          popupWithConfirmDelete.close();
        })
        .catch((err) => {
          console.log(err);
        });
  }

  const handleDeleteClick = (id, el) => {
    popupWithConfirmDelete.open();
    formConfirmDelete.addEventListener('submit', (evt) => handleConfirmDeleteCard(evt, id, el));
  }

  const fillPopupEdit = (name, profession) => {
    fieldName.value = name;
    fieldProfession.value = profession;
  }

  const createCard = (item, isArr) => {
    if (isArr) {
      const card = new Card(
      item,
      '#photo-item',
      handleCardClick,
      handleLikeClick,
      handleDeleteClick
      );
      const cardElement = card.generateCard(userData);
      cardSection.addItem(cardElement, isArr);
    } else {
      const card = new Card(
      {
        name: item.name,
        link: item.link,
        likes: item.likes,
        id: item._id,
        owner: item.owner,
      },
      '#photo-item',
      handleCardClick,
      handleLikeClick,
      handleDeleteClick
    );
    const cardElement = card.generateCard(userData);
    cardSection.addItem(cardElement, isArr);
    }
  }

  const handlerSubmitEditForm = (inputValues, popup, form) => {
    renderLoading(true, popup);
      api
      .setUserData(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
        form.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        renderLoading(false, popup);
      })
  }

  const handlerSubmitAvatarForm = (inputValues, popup, form) => {
    renderLoading(true, popup);
      api
      .setUserAvatar(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
        form.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        renderLoading(true, popup);
      })
  }

  // Экземпляр класса информации о пользователе
  const userInfo = new UserInfo(
    '.profile__name-text',
    '.profile__profession',
    '.profile__avatar-image'
  );

  // создаем экземпляр класса для валидации форм и запускаем валидацию
  const validFormEdit = new FormValidator(formData, formProfile);
  validFormEdit.enableValidation();

  const validFormAdd = new FormValidator(formData, formAdd);
  validFormAdd.enableValidation();

  const validFormAvatar = new FormValidator(formData, formEditAvatar);
  validFormAvatar.enableValidation();

    const [userData, initialCards] = values;
    //Начальный рендер карточек
    const cardSection = new Section({
      items: initialCards.map((item) => {
        return {
          name: item.name,
          link: item.link,
          likes: item.likes,
          id: item._id,
          owner: item.owner,
        }
      }),
      renderer: createCard},
      photoContainerSelector);
      cardSection.renderItems();

    // начальная установка имени и профессии
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
  // создаем экземпляры для попапов и вешаем слушателя
    const popupWithFormEdit = new PopupWithForm(
      '.modal_assign_form-eidt',
      handlerSubmitEditForm,
    );
    popupWithFormEdit.setEventListeners();

    const popupWithFormAdd = new PopupWithForm(
      '.modal_assign_form-add',
      handleSubmitAddNewCard,
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
    )
    popupWithFormAvatar.setEventListeners();

    const popupWithConfirmDelete = new Popup('.modal_assign_confirm-delete');
    popupWithConfirmDelete.setEventListeners();

    // вешаем слушаетели на кнопки
    editButton.addEventListener('click', function() {
      fillPopupEdit(
        userInfo.getUserInfo().name,
        userInfo.getUserInfo().about
      );
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
})
.catch((err)=>{
  console.log(err);
})




