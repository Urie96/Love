(function (a) {
  a.fn.typewriter = function (callback) {
    var d = a(this),
      c = d.html(),
      b = 0;
    d.html("");
    d.show();
    var interval = () => {
      var f = c.substr(b, 1);
      if (/^[\u3002|\uff1f|\uff01|\uff0c]$/.test(f)) {
        b++;
        d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
        if (b < c.length) {
          setTimeout(interval, 500);
        }
        return this;
      }
      if (f == "<") {
        b = c.indexOf(">", b) + 1;
      } else {
        b++;
      }
      d.html(c.substring(0, b) + (b & 1 && b < c.length ? "_" : ""));
      if (b < c.length) {
        setTimeout(interval, 100);
      } else {
        callback();
      }
    };
    interval();
    return this;
  };
  a.fn.typewriterWithCount = function (cnt, callback) {
    var d = a(this),
      c = d.html(),
      b = 0,
      count = 0;
    d.html("");
    d.show();
    var interval = () => {
      var f = c.substr(b, 1);
      if (/^[\u4e00-\u9fa5A-Za-z0-9]$/.test(f)) {
        count++;
        cnt.text("正文字数：" + count);
      } else if (/^[\u3002|\uff1f|\uff01|\uff0c]$/.test(f)) {
        b++;
        d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
        if (b < c.length) {
          setTimeout(interval, 500);
        }
        return this;
      }
      if (f == "<") {
        b = c.indexOf(">", b) + 1;
      } else {
        b++;
      }
      d.html(c.substring(0, b) + (b & 1 && b < c.length ? "_" : ""));
      if (b < c.length) {
        setTimeout(interval, 100);
      } else {
        callback();
      }
    };
    interval();
    return this;
  };
})(jQuery);
