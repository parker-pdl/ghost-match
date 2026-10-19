/* Parker Data Link donate banner — drop into any free app:
     <script src="pdl-donate.js" defer></script>               (bar at the top of the page)
     <script src="pdl-donate.js" data-mode="float" defer></script>  (games: thin bar, then a small corner pill)
   Hidden inside Android phone store builds (Capacitor or Trusted Web Activity):
   Google Play requires its own billing for tips to the developer.
   On TVs and Fire devices it shows a QR code card for 20 seconds instead. */
(function () {
  "use strict";
  var me = document.currentScript, mode = (me && me.getAttribute("data-mode")) || "inline";
  var C = window.Capacitor;
  if (C && C.isNativePlatform && C.isNativePlatform()) return;
  // Smart TVs (not Amazon, not Roku): a remote can't open a web page, so
  // show a QR code card instead ("scan with your phone"), once per visit.
  var AMAZON = /AFT[A-Z]|Silk\/|AmazonWebAppPlatform|KF[A-Z]{2,4} Build/i.test(navigator.userAgent || "");
  if (AMAZON) return;   // Amazon (Fire TV, Fire tablets): no donate ask, by Parker's choice
  var TV = /AFT[A-Z]|Silk\/|AmazonWebAppPlatform|KF[A-Z]{2,4} Build|Web0S|webOS|Tizen|SMART-TV|SmartTV|BRAVIA|Roku|CrKey|GoogleTV|Android TV/i.test(navigator.userAgent || "");
  if (TV) { try { if (sessionStorage.getItem("pdlTvCard") === "1") return; sessionStorage.setItem("pdlTvCard", "1"); } catch (e) {} }
  // Google Play builds (incl. Android TV): never ask for money outside Play billing.
  if (!AMAZON && /^android-app:\/\//.test(document.referrer || "")) { try { sessionStorage.setItem("pdlTwa", "1"); } catch (e) {} return; }
  try { if (sessionStorage.getItem("pdlTwa") === "1") return; } catch (e) {}

  var QR = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2733%27%20height%3D%2733%27%20class%3D%27segno%27%3E%3Cpath%20fill%3D%27%23fff%27%20d%3D%27M0%200h33v33h-33z%27%2F%3E%3Cpath%20class%3D%27qrline%27%20stroke%3D%27%23000%27%20d%3D%27M2%202.5h7m2%200h1m4%200h1m1%200h5m1%200h7m-29%201h1m5%200h1m5%200h1m2%200h1m2%200h1m1%200h1m1%200h1m5%200h1m-29%201h1m1%200h3m1%200h1m2%200h1m5%200h5m2%200h1m1%200h3m1%200h1m-29%201h1m1%200h3m1%200h1m2%200h2m1%200h2m1%200h2m1%200h1m3%200h1m1%200h3m1%200h1m-29%201h1m1%200h3m1%200h1m2%200h1m4%200h3m1%200h1m3%200h1m1%200h3m1%200h1m-29%201h1m5%200h1m1%200h3m1%200h1m2%200h1m1%200h1m1%200h2m1%200h1m5%200h1m-29%201h7m1%200h1m1%200h1m1%200h1m1%200h1m1%200h1m1%200h1m1%200h1m1%200h7m-18%201h3m3%200h4m-21%201h1m2%200h1m1%200h2m1%200h2m1%200h2m1%200h3m2%200h1m1%200h1m1%200h1m-24%201h2m1%200h2m2%200h5m1%200h1m2%200h1m3%200h3m2%200h1m2%200h1m-28%201h1m4%200h1m2%200h1m1%200h4m1%200h2m1%200h1m1%200h1m1%200h1m1%200h3m-27%201h3m6%200h1m1%200h2m2%200h1m1%200h3m3%200h1m1%200h2m-26%201h3m1%200h2m2%200h3m1%200h4m1%200h4m2%200h1m1%200h2m-29%201h2m1%200h1m1%200h1m1%200h2m1%200h1m1%200h3m4%200h2m-20%201h3m2%200h2m3%200h4m2%200h1m4%200h2m1%200h4m-28%201h2m4%200h2m1%200h3m2%200h1m1%200h7m1%200h1m1%200h1m-28%201h2m1%200h1m2%200h5m1%200h2m1%200h1m1%200h2m1%200h2m1%200h1m3%200h1m-27%201h2m1%200h2m1%200h1m4%200h3m1%200h2m3%200h3m1%200h1m2%200h1m-29%201h1m2%200h2m1%200h3m5%200h1m1%200h2m3%200h4m2%200h2m-27%201h1m1%200h1m2%200h1m1%200h1m1%200h2m1%200h2m1%200h2m2%200h3m3%200h2m-29%201h1m1%200h2m1%200h2m1%200h1m1%200h2m8%200h5m1%200h1m-19%201h2m2%200h1m1%200h1m1%200h2m1%200h2m3%200h1m1%200h3m-29%201h7m2%200h2m1%200h1m3%200h1m3%200h1m1%200h1m1%200h1m2%200h1m-28%201h1m5%200h1m1%200h3m1%200h1m1%200h2m4%200h1m3%200h4m-28%201h1m1%200h3m1%200h1m2%200h2m5%200h2m2%200h5m2%200h2m-29%201h1m1%200h3m1%200h1m1%200h2m1%200h1m1%200h1m8%200h6m-28%201h1m1%200h3m1%200h1m3%200h5m1%200h1m2%200h1m4%200h3m1%200h1m-29%201h1m5%200h1m3%200h1m2%200h1m2%200h3m1%200h2m1%200h1m3%200h1m-28%201h7m1%200h3m2%200h1m1%200h1m1%200h1m2%200h2m2%200h1m2%200h1%27%2F%3E%3C%2Fsvg%3E";

  function buildTv() {
    if (document.getElementById("pdl-donate")) return;
    var d = document.createElement("div");
    d.id = "pdl-donate";
    d.setAttribute("style", "position:fixed;right:3%;bottom:5%;z-index:2147483000;display:flex;align-items:center;gap:18px;" +
      "padding:16px 20px;border-radius:16px;background:rgba(20,6,36,.94);border:2px solid #39ff14;color:#fff;" +
      "font:600 22px/1.3 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;box-shadow:0 0 24px rgba(0,0,0,.6);max-width:46%");
    d.innerHTML = '<img alt="" src="' + QR + '" style="width:150px;height:150px;image-rendering:pixelated;background:#fff;border-radius:8px">' +
      '<div><div style="font-size:24px;font-weight:800;margin-bottom:6px">A lot of this is free.<br>Help us keep it that way.</div>' +
      '<div style="color:#39ff14;font-weight:800">❤ Scan with your phone to donate</div>' +
      '<div style="font-size:17px;opacity:.85;margin-top:4px">parkerdatalink.com/donations</div></div>';
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 20000);   // gone after 20 seconds
  }

  function build() {
    if (TV) { buildTv(); return; }
    if (document.getElementById("pdl-donate")) return;
    // Slim: one thin line, so it stays visible without covering the page.
    // Games ("float"): a thin bar for 8 seconds, then it shrinks to a small
    // "Donate" pill in the bottom-left corner.
    var css = document.createElement("style");
    css.textContent =
      "#pdl-donate{display:flex;align-items:center;justify-content:center;gap:10px;text-align:center;" +
      "padding:5px 12px;background:linear-gradient(90deg,#3b0d5c,#0d3b2a);color:#fff;font:600 14px/1.25 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;" +
      "border-bottom:2px solid #39ff14;box-sizing:border-box;width:100%;position:relative;z-index:2147483000;min-height:34px}" +
      "#pdl-donate .s{display:none}" +
      "#pdl-donate a{flex:none;display:inline-block;background:#39ff14;color:#12021f;font-weight:900;font-size:14px;text-decoration:none;" +
      "padding:4px 14px;border-radius:999px;box-shadow:0 0 10px rgba(57,255,20,.5);white-space:nowrap}" +
      "#pdl-donate a:hover{filter:brightness(1.1)}" +
      "#pdl-donate.float{position:fixed;top:0;left:0;right:0;box-shadow:0 2px 10px rgba(0,0,0,.45);transition:all .4s}" +
      "#pdl-donate.pill{top:auto;bottom:10px;left:10px;right:auto;width:auto;min-height:0;padding:0;background:none;border:0;box-shadow:none}" +
      "#pdl-donate.pill span{display:none}" +
      "#pdl-donate.pill a{font-size:13px;padding:5px 12px;opacity:.92}" +
      "@media (max-width:560px){#pdl-donate{min-height:26px;padding:2px 8px;gap:8px;font-size:12px;border-bottom-width:1px}#pdl-donate .l{display:none}#pdl-donate .s{display:inline}#pdl-donate a{font-size:12px;padding:2px 10px;box-shadow:none}#pdl-donate.pill{bottom:8px;left:8px}#pdl-donate.pill a{font-size:12px;padding:4px 10px}}";
    document.head.appendChild(css);
    var d = document.createElement("div");
    d.id = "pdl-donate";
    if (mode === "float") d.className = "float";
    d.innerHTML = '<span class="l">A lot of this software is free. Help us keep it that way.</span>' +
      '<span class="s">Free software. Help keep it free.</span>' +
      '<a href="https://parkerdatalink.com/donations" target="_blank" rel="noopener">❤ Donate</a>';
    document.body.insertBefore(d, document.body.firstChild);
    if (mode === "float") {
      var shrunk = false;
      try { shrunk = sessionStorage.getItem("pdlDonatePill") === "1"; } catch (e) {}
      function pill() { d.className = "float pill"; try { sessionStorage.setItem("pdlDonatePill", "1"); } catch (e) {} }
      // Phones: go straight to the small corner button (screens are small).
      if (shrunk || window.innerWidth <= 560) pill(); else setTimeout(pill, 8000);
    }
  }
  if (document.body) build(); else document.addEventListener("DOMContentLoaded", build);
})();
