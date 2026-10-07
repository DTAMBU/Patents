(function () {
  "use strict";

  var D = window.PATENT_DATA;
  var P = D.patents;
  var SVGNS = "http://www.w3.org/2000/svg";
  var state = { idx: -1, sheet: 0, lastFocus: null };

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function setAttrs(el, a) {
    if (!a) return;
    Object.keys(a).forEach(function (k) {
      var v = a[k];
      if (v == null || v === false) return;
      if (k === "text") el.textContent = v;
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    });
  }
  function append(el, kids) {
    if (kids == null) return;
    [].concat(kids).forEach(function (c) {
      if (c == null || c === false) return;
      if (Array.isArray(c)) append(el, c);
      else el.append(c instanceof Node ? c : String(c));
    });
  }
  function h(tag, attrs, kids) { var el = document.createElement(tag); setAttrs(el, attrs); append(el, kids); return el; }
  function s(tag, attrs, kids) { var el = document.createElementNS(SVGNS, tag); setAttrs(el, attrs); append(el, kids); return el; }

  var dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  function fmtDate(iso) { return dateFmt.format(new Date(iso + "T00:00:00Z")); }
  function fmtPN(pn) {
    var m = /^WO(\d{4})(\d{6})([A-Z]\d?)$/.exec(pn);
    return m ? "WO " + m[1] + "/" + m[2] + " " + m[3] : pn;
  }
  function partName(p) { return D.parts[p.part]; }
  function imgBase(p) { return "assets/img/" + p.pn + "/"; }
  function googleUrl(pn) { return "https://patents.google.com/patent/" + pn + "/en"; }
  function patentscopeUrl(pn) { return "https://patentscope.wipo.int/search/en/detail.jsf?docId=" + pn.replace(/[A-Z]\d?$/, ""); }
  function extIcon() {
    return s("svg", { "class": "ext", viewBox: "0 0 24 24", "aria-hidden": "true" },
      s("path", { d: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" }));
  }

  /* ---------- motor map ---------- */
  function renderLegend() {
    var ol = $("#map-legend");
    ol.textContent = "";
    P.forEach(function (p, i) {
      ol.append(h("li", null, h("button", { type: "button", "data-part": p.part }, [
        h("span", { "class": "num", "aria-hidden": "true", text: i + 1 }),
        h("span", { text: partName(p) })
      ])));
    });
    $$(".hotspot").forEach(function (g) {
      var i = P.findIndex(function (p) { return p.part === g.getAttribute("data-part"); });
      g.setAttribute("aria-label", (i + 1) + ". " + partName(P[i]) + ": " + P[i].short);
    });
  }

  function setActive(part) {
    $(".motor").classList.toggle("has-active", !!part);
    $$(".motor .part, .hotspot, #map-legend button").forEach(function (el) {
      el.classList.toggle("is-active", !!part && el.getAttribute("data-part") === part);
    });
  }

  function goToCard(part) {
    var card = $('.card[data-part="' + part + '"]');
    if (!card) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    card.classList.add("is-flash");
    setTimeout(function () { card.classList.remove("is-flash"); }, 1400);
    var btn = $(".card-title-btn", card);
    if (btn) btn.focus({ preventScroll: true });
  }

  function bindMap() {
    var root = $(".map-card");
    function partOf(e) {
      var el = e.target.closest && e.target.closest("[data-part]");
      return el && (el.classList.contains("hotspot") || el.tagName === "BUTTON") ? el.getAttribute("data-part") : null;
    }
    root.addEventListener("pointerover", function (e) { var p = partOf(e); if (p) setActive(p); });
    root.addEventListener("pointerout", function (e) { if (partOf(e)) setActive(null); });
    root.addEventListener("focusin", function (e) { var p = partOf(e); if (p) setActive(p); });
    root.addEventListener("focusout", function () { setActive(null); });
    root.addEventListener("click", function (e) { var p = partOf(e); if (p) goToCard(p); });
    root.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("hotspot")) {
        e.preventDefault();
        goToCard(e.target.getAttribute("data-part"));
      }
    });
  }

  /* ---------- cards ---------- */
  function renderCards() {
    var wrap = $("#cards");
    wrap.textContent = "";
    P.forEach(function (p, i) {
      wrap.append(h("article", { "class": "card", id: "card-" + p.pn, "data-part": p.part }, [
        h("figure", { "class": "card-figure" },
          h("img", { src: imgBase(p) + "cover.png", width: p.cover.w, height: p.cover.h, alt: p.cover.alt, loading: "lazy", decoding: "async" })),
        h("div", { "class": "card-body" }, [
          h("div", { "class": "card-meta" }, h("span", { "class": "part-tag" }, [
            h("span", { "class": "num", "aria-hidden": "true", text: i + 1 }), partName(p)
          ])),
          h("h3", null, h("button", { type: "button", "class": "card-title-btn", onclick: function () { openDialog(i); } }, p.short)),
          h("p", { "class": "pn" }, fmtPN(p.pn) + " · Published " + fmtDate(p.published)),
          h("p", { "class": "card-lede", text: p.lede }),
          h("div", { "class": "card-foot" },
            h("span", { "class": "card-open", "aria-hidden": "true" }, ["View details", h("span", { "class": "arr", text: "→" })]))
        ])
      ]));
    });
  }

  /* ---------- dialog ---------- */
  var dlg = $("#dlg");

  function openDialog(i, opts) {
    if (!dlg.open) state.lastFocus = document.activeElement;
    state.idx = i;
    state.sheet = 0;
    renderDialog();
    if (!dlg.open) {
      dlg.showModal();
      document.body.classList.add("dlg-open");
    }
    if (!(opts && opts.keepHash)) history.replaceState(null, "", "#" + P[i].pn);
  }

  function renderDialog() {
    var p = P[state.idx];
    $("#dlg-eyebrow").textContent = (state.idx + 1) + " · " + partName(p);
    $("#dlg-title").textContent = p.short;
    $("#dlg-pn").textContent = fmtPN(p.pn) + " · " + p.application;
    $("#dlg-prev").disabled = state.idx === 0;
    $("#dlg-next").disabled = state.idx === P.length - 1;
    renderGallery();
    renderInfo();
    $(".dlg-body").scrollTop = 0;
  }

  function renderGallery(focusThumb) {
    var p = P[state.idx], g = $("#gallery"), n = p.sheets.length, k = state.sheet;
    var src = imgBase(p) + "sheet-" + (k + 1) + ".png";
    var sheetLabel = "Sheet " + (k + 1) + " of " + n;
    g.textContent = "";
    g.append(
      h("a", { "class": "gallery-main", href: src, target: "_blank", rel: "noopener", title: "Open full size" },
        h("img", { src: src, width: p.sheets[k][0], height: p.sheets[k][1], alt: sheetLabel + " · " + p.pn })),
      h("p", { "class": "gallery-cap" }, [
        h("span", { text: sheetLabel }),
        h("a", { href: src, target: "_blank", rel: "noopener", text: "Open full size" })
      ]),
      h("div", { "class": "thumbs" }, p.sheets.map(function (sz, j) {
        return h("button", {
          type: "button", "class": "thumb", "aria-label": "Sheet " + (j + 1),
          "aria-current": j === k ? "true" : "false",
          onclick: function () { state.sheet = j; renderGallery(true); }
        }, h("img", { src: imgBase(p) + "sheet-" + (j + 1) + ".png", alt: "", decoding: "async" }));
      }))
    );
    if (focusThumb) $$(".thumb", g)[k].focus();
  }

  function block(title, content) {
    return h("section", null, [h("h3", { text: title }), content]);
  }

  function renderInfo() {
    var p = P[state.idx], el = $("#info");
    el.textContent = "";

    var rows = [
      ["Official title", p.title],
      ["International application", h("span", { "class": "mono", text: p.application })],
      ["Filing and priority", fmtDate(p.priority)],
      ["PCT publication", [fmtDate(p.published) + " · ", h("span", { "class": "mono", text: p.pn })]],
      ["Applicant", p.applicant],
      ["Inventors", p.inventors.map(function (name, j) {
        return [j ? ", " : "", name === D.person.name ? h("span", { "class": "me", text: name }) : name];
      })],
      ["CPC classification", h("span", { "class": "mono", text: p.cpc.join(" · ") })],
      ["Family", h("div", { "class": "family-list" }, p.family.map(function (f) {
        return h("div", null, [
          h("a", { href: googleUrl(f.pn), target: "_blank", rel: "noopener", text: f.pn }),
          h("span", { "class": "when", text: D.countries[f.cc] + " · " + fmtDate(f.date) })
        ]);
      }))]
    ];

    var links = [
      { href: "assets/pdf/" + p.pn + ".pdf", label: "PDF pamphlet", ext: false },
      { href: p.espacenet, label: "Espacenet", ext: true },
      { href: googleUrl(p.pn), label: "Google Patents", ext: true },
      { href: patentscopeUrl(p.pn), label: "PATENTSCOPE", ext: true }
    ];

    el.append(
      h("p", { "class": "info-lede", text: p.lede }),
      block("Key points", h("ul", { "class": "keys" }, p.keys.map(function (k) { return h("li", { text: k }); }))),
      block("Abstract", h("p", { "class": "abstract", text: p.abstract })),
      block("Bibliographic data", h("dl", { "class": "biblio" }, rows.map(function (r) {
        return h("div", null, [h("dt", { text: r[0] }), h("dd", null, r[1])]);
      }))),
      block("Documents and databases", h("div", { "class": "links" }, links.map(function (l) {
        return h("a", { "class": "btn", href: l.href, target: "_blank", rel: "noopener" }, [l.label, l.ext ? extIcon() : null]);
      })))
    );
  }

  function bindDialog() {
    $("#dlg-close").addEventListener("click", function () { dlg.close(); });
    $("#dlg-prev").addEventListener("click", function () { if (state.idx > 0) openDialog(state.idx - 1); });
    $("#dlg-next").addEventListener("click", function () { if (state.idx < P.length - 1) openDialog(state.idx + 1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () {
      document.body.classList.remove("dlg-open");
      state.idx = -1;
      if (/^#WO\d/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
      if (state.lastFocus && document.contains(state.lastFocus)) state.lastFocus.focus({ preventScroll: true });
    });
    dlg.addEventListener("keydown", function (e) {
      if (e.target.closest && e.target.closest("summary, input, textarea")) return;
      var n = P[state.idx] ? P[state.idx].sheets.length : 0;
      if (e.key === "ArrowRight" && state.sheet < n - 1) { state.sheet++; renderGallery(); }
      else if (e.key === "ArrowLeft" && state.sheet > 0) { state.sheet--; renderGallery(); }
    });
  }

  function openFromHash() {
    var pn = location.hash.slice(1);
    var i = P.findIndex(function (p) { return p.pn === pn; });
    if (i >= 0) openDialog(i, { keepHash: true });
  }

  /* ---------- init ---------- */
  $("#linkedin-link").href = D.person.linkedin;
  $("#year").textContent = String(new Date().getFullYear());

  renderLegend();
  renderCards();
  bindMap();
  bindDialog();
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
