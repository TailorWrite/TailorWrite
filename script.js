const toggleSwitch = document.getElementById('darkModeToggle');
const currentMode = localStorage.getItem('dark');

// Check dark mode preference from localStorage on page load
if (currentMode === 'dark') {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true;
}

// Toggle dark mode on checkbox change
toggleSwitch.addEventListener('change', function(event) {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('dark', 'light');
    }
});
