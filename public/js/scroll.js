$(document).ready(function() {
  // Scroll Reveal Initialization
  window.sr = ScrollReveal();

  // Search Message
  sr.reveal('#info', {
    origin: 'bottom',
    duration: 2000,
    distance: '200px'
  })

  // split-text animation
  sr.reveal('.split-head', {
    origin: 'left',
    duration: 2000,
    distance: '400px'
  })

  sr.reveal('.split-tail', {
    origin: 'right',
    duration: 2000,
    distance: '400px'
  })

  // Feature
  sr.reveal('#feature .card', {
    origin: 'left',
    duration: 2000,
    distance: '800px',
    rotate: { x: 100, y: 100, z: 100 },
    viewFactor: 0.4
  })

  // Popular Places
  sr.reveal('#popular-place .card', {
    origin: 'right',
    duration: 2000,
    distance: '800px',
    rotate: { x: 100, y: 100, z: 100 },
    delay: 500,
    viewFactor: 0.4
  })

  // Popular Places Button
  sr.reveal('#popular-place .btn', {
    origin: 'bottom',
    duration: 1000,
    distance: '100px',
    delay: 1000
  })

  // Social Media Section
  sr.reveal('#social-media h3', {
    origin: 'bottom',
    duration: 1000,
    distance: '800px',
    delay: 1000
  })

  sr.reveal('#social-media p', {
    origin: 'bottom',
    duration: 1000,
    distance: '800px',
    delay: 1200
  })

  sr.reveal('.social-logo', {
    duration: 1000,
    delay: 2000,
    rotate: {x: 100, y:0, z:0}
  })
  // End of Social Media Section

  sr.reveal('#contact-details', {
    origin: 'left',
    duration: 2000,
    distance: '400px',
    viewFactor: 0.4
  })

  sr.reveal('#contact-form', {
    origin: 'right',
    duration: 2000,
    distance: '400px',
    viewFactor: 0.4
  })

  // Gallery
  sr.reveal('.materialboxed', {
    rotate: {x:0, y:-100, z: 0},
    delay: 1000,
    duration: 2000,
    viewFactor: 0.2
  })

  // footer
  sr.reveal('footer', {
    origin: 'bottom',
    distance: '800px',
    duration: 2000
  })
});