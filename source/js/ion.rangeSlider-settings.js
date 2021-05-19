$(document).ready(function () {

  $('[data-range-slider-wrap]').each(function () {
    const min = $(this).find('[data-range-min]');
    const max = $(this).find('[data-range-max]');
    const slider = $(this).find('[data-range-slider]');

    slider.ionRangeSlider({
      onStart: function (data) {
        min.val(data.from);
        max.val(data.to);
      },
      onChange: function (data) {
        min.val(data.from);
        max.val(data.to);
      }
    });
  });
});
