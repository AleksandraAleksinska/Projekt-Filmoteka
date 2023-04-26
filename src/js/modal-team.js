const teamModal = document.querySelector('[data-team]');
const teamOpen = document.querySelector('[data-team-open]');
const teamClose = document.querySelector('[data-team-close]');
console.log(teamClose, teamModal, teamOpen);


teamOpen.addEventListener("click", () => {
    teamModal.classList.remove('team-hidden');
})


teamClose.addEventListener("click", () => {
    teamModal.classList.add('team-hidden');
})