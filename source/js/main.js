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


  $('[data-open]').on('mouseover', function () {
    $(this).addClass('opened')
  });
  $('[data-open]').on('mouseout', function () {
    $(this).removeClass('opened')
  });


  // MODAL
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

      const form = $(this).find('form');
      if (form) {
        // CLEAR FORM
        form.trigger("reset");
      }
    };

    $(this).on('click', closeModal)
      .children().click(function(e) {
      return false;
    });
    modalCloseBtn.on('click', closeModal);
    $(document).on('keydown', closeModalByEsc);
  });
});



