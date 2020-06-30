// Открываем и закрываем окна
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let escButton = popup.querySelector('.esc-button');

function openEditProfile() {
  popup.classList.add('popup_opened');
}

function closeEditProfile() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openEditProfile);

escButton.addEventListener('click', closeEditProfile);

// Редактируем поля

let submitButtonProfile = popup.querySelector('.submit-button');

function editProfile() {
  let name = profile.querySelector('.profile__name-text');
  let proffesion = profile.querySelector('.profile__proffession');
  let fieldName = popup.querySelector('.popup__field_assign_name');
  let fieldProffesion = popup.querySelector('.popup__field_assign_proffesion');

  name.textContent = fieldName.value;
  proffesion.textContent = fieldProffesion.value;
}

submitButtonProfile.addEventListener('click', editProfile);
submitButtonProfile.addEventListener('click', closeEditProfile);
