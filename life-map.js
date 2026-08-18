/* LIFE MAP DEMO — adds interaction without changing page content */
(function(){
  const load=()=>{
    const timeline=document.querySelector('#about .timeline');
    if(!timeline || timeline.dataset.lifeMapReady) return;
    timeline.dataset.lifeMapReady='1';
    const link=document.createElement('link'); link.rel='stylesheet'; link.href='life-map.css'; document.head.appendChild(link);

    const items=[...timeline.querySelectorAll('.time')];
    const layer=document.createElement('div'); layer.className='life-map-layer';
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.classList.add('life-map-svg');
    const path=document.createElementNS('http://www.w3.org/2000/svg','path'); path.classList.add('life-map-path');
    svg.appendChild(path); layer.appendChild(svg);
    const label=document.createElement('div'); label.className='life-map-label'; label.innerHTML='YOU ARE HERE · <b>2023.09</b>'; layer.appendChild(label);
    const nodes=items.map((item,i)=>{item.classList.add('life-pending'); const n=document.createElement('span'); n.className='life-node'; n.dataset.index=i; layer.appendChild(n); return n;});
    timeline.appendChild(layer);
    const hint=document.createElement('div'); hint.className='life-map-hint'; hint.innerHTML='<span>SCROLL THROUGH THE YEARS</span><span>2023 → 2026</span>'; timeline.after(hint);

    function layout(){
      const rect=timeline.getBoundingClientRect();
      const mobile=window.matchMedia('(max-width:900px)').matches;
      const points=items.map(item=>{
        const r=item.getBoundingClientRect();
        if(mobile) return {x:18,y:r.top-rect.top+30};
        return {x:r.left-rect.left+r.width/2,y:30};
      });
      const w=Math.max(1,rect.width), h=Math.max(1,rect.height);
      svg.setAttribute('viewBox',`0 0 ${mobile?40:w} ${h}`);
      svg.setAttribute('preserveAspectRatio','none');
      if(mobile){
        svg.style.height=h+'px'; svg.style.width='40px';
        path.setAttribute('d',points.map((p,i)=>(i?'L':'M')+` ${p.x} ${p.y}`).join(' '));
      }else{
        svg.style.height=h+'px'; svg.style.width='100%';
        let d=`M ${points[0].x} ${points[0].y}`;
        for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],mx=(a.x+b.x)/2; d+=` C ${mx} ${a.y-12}, ${mx} ${b.y+12}, ${b.x} ${b.y}`;}
        path.setAttribute('d',d);
      }
      points.forEach((p,i)=>{nodes[i].style.left=p.x+'px';nodes[i].style.top=p.y+'px';});
      requestAnimationFrame(()=>path.classList.add('drawn'));
    }

    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const i=items.indexOf(entry.target); if(i<0)return;
          entry.target.classList.add('life-active'); entry.target.classList.remove('life-pending');
          nodes[i].classList.add('current');
          label.classList.add('show');
          label.querySelector('b').textContent=entry.target.querySelector('.year')?.textContent||'';
          items.forEach((it,j)=>{if(j!==i)nodes[j].classList.remove('current')});
        }
      });
    },{threshold:.32,rootMargin:'-8% 0px -45% 0px'});
    items.forEach(item=>observer.observe(item));
    layout();
    window.addEventListener('resize',layout,{passive:true});
    setTimeout(layout,500);
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',load); else load();
})();
