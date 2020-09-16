export const profile = document.querySelector('.profile');
export const editButton = profile.querySelector('.profile__edit-button');
export const addButton = profile.querySelector('.profile__add-button');
export const avatar = profile.querySelector('.profile__avatar-image');
export const avatarButton = profile.querySelector('.profile__avatar-edit-button');

const popupAvatarEdit = document.querySelector('.modal_assign_form-avatar');
export const formEditAvatar = popupAvatarEdit.querySelector('.modal__form');

const popupEdit = document.querySelector('.modal_assign_form-eidt');
export const fieldName = popupEdit.querySelector('.modal__field_assign_name');
export const fieldProfession = popupEdit.querySelector('.modal__field_assign_profession');
export const formProfile = popupEdit.querySelector('.modal__form');

const popupAdd = document.querySelector('.modal_assign_form-add');
export const formAdd = popupAdd.querySelector('.modal__form');

const popupAlbum = document.querySelector('.modal_assign_album');
export const popupAlbumImage = popupAlbum.querySelector('.modal__image');
export const popupAlbumCaption = popupAlbum.querySelector('.modal__caption');
export const photoContainerSelector = '.photo__cards';
export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const formData = {
  formSelector: '.modal__form',
  inputSelector: '.modal__field',
  submitButtonSelector: '.modal__submit-button',
  inactiveButtonClass: 'modal__submit-button_disabled',
  inputErrorClass: 'modal__field_type_errorr',
  errorClass: 'modal__field-error_active'
}

