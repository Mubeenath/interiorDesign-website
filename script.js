// /Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');


  let curSlide = 0;
  const maxSlide = slides.length;

  //functions

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };


  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`)
    );
  };

  //next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    }
    else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //prev slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    }
    else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //init
  const init = function () {
    goToSlide(0)
    createDots();
    activateDot(0)
    
};
init();
  //event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};


slider();

//lean more
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click',function (e) {
section1.scrollIntoView({behavior:'smooth'});
});

//page navigation

// 1.add event listener to parent element .
// 2.determine what element originated the event .

document.querySelector('.nav__links').addEventListener('click',function (e) {
  e.preventDefault();
  //matching stratergy
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});

//sticky nav

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
const [entry] = entries;

if (!entry.isIntersecting) nav.classList.add('sticky');
else nav.classList.remove('sticky'); 
};

const headerObserver = new IntersectionObserver(stickyNav, { 
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//reveal section

const allSections =  document.querySelectorAll('.section');

  const revealSection = function (entries, observer) {
 
  const [entry] = entries;
  
 if (!entry.isIntersecting) return;
  
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
 };

 
const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
});

allSections.forEach( function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//menu fade animation 
const handleHover = function(e){
    if(e.target.classList.contains('nav__link')){
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');
      siblings.forEach(el => {
        if(el !==link) el.style.opacity=this;
      });
      logo.style.opacity=this;
    };
  };
  nav.addEventListener('mouseover',handleHover.bind(0.5))
  nav.addEventListener('mouseout',handleHover.bind(1))

  //location
  const map = L.map('map').setView([11.9235544 , 75.3528664], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([11.9235544 , 75.3528664]).addTo(map)
    .bindPopup('kannur')
    .openPopup();