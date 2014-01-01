var adjustPosition = function($active) {
  var $seq = $active.parents('.sequence');
  var $group = $active.parents('.seq-group');
  var seqPosition = $seq.offset().left;
  var anchorPosition = $('.offset-anchor').offset().left;
  var offset = anchorPosition - seqPosition;
  $('.seg-container').css('margin-left', offset + 'px');
}

$(document).ready(function (e){
  
  // var marginLeft = parseInt($('.container').css('margin-left'), 10);

  $('.title-logo').click(function (e) {
    $('#trigger-firstgroup').click();
    $('.img-container').addClass('active');
  });

  /* Deactivate the header */
  $('.deactivate-header').click(function (e){
    $('.img-container.active').removeClass('active');
  });
  $('.container').click(function (e){
    $('.img-container.active').removeClass('active');
  });

  /* a sequence or its nodes are clicked */
  $('.sequence').on('click', '.seq-node', function (e){
    if (! $(e.target).hasClass('seq-node'))
        return;
    var $this = $(this);
    var $seq = $(this).parents('.sequence');
    var $group = $(this).parents('.seq-group');
    setTimeout(function () { adjustPosition($this); }, 20);
    if ( !($seq.hasClass('active') || $seq.hasClass('zoomed')) ) {
      $('.sequence, .seq-node.active').removeClass('active');
      $('.sequence').removeClass('zoomed');
      $seq.addClass('active');
      $('.seq-group').removeClass('active').removeClass('zoomed');
      $group.addClass('zoomed');
      $('.key-hint-container > [class^="hint-"]').removeClass('active');
      $('.key-hint-container > .hint-seq').addClass('active');
      return;
    }
    $seq.removeClass('active');
    $seq.addClass('zoomed');
    if ( $this.hasClass('active') ) {
      $seq.removeClass('zoomed');
      $seq.addClass('active');
      $('.key-hint-container > [class^="hint-"]').removeClass('active');
      $('.key-hint-container > .hint-seq').addClass('active');
      return $this.removeClass('active');
    }
    var nodeIndex = $seq.find('.seq-node').index($this);
    $this.children('.seq-node-content').css('top', -100 - 24*nodeIndex + 'px');
    $('.key-hint-container > [class^="hint-"]').removeClass('active');
    $('.key-hint-container > .hint-node').addClass('active');
    $('.sequence.zoomed .seq-node').removeClass('active');
    $this.addClass('active');
  }); 

  /* a sequence group is clicked */
  $('.seq-group').on('click',function (e){
    var $this = $(this);
    if ( $this.hasClass('active') || $this.hasClass('zoomed') || $(e.target).hasClass('anchor-link') )
      return;
    $('.seq-group').removeClass('active').removeClass('zoomed');
    $('.container').addClass('default');
    $this.addClass('active');
    $('.key-hint-container > [class^="hint-"]').removeClass('active');
    $('.key-hint-container > .hint-group').addClass('active');
    $('.seg-container').attr('style', '');
  });

  $('.seq-indicator, .seq-grouptitle').click(function (e) {
    $group = $(this).parents('.seq-group');
    $('.seq-group .sequence.active, .seq-group .seq-node.active').removeClass('active');
    $('.seq-group.zoomed, .seq-group .sequence.zoomed').removeClass('zoomed');
  });

  /* Clicking title links */
  $('.anchor-link').click(function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $(target).trigger('click');
  });

  /* keyboard controls */
  $(document).keydown(function (e) {
    var $this = $('.active');
    var $target = null;
    var doPrevent = false;
    if (event.keyCode === 8) {
      var d = event.srcElement || event.target;
      if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD')) || d.tagName.toUpperCase() === 'TEXTAREA') {
        doPrevent = d.readOnly || d.disabled;
      }
      else {
        doPrevent = true;
      }
    }
    if (doPrevent) {
      event.preventDefault();
    }
    if ($this.hasClass('seq-node')) {
      switch (e.which){
        case 8:
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