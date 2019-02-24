(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  
  $('#fm_contact').submit(function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser 
    var form = $(this);
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize()
    }).done(function(data) {
      // Optionally alert the user of success here...
	  var res = data.split(",");
	  if(res.length <3) { 
			grecaptcha.reset(); 
			alert("fail");
	  }else if(res.length = 3){
		  $("#contact_popup").html("<p>E-Mail:  " + res[1] + "</p><p>Cell:  "  + res[2] + "</p>"); 
		    $('#contact_popup').popup({
				  closebutton:true,color:"#323e51",scrolllock:true,transition: 'all 0.3s'
				  
			  });
			  $('#contact_popup').popup('show');
	  } 
	  
    }).fail(function(data) { 
		grecaptcha.reset(); 
    });
  });
  $('#fm_resume').submit(function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser 
    var form = $(this);
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize()
    }).done(function(data) {
      // Optionally alert the user of success here...
	  var res = data.split(",");
	  if(res.length <2) { 
			grecaptcha.reset(); 
			alert("fail");
	  }else if(res.length = 2){
		var pdfLink = res[1];
		event.preventDefault(); // stop the browser from following
		window.location.href = pdfLink;
	  } 
	  
    }).fail(function(data) { 
		grecaptcha.reset(); 
    });
  }); 
  
})(jQuery); // End of use strict

grecaptcha.ready(function() {
    // do request for recaptcha token
    // response is promise with passed token
        grecaptcha.execute('6LdIJ40UAAAAAD5r686GUdtZCpE4re39JRIZtOfF', {action:'validate_captcha'})
                  .then(function(token) {
            // add token value to form
            document.getElementById('g-recaptcha-response_1').value = token;
        });
		grecaptcha.execute('6LdIJ40UAAAAAD5r686GUdtZCpE4re39JRIZtOfF', {action:'validate_captcha'})
                  .then(function(token) {
            // add token value to form
            document.getElementById('g-recaptcha-response_2').value = token;
        });
    });
 
$(document).ready(function() {

  // Set default `pagecontainer` for all popups (optional, but recommended for screen readers and iOS*)
  $.fn.popup.defaults.pagecontainer = '#page'
}); 
 