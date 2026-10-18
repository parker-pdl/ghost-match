/* Parker Data Link donate banner — drop into any free app:
     <script src="pdl-donate.js" defer></script>               (bar at the top of the page)
     <script src="pdl-donate.js" data-mode="float" defer></script>  (games: floats over the top, with a close button)
   Hidden inside Android store builds (Capacitor or Trusted Web Activity):
   Google Play requires its own billing for tips to the developer. */
(function () {
  "use strict";
  var me = document.currentScript, mode = (me && me.getAttribute("data-mode")) || "inline";
  var C = window.Capacitor;
  if (C && C.isNativePlatform && C.isNativePlatform()) return;
  // Amazon (Fire TV / Fire tablets) and smart TVs: Amazon is a paid channel and
  // TV apps can't open a donate page, so no banner there.
  if (/AFT[A-Z]|Silk\/|AmazonWebAppPlatform|KF[A-Z]{2,4} Build|Web0S|webOS|Tizen|SMART-TV|SmartTV|BRAVIA|Roku|CrKey|GoogleTV|Android TV/i.test(navigator.userAgent || "")) return;
  if (/^android-app:\/\//.test(document.referrer || "")) { try { sessionStorage.setItem("pdlTwa", "1"); } catch (e) {} return; }
  try { if (sessionStorage.getItem("pdlTwa") === "1") return; } catch (e) {}
  try { if (mode === "float" && sessionStorage.getItem("pdlDonateClosed") === "1") return; } catch (e) {}

  function build() {
    if (document.getElementById("pdl-donate")) return;
    var css = document.createElement("style");
    css.textContent =
      "#pdl-donate{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;text-align:center;" +
      "padding:10px 44px 10px 14px;background:linear-gradient(90deg,#3b0d5c,#0d3b2a);color:#fff;font:600 16px/1.35 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;" +
      "border-bottom:2px solid #39ff14;box-sizing:border-box;width:100%;position:relative;z-index:2147483000}" +
      "#pdl-donate.float{position:fixed;top:0;left:0;right:0;box-shadow:0 4px 18px rgba(0,0,0,.5)}" +
      "#pdl-donate a{display:inline-block;background:#39ff14;color:#12021f;font-weight:900;font-size:17px;text-decoration:none;" +
      "padding:8px 22px;border-radius:999px;box-shadow:0 0 14px rgba(57,255,20,.55)}" +
      "#pdl-donate a:hover{filter:brightness(1.1)}" +
      "#pdl-donate button{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:transparent;border:0;color:#fff;" +
      "font-size:24px;line-height:1;cursor:pointer;padding:6px 8px;opacity:.8}";
    document.head.appendChild(css);
    var d = document.createElement("div");
    d.id = "pdl-donate";
    if (mode === "float") d.className = "float";
    d.innerHTML = "<span>A lot of this software is free. Help us keep it that way.</span>" +
      '<a href="https://parkerdatalink.com/donations" target="_blank" rel="noopener">❤ Donate</a>' +
      (mode === "float" ? '<button type="button" aria-label="Close">×</button>' : "");
    document.body.insertBefore(d, document.body.firstChild);
    var x = d.querySelector("button");
    if (x) x.addEventListener("click", function () { d.remove(); try { sessionStorage.setItem("pdlDonateClosed", "1"); } catch (e) {} });
  }
  if (document.body) build(); else document.addEventListener("DOMContentLoaded", build);
})();
