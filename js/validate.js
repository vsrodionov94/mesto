const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('modal__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('modal__field-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('modal__field_type_error');
  errorElement.classList.remove('modal__field-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.modal__field'));
  const buttonElement = formElement.querySelector('.modal__submit-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('modal__submit-button_disabled');
  } else {
    buttonElement.classList.remove('modal__submit-button_disabled');
  }
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.modal__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
  });
    setEventListeners(formElement);
});
}

enableValidation()
