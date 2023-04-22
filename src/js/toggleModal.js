import selectedMovie from "./modal";

const modal = document.querySelector('[data-modal]');

const close = () => {
    modal.classList.add('is-hidden');
};
const open = () => {
    modal.classList.remove('is-hidden');
    window.addEventListener('keydown', closeOnEscape);
}
const closeOnEscape = (key) => {
    console.log(key);
}

const toggleModal = { close, open, closeOnEscape }
export default toggleModal;