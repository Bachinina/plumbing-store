// TABS
$('[data-tabs]').each(function () {
  const tabToggles = $(this).find('[data-tabs-toggle]');
  const content = $(`[data-tabs-content='${$(this).attr('data-tabs')}']`);

  let activeTab = 0;

  tabToggles.each(function (i) {
    if ($(this).hasClass('active')) {
      activeTab = i;
    }

    $(this).on('click', function (e) {
      e.preventDefault();

      const tabContent = $(content).find(`[data-tabs-item='${$(this).attr('data-tabs-toggle')}']`);

      // DEL ACTIVE CLASS
      tabToggles.not($(this)).removeClass('active');
      content.find('[data-tabs-item]').removeClass('active');

      // ADD ACTIVE CLASS
      $(this).addClass('active');
      $(tabContent).addClass('active');
    });
  });
  tabToggles[activeTab].click();
});


