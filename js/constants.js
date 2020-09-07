const profile = document.querySelector('.profile');
export const editButton = profile.querySelector('.profile__edit-button');
export const name = profile.querySelector('.profile__name-text');
export const profession = profile.querySelector('.profile__profession');
export const addButton = profile.querySelector('.profile__add-button')

export const modalEdit = document.querySelector('.modal_assign_form-eidt');
export const escButtonModalEdit = modalEdit.querySelector('.modal__esc-button');
export const fieldName = modalEdit.querySelector('.modal__field_assign_name');
export const fieldProfession = modalEdit.querySelector('.modal__field_assign_profession');
export const formProfile = modalEdit.querySelector('.modal__form');

export const modalAdd = document.querySelector('.modal_assign_form-add');
export const escButtonModalAdd = modalAdd.querySelector('.modal__esc-button');
export const fieldTitle = modalAdd.querySelector('.modal__field_assign_title');
export const fieldLink = modalAdd.querySelector('.modal__field_assign_link');
export const formAdd = modalAdd.querySelector('.modal__form');

export const modalAlbum = document.querySelector('.modal_assign_album');
export const modalAlbumImage = modalAlbum.querySelector('.modal__image');
export const escButtonModalAlbum = modalAlbum.querySelector('.modal__esc-button');
export const modalAlbumCaption = modalAlbum.querySelector('.modal__caption');

export const photoContainerSelector = '.photo__cards';
export const initialCards = [
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

export const formData = {
  formSelector: '.modal__form',
  inputSelector: '.modal__field',
  submitButtonSelector: '.modal__submit-button',
  inactiveButtonClass: 'modal__submit-button_disabled',
  inputErrorClass: 'modal__field_type_errorr',
  errorClass: 'modal__field-error_active'
}

