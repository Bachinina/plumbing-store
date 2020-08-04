$('document').ready(function () {
  $('#info-slider').owlCarousel({
    loop: true,
    dots: false,
    items: 1,
    smartSpeed: 800,
  });

  $('.category__slider').owlCarousel({
    loop: true,
    items: 1,
    margin: 30,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      468: {
        items: 2,
        margin: 20
      },
      768: {
        items: 3,
      },
      992: {
        items: 4
      }
    }
  });

})

