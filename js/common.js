$(document).ready(function (e){
  /*$('.switcher').click(function (e){
    var $this = $(this);
    if ( $this.parent().hasClass('active') )
      return;
    $('.title-logo, .sequence > .nav > li').removeClass('active');
    $this.parent().addClass('active');
    $('.sequence-body.active').removeClass('active').fadeOut(600);
    $('.sequence-body[data-seq="' + $this.attr('data-seq') + '"]').addClass('active').fadeIn(600);
  })
  */
  $('.switcher_').click(function (e){
    var $this = $(this);
    var tablink = $('.sequence > .nav > li > a[data-seq="' + $this.attr('data-seq') + '"]');
    if ( tablink.parent().hasClass('active') )
      return;
    tablink.tab('show');
  })
});