const modalSettings = (() => {
  const refs = {
      
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };
    
  refs.closeModalBtn.addEventListener("click", toggleModal);
  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("backdrop")) {
      refs.modal.classList.toggle("is-hidden");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.code === "Escape") {
      refs.modal.classList.toggle("is-hidden");
    }
  });
  
  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();

export default modalSettings