document.documentElement.classList.add('js');

(function () {
                var $ = function (id) { return document.getElementById(id) };
                var fmt = function (n) { return "$" + Math.round(n).toLocaleString("en-US") };

                /* scroll reveal */
                var els = [].slice.call(document.querySelectorAll(".reveal"));
                if ("IntersectionObserver" in window) {
                    var io = new IntersectionObserver(function (entries) {
                        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } });
                    }, { threshold: .2 });
                    els.forEach(function (el) { io.observe(el) });
                } else { els.forEach(function (el) { el.classList.add("in") }) }

                /* calculator with count-up */
                var shown = 0, raf;
                function tween(to) {
                    cancelAnimationFrame(raf);
                    var from = shown, t0 = performance.now(), d = 350;
                    (function step(t) {
                        var k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 3);
                        shown = from + (to - from) * e;
                        $("total").textContent = fmt(shown);
                        if (k < 1) raf = requestAnimationFrame(step);
                    })(t0);
                }
                function calc(first) {
                    var c = +$("check").value, p = +$("party").value, x = +$("extra").value;
                    $("checkOut").textContent = "$" + c;
                    $("partyOut").textContent = p;
                    $("extraOut").textContent = x;
                    var month = c * p * x * 4.33;
                    $("year").textContent = "About " + fmt(Math.round(month * 12 / 100) * 100) + " a year";
                    if (first) { shown = month; $("total").textContent = fmt(month) } else { tween(month) }
                    var big = $("total"); big.classList.remove("bump"); void big.offsetWidth; big.classList.add("bump");
                }
                ["check", "party", "extra"].forEach(function (id) { $(id).addEventListener("input", function () { calc(false) }) });
                calc(true);
                $("yr").textContent = new Date().getFullYear();

                /* contact form -> mailto */
                $("contactForm").addEventListener("submit", function (ev) {
                    ev.preventDefault();
                    var body = ["Name: " + $("name").value, "Restaurant: " + $("restaurant").value, "Email: " + $("email").value, "Website/Instagram: " + $("site").value, "", $("msg").value].join("\n");
                    window.location.href = "mailto:hello@tableturnmediatx.com?subject=" + encodeURIComponent("Free audit request: " + $("restaurant").value) + "&body=" + encodeURIComponent(body);
                });
            })();
