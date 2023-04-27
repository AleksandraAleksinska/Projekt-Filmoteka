const teamModal = document.querySelector('[data-team]');
const teamOpen = document.querySelector('[data-team-open]');
const teamClose = document.querySelector('[data-team-close]');
console.log(teamClose, teamModal, teamOpen);


teamOpen.addEventListener("click", () => {
    teamModal.classList.remove('team-hidden');
    teamClose.classList.remove('is-hidden--x');
    document.addEventListener('click', backdropClose);
    teamClose.addEventListener("click", closeTeam);
})

const closeTeam = () => {
        teamModal.classList.add('team-hidden');
        teamClose.classList.add('is-hidden--x');
};
const backdropClose = () => {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('team-backdrop')) {
            closeTeam();
            document.removeEventListener('click', backdropClose);
        }
    })
};
