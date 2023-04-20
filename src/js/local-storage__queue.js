const queueButton = document.querySelector('.button--queue');
const userQueue = document.querySelector('.btn-queue');

queueButton.addEventListener('click', () => {
  localStorage.setItem('queueElements', '');
});

userQueue.addEventListener('click', () => {
  localStorage.getItem('queueElements');
});

const addToQueue = async () => {
  try {
    // const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
  } catch (error) {
    console.log(error.message);
  }
};
