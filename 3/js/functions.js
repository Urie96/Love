var gardenCtx,
gardenCanvas,
$garden,
garden,
offsetX,
offsetY;

function heartInit() {
  // $("#soup").remove();
  // $("#mainDiv").show();
  otherInit();
  offsetX = $("#loveHeart").width() / 2;
  offsetY = $("#loveHeart").height() / 2 - 55;
  var together = new Date();
  together.setFullYear(2019, 6, 13);
  together.setHours(23);
  together.setMinutes(45);
  together.setSeconds(0);
  together.setMilliseconds(0);

  if (!document.createElement("canvas").getContext) {
    var msg = document.createElement("div");
    msg.id = "errorMsg";
    msg.innerHTML =
      "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
    document.body.appendChild(msg);
    $("#code").css("display", "none");
    $("#copyright").css("position", "absolute");
    $("#copyright").css("bottom", "10px");
    document.execCommand("stop");
  } else {
    startHeartAnimation();

    timeElapse(together);
    setInterval(function () {
      timeElapse(together);
    }, 500);
    // adjustCodePosition();
    // $("#code").typewriter();
  }
}

function otherInit() {
  var $window = $(window);
  var clientWidth = $(window).width();
  var clientHeight = $(window).height();

  $loveHeart = $("#loveHeart");
  var a = $loveHeart.width() / 2;
  var b = $loveHeart.height() / 2 - 55;
  $garden = $("#garden");
  gardenCanvas = $garden[0];
  gardenCanvas.width = $("#loveHeart").width();
  gardenCanvas.height = $("#loveHeart").height();
  gardenCtx = gardenCanvas.getContext("2d");
  gardenCtx.globalCompositeOperation = "lighter";
  garden = new Garden(gardenCtx, gardenCanvas);
  $("#content").css("width", $loveHeart.width() + $("#code").width());
  $("#content").css(
    "height",
    Math.max($loveHeart.height(), $("#code").height())
  );
  $("#content").css(
    "margin-top",
    Math.max(($window.height() - $("#content").height()) / 2, 10)
  );
  $("#content").css(
    "margin-left",
    Math.max(($window.width() - $("#content").width()) / 2, 10)
  );
  setInterval(function () {
    garden.render();
  }, Garden.options.growSpeed);
  $(window).resize(function () {
    var b = $(window).width();
    var a = $(window).height();
    if (b != clientWidth && a != clientHeight) {
      location.replace(location);
    }
  });
}

function getHeartPoint(c) {
  var b = c / Math.PI;
  var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
  var d =
    -20 *
    (13 * Math.cos(b) -
      5 * Math.cos(2 * b) -
      2 * Math.cos(3 * b) -
      Math.cos(4 * b));
  return new Array(offsetX + a, offsetY + d);
}
function startHeartAnimation() {
  var c = 50;
  var d = 10;
  var b = new Array();
  var a = setInterval(function () {
    var h = getHeartPoint(d);
    var e = true;
    for (var f = 0; f < b.length; f++) {
      var g = b[f];
      var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
      if (j < Garden.options.bloomRadius.max * 1.3) {
        e = false;
        break;
      }
    }
    if (e) {
      b.push(h);
      garden.createRandomBloom(h[0], h[1]);
    }
    if (d >= 30) {
      clearInterval(a);
      showMessages();
    } else {
      d += 0.2;
    }
  }, c);
}
function timeElapse(c) {
  var e = Date();
  var f = (Date.parse(e) - Date.parse(c)) / 1000;
  var g = Math.floor(f / (3600 * 24));
  f = f % (3600 * 24);
  var b = Math.floor(f / 3600);
  if (b < 10) {
    b = "0" + b;
  }
  f = f % 3600;
  var d = Math.floor(f / 60);
  if (d < 10) {
    d = "0" + d;
  }
  f = f % 60;
  if (f < 10) {
    f = "0" + f;
  }
  var a =
    '<span class="digit">' +
    g +
    '</span> days <span class="digit">' +
    b +
    '</span> hours <span class="digit">' +
    d +
    '</span> minutes <span class="digit">' +
    f +
    "</span> seconds";
  $("#elapseClock").html(a);
}
function showMessages() {
  adjustWordsPosition();
  $("#messages").fadeIn(5000, function () {
    showLoveU();
  });
}
function adjustWordsPosition() {
  $("#words").css("position", "absolute");
  $("#words").css("top", $("#garden").position().top + 195);
  $("#words").css("left", $("#garden").position().left + 70);
}
function adjustCodePosition() {
  $("#code").css(
    "margin-top",
    ($("#garden").height() - $("#code").height()) / 2
  );
}
function showLoveU() {
  $("#loveu").fadeIn(2000);
}
