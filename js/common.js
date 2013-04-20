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
  var marginLeft = parseInt($('.container').css('margin-left'));

  $('.switcher_').click(function (e){
    var $this = $(this);
    var tablink = $('.sequence > .nav > li > a[data-seq="' + $this.attr('data-seq') + '"]');
    if ( tablink.parent().hasClass('active') )
      return;
    tablink.tab('show');
  });


  /* a sequence or its nodes are clicked */
  $('.sequence').on('click', '.seq-node', function (e){
    var $this = $(this);
    var $seq = $(this).parents('.sequence');
    var $group = $(this).parents('.seq-group');
    var index = $seq.index('.sequence');
    var offset = marginLeft - index*24;
    $('.container').removeClass('default');
    $('.container').css('margin-left', offset + 'px');
    if ( !($seq.hasClass('active') || $seq.hasClass('zoomed')) ) {
      $('.sequence, .seq-node.active').removeClass('active');
      $('.sequence').removeClass('zoomed');
      $seq.addClass('active');
      $('.seq-group').removeClass('active').removeClass('zoomed');
      $group.addClass('zoomed');
      return;
    }
    $seq.removeClass('active');
    $seq.addClass('zoomed');
    if ( $this.hasClass('active') ) {
      if (! $(e.target).hasClass('seq-node'))
        return;
      $seq.removeClass('zoomed');
      $seq.addClass('active');
      return $this.removeClass('active');
    }
    $('.sequence.zoomed .seq-node').removeClass('active');
    $this.addClass('active');
  }); 

  /* a sequence group is clicked */
  $('.seq-group').on('click', '.seq-group, *:not(.seq-node-content, .seq-node-content > *)',function (e){
    var $this = $(this).parents('.seq-group');
    if ( $this.hasClass('active') || $this.hasClass('zoomed') )
      return;
    $('.seq-group').removeClass('active').removeClass('zoomed');
    $('.container').addClass('default');
    $this.addClass('active');
  });

  $('.seq-indicator, .seq-grouptitle').click(function (e) {
    $group = $(this).parents('.seq-group');
    $('.seq-group .sequence.active, .seq-group .seq-node.active').removeClass('active');
    $('.seq-group.zoomed, .seq-group .sequence.zoomed').removeClass('zoomed');
  });

  /* Clicking title links */
  $('.title-link').click(function (e) {
    var target = $(this).attr('data-target');
    $(target).click();
  });

  /* keyboard controls */
  $('html').keydown(function (e) {
    var $this = $('.active');
    var $target = null;
    if ($this.hasClass('seq-node')) {
      switch (e.which){
        case 8:
        case 13:
        case 32:
          $target = $this;
          break;
        case 37:
          $target = $this.parents('.sequence').prev('.sequence');
          if ($target.length < 1)
            $target = $this.parents('.seq-group').prev('.seq-group').find('.sequence:last-child');
          break;
        case 38:
          $target = $this.prev('.seq-node');
          break;
        case 39:
          $target = $this.parents('.sequence').next('.sequence');
          if ($target.length < 1)
            $target = $this.parents('.seq-group').next('.seq-group').find('.sequence:first-child');
          break;
        case 40:
          $target = $this.next('.seq-node');
          break;
      }
    } else if ($this.hasClass('sequence')) {
      switch (e.which) {
        case 8:
          $target = $this.parents('.seq-group');
          break;
        case 13:
        case 32:
          $target = $this.find('.seq-node:first-child');
          break;
        case 37:
          $target = $this.prev('.sequence');
          if ($target.length < 1)
            $target = $this.parents('.seq-group').prev('.seq-group').find('.sequence:last-child');
          break;
        case 38:
          $target = $this.find('.seq-node:last-child');
          break;
        case 39:
          $target = $this.next('.sequence');
          if ($target.length < 1)
            $target = $this.parents('.seq-group').next('.seq-group').find('.sequence:first-child');
          break;
        case 40:
          $target = $this.find('.seq-node:first-child');
          break;
      }
    } else if ($this.hasClass('seq-group')) {
      switch (e.which) {
        case 13:
        case 32:
          $target = $this.find('.sequence:first-child');
          break;
        case 37:
          $target = $this.prev('.seq-group');
          break;
        case 39:
          $target = $this.next('.seq-group');
          break;
      }
    } else if (e.which == 8 || e.which == 13)
      $target = $('.seq-group:first-child');
    if ($target && $target.length > 0) {
      if ($target.hasClass('sequence'))
        $target = $target.find('.seq-node:first-child');
      if ($target.hasClass('seq-group'))
        $target = $target.find('.seq-grouptitle');
      $target.trigger('click');
    }
  });
});