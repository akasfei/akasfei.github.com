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
  });
  $('.sequence').click(function (e){
    if ( $(this).hasClass('active') || $(this).hasClass('zoomed'))
      return;
    $('.sequence, .seq-node.active').removeClass('active');
    $('.sequence').removeClass('zoomed');
    $(this).addClass('active');
  });
  $('.sequence').on('click', '.seq-node', function (e){
    var $this = $(this);
    var $seq = $(this).parents('.sequence.active, .sequence.zoomed');
    $seq.removeClass('active');
    $seq.addClass('zoomed');
    
    if ( $this.hasClass('active') ) {
      $seq.removeClass('zoomed');
      $seq.addClass('active');
      return $this.removeClass('active');
    }
    $('.sequence.zoomed .seq-node').removeClass('active');
    $this.addClass('active');
  }); 
});