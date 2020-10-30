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
          } else {
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
  let isMobileMenuActive = false;
  // MODAL TOGGLE
  $('[data-toggle-modal]').on('click', function (event) {
    event.stopPropagation();
    $('[data-toggle-modal]').not($(this)).removeClass('active');
    $('[data-modal]').not($(this).attr('data-toggle-modal')).removeClass('active');

    closeCatalog();

    $($(this).attr('data-toggle-modal')).toggleClass('active');
    $(this).toggleClass('active');

    if (!$(this).hasClass('active')) {
      $(this).blur();
    }

    if ($($(this).attr('data-toggle-modal')).hasClass('active')) {
      document.addEventListener('click', closeAll);
    }
  });

  const closeModals = function () {
    $('[data-modal]').removeClass('active');
    $('[data-toggle-modal]').removeClass('active');
    $('[data-toggle-modal]').blur();
    $('[data-modal]').find('form').trigger("reset");
    document.removeEventListener('click', closeAll);

    closeCatalog();
  }

  const closeAll = function (evt) {
    if (!evt.target.hasAttribute('data-modal') && evt.target.closest('[data-modal]') === null) {
      closeModals();
    }
  };

  const onCatalogClose = function (evt) {
    if (!evt.target.hasAttribute('data-catalog') && evt.target.closest('[data-catalog]') === null) {
      closeModals();
    }
  };

  // MODAL OPENING
  $('[data-open-modal]').on('click', function () {
    const modal = $($(this).attr('data-open-modal'));
    $('[data-modal]').removeClass('active');
    $('[data-catalog]').removeClass('active');
    modal.addClass('active');
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

    $(this).on('click', function (e) {
      if ($(e.target).is($(this)) && $(this).find('.modal__wrapper').length) {
        closeModal();
      }
    });

    modalCloseBtn.on('click', closeModal);
    $(document).on('keydown', closeModalByEsc);
  });


  // CATALOG
  const catalog = $('[data-catalog]');
  const catalogOpenBtn = $('[data-toggle-catalog]');
  const overlay = $('.overlay');

  const closeCatalogByEsc = (evt) => {
    if (evt.keyCode === 27) {
      closeCatalog();
    }
  };

  function openCatalog(evt) {
    evt.stopPropagation();
    $('[data-toggle-modal]').removeClass('active');
    $('[data-modal]').removeClass('active');
    $('[data-modal]').find('form').trigger("reset");

    catalog.addClass('active');
    overlay.addClass('active');

    document.addEventListener('click', onCatalogClose);
    $(document).on('keydown', closeCatalogByEsc);
  };

  function closeCatalog() {
    catalog.removeClass('active');

    if (!isMobileMenuActive) {
      overlay.removeClass('active');
    }

    catalogOpenBtn.removeClass('active');
    catalogOpenBtn.blur();
    setFirstCatalogItemActive();

    document.removeEventListener('click', onCatalogClose);
    $(document).off('keydown', closeCatalogByEsc);
  };

  catalogOpenBtn.on('click', function (evt) {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      openCatalog(evt);
    }
    if (!$(this).hasClass('active')) {
      closeCatalog();
    }
  });

  //CATALOG_ITEMS
  const catalogItems = catalog.find('[data-catalog-item]');
  const catalogLists = catalogItems.map(function () {
    return $($(this).attr('data-catalog-item'));
  });

  const resetCatalogVisible = function () {
    catalogItems.removeClass('active');
    catalogLists.each(function () {
      $(this).removeClass('active')
    });
  };

  const openCatalogItem = function () {
    const catalogList = $($(this).attr('data-catalog-item'));
    resetCatalogVisible();
    $(this).addClass('active');
    catalogList.addClass('active');
  };

  const setFirstCatalogItemActive = function () {
    resetCatalogVisible();
    const firstCatalogItem = catalog.find('[data-catalog-item]').first();
    firstCatalogItem.addClass('active');
    $(firstCatalogItem.attr('data-catalog-item')).addClass('active');
  };


  catalogItems.each(function () {
    $(this).on('mouseover', openCatalogItem);
    $(this).on('focus', openCatalogItem);
  });

  setFirstCatalogItemActive();


  // MOBILE MENU
  const mobileMenu = $($('[data-open-menu]').attr('data-open-menu'));
  const mobileMenuCloseBtn = mobileMenu.find('.modal__close');

  // MOBILE CATALOG
  const catalogMobile = $('[data-catalog-mobile]');
  const list = catalogMobile.find('> [data-catalog-links]');
  let defaultHeight = 0;
  const categories = list.find('[data-catalog-category]');

  const openMobileMenu = function () {
    isMobileMenuActive = true;
    mobileMenu.addClass('active');
    defaultHeight = list.height();
    overlay.addClass('active');

    overlay.on('click', closeMobileMenu);
    overlay.on('click', closeModals);
  };

  const closeMobileMenu = function () {
    isMobileMenuActive = false;
    mobileMenu.removeClass('active');
    overlay.removeClass('active');

    overlay.off('click', closeMobileMenu);
    overlay.off('click', closeModals);
    resetMobileCatalog();
  };


  $('[data-open-menu]').on('click', openMobileMenu);
  mobileMenuCloseBtn.on('click', closeMobileMenu);


  // MOBILE CATALOG 


  categories.each(function () {
    const openBtn = $(this).find(' > [data-catalog-item]');
    const links = $(this).find(' > [data-catalog-links]');
    const goBackBtn = links.find('> [data-catalog-back] > button');

    openBtn.on('click', function () {
      links.removeClass('hidden');
      links.parent().closest('[data-catalog-links]').addClass('moved-out');

      list.height(links.height());
    });

    goBackBtn.on('click', function () {
      links.addClass('hidden');
      links.parent().closest('[data-catalog-links]').removeClass('moved-out');

      const parentList = links.parent().closest('[data-catalog-links]');

      if (list[0] === parentList[0]) {
        list.height(defaultHeight);
      } else {
        list.height(parentList.height());
      }
    });
  })


  function resetMobileCatalog() {
    categories.each(function () {
      const openBtn = $(this).find(' > [data-catalog-item]');
      const links = $(this).find(' > [data-catalog-links]');
      const goBackBtn = links.find('> [data-catalog-back] > button');

      links.addClass('hidden');
      links.parent().closest('[data-catalog-links]').removeClass('moved-out');
      list.height(defaultHeight);
    })
  }
});
