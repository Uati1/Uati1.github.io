/*********************
 *	Helpers Code
 ********************/
/**
 *  @function   DOMReady
 *
 *  @param callback
 *  @param element
 *  @param listener
 *  @returns {*}
 *  @constructor
 */
const DOMReady = ((
    callback  = () => {},
    element   = document,
    listener  = 'addEventListener'
  ) => {
    return (element[listener]) ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
  });
  
  /**
   *  @function   ProjectAPI
   *
   *  @type {{hasClass, addClass, removeClass}}
   */
  const ProjectAPI = (() => {
    let hasClass,
        addClass,
        removeClass;
  
    hasClass = ((el, className) => {
      if (el === null) {
        return;
      }
  
      if (el.classList) {
        return el.classList.contains(className);
      }
      else {
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
      }
    });
  
    addClass = ((el, className) => {
      if (el === null) {
        return;
      }
  
      if (el.classList) {
        el.classList.add(className);
      }
      else if (!hasClass(el, className)) {
        el.className += ' ' + className
      }
    });
  
    removeClass = ((el, className) => {
      if (el === null) {
        return;
      }
  
      if (el.classList) {
        el.classList.remove(className);
      }
      else if (hasClass(el, className)) {
        let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
  
        el.className = el.className.replace(reg, ' ');
      }
    });
  
    return {
      hasClass:     hasClass,
      addClass:     addClass,
      removeClass:  removeClass
    };
  })();
  
  
  /*********************
   *	Application Code
   ********************/
  /**
   *  @function   readyFunction
   *
   *  @type {Function}
   */
  const readyFunction = (() => {
  
    const KEY_UP    = 38;
    const KEY_DOWN  = 40;
  
    let scrollingClass          = 'js-scrolling',
        scrollingActiveClass    = scrollingClass + '--active',
        scrollingInactiveClass  = scrollingClass + '--inactive',
  
        scrollingTime           = 1350,
        scrollingIsActive       = false,
  
        currentPage             = 0,
        countOfPages            = document.querySelectorAll('.' + scrollingClass + '__page').length,
  
        prefixPage              = '.' + scrollingClass + '__page-',
  
        _switchPages,
        _scrollingUp,
        _scrollingDown,
  
        _mouseWheelEvent,
        _keyDownEvent,
        _navClickEvent,
  
        init;
  
    /**
     *  @function _switchPages
     *
     *  @private
     */
    
    _switchPages = () => {
  
      let _getPageDomEl;
  
        /**
       *  @function _getPageDomEl
       *
       *  @param page
       *  @returns {Element}
       *  @private
         */
      _getPageDomEl      = (page = currentPage) => {
        return document.querySelector(prefixPage + page);
      };
  
      scrollingIsActive  = true;
  
      currentPage === 2? $('ul li a').css('color','#000'):  $('ul li a').css('color','#efefef');
      currentPage === 1? $('.showcase-title').fadeIn(700):  $('.showcase-title').fadeOut(500);
      currentPage === 1? $('#mouse').fadeIn(700):  $('#mouse').fadeOut(500);


      ProjectAPI.removeClass(
        _getPageDomEl(),
        scrollingInactiveClass
      );
      ProjectAPI.addClass(
        _getPageDomEl(),
        scrollingActiveClass
      );
  
      ProjectAPI.addClass(
        _getPageDomEl(currentPage - 1),
        scrollingInactiveClass
      );
  
      ProjectAPI.removeClass(
        _getPageDomEl(currentPage + 1),
        scrollingActiveClass
      );
  
  
      setTimeout(
        () => {
          return scrollingIsActive = false;
        },
        scrollingTime
      );
    };
      /**
     *  @function _scrollingUp
     *
     *  @private
     */
    _scrollingUp = () => {
      if (currentPage === 1) {
        return;
      }
  
      currentPage--;
  
      _switchPages();
    };
      /**
     *  @function _scrollingDown
     *
     *  @private
     */
    _scrollingDown = () => {
      if (currentPage === countOfPages) {
        return;
      }
  
      currentPage++;
  
      _switchPages();
    };
      /**
     *  @function _mouseWheelEvent
     *
     *  @param e
     *  @private
     */
    _mouseWheelEvent = (e) => {
      if (scrollingIsActive) {
        return;
      }
  
      if (e.wheelDelta > 0 || e.detail < 0) {
        _scrollingUp();
      }
      else if (e.wheelDelta < 0 || e.detail > 0) {
        _scrollingDown();
      }
    };
      /**
     *  @function _keyDownEvent
     *
     *  @param e
     *  @private
     */
    _keyDownEvent = (e) => {
      if (scrollingIsActive) {
        return;
      }
  
      let keyCode = e.keyCode || e.which;
  
      if (keyCode === KEY_UP) {
        _scrollingUp();
      }
      else if (keyCode === KEY_DOWN) {
        _scrollingDown();
      }
    };

    _navClickEvent = (e) => {
      if(e.target.id){
        targetPage = e.target.id;
      diff = currentPage - targetPage;
      if(diff<0){
        for(i=0; i<-diff; i++){
          _scrollingDown();
        }
      }if(diff>0){
        for(i=0; i<diff; i++){
          _scrollingUp();
        }
      }else{
        return;
      }
      }
      
      
    };
  
    /**
     *  @function init
     *
     *  @note     auto-launch
     */
    init = (() => {
      document.addEventListener(
        'mousewheel',
        _mouseWheelEvent,
        false
      );
      document.addEventListener(
        'DOMMouseScroll',
        _mouseWheelEvent,
        false
      );
  
      document.addEventListener(
        'keydown',
        _keyDownEvent,
        false
      );
      $(".navlink").each(()=>{
        this.addEventListener(
          'click',
          _navClickEvent,
          false
        );
      })
    })();
  
  });
  
  
  /**
   *  Launcher
   */
  DOMReady(readyFunction);
  
$(function() {
    $('.toggler').click(function() {
      $('.navbar').toggleClass('hideNav');
      $('.bg-holder').toggleClass('hideNav');
    });
  });

  (function($) { // Begin jQuery
    $(function() { // DOM ready
      // Toggle open and close nav styles on click
      $('#nav-toggle').click(function() {
        $('nav ul').slideToggle();
        $('bg-holder').slideToggle();
      });
      // Hamburger to X toggle
      $('#nav-toggle').on('click', function() {
        this.classList.toggle('active');
      });
      $('.clickable .offer').on('click',()=>{
        $('.toggleBlock').fadeOut(500);
        setTimeout(()=>{
          $('.'+this.activeElement.attributes.target.value).slideDown(500);
        },500)
      });
      $('nav li a').on('click', function(e){
        e.preventDefault();
      });
      //mouse
      function startscroll(){
        $("#mouse").removeClass("hideScrolling");
        $("#mouse").addClass("startScrolling");
      }
    function hidescroll(){
        $("#mouse").removeClass("preScrolling");
        $("#mouse").addClass("hideScrolling");
        setTimeout(startscroll, 200);
      }
      function prescroll(){
        $("#mouse").removeClass("doneScrolling");
        $("#mouse").addClass("preScrolling");
        setTimeout(hidescroll, 200);
      }
    
    function unscroll(){
        $("#mouse").removeClass("scrolling");
        $("#mouse").addClass("doneScrolling");
      setTimeout(prescroll, 300);
      }
      function scroll(){
        $("#mouse").removeClass("startScrolling");
        $("#mouse").addClass("scrolling");
        setTimeout(unscroll, 500);
      }
  
      //begin sequence, read code backwards
      setInterval(scroll, 3000);
      // form
      $.support.placeholder = (function(){
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();

    // Hide labels by default if placeholders are supported
    if($.support.placeholder) {
        $('.form-label').each(function(){
            $(this).addClass('js-hide-label');
        });  

        // Code for adding/removing classes here
        $('.form-group').find('input, textarea').on('keyup blur focus', function(e){
            
            // Cache our selectors
            var $this = $(this),
                $label = $this.parent().find("label");
					
						switch(e.type) {
							case 'keyup': {
								 $label.toggleClass('js-hide-label', $this.val() == '');
							} break;
							case 'blur': {
								if( $this.val() == '' ) {
                    $label.addClass('js-hide-label');
                } else {
                    $label.removeClass('js-hide-label').addClass('js-unhighlight-label');
                }
							} break;
							case 'focus': {
								if( $this.val() !== '' ) {
                    $label.removeClass('js-unhighlight-label');
                }
							} break;
							default: break;
						}
        });
    } 
    var data = {
      subject: $("#subject").val(),
      email: $("#email").val(),
      message: $("#message").val()
  };
  $.ajax({
      type: "POST",
      url: "email.php",
      data: data
  });
    }); // end DOM ready
  })(jQuery); // end jQuery
