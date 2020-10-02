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
  $('[data-modal]').on('click', function () {
    $($(this).attr('data-modal')).addClass('active');
    $($(this).attr('data-modal')).focus();
  });
  // MODAL CLOSING
  (function () {
    const modals = document.querySelectorAll('.modal');
    if (modals.length > 0) {
      modals.forEach((modal) => {
        const modalCloseBtn = modal.querySelector('.modal__close');

        const closeModalByClick = (evt) => {
          if (evt.target === modal) {
            closeModal();
          }
        };

        const closeModalByEsc = (evt) => {
          if (evt.keyCode === 27) {
            closeModal();
          }
        };

        const closeModal = () => {
          modal.classList.remove('active');


          const form = modal.querySelector('form');
          if (form) {
            // CLEAR FORM
            form.reset();
          }
        };

        modal.addEventListener('click', closeModalByClick);
        modalCloseBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', closeModalByEsc);
      });
    }
  })();
});



