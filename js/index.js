const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const name = profile.querySelector('.profile__name-text');
const profession = profile.querySelector('.profile__profession');
const addButton = profile.querySelector('.profile__add-button')

const modalEdit = document.querySelector('.modal_form_edit');
const escButtonModalEdit = modalEdit.querySelector('.modal__esc-button');
const fieldName = modalEdit.querySelector('.modal__field_assign_name');
const fieldprofession = modalEdit.querySelector('.modal__field_assign_profession');
const formProfile = modalEdit.querySelector('.modal__container');

const modalAdd = document.querySelector('.modal_form_add');
const escButtonModalAdd = modalAdd.querySelector('.modal__esc-button');
const fieldTitle = modalAdd.querySelector('.modal__field_assign_title');
const fieldLink = modalAdd.querySelector('.modal__field_assign_link');


function toggleModal(modalName) {
  modalName.classList.toggle('modal_opened');
  fieldName.value = name.textContent;
  fieldprofession.value = profession.textContent;
}

function submitModalEdit(event){
  event.preventDefault();
  name.textContent = fieldName.value;
  profession.textContent = fieldprofession.value;
  toggleModal(modalEdit);
}


editButton.addEventListener('click', function(){toggleModal(modalEdit)});
escButtonModalEdit.addEventListener('click', function(){toggleModal(modalEdit)});
formProfile.addEventListener('submit', submitModalEdit);

addButton.addEventListener('click', function(){toggleModal(modalAdd)});
escButtonModalAdd.addEventListener('click', function(){toggleModal(modalAdd)});
