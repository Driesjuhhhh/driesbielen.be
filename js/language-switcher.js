// Language switcher logic for custom flag dropdown

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    if (
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) {
        age--;
    }
    return age;
}

function updateAge() {
    const ageElem = document.getElementById('age');
    if (ageElem) {
        ageElem.textContent = calculateAge("2004-09-01");
    }
}

function updateFlags(lang) {
    const flagEn = document.getElementById('flag-en');
    const flagNl = document.getElementById('flag-nl');
    if (flagEn && flagNl) {
        if (lang === 'en') {
            flagEn.style.display = 'inline';
            flagNl.style.display = 'none';
        } else {
            flagEn.style.display = 'none';
            flagNl.style.display = 'inline';
        }
    }
}

function setupLanguageSwitcher() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');

    // Show/hide dropdown
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            langDropdown.classList.toggle('hidden');
        });

        // Hide dropdown on outside click
        document.addEventListener('click', function (e) {
            if (!langDropdown.classList.contains('hidden')) {
                // Only close if click is outside the switcher
                if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                    langDropdown.classList.add('hidden');
                }
            }
        });

        // Set language on click
        langDropdown.querySelectorAll('button[data-lang]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                localStorage.setItem('lang', lang);
                updateFlags(lang);
                updateAge();
                if (typeof setLanguage === 'function') setLanguage(lang);
                langDropdown.classList.add('hidden');
            });
        });
    }

    // On load, set correct flag and age
    const lang = localStorage.getItem('lang') || 'en';
    updateFlags(lang);
    updateAge();
    if (typeof setLanguage === 'function') setLanguage(lang);
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', setupLanguageSwitcher);
} else {
    setupLanguageSwitcher();
}
