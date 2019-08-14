$(document).ready(function() {
  $("a").on("click", function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function() {
          window.location.hash = hash;
        }
      );
    }
  });
});

function webLoad() {
  function a() {
    $(window).scrollTop() >= 50
      ? e.addClass("scrolled")
      : e.removeClass("scrolled");
    $(window).scrollTop() >= 50
      ? e.addClass("scrolled")
      : e.removeClass("scrolled");
  }

  var t = $(".navbar-toggler"),
    o = null;
  $("#main-header").on("click", t, function(a) {
    if (
      ((o = $(a.target)),
      $("body").removeClass("mainmenu-open"),
      o.hasClass("collapsed"))
    )
      return $("body").addClass("mainmenu-open");
  }),
    $("body").on("click", "#headerMask", function(a) {
      a.preventDefault(),
        o.click(),
        $("#main-header .collapse").collapse("hide");
    });
  new ScrollTrigger({
    toggle: {
      visible: "scroll-show",
      hidden: "scroll-hide"
    },
    once: !1
  });
  var e = $("#main-header-inner");
  var e = $("#main-header-inner");
  a(),
    $(window).scroll(a),
    $(document).on("click", "[data-toggle='lightbox']", function(a) {
      a.preventDefault(), $(this).ekkoLightbox();
    });
}

window.addEventListener("load", webLoad, !1);
