// Données des profils
const profilesData = {
    fr: [
        {
            name: "Céleste",
            age: 28,
            interests: ["Philosophie", "Littérature", "Musique classique"],
            intention: "Amitié",
            duration: "Illimitée",
            level: "Soutenu",
            languages: ["Français"]
        },
        {
            name: "Malik",
            age: 35,
            interests: ["Jardinage", "Écologie", "Poésie"],
            intention: "Correspondance artistique",
            duration: "Un été",
            level: "Courant",
            languages: ["Français", "Allemand"]
        },
        {
            name: "Anna",
            age: 22,
            interests: ["Cinéma", "Langues", "Voyages"],
            intention: "Découverte culturelle",
            duration: "Illimitée",
            level: "Soutenu",
            languages: ["Allemand", "Français"]
        },
        {
            name: "Léa",
            age: 30,
            interests: ["Cuisine", "Arts visuels", "Nature"],
            intention: "Amitié",
            duration: "Quelques mois",
            level: "Courant",
            languages: ["Français", "Anglais"]
        },
        {
            name: "Jonas",
            age: 40,
            interests: ["Histoire", "Randonnée", "Musique folk"],
            intention: "Partage d'expériences",
            duration: "Illimitée",
            level: "Soutenu",
            languages: ["Allemand"]
        }
    ],
    de: [
        {
            name: "Céleste",
            age: 28,
            interests: ["Philosophie", "Literatur", "Klassische Musik"],
            intention: "Freundschaft",
            duration: "Unbegrenzt",
            level: "Anspruchsvoll",
            languages: ["Französisch"]
        },
        {
            name: "Malik",
            age: 35,
            interests: ["Gartenarbeit", "Ökologie", "Poesie"],
            intention: "Künstlerischer Austausch",
            duration: "Ein Sommer",
            level: "Mittel",
            languages: ["Französisch", "Deutsch"]
        },
        {
            name: "Anna",
            age: 22,
            interests: ["Kino", "Sprachen", "Reisen"],
            intention: "Kulturelle Entdeckung",
            duration: "Unbegrenzt",
            level: "Anspruchsvoll",
            languages: ["Deutsch", "Französisch"]
        },
        {
            name: "Léa",
            age: 30,
            interests: ["Kochen", "Bildende Kunst", "Natur"],
            intention: "Freundschaft",
            duration: "Einige Monate",
            level: "Mittel",
            languages: ["Französisch", "Englisch"]
        },
        {
            name: "Jonas",
            age: 40,
            interests: ["Geschichte", "Wandern", "Folk-Musik"],
            intention: "Erfahrungsaustausch",
            duration: "Unbegrenzt",
            level: "Anspruchsvoll",
            languages: ["Deutsch"]
        }
    ]
};

// Traductions pour les labels
const translations = {
    fr: {
        interests: "Centres d'intérêt",
        intention: "Intention",
        duration: "Durée",
        level: "Niveau",
        languages: "Langues",
        contact: "Contacter",
        contactPage: "contact-fr.html"
    },
    de: {
        interests: "Interessen",
        intention: "Absicht",
        duration: "Dauer",
        level: "Niveau",
        languages: "Sprachen",
        contact: "Kontaktieren",
        contactPage: "contact-de.html"
    }
};

// Variables globales
let currentLanguage = 'fr';
let currentProfiles = [];
let filteredProfiles = [];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Déterminer la langue actuelle
    const currentPage = window.location.pathname;
    currentLanguage = currentPage.includes('-de.html') ? 'de' : 'fr';
    
    // Initialiser la navigation mobile
    initMobileNavigation();
    
    // Initialiser les profils si on est sur une page de profils
    if (currentPage.includes('profils')) {
        initProfiles();
    }
    
    // Initialiser les formulaires
    initForms();
});

// Navigation mobile
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Animation du bouton hamburger
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navList.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = navList.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Initialisation des profils
function initProfiles() {
    currentProfiles = profilesData[currentLanguage] || [];
    filteredProfiles = [...currentProfiles];
    
    renderProfiles();
    initFilters();
}

// Rendu des profils
function renderProfiles() {
    const container = document.getElementById('profiles-container');
    if (!container) return;
    
    const labels = translations[currentLanguage];
    
    container.innerHTML = filteredProfiles.map(profile => `
        <div class="profile-card">
            <div class="profile-header">
                <div>
                    <h3 class="profile-name">${profile.name}</h3>
                    <p class="profile-age">${profile.age} ${currentLanguage === 'fr' ? 'ans' : 'Jahre'}</p>
                </div>
            </div>
            <div class="profile-info">
                <div class="profile-field">
                    <span class="profile-label">${labels.interests} :</span>
                    <span class="profile-value">${profile.interests.join(', ')}</span>
                </div>
                <div class="profile-field">
                    <span class="profile-label">${labels.intention} :</span>
                    <span class="profile-value">${profile.intention}</span>
                </div>
                <div class="profile-field">
                    <span class="profile-label">${labels.duration} :</span>
                    <span class="profile-value">${profile.duration}</span>
                </div>
                <div class="profile-field">
                    <span class="profile-label">${labels.level} :</span>
                    <span class="profile-value">${profile.level}</span>
                </div>
                <div class="profile-field">
                    <span class="profile-label">${labels.languages} :</span>
                    <div class="profile-languages">
                        ${profile.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
                    </div>
                </div>
            </div>
            <a href="${labels.contactPage}?profile=${encodeURIComponent(profile.name)}" class="btn contact-btn">${labels.contact}</a>
        </div>
    `).join('');
    
    // Animation d'apparition
    const cards = container.querySelectorAll('.profile-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialisation des filtres
function initFilters() {
    const languageFilter = document.getElementById('language-filter');
    const interestFilter = document.getElementById('interest-filter');
    
    if (languageFilter) {
        languageFilter.addEventListener('change', applyFilters);
    }
    
    if (interestFilter) {
        interestFilter.addEventListener('change', applyFilters);
    }
}

// Application des filtres
function applyFilters() {
    const languageFilter = document.getElementById('language-filter');
    const interestFilter = document.getElementById('interest-filter');
    
    const selectedLanguage = languageFilter ? languageFilter.value : '';
    const selectedInterest = interestFilter ? interestFilter.value : '';
    
    filteredProfiles = currentProfiles.filter(profile => {
        const matchesLanguage = !selectedLanguage || 
            profile.languages.some(lang => lang.includes(selectedLanguage));
        
        const matchesInterest = !selectedInterest || 
            profile.interests.some(interest => interest.includes(selectedInterest));
        
        return matchesLanguage && matchesInterest;
    });
    
    renderProfiles();
    
    // Message si aucun résultat
    const container = document.getElementById('profiles-container');
    if (filteredProfiles.length === 0 && container) {
        const noResultsMessage = currentLanguage === 'fr' 
            ? 'Aucun profil ne correspond à vos critères de recherche.'
            : 'Kein Profil entspricht Ihren Suchkriterien.';
        
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--color-text-light);">
                <p>${noResultsMessage}</p>
            </div>
        `;
    }
}

// Initialisation des formulaires
function initForms() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Pré-remplir le formulaire si un profil est spécifié dans l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const profileName = urlParams.get('profile');
        
        if (profileName) {
            const messageField = contactForm.querySelector('#message');
            const subjectField = contactForm.querySelector('#subject');
            
            if (messageField && subjectField) {
                const prefilledMessage = currentLanguage === 'fr' 
                    ? `Bonjour ${profileName},\n\nJ'ai découvert votre profil sur Lentura et j'aimerais beaucoup correspondre avec vous.\n\n`
                    : `Hallo ${profileName},\n\nIch habe Ihr Profil auf Lentura entdeckt und würde gerne mit Ihnen korrespondieren.\n\n`;
                
                messageField.value = prefilledMessage;
                subjectField.value = currentLanguage === 'fr' ? 'inscription' : 'anmeldung';
            }
        }
        
        // Validation du formulaire
        contactForm.addEventListener('submit', function(e) {
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--color-accent)';
                } else {
                    field.style.borderColor = 'var(--color-border)';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const errorMessage = currentLanguage === 'fr' 
                    ? 'Veuillez remplir tous les champs obligatoires.'
                    : 'Bitte füllen Sie alle Pflichtfelder aus.';
                
                alert(errorMessage);
            }
        });
        
        // Réinitialiser les styles des champs lors de la saisie
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = 'var(--color-border)';
            });
        });
    }
}

// Fonctions utilitaires
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Gestion des erreurs
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// Performance - Lazy loading pour les images (si nécessaire)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour les navigateurs plus anciens
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Accessibilité - Gestion du focus
document.addEventListener('keydown', function(e) {
    // Échapper pour fermer les menus
    if (e.key === 'Escape') {
        const navList = document.querySelector('.nav-list');
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            document.querySelector('.nav-toggle').focus();
        }
    }
});

// Analytics et suivi (placeholder)
function trackEvent(category, action, label) {
    // Ici vous pourriez ajouter votre code de suivi analytics
    console.log('Event tracked:', { category, action, label });
}

// Exemple d'utilisation du tracking
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('contact-btn')) {
        trackEvent('Profile', 'Contact', e.target.closest('.profile-card').querySelector('.profile-name').textContent);
    }
    
    if (e.target.classList.contains('lang-switch')) {
        trackEvent('Navigation', 'Language Switch', e.target.textContent);
    }
});