$(document).ready(function (e){
  $('.switcher').click(function (e){
    var $this = $(this);
    if ( $this.parent().hasClass('active') )
      return;
    $('.title-logo, .sequence > .nav > li').removeClass('active');
    $this.parent().addClass('active');
    $('.sequence-body.active').removeClass('active').slideUp(600);
    $('.sequence-body[data-seq="' + $this.attr('data-seq') + '"]').addClass('active').slideDown(600);
  })

  $('.switcher_').click(function (e){
    var $this = $(this);
    if ( $('.sequence > .nav > li > a[data-seq="' + $this.attr('data-seq') + '"]').parent().hasClass('active') )
      return;
    $('.sequence > .nav > li').removeClass('active');
    $('.sequence > .nav > li > a[data-seq="' + $this.attr('data-seq') + '"]').parent().addClass('active');
    $('.sequence-body.active').removeClass('active').slideUp(600);
    $('.sequence-body[data-seq="' + $this.attr('data-seq') + '"]').addClass('active').slideDown(600);
  })
});