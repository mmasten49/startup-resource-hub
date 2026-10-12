// Startup Resource Hub — renders data/resources.json grouped by data/groups.json.
// To add or edit a listing, edit data/resources.json. No code changes needed.
(function () {
  var groupsEl = document.getElementById("groups");
  var searchEl = document.getElementById("search");
  var totalEl = document.getElementById("total");

  var GROUPS = [];
  var RESOURCES = [];
  var openId = null;
  var activeSub = {}; // group id -> selected subcategory id

  var ARROW = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>';
  var LINK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>';
  var CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function card(r) {
    return '<div class="card">' +
      '<a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="title" title="' + esc(r.title) + '">' + esc(r.title) + '</span>' +
        '<span class="arrow">' + ARROW + '</span>' +
      '</a>' +
      '<button type="button" class="copy" data-copy="' + esc(r.url) + '" aria-label="Copy link" title="Copy link">' + LINK + '</button>' +
    '</div>';
  }

  function render() {
    var q = searchEl.value.trim().toLowerCase();
    var anyMatch = false;
    var html = "";

    GROUPS.forEach(function (g) {
      var all = RESOURCES.filter(function (r) { return r.group_id === g.id; });
      var items = q ? all.filter(function (r) { return r.title.toLowerCase().indexOf(q) !== -1; }) : all;
      if (items.length) anyMatch = true;
      if (q && !items.length) return;

      var isOpen = q ? true : openId === g.id;
      var countLabel = q
        ? items.length + " match" + (items.length === 1 ? "" : "es")
        : all.length + " resources";

      var subs = (g.subcategories || []).filter(function (s) {
        return items.some(function (r) { return r.subcategory === s.id; });
      });
      if (!subs.some(function (s) { return s.id === activeSub[g.id]; })) {
        activeSub[g.id] = subs.length ? subs[0].id : null;
      }
      var shown = q ? items : items.filter(function (r) { return r.subcategory === activeSub[g.id]; });

      html += '<div class="group' + (isOpen ? " open" : "") + '" id="' + esc(g.id) + '">' +
        '<button type="button" class="group-head" data-toggle="' + esc(g.id) + '" aria-expanded="' + isOpen + '">' +
          '<div><h2>' + esc(g.name) + '</h2><p>' + esc(g.blurb) + '</p></div>' +
          '<div class="group-meta"><span class="count">' + esc(countLabel) + '</span><span class="chev" aria-hidden="true">⌄</span></div>' +
        '</button>';

      if (isOpen) {
        html += '<div class="group-body">';
        if (!q && subs.length > 1) {
          html += '<div class="tabs">' + subs.map(function (s) {
            return '<button type="button" class="tab' + (s.id === activeSub[g.id] ? " active" : "") +
              '" data-group="' + esc(g.id) + '" data-sub="' + esc(s.id) + '">' + esc(s.name) + '</button>';
          }).join("") + '</div>';
        }
        html += '<div class="cards">' + shown.map(card).join("") + '</div></div>';
      }
      html += '</div>';
    });

    if (q && !anyMatch) {
      html = '<div class="empty">No resources match "' + esc(searchEl.value) + '". Try another search term.</div>';
    }
    groupsEl.innerHTML = html;
  }

  function copy(btn) {
    var text = btn.getAttribute("data-copy");
    var done = function () {
      var label = btn.querySelector("span");
      if (btn.classList.contains("copy")) {
        btn.classList.add("done"); btn.innerHTML = CHECK;
        setTimeout(function () { btn.classList.remove("done"); btn.innerHTML = LINK; }, 1600);
      } else if (label) {
        label.textContent = "Copied!";
        setTimeout(function () { label.textContent = "Copy link"; }, 2000);
      }
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-toggle],[data-sub],[data-copy]");
    if (!t) return;
    if (t.hasAttribute("data-copy")) { e.preventDefault(); copy(t); return; }
    if (t.hasAttribute("data-sub")) {
      activeSub[t.getAttribute("data-group")] = t.getAttribute("data-sub");
      render(); return;
    }
    var id = t.getAttribute("data-toggle");
    if (searchEl.value.trim()) return;
    openId = openId === id ? null : id;
    render();
  });

  searchEl.addEventListener("input", render);

  Promise.all([
    fetch("data/groups.json").then(function (r) { return r.json(); }),
    fetch("data/resources.json").then(function (r) { return r.json(); })
  ]).then(function (res) {
    GROUPS = res[0];
    RESOURCES = res[1];
    var hash = (location.hash || "").replace("#", "");
    openId = GROUPS.some(function (g) { return g.id === hash; }) ? hash : GROUPS[0].id;
    totalEl.textContent = RESOURCES.length + "+";
    render();
  }).catch(function () {
    groupsEl.innerHTML = '<div class="empty">Resources could not load. Please refresh the page.</div>';
  });
})();
