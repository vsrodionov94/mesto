const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const name = profile.querySelector('.profile__name-text');
const proffesion = profile.querySelector('.profile__proffession');

const modalEdit = document.querySelector('.modal_form_edit');
const escButton = modalEdit.querySelector('.modal__esc-button');
const fieldName = modalEdit.querySelector('.modal__field_assign_name');
const fieldProffesion = modalEdit.querySelector('.modal__field_assign_proffesion');
const formProfile = modalEdit.querySelector('.modal__container');

function toggleModal(modalName) {
  if (modalName.classList.contains('modal_opened')){
    modalName.classList.remove('modal_opened');
  }
  modalName.classList.toggle('modal_opened');
  fieldName.value = name.textContent;
  fieldProffesion.value = proffesion.textContent;
}
//
// function closeEditProfile() {
//   modal.classList.remove('modal_opened');
// }

function editProfile(event) {
  event.preventDefault();
  name.textContent = fieldName.value;
  proffesion.textContent = fieldProffesion.value;
  closeEditProfile();
}

editButton.addEventListener('click', toggleModal(modalEdit));
// escButton.addEventListener('click', closeEditProfile);
formProfile.addEventListener('submit', editProfile);

