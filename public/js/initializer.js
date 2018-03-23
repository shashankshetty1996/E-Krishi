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
});