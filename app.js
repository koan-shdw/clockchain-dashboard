/* Clockchain App shell: injected sidebar + topbar, live values, mock interactions.
   Static mockup. Live numbers run on the same simulated feed as the main site
   widget (block 36042 observed 2026-07-03 02:45:28 UTC, 1 block/second). */
(function(){
  var GENESIS = Math.floor(Date.UTC(2026, 6, 3, 2, 45, 28) / 1000) - 36042;
  var TAI_OFFSET_S = 37;
  var OFFSETS = { utc: 57, ntp: -55, system: 348 };

  function pad(n, w){ n = String(n); while(n.length < (w || 2)) n = '0' + n; return n; }
  function fmtTime(ms){
    var d = new Date(ms);
    return pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
  }
  function height(ms){ return Math.floor(ms / 1000) - GENESIS; }
  function randHash(len){
    var c = '0123456789abcdef', s = '0x';
    for(var i = 0; i < (len || 12); i++) s += c[Math.floor(Math.random() * 16)];
    return s;
  }

  /* ---- shell ---- */
  var NAV = [
    { group: 'Overview', items: [
      { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>' },
      { id: 'search', label: 'Search & Verify', href: 'search.html', icon: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.2-4.2"/>' }
    ]},
    { group: 'Services', items: [
      { id: 'logging', label: 'Logging', href: 'logging.html', icon: '<path d="M4 6h16M4 12h16M4 18h10"/>' },
      { id: 'contracts', label: 'Smart Contracts', href: 'contracts.html', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>' },
      { id: 'timestamp', label: 'Time Services', href: 'timestamp.html', icon: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14"/>' }
    ]},
    { group: 'Connections', items: [
      { id: 'apikeys', label: 'API', href: 'api-keys.html', icon: '<circle cx="9" cy="15" r="3.5"/><path d="M11.5 12.5 20 4M16 8l3 3"/>' },
      { id: 'mcp', label: 'MCP', href: 'docs/mcp.html', icon: '<path d="M9 7V2M15 7V2M6 7h12v4a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>' }
    ]},
    { group: 'Network', items: [
      { id: 'benchmarking', label: 'Network Status', href: 'benchmarking.html', icon: '<path d="M4 19V10M10 19V5M16 19v-7M21 19H3"/>' }
    ]},
    { group: 'Developers', items: [
      { id: 'docs', label: 'Docs', href: 'docs/index.html', icon: '<path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M14 4v5h5"/>', pub: true }
    ]},
    { group: 'Account', items: [
      { id: 'account', label: 'Billing & Usage', href: 'account.html', icon: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>' },
      { id: 'payments', label: 'Payment Methods', href: 'payment-methods.html', icon: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>' },
      { id: 'pricing', label: 'Pricing', href: 'pricing.html', icon: '<path d="M20 13l-7 7-8.6-8.6V4h7.4z"/><circle cx="8.5" cy="8.5" r="1.5"/>' },
      { id: 'sccredit', label: 'Smart Contract Credit Management', href: 'smart-contract-credit.html', icon: '<rect x="4" y="7" width="16" height="11" rx="2"/><path d="M4 11h16M8 15h3"/>' }
    ]}
  ];

  function shellPaths(){
    /* docs pages live one level down */
    return document.body.hasAttribute('data-docs') ? '../' : '';
  }

  function renderSidebar(){
    var slot = document.getElementById('sidebar');
    if(!slot) return;
    var base = shellPaths();
    var active = document.body.getAttribute('data-nav');
    var h = '<div class="sb-logo"><a href="https://koan-shdw.github.io/clockchain-preview-r2/index.html"><img src="' + base + 'assets/clockchain-logo-full.png" alt="Clockchain" /></a></div>';
    NAV.forEach(function(g){
      h += '<div class="sb-group"><div class="sb-group-label">' + g.group + '</div>';
      g.items.forEach(function(it){
        h += '<a class="sb-link' + (it.id === active ? ' active' : '') + '" href="' + base + it.href + '">'
          + '<svg viewBox="0 0 24 24" aria-hidden="true">' + it.icon + '</svg>' + it.label
          + (it.pub ? '<span class="sb-pub">Public</span>' : '') + '</a>';
      });
      h += '</div>';
    });
    h += '<div class="sb-foot">'
      + '<div class="sb-user"><span class="sb-avatar">AM</span><span><span class="sb-user-name">Alexander Mitchell</span><br/><span class="sb-user-mail">alexander@example.com</span></span></div>'
      + '<button class="sb-signout" onclick="location.href=\'' + base + 'login.html\'">Sign out</button>'
      + '</div>';
    slot.innerHTML = h;
  }

  function renderTopbar(){
    var slot = document.getElementById('topbar');
    if(!slot) return;
    var title = slot.getAttribute('data-title') || '';
    var base = shellPaths();
    var active = document.body.getAttribute('data-nav');
    var opts = '';
    NAV.forEach(function(g){ g.items.forEach(function(it){
      opts += '<option value="' + base + it.href + '"' + (it.id === active ? ' selected' : '') + '>' + it.label + '</option>';
    }); });
    var SITE = 'https://koan-shdw.github.io/clockchain-preview-r2/';
    opts += '<optgroup label="Clockchain site">'
      + '<option value="' + SITE + 'about.html">About</option>'
      + '<option value="' + SITE + 'services.html">Services</option>'
      + '<option value="' + SITE + 'newsroom.html">News</option>'
      + '<option value="' + SITE + 'docs.html">Docs</option>'
      + '<option value="https://clockchain.network/service/docs">API/MCP</option>'
      + '</optgroup>';
    opts += '<option value="' + base + 'login.html">Sign out</option>';
    var glinks = '<nav class="tb-global" aria-label="Clockchain site">'
      + '<a href="' + SITE + 'about.html">About</a>'
      + '<a href="' + SITE + 'services.html">Services</a>'
      + '<a href="' + SITE + 'newsroom.html">News</a>'
      + '<a href="' + SITE + 'docs.html">Docs</a>'
      + '<a href="https://clockchain.network/service/docs">API/MCP</a>'
      + '</nav>';
    var chip = document.body.hasAttribute('data-token-chip')
      ? '<span class="tb-stat"><span class="tb-label">Token Balance</span><span>15,326.0382716 CCTT</span></span>'
      : '';
    slot.innerHTML =
      '<div class="tb-title">' + title + ' <span class="net-badge">Testnet</span></div>'
      + '<div class="tb-right">'
      + '<nav class="tb-mobile-nav"><select onchange="location.href=this.value" aria-label="Navigate">' + opts + '</select></nav>'
      + glinks
      + chip
      + '<span class="tb-stat"><span class="live-dot"></span><span class="tb-label">Clockchain Time</span><span id="tb-time">--:--:--</span></span>'
      + '<span class="tb-stat"><span class="tb-label">Clockchain Block Height</span><span id="tb-height">#—</span></span>'
      + '<a class="tb-signout" href="' + base + 'login.html">Sign out</a>'
      + '<button class="tb-theme" id="tb-theme" type="button" aria-label="Toggle light mode" onclick="ccTheme()"></button>'
      + '</div>';
  }

  /* ---- Buy More payment chooser (round 5, item 13): card USD vs wallet CCTT ---- */
  window.ccBuy = function(what){
    var old = document.getElementById('cc-buy'); if(old) old.remove();
    var d = document.createElement('div'); d.id = 'cc-buy'; d.className = 'buy-overlay';
    d.innerHTML = '<div class="buy-card"><h4>' + what + '</h4><p>Pay with</p>'
      + '<button class="btn btn-primary btn-sm" onclick="ccBuyPick(\'credit card (USD)\')">Credit card · USD</button>'
      + '<button class="btn btn-outline btn-sm" onclick="ccBuyPick(\'connected MetaMask wallet (CCTT)\')">Connected wallet · CCTT</button>'
      + '<button class="kv-copy" onclick="document.getElementById(\'cc-buy\').remove()">Cancel</button></div>';
    d.onclick = function(e){ if(e.target === d) d.remove(); };
    document.body.appendChild(d);
  };
  window.ccBuyPick = function(method){
    var d = document.getElementById('cc-buy'); if(d) d.remove();
    ccToast('Mockup: purchase via ' + method);
  };

  /* ---- theme: dark default, light via [data-theme="light"] on <html> ---- */
  var SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 13A8.5 8.5 0 0 1 11 3a8.5 8.5 0 1 0 10 10z"/></svg>';
  function paintTheme(){
    var b = document.getElementById('tb-theme');
    if(b) b.innerHTML = document.documentElement.getAttribute('data-theme') === 'light' ? MOON : SUN;
  }
  window.ccTheme = function(){
    var r = document.documentElement, light = r.getAttribute('data-theme') === 'light';
    if(light) r.removeAttribute('data-theme'); else r.setAttribute('data-theme', 'light');
    try{ localStorage.setItem('ccapp-theme', light ? 'dark' : 'light'); }catch(e){}
    paintTheme();
  };

  /* ---- live values: any [data-live] element updates each second ----
     data-live: time | height | hash | date */
  function tick(){
    var ms = Date.now();
    var t = fmtTime(ms), h = '#' + height(ms).toLocaleString();
    document.querySelectorAll('[data-live]').forEach(function(el){
      var k = el.getAttribute('data-live');
      if(k === 'time') el.textContent = t;
      else if(k === 'height') el.textContent = h;
      else if(k === 'height-raw') el.textContent = height(ms).toLocaleString();
      else if(k === 'hash') el.textContent = randHash(12) + '…';
      else if(k === 'time-utc') el.textContent = t + ' UTC';
      else if(k === 'time-ntp') el.textContent = fmtTime(ms + OFFSETS.ntp);
      else if(k === 'time-sys') el.textContent = fmtTime(ms + OFFSETS.system);
      else if(k === 'time-tai') el.textContent = fmtTime(ms + TAI_OFFSET_S * 1000);
    });
    var tbT = document.getElementById('tb-time'), tbH = document.getElementById('tb-height');
    if(tbT) tbT.textContent = t;
    if(tbH) tbH.textContent = h;
  }

  /* ---- interactions ---- */
  window.ccToast = function(m){
    var e = document.getElementById('toast');
    if(!e){ e = document.createElement('div'); e.className = 'toast'; e.id = 'toast'; document.body.appendChild(e); }
    e.textContent = m; e.classList.add('show');
    clearTimeout(window.__t); window.__t = setTimeout(function(){ e.classList.remove('show'); }, 1800);
  };
  window.ccCopy = function(text, msg){
    navigator.clipboard.writeText(text).then(function(){ ccToast(msg || 'Copied'); })
      .catch(function(){ ccToast('Copy failed'); });
  };
  window.ccCopyEl = function(btn){
    var c = btn.parentElement.querySelector('code, span');
    if(c) ccCopy(c.innerText);
  };
  window.ccTab = function(id, btn){
    var tabs = btn.closest('.tabs'), box = tabs.parentElement;
    box.querySelectorAll('.tabpane').forEach(function(x){ x.hidden = true; });
    var pane = box.querySelector('#' + id);
    if(pane) pane.hidden = false;
    tabs.querySelectorAll('.tabbtn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
  };
  window.ccMock = function(msg){ ccToast(msg || 'Mockup: action simulated'); };

  renderSidebar();
  renderTopbar();
  paintTheme();
  tick();
  setInterval(tick, 1000);
})();
