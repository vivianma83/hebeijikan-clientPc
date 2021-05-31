(function(e, t, n) {
    function m(t, n) {
        this.wrap = e(t),
        this.timer = null,
        this.ele = this.wrap.children().eq(0),
        this.items = this.ele.children();
        var r = this.items.filter("." + n.className.cur).index();
        this.curIndex = r > -1 ? r : 0,
        this.total = this.items.length,
        this.options = n,
        this.uid = u(),
        this.total > 1 && (this.init(),
        h[this.uid] = {})
    }
    var r = {
        next: function(e, t) {
            return e >= t - 1 ? 0 : e + 1
        },
        prev: function(e, t) {
            return e <= 0 ? t - 1 : e - 1
        }
    }
      , i = function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }
      , s = "page-cur"
      , o = function(e, t) {
        var n = ["", "webkit", "moz", "ms", "o"];
        while (n.length) {
            var r = n.shift()
              , s = r ? r + i(e) : e;
            if (s in t)
                return s
        }
    }
      , u = function() {
        return "u" + (+(new Date)).toString().slice(-4) + Math.random().toString().slice(-6)
    }
      , a = o("transform", document.createElement("div").style)
      , f = o("requestAnimationFrame", t)
      , l = f ? t[f] : function(e) {
        return setTimeout(function() {
            e.call(null, +(new Date))
        }, 100 / 6)
    }
      , c = f ? t[f.replace("request", "cancel").replace("Request", "Cancel")] : function(e) {
        return clearTimeout(e)
    }
      , h = {}
      , p = {
        slow: 600,
        normal: 400,
        fast: 200
    }
      , d = a ? function(e, t, n, r, i, s) {
        var o = n === "horizon" ? "translateX" : "translateY"
          , i = p.hasOwnProperty(i) ? p[i] : i;
        h[e].isAnimated && h[e].fn(),
        h[e].fn = function(n) {
            c(h[e].id),
            h[e] = {},
            s(n),
            t.css(a, o + "(0) translateZ(0)")
        }
        ,
        h[e].isAnimated = !0;
        var u;
        (function f() {
            h[e].id = l(function(n) {
                u || (u = n);
                var s = n - u;
                if (s >= i)
                    typeof h[e].fn == "function" && h[e].fn();
                else {
                    var l = s / i * r
                      , c = r > 0 ? Math.min(l, r) : Math.max(l, r);
                    t.css(a, o + "(" + c + "px) translateZ(0)"),
                    f()
                }
            })
        }
        )()
    }
    : function(e, t, n, r, i, s) {
        var o = n === "horizon" ? "marginLeft" : "marginTop"
          , u = {};
        u[o] = r,
        t.stop(!0, !0).animate(u, i, function() {
            s(),
            u[o] = 0,
            t.css(u)
        })
    }
      , v = a ? function(e, t) {
        h[e].isAnimated && h[e].fn(!0)
    }
    : function(e, t) {
        t.stop(!0, !0)
    }
    ;
    m.prototype.init = function() {
        var t = this.options, n = this.wrap, r = this.ele, i = this.curIndex, o = t.direction, u = this, a, f = this.total, l, c = this.items, h = o === "horizon";
        t.items > 0 ? (l = c,
        this.scrollable = f > t.items) : (l = r,
        this.scrollable = f > 1),
        h ? this.range = l.width() : this.range = l.height(),
        t.items > 0 && this.scrollable && (r.css(h ? "width" : "height", this.range * (t.items + 1)),
        this.prepareItems(),
        this.ele.addClass(t.className.animated));
        if (t.pager) {
            var p = '<div class="slider-pager">';
            for (a = 1; a <= f; a++)
                p += '<a class="page' + (a - 1 === i ? " " + s : "") + '" href="##page-' + a + '" data-page="' + (a - 1) + '">' + a + "</a>";
            p += "</div>",
            e(p).appendTo(n),
            n.on("click", "[data-page]", function(t) {
                t.preventDefault();
                var n = e(this)
                  , r = u.curIndex
                  , i = parseInt(n.data("page"), 10);
                if (r === i)
                    return;
                var s = i > r ? "next" : "prev";
                u.move(s, i)
            })
        }
        this.scrollable && (t.stopOnHover && n.on("mouseenter mouseleave", function(e) {
            var t = e.type.toLowerCase() === "mouseenter" ? "stop" : "start";
            u[t]()
        }),
        t.toggle && (e('<a class="slider-btn slider-btn-prev" href="##prev" data-action="prev"></a><a href="##next" class="slider-btn slider-btn-next" data-action="next"></a>').appendTo(n),
        n.on("click", "[data-action]", function(t) {
            t.preventDefault();
            var n = e(this).data("action");
            if (u.isAnimated())
                return;
            u.move(n)
        })),
        t.autostart && this.scrollable && setTimeout(function() {
            u.start()
        }, t.delay || 0))
    }
    ,
    m.prototype.start = function() {
        var e = this.options
          , t = this;
        return t.stop(),
        t.timer = setTimeout(function() {
            t.move("next", null, function(n) {
                e.autostart && n !== !0 && t.start()
            })
        }, e.interval),
        this
    }
    ,
    m.prototype.prepare = function(e, t, n) {
        var i = this.curIndex
          , s = this.items
          , o = this.total
          , u = this.options
          , a = u.className
          , f = a.prev
          , l = a.next
          , c = a.cur;
        s.filter("." + l).removeClass(l),
        s.filter("." + f).removeClass(f);
        if (e === "before") {
            var h = typeof n == "number" ? n : r[t](i, o)
              , p = h;
            return u.items > 0 && t === "next" && (p = (i + u.items) % o),
            s.eq(p).addClass(a[t]),
            h
        }
        var d = s.eq(i);
        d.addClass(c).siblings("." + c).removeClass(c),
        this.prepareItems()
    }
    ,
    m.prototype.prepareItems = function(t) {
        var n = this.options
          , r = this.curIndex;
        if (n.items > 0 && this.scrollable) {
            var i = n.className
              , s = i.item
              , o = n.direction === "horizon" ? "left" : "top"
              , u = this.range
              , a = {}
              , f = 0
              , l = this.total
              , c = n.items + 1;
            while (r < l && f < c)
                a[r++] = f++;
            if (f < c) {
                var h = 0;
                while (f < c)
                    a[h++] = f++
            }
            this.items.each(function(t) {
                var n = e(this);
                a.hasOwnProperty(t) ? n.css(o, u * a[t]).addClass(s) : n.css(o, "").removeClass(s)
            })
        }
    }
    ,
    m.prototype.isAnimated = function() {
        if (a) {
            var e = h[this.uid];
            return e && e.isAnimated || !1
        }
        return this.ele.is(":animated")
    }
    ,
    m.prototype.move = function(e, t, n) {
        var r = this
          , i = this.ele
          , o = this.uid
          , u = this.options
          , a = this.range
          , f = e === "next" ? -a : a
          , l = r.prepare("before", e, t);
        d(o, i, u.direction, f, u.speed || "normal", function(e) {
            var t = !0;
            r.curIndex = l,
            r.prepare("after"),
            u.pager && r.wrap.find('[data-page="' + l + '"]').addClass(s).siblings("." + s).removeClass(s),
            typeof u.callback == "function" && (t = u.callback.call(r)),
            t !== !1 && typeof n == "function" && n.call(r, e)
        })
    }
    ,
    m.prototype.stop = function() {
        return clearTimeout(this.timer),
        this.timer = null,
        v(this.uid, this.ele),
        this
    }
    ,
    e.fn.slider = function(t) {
        return t = e.extend(!0, {
            interval: 4e3,
            direction: "horizon",
            className: {
                prev: "prev",
                next: "next",
                cur: "current",
                item: "item",
                animated: "animated"
            },
            items: 0
        }, t || {}),
        this.each(function() {
            var n = new m(this,t);
            e(this).data("slider", n)
        })
    }
}
)(jQuery, this);
