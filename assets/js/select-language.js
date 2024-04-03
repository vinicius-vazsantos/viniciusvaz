// Função para alterar o idioma e traduzir o HTML
function changeLanguage(langCode, element) {
    // Altera o atributo lang do HTML
    document.documentElement.lang = langCode;

    // Selecione e Remove a classe 'active' de todos os botões
    const langButtons = document.querySelectorAll('#select-lang .dropdown-item');
    langButtons.forEach(btn => btn.classList.remove('lang-active'));

    // Adiciona a classe 'lang-active' apenas ao botão clicado
    element.parentElement.classList.add('lang-active');

    // Seleciona o objeto de acordo com a linguagem
    const langSelect = dictionary[langCode];
    
    // Altera texto da navbar
    document.getElementById('nav-link-about').innerText = langSelect.navbar.about;
    document.getElementById('dropdown-skill-1').innerText = langSelect.navbar.skillDrop1;
    document.getElementById('dropdown-skill-2').innerText = langSelect.navbar.skillDrop2;
    document.getElementById('nav-link-experience').innerText = langSelect.navbar.experience;
    document.getElementById('nav-link-contact').innerText = langSelect.navbar.contact;
    document.getElementById('dropdown-lang-en').innerText = langSelect.navbar.langEn;
    document.getElementById('dropdown-lang-ptbr').innerText = langSelect.navbar.langPtBr;
    document.getElementById('dropdown-theme-light').innerText = langSelect.navbar.navbarLight;
    document.getElementById('dropdown-theme-dark').innerText = langSelect.navbar.navbarDark;
    
    // Altera texto da section home 
    document.getElementById('title-presentation').innerHTML = langSelect.home.homeTitle;
    document.getElementById('text-presentation').innerText = langSelect.home.homeText;
    document.getElementById('home-button-contact').innerText = langSelect.home.buttonContact;
    document.getElementById('home-button-more').innerText = langSelect.home.buttonMore;

    // Altera texto da section about 
    document.getElementById('title-about').innerHTML = langSelect.about.aboutTitle;
    document.getElementById('text-about').innerText = langSelect.about.aboutText;
    document.getElementById('text-about-frontend').innerText = langSelect.about.frontEnd;
    document.getElementById('text-about-backend').innerText = langSelect.about.backEnd;
    document.getElementById('title-about-bi-analist').innerText = langSelect.about.titleBiAnalist;
    document.getElementById('text-about-bi-analist').innerText = langSelect.about.textBiAnalist;

    // Altera texto da section skills
    document.getElementById('text-skills').innerHTML = langSelect.skills.text;
    document.getElementById('button-skills').innerText = langSelect.skills.button;
    
    // Altera texto da section experience
    document.getElementById('title-experience').innerHTML = langSelect.experience.title;
    document.getElementById('text-experience').innerText = langSelect.experience.text;
    document.getElementById('title-first-experience').innerText = langSelect.experience.titleFirstExperience;
    document.getElementById('text-first-experience').innerText = langSelect.experience.textFirstExperience;
    document.getElementById('title-second-experience').innerText = langSelect.experience.titleSecondExperience;
    document.getElementById('text-second-experience').innerText = langSelect.experience.textSecondExperience;
    document.getElementById('title-third-experience').innerText = langSelect.experience.titleThirdExperience;
    document.getElementById('text-third-experience').innerText = langSelect.experience.textThirdExperience;

    // Altera texto da section demo
    document.getElementById('title-demo').innerHTML = langSelect.demo.title;
    document.getElementById('subtitle-demo').innerText = langSelect.demo.subtitle;
    document.getElementById('text-demo').innerText = langSelect.demo.textSubtitle;

    // Altera texto da section contact
    document.getElementById('title-contact').innerHTML = langSelect.contact.title;
    document.getElementById('label-name').innerText = langSelect.contact.labelName;
    document.getElementById('name-invalid').innerText = langSelect.contact.invalidName;
    document.getElementById('email-invalid').innerText = langSelect.contact.invalidEmail;
    document.getElementById('label-message').innerText = langSelect.contact.labelMessage;
    document.getElementById('message').placeholder = langSelect.contact.placeholderMessage;
    document.getElementById('message-invalid').innerText = langSelect.contact.invalidMessage;
    document.getElementById('submitButton').innerText = langSelect.contact.button;
    document.getElementById('text-info-contact').innerText = langSelect.contact.info;
    document.getElementById('address').innerText = langSelect.contact.address;
    document.getElementById('cellphone').innerText = langSelect.contact.cellphone;

    // Altera texto do footer
    document.getElementById('direitos').innerHTML = langSelect.footer.text;
}

// Adiciona eventos de clique aos botões do dropdown
document.getElementById('dropdown-lang-ptbr').addEventListener('click', function () {
    changeLanguage('pt-br', this);
    $('.offcanvas').offcanvas('hide')
});

document.getElementById('dropdown-lang-en').addEventListener('click', function () {
    changeLanguage('en', this);
    $('.offcanvas').offcanvas('hide')
});
