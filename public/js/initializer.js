$(document).ready(function() {
  // Scroll effect
  $(".scrollspy").scrollSpy();

  // Side Navigation Bar
  $(".button-collapse").sideNav({
    closeOnClick: true
  });

  // Home slider
  $(".slider").slider();

  // Modal Box
  $('.modal').modal();

  // select drop down
  $('select').material_select();

  // Material Box
  $('.materialboxed').materialbox();

  // Custom active classes for navbar
  $('ul.menu li').click(function(){
    $('li').removeClass("active");
    $(this).addClass("active");
  });
  // fixed brand logo active class bug
  $('.brand-logo').click(function(){
    $('ul.menu li').removeClass("active");
    $('ul.menu li:first-child').addClass("active");
  });
});