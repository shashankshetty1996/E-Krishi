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

  // Search items
  $("input.autocomplete").autocomplete({
    data: {
      Udupi: null,
      Mangalore: null,
      Bangalore: "https://placehold.it/250x250"
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    minLength: 1 // The minimum length of the input for the autocomplete to start. Default: 1.
  });

  // Material Box
  $('.materialboxed').materialbox();
});