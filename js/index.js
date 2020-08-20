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
  modalAlbum,
  escButtonModalAlbum,
  photoCards,
  initialCards,
  formData
} from './constants.js';

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {toggleModal} from './utilites.js';

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

function createNewCard() {
  const newCard = new Card({
    name: fieldTitle.value,
    link: fieldLink.value,
  }, '#photo-item');
    const cardNew = newCard.generateCard();

  return cardNew;
}

function prependNewCard(card){
  photoCards.prepend(card);
}

function renderNewCardToBegin(event) {
  event.preventDefault();
  prependNewCard(createNewCard());
  clearFormAdd();
  toggleModal(modalAdd);
}

function renderAllCard(cardArr) {
  cardArr.forEach( (item) => {
    const card = new Card(item, '#photo-item')
    const cardElement = card.generateCard();
    photoCards.append(cardElement)
    });

  };

function handlerModalMissClick(modalName) {
  modalName.addEventListener('click', (event) => {
    if(event.target.classList.contains('modal')){
      toggleModal(modalName);
    }
  })
}

function startValid (formName) {
  const validForm = new FormValidator(formData, formName);
  validForm.enableValidation()
};

renderAllCard(initialCards);


editButton.addEventListener('click', function() {
  toggleModal(modalEdit);
  fillModalEdit();
  startValid(formProfile);
});

escButtonModalEdit.addEventListener('click', function() {
  toggleModal(modalEdit);
});

formProfile.addEventListener('submit', function () {
  submitModalEdit(event);
});

addButton.addEventListener('click', function() {
  toggleModal(modalAdd);
  startValid(formAdd);
});

escButtonModalAdd.addEventListener('click', function() {
  toggleModal(modalAdd);
  clearFormAdd();
});

escButtonModalAlbum.addEventListener('click', () => {
  toggleModal(modalAlbum);
})

formAdd.addEventListener('submit', renderNewCardToBegin);

handlerModalMissClick(modalEdit);
handlerModalMissClick(modalAdd);
handlerModalMissClick(modalAlbum);




