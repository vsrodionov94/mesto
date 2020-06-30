let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let escButton = popup.querySelector('.popup__esc-button');
let name = profile.querySelector('.profile__name-text');
let proffesion = profile.querySelector('.profile__proffession');
let fieldName = popup.querySelector('.popup__field_assign_name');
let fieldProffesion = popup.querySelector('.popup__field_assign_proffesion');
let submitButtonProfile = popup.querySelector('.popup__submit-button');

function openEditProfile() {
  popup.classList.add('popup_opened');
  fieldName.value = name.textContent;
  fieldProffesion.value = proffesion.textContent;
}

function closeEditProfile() {
  popup.classList.remove('popup_opened');
}

function editProfile(event) {
  event.preventDefault();
  name.textContent = fieldName.value;
  proffesion.textContent = fieldProffesion.value;
  closeEditProfile();
}

editButton.addEventListener('click', openEditProfile);
escButton.addEventListener('click', closeEditProfile);
submitButtonProfile.addEventListener('submit', editProfile);

