/* Round 3+4: shared canned dataset + matching + row expansion + proof certificates
   for Search & Verify. Quicklinks are invented for the mock (format CC-XXXX-XXXX);
   freshly submitted logs from logging.html join via sessionStorage for the session.
   Global toggle (round 4): off = only your events (usr_9d4f); quicklinks resolve regardless. */
(function(){
  var ME = 'usr_9d4f';
  var ROWS = [
    { type:'Log', cat:'log', hash:'0x9f3c1b8e2d4a71e0', short:'0x9f3c…a71e',
      name:'Q3 board resolution, final', assetId:'BRD-2026-Q3', ver:'3', text:'Q3 board resolution',
      userId:ME, block:36041882, status:'Verified', when:'2 min ago',
      anchored:'2026-07-03 02:12 Clockchain Time', key:'CC-4X7K-9M2Q' },
    { type:'API call', cat:'api', detail:'GET api/time/timestamp', code:'200 OK',
      userId:ME, block:36041367, status:'200', when:'10 min ago',
      anchored:'2026-07-03 02:04 Clockchain Time', key:'CC-2T6M-8A4P' },
    { type:'Contract', cat:'contract', detail:'escrow-release · execution time 2026-07-04 00:00:00 UVT',
      cname:'escrow-release', trigger:'2026-07-04 00:00:00 UVT', paid:'$38.20 · 764.0 CCTT',
      userId:ME, block:null, status:'Scheduled', when:'1 h ago',
      anchored:'scheduled · 2026-07-04 00:00:00 UVT', key:'CC-3E8S-5C2R' },
    { type:'Log', cat:'log', hash:'0x4b219cd7e60a09dd', short:'0x4b21…09dd',
      name:'supplier-manifest.pdf', assetId:'SUP-0142', ver:'1', text:'',
      userId:ME, block:36038554, status:'Verified', when:'3 h ago',
      anchored:'2026-07-03 01:03 Clockchain Time', key:'CC-8N3V-2Q5T' },
    { type:'Contract', cat:'contract', detail:'option-expiry · execution time 2026-06-30 16:00:00 UVT',
      cname:'option-expiry', trigger:'2026-06-30 16:00:00 UVT', paid:'$0.31 USD',
      userId:ME, block:35812021, status:'Executed', when:'3 d ago',
      anchored:'2026-06-30 16:00:00 UVT', key:'CC-7P2L-4K9D' },
    { type:'Log', cat:'log', hash:'0xe7a05f14b92d3c48', short:'0xe7a0…3c48',
      name:'deploy-artifact 4.2.1', assetId:'DPL-421', ver:'421', text:'',
      userId:ME, block:35991207, status:'Verified', when:'yesterday',
      anchored:'2026-07-02 12:14 Clockchain Time', key:'CC-6R9W-4H7J' },
    /* other users — surface only with the global toggle on */
    { type:'Log', cat:'log', hash:'0x77d1a4c98b23f6e2', short:'0x77d1…f6e2',
      name:'audit-report-2026H1.pdf', assetId:'AUD-H1', ver:'1', text:'',
      userId:'usr_31bc', block:36012773, status:'Verified', when:'2 d ago',
      anchored:'2026-07-01 09:41 Clockchain Time', key:'CC-9J4D-7Q2F' },
    { type:'Contract', cat:'contract', detail:'royalty-split · execution time 2026-08-01 00:00:00 UVT',
      cname:'royalty-split', trigger:'2026-08-01 00:00:00 UVT', paid:'$12.75 · 255.0 CCTT',
      userId:'usr_8ee2', block:null, status:'Scheduled', when:'5 d ago',
      anchored:'scheduled · 2026-08-01 00:00:00 UVT', key:'CC-5W8N-3R6T' }
  ];
  try{
    (JSON.parse(sessionStorage.getItem('cc-fresh-logs') || '[]')).forEach(function(r){
      r.cat = 'log'; r.type = 'Log'; ROWS.unshift(r);
    });
  }catch(e){}

  var last = [];

  function globalOn(){
    var g = document.getElementById('sv-global');
    return !!(g && g.checked);
  }
  function mine(r){ return globalOn() || r.userId === ME; }
  function catsOn(){
    var on = {};
    document.querySelectorAll('.filters input[data-cat]').forEach(function(c){
      on[c.getAttribute('data-cat')] = c.checked;
    });
    return on;
  }
  function chev(){
    return '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>';
  }
  function rowHtml(r, i){
    var detail = r.detail || (r.short + ' · ' + r.name);
    var block = r.block ? '#' + r.block.toLocaleString() : 'scheduled';
    /* contract rows: the When cell is a print-proof action (Jeff round 5, item 7);
       pending contracts get Edit (placeholder until the modify/cancel flow is defined),
       executed ones get Schedule again (Jeff 09-24) */
    var when = r.when;
    if(r.cat === 'contract'){
      when = '<span class="row-acts"><button class="kv-copy" type="button" onclick="CCSearch.proof(' + i + ',true)">Print proof</button>';
      if(r.status === 'Scheduled' && r.userId === ME)
        when += '<button class="kv-copy" type="button" onclick="ccMock(\'Mockup: edit this scheduled contract (reschedule or cancel). Flow to come.\')">Edit</button>';
      if(r.status === 'Executed' && r.userId === ME)
        when += '<a class="kv-copy" style="text-decoration:none;" href="contracts.html?again=' + encodeURIComponent(r.cname) + '">Schedule again</a>';
      when += '</span>';
    }
    return '<tr><td>' + r.type + '</td><td class="mono">' + detail + '</td><td class="mono">' + block
      + '</td><td><span class="status-pill">' + r.status + '</span></td><td>' + when
      + '</td><td style="text-align:right;"><button class="xbtn" type="button" aria-label="Expand" onclick="CCSearch.toggle(' + i + ',this)">' + chev() + '</button></td></tr>';
  }
  function esc(s){
    return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function fields(r){
    if(r.cat === 'log') return [
      ['Hash', r.hash, 1], ['Hash type', 'SHA-256'], ['Asset Name', r.name], ['Asset ID', r.assetId],
      ['Version #', r.ver], ['User ID', r.userId, 1], ['Block', r.block ? '#' + r.block.toLocaleString() : '—', 1],
      ['Consensus time', r.anchored, 1], ['Reference key', r.key, 1]
    ];
    if(r.cat === 'api') return [
      ['Endpoint', r.detail, 1], ['Response', r.code || r.status], ['User ID', r.userId, 1],
      ['Block', '#' + r.block.toLocaleString(), 1], ['Consensus time', r.anchored, 1], ['Reference key', r.key, 1]
    ];
    return [
      ['Contract', r.cname || r.detail], ['Trigger', r.trigger || '—', 1], ['Status', r.status],
      ['Paid estimate', r.paid || '—'], ['User ID', r.userId, 1], ['Reference key', r.key, 1]
    ];
  }
  function panelHtml(r, i){
    var label = r.cat === 'log' ? 'Log' : r.cat === 'api' ? 'API call' : 'Contract';
    var h = '<div class="xpanel ' + r.cat + '"><span class="tpill tpill-' + r.cat + '">' + label + '</span><div class="xgrid">';
    fields(r).filter(function(f){ return f[1] != null && f[1] !== ''; }).forEach(function(f){
      h += '<div><div class="k">' + f[0] + '</div><div class="v' + (f[2] ? ' mono' : '') + '">' + esc(f[1]) + '</div></div>';
    });
    h += '</div><div class="xactions">'
      + '<button class="btn btn-outline btn-sm" onclick="CCSearch.proof(' + i + ',false)">Proof of log</button>'
      + '<button class="btn btn-outline btn-sm" onclick="CCSearch.proof(' + i + ',true)">Print</button>'
      + '<button class="kv-copy" onclick="CCSearch.copyLink(' + i + ')">Copy quicklink</button>'
      + '</div></div>';
    return h;
  }
  function render(list, tbody){
    last = list;
    tbody.innerHTML = list.length
      ? list.map(rowHtml).join('')
      : '<tr><td colspan="6" class="empty">No matches on the chain for that query.</td></tr>';
  }
  function norm(s){ return String(s || '').toLowerCase().trim(); }
  function linkFor(r){
    return location.origin + location.pathname.replace(/[^/]*$/, '') + 'search.html?q=' + encodeURIComponent(r.key);
  }

  /* mock block<->time mapping: 1s blocks, anchored so canned rows land near their stated times */
  var T0 = Date.UTC(2026, 6, 2, 14, 33, 58), B0 = 36000000, SEC = 1;
  function two(n){ return String(n).padStart(2, '0'); }
  function fmt(d){
    return d.getUTCFullYear() + '-' + two(d.getUTCMonth()+1) + '-' + two(d.getUTCDate())
      + ' ' + two(d.getUTCHours()) + ':' + two(d.getUTCMinutes()) + ':' + two(d.getUTCSeconds());
  }

  window.CCSearch = {
    rows: ROWS,
    render: render,
    catsOn: catsOn,
    toggle: function(i, btn){
      var tr = btn.closest('tr');
      var next = tr.nextElementSibling;
      if(next && next.classList.contains('xrow')){ next.remove(); btn.classList.remove('open'); return; }
      var open = tr.parentElement.querySelector('.xrow');
      if(open){ open.remove(); }
      tr.parentElement.querySelectorAll('.xbtn.open').forEach(function(b){ b.classList.remove('open'); });
      var x = document.createElement('tr'); x.className = 'xrow';
      x.innerHTML = '<td colspan="6">' + panelHtml(last[i], i) + '</td>';
      tr.after(x); btn.classList.add('open');
    },
    copyLink: function(i){
      navigator.clipboard.writeText(linkFor(last[i]))
        .then(function(){ ccToast('Quicklink copied'); }).catch(function(){ ccToast('Copy failed'); });
    },
    proof: function(i, doPrint){
      var r = last[i];
      var rows = fields(r).filter(function(f){ return f[1] != null && f[1] !== ''; })
        .map(function(f){ return '<tr><th>' + f[0] + '</th><td>' + esc(f[1]) + '</td></tr>'; }).join('');
      var w = window.open('', '_blank');
      if(!w){ ccToast('Allow pop-ups to open the proof'); return; }
      w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Proof of Log · ' + esc(r.key) + '</title>'
        + '<style>body{font-family:Georgia,serif;color:#171717;background:#fff;max-width:640px;margin:40px auto;padding:0 24px;}'
        + 'h1{font-size:20px;letter-spacing:.16em;text-transform:uppercase;border-bottom:2px solid #171717;padding-bottom:10px;}'
        + 'h1 small{display:block;font-size:11px;letter-spacing:.3em;color:#666;margin-top:4px;}'
        + 'table{width:100%;border-collapse:collapse;margin:24px 0;font-size:13px;}'
        + 'th{text-align:left;width:170px;font-weight:normal;color:#666;text-transform:uppercase;font-size:10px;letter-spacing:.12em;padding:8px 0;vertical-align:top;}'
        + 'td{font-family:"Courier New",monospace;padding:8px 0;word-break:break-all;border-bottom:1px solid #eee;}'
        + 'p{font-size:12px;color:#444;line-height:1.6;}a{color:#0a6b3d;}</style></head><body>'
        + '<h1>Clockchain<small>Proof of Log</small></h1><table>' + rows + '</table>'
        + '<p>This record is self-verifying: recompute the hash of the original content and compare it to the hash anchored in the block above. Proof, not a screenshot.</p>'
        + '<p>Verify online: <a href="' + linkFor(r) + '">' + linkFor(r) + '</a></p>'
        + '</body></html>');
      w.document.close();
      if(doPrint){ w.onload = function(){ w.print(); }; setTimeout(function(){ try{ w.print(); }catch(e){} }, 400); }
    },
    blockToTime: function(b){ return fmt(new Date(T0 + (b - B0) * SEC * 1000)) + ' Clockchain Time'; },
    timeToBlock: function(dateStr, timeStr){
      var t = Date.parse(dateStr + 'T' + (timeStr || '00:00:00') + 'Z');
      if(isNaN(t)) return null;
      return B0 + Math.round((t - T0) / (SEC * 1000));
    },
    byKey: function(q){
      q = norm(q).replace(/\s+/g, '');
      var hit = null;
      ROWS.forEach(function(r){ if(norm(r.key).replace(/\s+/g,'') === q) hit = r; });
      return hit; /* quicklinks resolve regardless of the global toggle — that's the share case */
    },
    basic: function(q){
      q = norm(q); var on = catsOn();
      return ROWS.filter(function(r){
        if(!on[r.cat] || !mine(r)) return false;
        if(!q) return true;
        var block = r.block ? String(r.block) : '';
        return (r.hash && norm(r.hash).indexOf(q.replace(/^0x/,'0x')) === 0)
          || (r.hash && norm(r.hash).replace('0x','').indexOf(q.replace(/^0x/,'')) === 0)
          || norm(r.name).indexOf(q) > -1
          || norm(r.detail).indexOf(q) > -1
          || norm(r.assetId) === q
          || norm(r.userId) === q
          || block === q.replace(/[#,]/g, '');
      });
    },
    advanced: function(cat, f){
      return ROWS.filter(function(r){
        if(r.cat !== cat || !mine(r)) return false;
        if(f.hash && !(r.hash && norm(r.hash).replace('0x','').indexOf(norm(f.hash).replace('0x','')) === 0)) return false;
        if(f.content && !(norm(r.text) && norm(r.text).indexOf(norm(f.content)) > -1)) return false;
        if(f.userId && norm(r.userId) !== norm(f.userId)) return false;
        if(f.assetId && norm(r.assetId) !== norm(f.assetId)) return false;
        if(f.assetName && norm(r.name).indexOf(norm(f.assetName)) === -1) return false;
        if(f.block && String(r.block) !== String(f.block).replace(/[#,]/g, '')) return false;
        if(f.ver && String(r.ver) !== String(f.ver)) return false;
        if(f.cname && norm(r.cname || r.detail).indexOf(norm(f.cname)) === -1) return false;
        if(f.cstatus && f.cstatus !== 'Any'){
          var map = { Scheduled: 'Scheduled', Executed: 'Executed', Canceled: 'Canceled' };
          if(r.status !== map[f.cstatus]) return false;
        }
        return true;
      });
    }
  };
})();
