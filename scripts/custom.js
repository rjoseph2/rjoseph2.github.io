(function () {

  $(window).scroll(function () {

    var top = $(document).scrollTop();
    if (top > 50)
      $('#home > .navbar').removeClass('navbar-transparent');
    else
      $('#home > .navbar').addClass('navbar-transparent');
  });


  /*append the header menu start */
  var mainMenuCall = function () {
    if ($(".menu-item") != undefined && $(".menu-item").html() != undefined 
    && $(".menu-item").html() != "") {
      $.ajax({
        url: $(".menu-item").html().trim(),
        success: function (result) {
          $(".menu-item").html(result);
        }
      });
    }

  }

  /*append the sub-menu/side menu menu ends */
  var subMenuCall = function () {
    if ($(".menu_place_holder") != undefined  && $(".menu_place_holder").html() != undefined
    && $(".menu_place_holder").html() != "") {
      $.ajax({
        url: $(".menu_place_holder").html().trim(),
        success: function (result) {
          $(".menu_place_holder").replaceWith(result);
          closeNavMenu();
          navarrowClick();
        },
        error: {
          //do nothing
        }
      });
    } else {
      var contentDiv = $(".content-div");
      contentDiv.removeClass('col-lg-9').addClass('col-lg-12');
      var parentDiv = contentDiv.parent();
      parentDiv.parent().removeClass("container-fluid").addClass("container");

    }

  }

  $(document).ready(function () {
    mainMenuCall();
    subMenuCall();
  })

  $("a[href='#']").click(function (e) {
    e.preventDefault();
  });

  $(".nav-arrow").ready(function () {
    
  });

  $(".nav-arrow").ready(function () {
    closeNavMenu();
    navarrowClick();
  });   
  var closeNavMenu = function(){
    $(".navdiv  a").bind("click", function () {
      var link = $(".navdiv a").attr('href')
      if ($(document).width() < 991) {
        $(".navdiv").fadeOut();
      }
    });
  }
  var closeNav = function () {
    $(".navdiv").fadeOut();
  }
  var navarrowClick = function () {
    $(".nav-arrow").bind("click", function () {
      $(".navdiv").fadeIn();
    });
    
  }

})();
