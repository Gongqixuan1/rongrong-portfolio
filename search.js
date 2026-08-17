/* Portfolio search — ready to integrate without changing existing page content. */
(function(){
  const entries = [
    {title:'我的时间图谱', text:'重庆科技大学 会计学 大学生创业助学基地 科技服务中心 行政总监 年度先进个人', id:'timeline'},
    {title:'实习经历', text:'中瑞诚 会计师事务所 审计 招商银行 厅堂助理 亿龙达 跨境物流 新媒体运营', id:'internships'},
    {title:'项目经历', text:'CCD相机租赁项目 校园文创设计大赛 项目负责人', id:'projects'},
    {title:'竞赛经历', text:'挑战杯 正大杯 MPAcc案例大赛 商业案例 封面设计', id:'competitions'},
    {title:'我的副本角色', text:'攀岩馆助教 托管班老师 封面设计师 WPS 豆包 头脑风暴', id:'side-projects'},
    {title:'技能', text:'Excel PowerPoint Word Photoshop SPSS AI', id:'skills'},
    {title:'联系方式', text:'微信 QQ 邮箱 小红书 宫启宣的头脑风暴', id:'contact'}
  ];
  function init(){
    if(document.getElementById('portfolio-search')) return;
    const button=document.createElement('button'); button.id='portfolio-search'; button.setAttribute('aria-label','搜索网站内容'); button.textContent='⌕';
    const nav=document.querySelector('nav')||document.querySelector('.nav');
    if(nav) nav.appendChild(button); else document.body.appendChild(button);
    const overlay=document.createElement('div'); overlay.id='search-overlay'; overlay.innerHTML='<div class="search-panel"><button class="search-close" aria-label="关闭">×</button><div class="search-label">SEARCH</div><input id="search-input" placeholder="搜索我的经历、作品、技能……" autocomplete="off"><div id="search-results"></div></div>';
    document.body.appendChild(overlay);
    const input=overlay.querySelector('#search-input'), results=overlay.querySelector('#search-results');
    const render=(q)=>{const s=q.trim().toLowerCase(); if(!s){results.innerHTML='<div class="search-hint">试试：审计、设计、竞赛、攀岩、技能</div>';return;} const found=entries.filter(e=>(e.title+' '+e.text).toLowerCase().includes(s)); results.innerHTML=found.length?found.map(e=>`<button class="search-result" data-id="${e.id}"><strong>${e.title}</strong><span>${e.text}</span></button>`).join(''):'<div class="search-hint">没有找到相关内容</div>';};
    const open=()=>{overlay.classList.add('open'); setTimeout(()=>input.focus(),80); render('');};
    button.addEventListener('click',open); overlay.querySelector('.search-close').addEventListener('click',()=>overlay.classList.remove('open')); overlay.addEventListener('click',e=>{if(e.target===overlay) overlay.classList.remove('open');}); input.addEventListener('input',e=>render(e.target.value)); document.addEventListener('keydown',e=>{if(e.key==='Escape') overlay.classList.remove('open');});
    results.addEventListener('click',e=>{const r=e.target.closest('.search-result'); if(!r)return; const el=document.getElementById(r.dataset.id); overlay.classList.remove('open'); if(el) el.scrollIntoView({behavior:'smooth',block:'start'});});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();