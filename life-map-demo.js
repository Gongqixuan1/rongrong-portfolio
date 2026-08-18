/* Life Map — visual-only enhancement layer. Does not alter site copy/content. */
(() => {
  const timeline = [
    ['2023.09','进入重庆科技大学'],
    ['2023.10','大学生创业助学基地'],
    ['2024.09','年度先进个人 · 行政总监'],
    ['2025.01','中瑞诚会计师事务所'],
    ['2026.01','招商银行'],
    ['2026.07','亿龙达跨境物流']
  ];
  const root = document.querySelector('[data-life-map]');
  if (!root) return;
  const nodes = [...root.querySelectorAll('[data-life-node]')];
  const indicator = root.querySelector('[data-life-here]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setActive = i => {
    nodes.forEach((n, j) => n.classList.toggle('is-active', j === i));
    if (indicator && timeline[i]) indicator.textContent = `YOU ARE HERE · ${timeline[i][0]}`;
  };
  const io = new IntersectionObserver(entries => {
    entries.filter(e => e.isIntersecting).forEach(e => {
      const i = nodes.indexOf(e.target);
      if (i >= 0) setActive(i);
      e.target.classList.add('is-visible');
    });
  }, {threshold: reduce ? 0.05 : 0.45});
  nodes.forEach(n => io.observe(n));
})();
