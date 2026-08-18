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

  function initSearch(){
    if(document.getElementById('portfolio-search')) return;
    const button=document.createElement('button'); button.id='portfolio-search'; button.setAttribute('aria-label','搜索网站内容'); button.textContent='⌕';
    const nav=document.querySelector('nav')||document.querySelector('.nav');
    if(nav) nav.appendChild(button); else document.body.appendChild(button);
    const overlay=document.createElement('div'); overlay.id='search-overlay'; overlay.innerHTML='<div class="search-panel"><button class="search-close" aria-label="关闭">×</button><div class="search-label">SEARCH</div><input id="search-input" placeholder="搜索我的经历、作品、技能……" autocomplete="off"><div id="search-results"></div></div>';
    document.body.appendChild(overlay);
    const input=overlay.querySelector('#search-input'), results=overlay.querySelector('#search-results');
    const render=(q)=>{const s=q.trim().toLowerCase(); if(!s){results.innerHTML='<div class="search-hint">试试：审计、设计、竞赛、攀岩、技能</div>';return;} const found=entries.filter(e=>(e.title+' '+e.text).toLowerCase().includes(s)); results.innerHTML=found.length?found.map(e=>`<button class="search-result" data-id="${e.id}"><strong>${e.title}</strong><span>${e.text}</span></button>`).join(''):'<div class="search-hint">没有找到相关内容</div>';};
    const open=()=>{overlay.classList.add('open'); setTimeout(()=>input.focus(),80); render('');};
    button.addEventListener('click',open); overlay.querySelector('.search-close').addEventListener('click',()=>overlay.classList.remove('open')); overlay.addEventListener('click',e=>{if(e.target===overlay) overlay.classList.remove('open');}); input.addEventListener('input',e=>render(e.target.value)); document.addEventListener('keydown',e=>{if(e.key==='Escape') overlay.classList.remove('open'); if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open();}});
    results.addEventListener('click',e=>{const r=e.target.closest('.search-result'); if(!r)return; const el=document.getElementById(r.dataset.id); overlay.classList.remove('open'); if(el) el.scrollIntoView({behavior:'smooth',block:'start'});});
  }

  function injectEditorialSystem(){
    if(document.getElementById('editorial-upgrade')) return;
    const style=document.createElement('style'); style.id='editorial-upgrade'; style.textContent=`
      :root{--editorial-ink:#081a2e;--editorial-blue:#173f73;--editorial-orange:#ff6b00;--editorial-rule:#d9dee6;--editorial-paper:#f7f8fa;}
      body{background:#fff;cursor:default;overflow-x:hidden;}
      body:before{content:'';position:fixed;inset:0;pointer-events:none;z-index:9000;opacity:.045;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.32'/%3E%3C/svg%3E');mix-blend-mode:multiply;}
      .nav{height:76px;border-bottom:1px solid #0b1f3a18;box-shadow:0 8px 30px #0b1f3a08;}
      .navin{position:relative;}
      .brand{font-size:14px;letter-spacing:-.02em;}
      .brand:after{content:'PERSONAL PORTFOLIO / 2026';display:inline-block;margin-left:14px;color:#8994a4;font-size:8px;font-weight:500;letter-spacing:.16em;vertical-align:middle;}
      .links{gap:20px;font-size:9px;letter-spacing:.16em;}
      .links a{position:relative;padding:8px 0;transition:color .25s ease;}
      .links a:after{content:'';position:absolute;left:0;right:100%;bottom:2px;height:1px;background:var(--editorial-orange);transition:right .25s ease;}
      .links a:hover:after{right:0;}
      #portfolio-search{margin-left:20px;width:34px;height:34px;border:1px solid #0b1f3a20;border-radius:50%;background:#fff;color:var(--editorial-ink);cursor:pointer;transition:.25s;font-size:20px;line-height:1;}
      #portfolio-search:hover{background:var(--editorial-ink);color:#fff;transform:rotate(12deg);}
      .hero{min-height:calc(100svh - 76px);background:#f7f4ee;}
      .hero:before{width:540px;height:540px;right:-180px;top:-180px;background:radial-gradient(circle,#ffd86b88 0 42%,transparent 68%);filter:blur(8px);}
      .hero:after{width:420px;height:420px;left:-220px;bottom:-220px;background:radial-gradient(circle,#f5a9c566 0 35%,transparent 70%);filter:blur(6px);}
      .hero-grid{gap:clamp(55px,7vw,100px);padding:clamp(72px,9vw,120px) 0;}
      .hero h1{font-family:Inter,'Noto Serif SC',serif;font-weight:800;letter-spacing:-.085em;font-size:clamp(88px,12vw,154px);line-height:.78;}
      .hero h1:after{content:'RONGRONG';display:block;font-family:Inter,sans-serif;font-size:10px;font-weight:700;letter-spacing:.42em;line-height:1;margin-top:24px;color:#8b95a3;}
      .hero-sub{max-width:680px;font-size:clamp(17px,1.8vw,23px);letter-spacing:-.025em;}
      .hero-note{max-width:540px;margin-top:18px;}
      .tags{margin-top:25px;gap:6px;}
      .tag{padding:7px 10px;font-size:8px;letter-spacing:.08em;background:#ffffffaa;backdrop-filter:blur(6px);}
      .funfacts{margin-top:30px;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;border-top:1px solid #0b1f3a22;border-bottom:1px solid #0b1f3a22;}
      .fact{background:transparent;border:0;border-right:1px solid #0b1f3a18;padding:15px 13px 15px 0;}
      .fact:last-child{border-right:0;}
      .fact strong{font-family:Inter,sans-serif;font-size:25px;font-weight:750;letter-spacing:-.04em;}
      .avatar-wrap{filter:drop-shadow(0 30px 50px #0b1f3a18);}
      .avatar-card{inset:15px 12px 12px;padding:10px;transform:rotate(2.8deg);border:1px solid #0b1f3a20;box-shadow:0 30px 80px #0b1f3a20;}
      .avatar-card img{filter:saturate(.92) contrast(1.02);}
      .sticker{font-size:8px;letter-spacing:.12em;}
      .section{padding:clamp(82px,9vw,125px) 0;}
      .top{display:grid;grid-template-columns:minmax(160px,.28fr) 1fr;gap:30px;align-items:end;margin-bottom:55px;}
      .kicker{font-size:9px;letter-spacing:.2em;white-space:nowrap;}
      .title{font-family:Inter,'Noto Serif SC',serif;font-size:clamp(48px,6vw,78px);font-weight:700;letter-spacing:-.06em;}
      .top:after{content:'SCROLL / READ / EXPLORE';grid-column:2;color:#9aa4b2;font-size:8px;letter-spacing:.22em;justify-self:end;margin-top:-28px;}
      .timeline{grid-template-columns:repeat(6,1fr);border-top:1px solid var(--editorial-ink);}
      .time{padding:20px 20px 22px 0;min-height:340px;}
      .time:before{width:7px;height:7px;top:-4px;box-shadow:0 0 0 4px #fff;}
      .year{font-family:Inter,sans-serif;font-size:9px;letter-spacing:.12em;color:#7e8998;margin-bottom:34px;}
      .time h3{font-size:15px;letter-spacing:-.025em;}
      .time p{font-size:11px;line-height:1.9;}
      .quote{padding:95px 0 20px;position:relative;}
      .quote:before{content:'“';position:absolute;left:0;top:50px;font-family:Georgia,serif;font-size:130px;line-height:1;color:#ff7a0028;}
      .quote p{font-size:clamp(38px,4.7vw,64px);font-weight:400;letter-spacing:-.04em;}
      .experience{border-top:1px solid var(--editorial-ink);}
      .exp-item{display:grid;grid-template-columns:170px 1fr;grid-template-rows:auto auto;column-gap:35px;padding:30px 0;border-top:0;border-bottom:1px solid var(--editorial-rule);}
      .exp-item:before{left:0;top:31px;font-size:11px;}
      .exp-date{grid-row:1 / span 2;padding-left:20px;font-family:Inter,sans-serif;font-size:9px;letter-spacing:.12em;}
      .exp-item h3{margin:0;font-size:22px;letter-spacing:-.035em;}
      .exp-role{margin:5px 0 12px;font-size:10px;}
      .exp-item ul{grid-column:2;font-size:11px;line-height:1.95;}
      .project-grid,.competition-grid,.stories{gap:1px;background:var(--editorial-rule);border:1px solid var(--editorial-rule);}
      .project-card,.comp,.story{border:0;border-radius:0;}
      .project-card{min-height:330px;padding:28px;display:flex;flex-direction:column;}
      .project-card h3{font-size:25px;letter-spacing:-.045em;}
      .project-card p,.comp p,.story p{line-height:1.9;}
      .project-meta{margin-top:auto;padding-top:18px;}
      .works{margin-top:75px;}
      .works-head{border-top:1px solid var(--editorial-ink);padding-top:18px;}
      .works-head h3{font-family:Inter,sans-serif;font-size:35px;letter-spacing:-.05em;}
      .portfolio{background:#071a34;padding:34px;box-shadow:0 25px 70px #0b1f3a20;}
      .portfolio:after{content:'VISUAL ARCHIVE';position:absolute;left:34px;top:18px;color:#ffffff66;font:700 8px Inter,sans-serif;letter-spacing:.24em;}
      .book{min-height:650px;grid-template-columns:80px minmax(0,1fr) 80px;}
      .book-stage{height:650px;}
      .book-stage img{max-height:650px;box-shadow:0 30px 70px #0007;transition:transform .45s cubic-bezier(.2,.8,.2,1);}
      .book-stage img:hover{transform:scale(1.012) rotate(-.35deg);}
      .book-btn{width:48px;height:48px;background:#ffffff0c;color:#fff;border-color:#ffffff33;}
      .book-btn:hover{background:var(--editorial-orange);}
      .book-info,.book-count{font-family:Inter,sans-serif;font-size:8px;letter-spacing:.18em;}
      .comp{padding:30px;min-height:270px;}
      .comp h3{font-family:Inter,sans-serif;font-size:38px;font-weight:750;letter-spacing:-.06em;}
      .badge{font-size:7px;letter-spacing:.16em;}
      .story-image{height:300px;filter:saturate(.88);}
      .story-body{padding:25px 27px 30px;}
      .story h3{font-family:Inter,sans-serif;font-size:34px;font-weight:700;letter-spacing:-.055em;}
      .skill-box{border:0;border-top:1px solid var(--editorial-rule);padding:22px 0;min-height:120px;background:transparent;}
      .skill-box strong{font-family:Inter,sans-serif;font-size:15px;letter-spacing:-.02em;}
      .contact{background:#f7f4ee;}
      .contact h2{font-family:Inter,'Noto Serif SC',sans-serif;font-weight:750;letter-spacing:-.07em;}
      .contact-list{border-top:1px solid var(--editorial-ink);}
      .contact-item{grid-template-columns:110px 1fr;padding:15px 0;}
      .footer{border-top:1px solid var(--editorial-rule);margin-top:65px;padding-top:20px;}
      .modal-card{box-shadow:0 30px 100px #0005;border:1px solid #0b1f3a15;}
      .modal h2{font-family:Inter,'Noto Serif SC',sans-serif;font-weight:750;letter-spacing:-.055em;}
      #scroll-progress{position:fixed;left:0;top:0;height:2px;width:0;background:var(--editorial-orange);z-index:10001;transition:width .08s linear;}
      #cursor-orb{position:fixed;width:18px;height:18px;border:1px solid #ff6b00aa;border-radius:50%;pointer-events:none;z-index:10002;transform:translate(-50%,-50%);opacity:0;transition:width .2s,height .2s,opacity .2s,background .2s;mix-blend-mode:multiply;}
      .reveal{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.8,.2,1);}
      .reveal.is-visible{opacity:1;transform:none;}
      .tilt-card{transform-style:preserve-3d;will-change:transform;}
      .magnetic{transition:transform .25s cubic-bezier(.2,.8,.2,1);}
      @media(max-width:900px){.top{grid-template-columns:1fr;gap:5px}.top:after{grid-column:auto;justify-self:start;margin-top:8px}.exp-item{grid-template-columns:120px 1fr;column-gap:22px}.portfolio{padding:20px}.book{min-height:540px;grid-template-columns:55px minmax(0,1fr) 55px}.book-stage{height:540px;}}
      @media(max-width:560px){.nav{height:58px}.brand:after{display:none}#portfolio-search{margin-left:auto;width:31px;height:31px}.hero-grid{padding:58px 0}.hero h1{font-size:clamp(72px,24vw,108px)}.funfacts{grid-template-columns:repeat(2,1fr)}.fact{border-bottom:1px solid #0b1f3a18}.top{margin-bottom:35px}.title{font-size:clamp(45px,16vw,70px)}.time{min-height:0}.exp-item{display:block;padding:24px 0 24px 18px}.exp-date{padding-left:0;margin-bottom:7px}.exp-item h3{font-size:18px}.exp-item ul{margin-top:8px}.project-card{min-height:260px}.portfolio{padding:12px}.portfolio:after{left:15px;top:8px}.book{grid-template-columns:40px minmax(0,1fr) 40px;min-height:0}.book-stage{height:calc(100svh - 190px);min-height:360px;max-height:600px}.book-btn{width:36px;height:36px}.story-image{height:auto;aspect-ratio:4/3}.contact h2{font-size:clamp(58px,18vw,82px);}}
      @media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}.reveal{opacity:1;transform:none}.tilt-card{transform:none!important}#cursor-orb{display:none;}}
    `;
    document.head.appendChild(style);

    const progress=document.createElement('div'); progress.id='scroll-progress'; document.body.appendChild(progress);
    const cursor=document.createElement('div'); cursor.id='cursor-orb'; document.body.appendChild(cursor);

    document.querySelectorAll('.section,.contact,.hero').forEach(el=>el.classList.add('reveal'));
    document.querySelectorAll('.project-card,.comp,.story,.skill-box,.fact').forEach(el=>el.classList.add('tilt-card'));
    document.querySelectorAll('.book-btn,#portfolio-search,.sticker,.tag').forEach(el=>el.classList.add('magnetic'));

    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible');}),{threshold:.08,rootMargin:'0px 0px -50px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    function updateProgress(){const h=document.documentElement.scrollHeight-innerHeight; progress.style.width=(h>0?(scrollY/h)*100:0)+'%';}
    window.addEventListener('scroll',updateProgress,{passive:true}); updateProgress();

    let mx=0,my=0,tx=0,ty=0;
    window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.opacity='1';},{passive:true});
    function cursorLoop(){tx+=(mx-tx)*.18;ty+=(my-ty)*.18;cursor.style.left=tx+'px';cursor.style.top=ty+'px';requestAnimationFrame(cursorLoop);} cursorLoop();
    document.querySelectorAll('a,button,.tag,.book-stage img').forEach(el=>{el.addEventListener('mouseenter',()=>{cursor.style.width='34px';cursor.style.height='34px';cursor.style.background='#ff6b0018';});el.addEventListener('mouseleave',()=>{cursor.style.width='18px';cursor.style.height='18px';cursor.style.background='transparent';});});
    document.addEventListener('mouseleave',()=>cursor.style.opacity='0'); document.addEventListener('mouseenter',()=>cursor.style.opacity='1');

    document.querySelectorAll('.tilt-card').forEach(card=>{
      card.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-5px)`;});
      card.addEventListener('mouseleave',()=>{card.style.transform='';});
    });

    document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=el.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.12}px,${y*.12}px)`;});el.addEventListener('mouseleave',()=>el.style.transform='');});

    const hero=document.querySelector('.hero-grid');
    window.addEventListener('scroll',()=>{if(!hero||innerWidth<900)return;const y=Math.min(scrollY,700);hero.style.transform=`translateY(${y*.045}px)`;},{passive:true});

    const sections=[...document.querySelectorAll('main section[id]')]; const navLinks=[...document.querySelectorAll('.links a')];
    const navIO=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active-nav',a.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-35% 0px -55% 0px',threshold:0}); sections.forEach(s=>navIO.observe(s));

    document.querySelectorAll('.fact strong').forEach(el=>{
      const raw=el.textContent.trim(); const match=raw.match(/^(\\d+)/); if(!match)return; const target=Number(match[1]); const suffix=raw.slice(match[1].length); let done=false;
      const counter=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!done){done=true;const start=performance.now();const tick=t=>{const p=Math.min(1,(t-start)/800);el.textContent=Math.floor((1-Math.pow(1-p,3))*target)+suffix;if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);counter.disconnect();}})); counter.observe(el);
    });

    document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.links .active-nav')?.classList.remove('active-nav')));
  }

  function init(){initSearch();injectEditorialSystem();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();