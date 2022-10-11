(function ($) {
  "use strict";
  // scroll
  $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
          $('.navbar').fadeIn('slow').css('display', 'flex');
      } else {
          $('.navbar').fadeOut('slow').css('display', 'none');
      }
  });

  // typed
  if ($('.typed-text-output').length == 1) {
      var typed_strings = $('.typed-text').text();
      var typed = new Typed('.typed-text-output', {
          strings: typed_strings.split(', '),
          typeSpeed: 100,
          backSpeed: 20,
          smartBackspace: false,
          loop: true
      });
  }
})(jQuery);

document.addEventListener("DOMContentLoaded", function(){
  // make it as accordion for smaller screens
  if (window.innerWidth < 992) {  
    // close all inner dropdowns when parent is closed
    document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
      everydropdown.addEventListener('hidden.bs.dropdown', function () {
        // after dropdown is hidden, then find all submenus
          this.querySelectorAll('.submenu').forEach(function(everysubmenu){
            // hide every submenu as well
            everysubmenu.style.display = 'none';
          });
      })
    });

    document.querySelectorAll('.dropdown-menu a').forEach(function(element){
      element.addEventListener('click', function (e) {
          let nextEl = this.nextElementSibling;
          if(nextEl && nextEl.classList.contains('submenu')) {	
            // prevent opening link if link needs to open dropdown
            e.preventDefault();
            if(nextEl.style.display == 'block'){
              nextEl.style.display = 'none';
            } else {
              nextEl.style.display = 'block';
            }
  
          }
      });
    })
  }
  // end if innerWidth
  }); 

  var form = document.getElementById("my-form");
    
  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for contacting us!";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form"
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
    });
  }
  form.addEventListener("submit", handleSubmit)