$(document).ready(function () {
  const doubleSlider = $('[data-double-slider]');
  const parentSlider = doubleSlider.find('[data-parent-slider]');
  const childSlider = doubleSlider.find('[data-child-slider]');
  const slideCount = doubleSlider.attr('data-slide-count');

  parentSlider.addClass('owl-carousel');
  childSlider.addClass('owl-carousel');
  parentSlider.owlCarousel({
    items: 1,
    dots: false,
    loop: false,
    nav: false,
    smartSpeed: 50,
    animateOut: 'fadeOut',
    mouseDrag: false,
    touchDrag: false,

    responsive: {
      0: {
        dots: true,
        mouseDrag: true,
        touchDrag: true,
      },
      768: {
        dots: false
      },
    }
  });

  if ($(document).width() > 767) {
    childSlider.owlCarousel({
      margin: 10,
      smartSpeed: 300,
      nav: true,
      dots: false,
      loop: true,
      center: true,
      mouseDrag: false,
      navText: ['', ''],
      responsive: {
        768: {
          items: 3,
        },
        1200: {
          items: slideCount <= 5 ? slideCount : 5,
        }
      }
    })
      .on('translated.owl.carousel', syncPosition);


    function syncPosition(evt) {
      const currentSlide = evt.target.querySelector('.owl-item.center [data-slide]').getAttribute('data-slide');

      console.log(evt.target.querySelector('.owl-item.center [data-slide]'))
      parentSlider.trigger('to.owl.carousel', currentSlide);
    };



    childSlider.on('click', '.owl-item', function (evt) {
      const currentSlide = $(this).find('[data-slide]').attr('data-slide');
      childSlider.trigger('to.owl.carousel', currentSlide);
    });
  }
});
