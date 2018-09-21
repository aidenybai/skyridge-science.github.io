document.onkeydown = function(e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
};

let counters = document.getElementsByClassName('number-ticker');

let defaultDigitNode = document.createElement('div');
defaultDigitNode.classList.add('digit');

for (let i = 0; i < 10; i++) {
    defaultDigitNode.innerHTML += i + '<br>';
}

[].forEach.call(counters, function (counter) {
    let currentValue = parseInt(counter.getAttribute('data-value')) || 0;
    let digits = [];

    generateDigits(currentValue.toString().length);
    setValue(currentValue);

    setInterval(function () {
        setValue(Math.floor(Math.random() * 1000000));
    }, 2000);

    function setValue (number) {
        let s = number.toString().split('').reverse().join('');
        let l = s.length;

        if (l > digits.length) {
            generateDigits(l - digits.length);
        }

        for (let i = 0; i < digits.length; i++) {
            setDigit(i, s[i] || 0);
        }
    }

    function setDigit (digitIndex, number) {
        digits[digitIndex].style.marginTop = '-' + number + 'em';
    }

    function generateDigits (amount) {
        for (let i = 0; i < amount; i++) {
            let d = defaultDigitNode.cloneNode(true);
            counter.appendChild(d);
            digits.unshift(d);
        }
    }
});

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
$("body").removeClass("nojs"),
  (window.web = {}),
  (window.web.dataCookies = !1),
  (window.web.dataConsent = !1),
  (window.web.dataTrack = !1),
  (window.web.dataUA = !1),
  document.cookie.split(";").filter(function(a) {
    return a.indexOf("consent=yes") >= 0;
  }).length &&
    ((window.web.dataConsent = !0), $("html").addClass("data-consent")),
  document.cookie.split(";").filter(function(a) {
    return a.indexOf("consent=no") >= 0;
  }).length &&
    ((window.web.dataConsent = !1), $("html").addClass("data-no-consent")),
  navigator &&
    (navigator.cookieEnabled &&
      ((window.web.dataCookies = !0), $("html").addClass("data-cookies")),
    !navigator.doNotTrack &&
      window.web.dataConsent &&
      ((window.web.dataTrack = navigator.userAgent),
      $("html").addClass("data-track")),
    navigator.userAgent && (window.web.dataUA = navigator.userAgent)),
  window.addEventListener("load", webLoad, !1);

document.addEventListener("contextmenu", event => event.preventDefault());
