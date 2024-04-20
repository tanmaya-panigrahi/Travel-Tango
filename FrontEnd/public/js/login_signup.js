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

/*=============== SHOW HIDDEN - PASSWORD ===============*/

document.addEventListener('DOMContentLoaded', () => {
   const showHiddenPass = (loginPass, loginEye) => {
      const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

      iconEye.addEventListener('click', () => {
         // Change password to text
         if (input.type === 'password') {
            // Switch to text
            input.type = 'text'

            // Icon change
            iconEye.classList.add('ri-eye-line')
            iconEye.classList.remove('ri-eye-off-line')
         } else {
            // Change to password
            input.type = 'password'

            // Icon change
            iconEye.classList.remove('ri-eye-line')
            iconEye.classList.add('ri-eye-off-line')
         }
      })
   }

   showHiddenPass('login-pass', 'login-eye')

})

