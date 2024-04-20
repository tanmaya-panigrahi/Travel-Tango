var elements = document.querySelectorAll('.animate');

for (var i = 0; i < elements.length; i++) {
  new Waypoint({
    element: elements[i],
    handler: function(direction) {
      this.element.classList.add('active-waypoint');
    },
    offset: '75%'
  });
}


document.addEventListener('DOMContentLoaded', function () {



  // slide show for the destinations
  var slides = document.querySelectorAll('.slide');
  var currentSlide = 0;
  slides[currentSlide].classList.add('active');

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = currentSlide + 1;
    console.log(currentSlide);
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    slides[currentSlide].classList.add('active');
  }

  setInterval(nextSlide, 4000);


  // changing the plus sign to minus sign and vice versa and showing the dayContent

  var plusSigns = document.querySelectorAll('.plus-sign');

  plusSigns.forEach(function (plusSign) {
    plusSign.addEventListener('click', function () {
      var dayContent = this.parentElement.nextElementSibling.nextElementSibling;
      if (this.textContent.trim() === '+') {
        this.style.transform = 'rotate(180deg)';

        this.textContent = '-';
        dayContent.style.display = 'block';
      } else {
        this.style.transform = 'rotate(0deg)';
        this.textContent = '+';
        dayContent.style.display = 'none';
      }
    });
  });




  //  inclusion and exclusion content showing on button click

  var inclusionButton = document.getElementById('inclusion_button');
  var exclusionButton = document.getElementById('exclusion_button');
  var inclusionContent = document.getElementById('inclusion');
  var exclusionContent = document.getElementById('exclusion');
  inclusionButton.addEventListener('click', function () {
    inclusionContent.style.display = 'block';
    exclusionContent.style.display = 'none';
    inclusionButton.classList.add('active');
    exclusionButton.classList.remove('active');


  });

  exclusionButton.addEventListener('click', function () {
    inclusionContent.style.display = 'none';
    exclusionContent.style.display = 'block';
    inclusionButton.classList.remove('active');
    exclusionButton.classList.add('active');
  });




});


// javascript for the phone view 

const nav_button = document.querySelector('.nav_icon');
nav_button.addEventListener('click', () => {
  const nav_phone_view = document.querySelector('.nav_phone_view');
  if (nav_phone_view.style.display === 'flex') {
    nav_phone_view.style.display = 'none';

  }
  else {
    nav_phone_view.style.display = 'flex';
  }
});

const nav_phone_view_dropdown = document.querySelector(".nav_phone_view .dropdown .dropdown-content");
nav_phone_view_dropdown.addEventListener('click', () => {
  if (nav_phone_view_dropdown.style.display === 'block') {
    nav_phone_view_dropdown.style.display = 'none';
  }
  else {
    nav_phone_view_dropdown.style.display = 'block';
  }
});


document.addEventListener('DOMContentLoaded', function () {
  // search bar for the blogs
  var searchInput = document.querySelector('.search-input');

  var searchBar = document.querySelector('.search-bar');
  searchInput.addEventListener('click', function () {
    event.stopPropagation();
    searchBar.classList.add('active-search');
  })
  // searchInput.addEventListener('focusout', function () {
  //   searchBar.classList.remove('active-search');
  // })
  document.addEventListener('click', function () {
    searchBar.classList.remove('active-search');
  });
});


window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.nav');
  var nav_content_color = document.querySelectorAll('.nav li .nav-c');
  var nav_login = document.querySelector('.nav .login');
  var logo = document.querySelector('.nav .logo img');
  var nav_icon = document.querySelector('.nav_icon img');
  var scrollHeight = window.innerHeight * 0.3; // 30% of the window's height

  if (window.scrollY > scrollHeight) {
    navbar.style.backgroundColor = 'white';
    // logo.src = '/images/logo2.png';
    navbar.style.transition = '1s';
    navbar.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)';
    navbar.style.padding = '0em';

    nav_content_color.forEach(function (element) {
      element.style.color = 'black';
      element.style.fontWeight = '500';
    });

    // nav_icon.src = '/images/svgs/nav_icons1.svg';
  }
  else {
    navbar.style.backgroundColor = 'transparent'; // revert to original background color
    navbar.style.padding = '1em';
    navbar.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0)';

    nav_content_color.forEach(function (element) {
      element.style.color = 'black';
      element.style.fontWeight = '400';
    });

    // nav_icon.src = '/images/svgs/nav_icon.svg';

  }
});