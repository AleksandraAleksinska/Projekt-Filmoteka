

const toggleModal = (() => {
  const refs = {      
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };
    
  const openModal = () => {
    refs.modal.classList.remove('is-hidden');
    window.addEventListener('keydown', closeOnEsc);
    window.addEventListener('click', closeOnBackdrop);
    refs.closeModalBtn.addEventListener('click', closeModal)
  };

  const closeModal = () => {
    refs.modal.classList.add('is-hidden');
    window.removeEventListener('keydown', closeOnEsc);
  };

  const closeOnEsc = () => {
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    });
  }

  const closeOnBackdrop = () => {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('backdrop')) {
        refs.modal.classList.toggle('is-hidden');
        document.removeEventListener('click', closeOnBackdrop);
      }
    })
  };

  return {
    openModal,
    closeModal,
    closeOnBackdrop
  };
})();

export default toggleModal;