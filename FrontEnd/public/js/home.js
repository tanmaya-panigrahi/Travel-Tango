// background slide show
// Waypoints


window.onload = function () {
  document.getElementById('loader').style.display = 'none';
}


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


// var slides = document.querySelectorAll('.slide');
// var currentSlide = 0;
// slides[currentSlide].classList.add('active');

// function nextSlide() {
//   slides[currentSlide].classList.remove('active');
//   currentSlide = currentSlide + 1;
//   if (currentSlide >= slides.length) {
//     currentSlide = 0;
//   }
//   slides[currentSlide].classList.add('active');
// }

// setInterval(nextSlide, 8000);


// desccription button features

document.getElementById('button1').addEventListener('click', function () {
  document.getElementById('content1').classList.add('active');
  document.getElementById('content1').classList.remove('hidden');
  document.getElementById('content2').classList.add('hidden');
  document.getElementById('content2').classList.remove('active');
  document.getElementById('button1').classList.add('active');
  document.getElementById('button2').classList.remove('active');
});

document.getElementById('button2').addEventListener('click', function () {
  document.getElementById('content2').classList.add('active');
  document.getElementById('content2').classList.remove('hidden');
  document.getElementById('content1').classList.add('hidden');
  document.getElementById('content1').classList.remove('active');
  document.getElementById('button2').classList.add('active');
  document.getElementById('button1').classList.remove('active');
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


// nav bar color change on scroll

window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.nav');
  var nav_content_color = document.querySelectorAll('.nav li .nav-c');
  var nav_login = document.querySelector('.nav .login');
  var logo = document.querySelector('.nav .logo img');
  var nav_icon = document.querySelector('.nav_icon img');
  var scrollHeight = window.innerHeight * 0.3; // 30% of the window's height

  if (window.scrollY > scrollHeight) {
    navbar.style.backgroundColor = 'white';
    logo.src = '/images/logo2.png';
    navbar.style.transition = '1s';
    navbar.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)';
    navbar.style.padding = '0em';
    nav_login.style.color = 'black';
    nav_login.style.border = '2px solid black';
    nav_login.addEventListener('mouseover', function () {
      nav_login.style.backgroundColor = 'black';
      nav_login.style.color = 'white';
    });
    nav_login.addEventListener('mouseout', function () {
      nav_login.style.backgroundColor = 'white';
      nav_login.style.color = 'black';
    });

    nav_content_color.forEach(function (element) {
      element.style.color = 'black';
      element.style.fontWeight = '500';
    });

    nav_icon.src = '/images/svgs/nav_icons1.svg';
  }
  else {
    navbar.style.backgroundColor = 'transparent'; // revert to original background color
    logo.src = '/images/logo.png';
    navbar.style.padding = '1em';
    navbar.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0)';
    nav_login.style.color = 'white';
    nav_login.style.border = '2px solid white';
    nav_login.style.backgroundColor = 'transparent';
    nav_login.addEventListener('mouseover', function () {
      nav_login.style.backgroundColor = 'white';
      nav_login.style.color = 'black';
    });
    nav_login.addEventListener('mouseout', function () {
      nav_login.style.backgroundColor = 'transparent';
      nav_login.style.color = 'white';
    });
    nav_content_color.forEach(function (element) {
      element.style.color = 'white';
      element.style.fontWeight = '400';
    });

    nav_icon.src = '/images/svgs/nav_icon.svg';

  }
});


