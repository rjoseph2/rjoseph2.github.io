(function(){

    $(window).scroll(function () {
     
        var top = $(document).scrollTop();
        if(top > 50)
          $('#home > .navbar').removeClass('navbar-transparent');
        else
          $('#home > .navbar').addClass('navbar-transparent');
    });
    
   

    var menuCall = function() {
      //alert("hi risro");
      
        $.ajax({
          url: $(".menu-item").html().trim(), 
          success: function(result){
            $(".menu-item").html(result);
            //e.preventDefault();
          }
      }); 
    }
    $(document).ready(function(){
      //if($("body").is("#home") && !$("body").is("#page")){
      //$(document).onload(menuCall())
      menuCall();
      //}
    })
  
    $("a[href='#']").click(function(e) {
      e.preventDefault();
    });
  
    var $button = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>").click(function(){
      var html = $(this).parent().html();
      html = cleanSource(html);
      $("#source-modal pre").text(html);
      $("#source-modal").modal();
    });
  
    $('.bs-component [data-toggle="popover"]').popover();
    $('.bs-component [data-toggle="tooltip"]').tooltip();
  
    $(".bs-component").hover(function(){
      $(this).append($button);
      $button.show();
    }, function(){
      $button.hide();
    });
  
    function cleanSource(html) {
      html = html.replace(/×/g, "&times;")
                 .replace(/«/g, "&laquo;")
                 .replace(/»/g, "&raquo;")
                 .replace(/←/g, "&larr;")
                 .replace(/→/g, "&rarr;");
  
      var lines = html.split(/\n/);
  
      lines.shift();
      lines.splice(-1, 1);
  
      var indentSize = lines[0].length - lines[0].trim().length,
          re = new RegExp(" {" + indentSize + "}");
  
      lines = lines.map(function(line){
        if (line.match(re)) {
          line = line.substring(indentSize);
        }
  
        return line;
      });
  
      lines = lines.join("\n");
  
      return lines;
    }

    $(".nav-arrow").ready(function(){
      $(".nav-arrow").bind("click",function() {
        navarrowClick();
      });
    });

    $(".nav-arrow").ready(function(){
      $(".navdiv  a").bind("click", function(){
        var link = $(".navdiv a").attr('href')
        if($( document ).width() < 991){
          $(".navdiv").fadeOut();
        }
        
        //$(".navdiv").removeClass( 'fadeOutRight' ).show().addClass( 'fadeInRight' )
      });
    });

    var closeNav = function(){
      $(".navdiv").fadeOut();
    }
    var navarrowClick = function(){
      $(".navdiv").fadeIn();
    }

  
  })();
  