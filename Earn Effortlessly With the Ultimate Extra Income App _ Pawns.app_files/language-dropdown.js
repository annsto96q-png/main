document.addEventListener('DOMContentLoaded', function () {
    const figure = document.querySelector(".choose-language-menu");

    if (!figure || typeof wpmlLanguages === "undefined") return;

    // Get all non-active language codes
    const allowedLangs = Object.values(WPML_LANGS)
        .filter((lang) => !lang.active) // excludes current language
        .map((lang) => lang.code); // get the language code only

    if (!figure.closest(".original-language-wrapper")) {
        const wrapper = document.createElement("div");
        wrapper.className = "original-language-wrapper";
        figure.parentNode.insertBefore(wrapper, figure);
        wrapper.appendChild(figure);
    }

    createLanguageDropdown(figure, allowedLangs);
    moveLanguageSwitcherMobile();
  
    window.addEventListener('resize', moveLanguageSwitcherMobile);
  
    figure.addEventListener('click', function (e) {
        e.stopPropagation();
        figure.classList.toggle('active');
        figure.querySelector('.language-dropdown')?.classList.toggle('show');
        figure.querySelector('img')?.classList.toggle('opened');
    });
  
    document.addEventListener('click', () => {
        figure.classList.remove('active');
        figure.querySelector('.language-dropdown')?.classList.remove('show');
        figure.querySelector('img')?.classList.remove('opened');
    });
  });
  
  function createLanguageDropdown(container, allowedLangs) {
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
  
    allowedLangs.forEach(code => {
        const lang = wpmlLanguages[code];
        if (!lang) return;
  
        const item = document.createElement('a');
        item.href = lang.url;
        item.className = 'language-item';
        item.dataset.code = code;
        item.innerHTML = `${code.toUpperCase()} <img src="${lang.country_flag_url}" alt="${lang.native_name}" />`;
  
        if (lang.active) item.classList.add('active');
        dropdown.appendChild(item);
    });
  
    container.appendChild(dropdown);
  }
  
  function moveLanguageSwitcherMobile() {
    const container = document.querySelector('#modal-1-content');
    const langMenu = document.querySelector('.choose-language-menu');
    if (!container || !langMenu) return;
  
    const isMobile = window.innerWidth <= 1200;
    const alreadyMoved = langMenu.dataset.moved === 'true';
  
    if (isMobile && !alreadyMoved) {
        container.insertAdjacentElement('afterend', langMenu);
        langMenu.dataset.moved = 'true';
    } else if (!isMobile && alreadyMoved) {
        const originalWrapper = document.querySelector('.original-language-wrapper');
        if (originalWrapper) {
            originalWrapper.appendChild(langMenu);
            langMenu.dataset.moved = 'false';
        }
    }
  }

  window.addEventListener('load', function () {
    const switcher = document.querySelector('.footer-language-switcher');
    const toggle = switcher?.querySelector('.current-lang');
    const dropdown = switcher?.querySelector('.lang-dropdown');

    if (!switcher || !toggle || !dropdown) return;

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    document.addEventListener('click', function () {
        dropdown.classList.remove('show');
    });
});
