$(document).ready(function () {
  const screenWidth = $(window).width();
  const prevBtnContent = `<svg width="9" height="18" viewBox="0 0 9 18" fill="none">
  <path d="M7.85693 16.1429L1.42836 9L7.85693 1.85714" stroke="#ED6B33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  const nextBtnContent = `<svg width="9" height="18" viewBox="0 0 9 18" fill="none">
  <path d="M1.14258 16.1429L7.57115 9L1.14258 1.85714" stroke="#ED6B33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  // DOUBLE SLIDER
  $('[data-double-slider]').each(function () {
    const doubleSlider = $(this);
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
          navText: [prevBtnContent, nextBtnContent],
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
        parentSlider.trigger('to.owl.carousel', currentSlide);
      };

      childSlider.on('click', '.owl-item', function (evt) {
        const currentSlide = $(this).find('[data-slide]').attr('data-slide');
        childSlider.trigger('to.owl.carousel', currentSlide);
      });
    }
  });

  // SIMPLE SLIDER
  $('[data-slider-simple]').each(function () {
    const simpleSlider = $(this);
    simpleSlider.addClass('owl-carousel');
    const isLooped = simpleSlider.attr('data-loop') === 'true';

    // slideCount - количество слайдов, отображаемое на декстопе
    let slideCount = simpleSlider.attr('data-slide-count');
    const slideCountOnMob = simpleSlider.attr('data-slide-sm-count');
    const slideCountOnTabletMD = simpleSlider.attr('data-slide-md-count');
    const slideCountOnTabletLG = simpleSlider.attr('data-slide-lg-count');

    if (screenWidth > 1199) {
      slideCount = slideCount;
    } else if (screenWidth <= 1199 && screenWidth > 991) {
      if (slideCountOnTabletLG !== undefined) {
        slideCount = slideCountOnTabletLG;
      } else {
        slideCount = slideCount > 1 ? slideCount - 1 : slideCount;
      }
    } else if (screenWidth <= 991 && screenWidth > 767) {
      if (slideCountOnTabletMD !== undefined) {
        slideCount = slideCountOnTabletMD;
      } else {
        slideCount = slideCount > 2 ? slideCount - 2 : slideCount;
      }
    } else if (screenWidth <= 767) {
      if (slideCountOnMob !== undefined) {
        slideCount = slideCountOnMob;
      } else {
        slideCount = 1;
      }
    }


    simpleSlider.owlCarousel({
      dots: false,
      loop: isLooped,
      nav: true,
      smartSpeed: 500,
      navText: [prevBtnContent, nextBtnContent],
      items: slideCount,
      mouseDrag: false,

      responsive: {
        0: {
          margin: 0,
        },
        768: {
          margin: 15,
        },
        1200: {
          margin: 20,
        },
      }
    });
  });

  // MINI SLIDER
  $('[data-slider-mini]').each(function () {
    const simpleMini = $(this);
    simpleMini.addClass('owl-carousel');
    simpleMini.owlCarousel({
      dots: false,
      loop: false,
      nav: true,
      smartSpeed: 50,
      margin: 15,
      navText: [prevBtnContent, nextBtnContent],

      responsive: {
        0: {
          items: 2,
          mouseDrag: true,
          touchDrag: true,
        },
        448: {
          items: 3,
        },
        768: {
          items: 1,
        },
        992: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      }
    });
  })

  // MENU LOGO SLIDER
  $('[data-slider-logo]').each(function () {
    $(this).addClass('owl-carousel');
    $(this).owlCarousel({
      dots: false,
      loop: false,
      nav: false,
      smartSpeed: 50,
      margin: 0,

      responsive: {
        992: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      }
    });
  })
});
