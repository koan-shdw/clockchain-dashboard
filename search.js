/* Round 3: shared canned dataset + matching for Search & Verify and Advanced Search.
   Quicklinks are invented for the mock (format CC-XXXX-XXXX); freshly submitted logs
   from logging.html are added via sessionStorage so they stay searchable this session. */
(function(){
  var ROWS = [
    { type:'Log', cat:'log', hash:'0x9f3c1b8e2d4a71e0', short:'0x9f3c…a71e',
      name:'Q3 board resolution, final', assetId:'BRD-2026-Q3', ver:'3', text:'Q3 board resolution',
      userId:'usr_9d4f', block:36041882, status:'Verified', when:'2 min ago',
      anchored:'2026-07-03 02:12 Clockchain Time', key:'CC-4X7K-9M2Q' },
    { type:'API call', cat:'api', detail:'GET api/time/timestamp',
      userId:'usr_9d4f', block:36041367, status:'200', when:'10 min ago',
      anchored:'2026-07-03 02:04 Clockchain Time', key:'CC-2T6M-8A4P' },
    { type:'Contract', cat:'contract', detail:'escrow-release · trigger 2026-07-04T00:00Z',
      userId:'usr_9d4f', block:null, status:'Pending', when:'1 h ago',
      anchored:'scheduled · 2026-07-04 00:00 Clockchain Time', key:'CC-3E8S-5C2R' },
    { type:'Log', cat:'log', hash:'0x4b219cd7e60a09dd', short:'0x4b21…09dd',
      name:'supplier-manifest.pdf', assetId:'SUP-0142', ver:'1', text:'',
      userId:'usr_9d4f', block:36038554, status:'Verified', when:'3 h ago',
      anchored:'2026-07-03 01:03 Clockchain Time', key:'CC-8N3V-2Q5T' },
    { type:'Log', cat:'log', hash:'0xe7a05f14b92d3c48', short:'0xe7a0…3c48',
      name:'deploy-artifact 4.2.1', assetId:'DPL-421', ver:'421', text:'',
      userId:'usr_9d4f', block:35991207, status:'Verified', when:'yesterday',
      anchored:'2026-07-02 12:14 Clockchain Time', key:'CC-6R9W-4H7J' }
  ];
  try{
    (JSON.parse(sessionStorage.getItem('cc-fresh-logs') || '[]')).forEach(function(r){
      r.cat = 'log'; r.type = 'Log'; ROWS.unshift(r);
    });
  }catch(e){}

  function catsOn(){
    var on = {};
    document.querySelectorAll('.filters input[data-cat]').forEach(function(c){
      on[c.getAttribute('data-cat')] = c.checked;
    });
    return on;
  }
  function rowHtml(r){
    var detail = r.detail || (r.short + ' · ' + r.name);
    var block = r.block ? '#' + r.block.toLocaleString() : 'scheduled';
    return '<tr><td>' + r.type + '</td><td class="mono">' + detail + '</td><td class="mono">' + block
      + '</td><td><span class="status-pill">' + r.status + '</span></td><td>' + r.when + '</td></tr>';
  }
  function render(list, tbody){
    tbody.innerHTML = list.length
      ? list.map(rowHtml).join('')
      : '<tr><td colspan="5" class="empty">No matches on the chain for that query.</td></tr>';
  }
  function norm(s){ return String(s || '').toLowerCase().trim(); }

  window.CCSearch = {
    rows: ROWS,
    render: render,
    catsOn: catsOn,
    byKey: function(q){
      q = norm(q).replace(/\s+/g, '');
      var hit = null;
      ROWS.forEach(function(r){ if(norm(r.key).replace(/\s+/g,'') === q) hit = r; });
      return hit;
    },
    basic: function(q){
      q = norm(q); var on = catsOn();
      if(!q) return ROWS.filter(function(r){ return on[r.cat]; });
      return ROWS.filter(function(r){
        if(!on[r.cat]) return false;
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
    advanced: function(f){
      var on = catsOn();
      return ROWS.filter(function(r){
        if(!on[r.cat]) return false;
        if(f.hash && !(r.hash && norm(r.hash).replace('0x','').indexOf(norm(f.hash).replace('0x','')) === 0)) return false;
        if(f.content && !(norm(r.text) && norm(r.text).indexOf(norm(f.content)) > -1)) return false;
        if(f.userId && norm(r.userId) !== norm(f.userId)) return false;
        if(f.assetId && norm(r.assetId) !== norm(f.assetId)) return false;
        if(f.assetName && norm(r.name).indexOf(norm(f.assetName)) === -1) return false;
        if(f.block && String(r.block) !== String(f.block).replace(/[#,]/g, '')) return false;
        if(f.ver && String(r.ver) !== String(f.ver)) return false;
        return true;
      });
    }
  };
})();
