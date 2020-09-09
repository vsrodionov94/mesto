export function toggleModal(modalName) {
  const isOpen = modalName.classList.contains('modal_opened');
  if (isOpen) {
    modalName.classList.remove('modal_opened');
    document.removeEventListener('keydown', (event) =>{
      if (event.key === 'Escape'){
        modalName.classList.remove('modal_opened');
      }
    })
  } else {
    modalName.classList.add('modal_opened');
    document.addEventListener('keydown', (event) =>{
      if (event.key === 'Escape'){
        modalName.classList.remove('modal_opened');
      }
    })
  }

}
