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

    const addListeners = function () {
      if (slideCount <= 5) {
        childSlider.on('click', '.owl-item', function (evt) {
          childSlider.find('.owl-item').removeClass('center');
          $(this).addClass('center');
          const currentSlide = $(this).find('[data-slide]').attr('data-slide');
          parentSlider.trigger('to.owl.carousel', currentSlide);
        });
      } else {
        childSlider.on('click', '.owl-item', function (evt) {
          const currentSlide = $(this).find('[data-slide]').attr('data-slide');
          childSlider.trigger('to.owl.carousel', currentSlide);
        });
      }
    };
    const removeListeners = function () {
      childSlider.off('click');
    };


    const addChildSlider = function () {
      if ($(window).width() > 767) {
        childSlider.owlCarousel({
            margin: 10,
            smartSpeed: 300,
            nav: true,
            dots: false,
            mouseDrag: false,
            navText: [prevBtnContent, nextBtnContent],
            responsive: {
              768: {
                items: 3,
                loop: slideCount <= 3 ? false : true,
                center: slideCount <= 3 ? false : true,
              },
              1200: {
                items: 5,
                loop: slideCount <= 5 ? false : true,
                center: slideCount <= 5 ? false : true,
              }
            }
          })
          .on('translated.owl.carousel', syncPosition);


        function syncPosition(evt) {
          const currentSlide = evt.target.querySelector('.owl-item.center [data-slide]').getAttribute('data-slide');
          parentSlider.trigger('to.owl.carousel', currentSlide);
        };

        if (slideCount <= 5) {
          childSlider.find('.owl-item:first-of-type').addClass('center');
        }
        addListeners();
      } else {
        childSlider.trigger('destroy.owl.carousel');
      }
    };
    addChildSlider();

    let isWindowResizedOnMob = false;
    let isWindowResizedOnTabl = false;
    let isWindowResizedOnTabl2 = false;
    let isWindowResizedOnDesk = false;

    const onWindowResize = function () {
      childSlider.trigger('destroy.owl.carousel');
      parentSlider.trigger('to.owl.carousel', '0');
      removeListeners();
      addChildSlider();
    };

    $(window).on('resize', function () {
      if ($(window).width() > 991 && $(window).width() < 1200) {
        if (!isWindowResizedOnTabl2) {
          isWindowResizedOnTabl = false;
          isWindowResizedOnTabl2 = true;
          isWindowResizedOnMob = false;
          isWindowResizedOnDesk = false;
          onWindowResize();
        }
      } else if ($(window).width() > 767 && $(window).width() < 992) {
        if (!isWindowResizedOnTabl) {
          isWindowResizedOnTabl = true;
          isWindowResizedOnTabl2 = false;
          isWindowResizedOnMob = false;
          isWindowResizedOnDesk = false;
          onWindowResize();
        }
      } else if ($(window).width() > 1199) {
        if (!isWindowResizedOnDesk) {
          isWindowResizedOnTabl = false;
          isWindowResizedOnTabl2 = false;
          isWindowResizedOnMob = false;
          isWindowResizedOnDesk = true;
          onWindowResize();
        }
      } else if ($(window).width() < 768) {
        if (!isWindowResizedOnMob) {
          isWindowResizedOnTabl = false;
          isWindowResizedOnTabl2 = false;
          isWindowResizedOnMob = true;
          isWindowResizedOnDesk = false;
          childSlider.trigger('destroy.owl.carousel');
          parentSlider.trigger('to.owl.carousel', '0');
          removeListeners();
        }
      }
    });
  });

  // SIMPLE SLIDER
  $('[data-slider-simple]').each(function () {
    const simpleSlider = $(this);
    simpleSlider.addClass('owl-carousel');
    const isLooped = simpleSlider.attr('data-loop') === 'true';

    // slideCount - количество слайдов, отображаемое на декстопе
    let slideCount = simpleSlider.attr('data-slide-count');
    const slideCountOnMob = simpleSlider.attr('data-slide-sm-count');
    const slideCountOnMobX = simpleSlider.attr('data-slide-smx-count');
    const slideCountOnTabletMD = simpleSlider.attr('data-slide-md-count');
    const slideCountOnTabletLG = simpleSlider.attr('data-slide-lg-count');


    simpleSlider.owlCarousel({
      dots: false,
      loop: isLooped,
      nav: true,
      smartSpeed: 500,
      navText: [prevBtnContent, nextBtnContent],
      mouseDrag: false,
      items: slideCount,
      responsive: {
        0: {
          margin: 0,
          items: slideCountOnMob ?
            slideCountOnMob : 1,
        },
        576: {
          margin: 0,
          items: slideCountOnMobX ?
            slideCountOnMobX : slideCountOnMob ?
            slideCountOnMob : 1,
        },
        768: {
          margin: 15,
          items: slideCountOnTabletMD ?
            slideCountOnTabletMD : slideCount > 2 ? slideCount - 2 : slideCount,
        },
        992: {
          margin: 15,
          items: slideCountOnTabletLG ?
            slideCountOnTabletLG : slideCount > 1 ? slideCount - 1 : slideCount,
        },
        1200: {
          margin: 20,
          items: slideCount,
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
  });
});
