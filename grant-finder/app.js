// Small-Business Grant Finder — renders data/grants.json.
// To add, edit, or remove a grant, edit data/grants.json. No code changes needed.
// Grants whose deadline is a real date in the past are hidden automatically.
(function () {
  var CATEGORIES = [
    { id: "tech", label: "Tech & R&D Innovators", blurb: "Federal and defense-backed funding for science, engineering, and deep-tech ventures." },
    { id: "health", label: "Health, Climate & Social Impact", blurb: "Grants for founders and ventures tackling public health, climate, and social challenges." },
    { id: "infra", label: "Disaster Recovery & Infrastructure", blurb: "Funding for resilience projects that protect communities, property, and infrastructure." },
    { id: "general", label: "General & Everyday Small Business", blurb: "Straightforward grants open to most small-business owners — no tech background required." }
  ];
  var URGENCY = { closing_soon: "Closing soon", upcoming: "Upcoming", rolling: "Rolling / ongoing" };

  var groupsEl = document.getElementById("groups");
  var chipsEl = document.getElementById("chips");
  var icsBtn = document.getElementById("ics");
  var grants = [];
  var filter = "all";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // A concrete date from a free-text deadline, or null ("Rolling", "Varies", etc.).
  function parseDeadline(text) {
    if (!text || /rolling|varies/i.test(text)) return null;
    var d = new Date(text);
    return isNaN(d.getTime()) ? null : d;
  }

  function isExpired(g) {
    var d = parseDeadline(g.deadline);
    if (!d) return false;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    return d < today;
  }

  function card(g) {
    var u = URGENCY[g.urgency] ? g.urgency : "rolling";
    return '<div class="card">' +
      '<div class="badge-row"><span class="urgency ' + u + '">' + URGENCY[u] + '</span></div>' +
      '<div><a class="card-title" href="' + esc(g.url) + '" target="_blank" rel="noopener noreferrer">' + esc(g.title) + '</a></div>' +
      '<p class="card-desc">' + esc(g.description) + '</p>' +
      '<div class="facts">' +
        '<div><div class="label">Funding</div><div class="val">' + esc(g.funding) + '</div></div>' +
        '<div><div class="label">Deadline</div><div class="val">' + esc(g.deadline) + '</div></div>' +
        '<div class="full"><div class="label">Best for</div><div class="val soft">' + esc(g.best_for) + '</div></div>' +
      '</div>' +
      '<a class="visit" href="' + esc(g.url) + '" target="_blank" rel="noopener noreferrer">Visit site →</a>' +
    '</div>';
  }

  function render() {
    var chips = [{ id: "all", label: "All grants (" + grants.length + ")" }].concat(CATEGORIES.map(function (c) {
      return { id: c.id, label: c.label + " (" + grants.filter(function (g) { return g.category === c.id; }).length + ")" };
    }));
    chipsEl.innerHTML = chips.map(function (c) {
      return '<button type="button" class="chip' + (c.id === filter ? " active" : "") + '" data-filter="' + c.id + '">' + esc(c.label) + '</button>';
    }).join("");

    var html = CATEGORIES.filter(function (c) { return filter === "all" || filter === c.id; }).map(function (c) {
      var list = grants.filter(function (g) { return g.category === c.id; });
      return '<div class="group">' +
        '<div class="group-head"><span class="dot"></span><h2>' + esc(c.label) + '</h2>' +
        '<span class="group-count">' + list.length + ' grant' + (list.length === 1 ? "" : "s") + '</span></div>' +
        '<p class="group-blurb">' + esc(c.blurb) + '</p>' +
        '<div class="grid">' + list.map(card).join("") + '</div></div>';
    }).join("");
    groupsEl.innerHTML = html || '<div class="empty">No grants listed right now.</div>';

    var dated = grants.filter(function (g) { return parseDeadline(g.deadline); }).length;
    icsBtn.disabled = dated === 0;
    icsBtn.querySelector("span").textContent = dated === 0 ? "No dated deadlines" : "Download deadlines (.ics)";
  }

  function ymd(d) { return d.toISOString().slice(0, 10).replace(/-/g, ""); }
  function icsEsc(t) { return String(t).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }

  function downloadICS() {
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Alloy Growth Lab//Grant Finder//EN", "CALSCALE:GREGORIAN"];
    grants.forEach(function (g, i) {
      var d = parseDeadline(g.deadline);
      if (!d) return;
      var end = new Date(d); end.setDate(end.getDate() + 1);
      lines.push("BEGIN:VEVENT",
        "UID:grant-" + i + "-" + ymd(d) + "@alloygrowthlab",
        "DTSTAMP:" + ymd(new Date()) + "T000000Z",
        "DTSTART;VALUE=DATE:" + ymd(d),
        "DTEND;VALUE=DATE:" + ymd(end),
        "SUMMARY:" + icsEsc(g.title) + " — deadline",
        "DESCRIPTION:" + icsEsc(g.description) + " Funding: " + icsEsc(g.funding) + ". Best for: " + icsEsc(g.best_for) + ". " + icsEsc(g.url),
        "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    var blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "grant-deadlines.ics";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  chipsEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]");
    if (!b) return;
    filter = b.getAttribute("data-filter");
    render();
  });
  icsBtn.addEventListener("click", downloadICS);
  document.getElementById("copy-review").addEventListener("click", function () {
    var span = this.querySelector("span");
    if (navigator.clipboard) navigator.clipboard.writeText("https://g.page/r/CY4qDjatMwhZEAI/review/").then(function () {
      span.textContent = "Link copied";
      setTimeout(function () { span.textContent = "Copy link"; }, 2000);
    }, function () {});
  });

  fetch("data/grants.json").then(function (r) { return r.json(); }).then(function (data) {
    grants = (data.grants || []).filter(function (g) { return !isExpired(g); });
    if (data.last_reviewed) {
      var d = new Date(data.last_reviewed + "T12:00:00");
      document.getElementById("reviewed").textContent = "List reviewed " +
        d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    render();
  }).catch(function () {
    groupsEl.innerHTML = '<div class="empty">Grants could not load. Please refresh the page.</div>';
  });
})();
