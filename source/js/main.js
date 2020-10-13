$(document).ready(function () {
  // TABS
  $('[data-tabs]').each(function () {
    const tabToggles = $(this).children('[data-tabs-toggle]');
    const content = $(`[data-tabs-content='${$(this).attr('data-tabs')}']`);
    const isCollapsed = $(this).attr('data-tabs-collapse') === 'true';
    let activeTab = 0;

    tabToggles.each(function (i) {
      if ($(this).hasClass('active')) {
        activeTab = i;
      }

      $(this).on('click', function (e) {
        e.preventDefault();

        const tabContent = $(content).children(`[data-tabs-item='${$(this).attr('data-tabs-toggle')}']`);


        // IF IS COLLAPSED
        if (isCollapsed) {
          const parent = $(this).closest('[data-tabs]');

          if ($(this).hasClass('active') && $(document).width() <= 767) {
            if (parent.hasClass('opened')) {
              parent.removeClass('opened');
            } else {
              parent.addClass('opened');
            }
          }
          else {
            parent.removeClass('opened');
          }
        }

        // DEL ACTIVE CLASS
        tabToggles.not($(this)).removeClass('active');
        content.children('[data-tabs-item]').removeClass('active');

        // ADD ACTIVE CLASS
        $(this).addClass('active');
        $(tabContent).addClass('active');
      });
    });

    tabToggles[activeTab].click();

    if (isCollapsed && $(document).width() <= 767 && activeTab !== 0) {
      tabToggles[activeTab].click();
    }
  });


  // MODAL
  // MODAL TOGGLE
  $('[data-toggle-modal]').on('click', function (event) {
    event.stopPropagation();
    $('[data-toggle-modal]').not($(this)).removeClass('active');
    $('[data-modal]').not($(this).attr('data-toggle-modal')).removeClass('active');
    
    $($(this).attr('data-toggle-modal')).toggleClass('active');
    $(this).toggleClass('active');

    if(!$(this).hasClass('active')) {
      $(this).blur();
    }

    if($($(this).attr('data-toggle-modal')).hasClass('active')) {
      document.addEventListener('click', closeAll);
    }
  });

  const closeAll = function (evt) {
    if(!evt.target.hasAttribute('data-modal') && evt.target.closest('[data-modal]') === null) {
    $('[data-modal]').removeClass('active');
    $('[data-toggle-modal]').removeClass('active');
    $('[data-toggle-modal]').blur();
    $('[data-modal]').find('form').trigger("reset");
    document.removeEventListener('click', closeAll);
    }
  }

  // MODAL OPENING
  $('[data-open-modal]').on('click', function () {
    $('[data-modal]').removeClass('active');
    $($(this).attr('data-open-modal')).addClass('active');
  });

  // MODAL CLOSING
  const modals = $('[data-modal]');
  modals.each(function () {
    const modalCloseBtn = $(this).find('.modal__close');


    const closeModalByEsc = (evt) => {
      if (evt.keyCode === 27) {
        closeModal();
      }
    };

    const closeModal = () => {
      $(this).removeClass('active');
      $('[data-toggle-modal]').removeClass('active');
      $('[data-toggle-modal]').blur();

      const form = $(this).find('form');
      if (form) {
        // CLEAR FORM
        form.trigger("reset");
      }
      document.removeEventListener('click', closeAll);
    };

    $(this).on('click', function(e) {
      if($(e.target).is($(this)) && $(this).find('.modal__wrapper').length) {
        closeModal();
      }
    });

    modalCloseBtn.on('click', closeModal);
    $(document).on('keydown', closeModalByEsc);
  });
});



