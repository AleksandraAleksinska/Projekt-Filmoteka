const search = document.querySelector('.header__not-result-wrapper');

const notResultShow = () => {
  const message = 'Search result not successful. Enter the correct movie name';
  search.innerHTML = `<p class="header__not-result">${message}</p>`;
};

const deleteInformation = () => (search.innerHTML = '');

const getShowNotResult = num => {
  if (num === 0) {
    showNotResult.notResultShow();
  } else {
    showNotResult.deleteInformation();
  }
};

const showNotResult = { notResultShow, deleteInformation, getShowNotResult };
export default showNotResult;
