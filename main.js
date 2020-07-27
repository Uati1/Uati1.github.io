let harr = [1000,3200,4050,5040,5950,7100,8400,9300,10500,11800,12550];
let names = ['.header','.timmy','.bubba','.otto','.trippy','.ronny','.barnet','.aliz','.lula','.blake','.jay'];
let n = 0;
const positions = ()=>{
    const width = $( window ).width()
    const height = 14400*width/3840;
    temp=[];
    harr.forEach((height,index )=>{
        temp[index]= height*width/3840;
    });
    $('.wrapper').height(height);
    $('.fadein').height(height);
    $('.white').height(height);
    $('.colors').height(height);
    harr= temp
}
  (function($) { // Begin jQuery

    $( window ).resize(()=>{
      positions();
  });

    $(function() { // DOM ready

      positions();

      $(window).scroll(function() {
        var view = $(window).scrollTop()+ $( window ).height();
        for(i=n;i<11;i++){
          if(view>=harr[i]){
            $(`${names[i]}`).css('opacity','1');
            n+=1;
          }
        }
      
      });

      // Toggle open and close nav styles on click
      $('#nav-toggle').click(function() {
        $('nav ul').slideToggle();
        $('bg-holder').slideToggle();
      });
      // Hamburger to X toggle
      $('#nav-toggle').on('click', function() {
        this.classList.toggle('active');
      });
      $('.toggler').click(function() {
        $('.navbar').toggleClass('hideNav');
        $('.bg-holder').toggleClass('hideNav');
      });
    }); // end DOM ready
  })(jQuery); // end jQuery