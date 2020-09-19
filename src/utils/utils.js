export const renderLoading = (isLoading, popup) => {
  if (isLoading) {
    popup.querySelector('.modal__submit-button').innerText = 'Сохранение...';
  } else {
    popup.querySelector('.modal__submit-button').innerText = 'Сохранить';
  }
}
