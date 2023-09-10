const viewport = document.querySelector('.hero');
const scrollBtn = document.querySelector('.footer__scroll-to-top');

function checkScroll() {
    const scrollY = window.scrollY;

    // Function to check if scroll position is past the viewport
    const viewportBottom = viewport.offsetTop + viewport.clientHeight;

    if (scrollY > viewportBottom) {
        scrollBtn.classList.add("active"); // Display the scrollBtn
    } else {
        scrollBtn.classList.remove("active"); // Hide the scrollBtn
    }

}

// Add a scroll event listener to the window
window.addEventListener('scroll', checkScroll);

// Initial check to handle page load
checkScroll();


//Mobile Menu Control
const mobileBtn = document.querySelector('.header__bars');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav__link');

// State
let isMobileNavOpen = false;

mobileBtn.addEventListener('click', () => {
    isMobileNavOpen = !isMobileNavOpen;
    if (isMobileNavOpen) {
        mobileNav.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
    } else {
        mobileNav.style.display = 'none';
        document.body.style.overflowY = 'auto';
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
        })
    })

});


// THEME SWITCH HANDLING
const themeBtns = document.querySelectorAll('.theme-toggle');

//State
const theme = localStorage.getItem('theme');

// On Mount
theme && document.body.classList.add(theme);



//Handlers
const handleThemeToggle = () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light-mode');
    } else {
        localStorage.removeItem('theme');
        document.body.removeAttribute('class');
    }

}

//Events
themeBtns.forEach(themeBtn =>
    themeBtn.addEventListener('click', handleThemeToggle)
)




// LAZYLOADING HANDLING
const lazyImgs = document.querySelectorAll('.lazy');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImgs.forEach(img => {
    observer.observe(img);
});