import { review } from './rules.js';

const input = document.querySelector('#copy');
const output = document.querySelector('#results');
const count = document.querySelector('#count');
let current = [];

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function render() {
  current = review(input.value);
  count.textContent = `${input.value.length} 字 · ${current.length} 处待核查`;
  if (!input.value.trim()) { output.innerHTML = '<p class="empty">输入营销文案，开始审阅。</p>'; return; }
  if (!current.length) { output.innerHTML = '<p class="empty">未命中当前规则。仍需结合事实、发布地区和平台要求人工复核。</p>'; return; }
  output.innerHTML = current.map((item, index) => `<article class="finding"><div class="finding-top"><span class="number">${String(index + 1).padStart(2, '0')}</span><span class="badge ${item.severity === '高' ? 'high' : ''}">${item.severity}关注</span><span class="category">${item.category}</span></div><blockquote>“${escapeHTML(item.match)}”</blockquote><p>${escapeHTML(item.reason)}</p><dl><dt>核查问题</dt><dd>${escapeHTML(item.question)}</dd><dt>修改方向</dt><dd>${escapeHTML(item.suggestion)}</dd></dl></article>`).join('');
}

document.querySelector('#analyze').addEventListener('click', render);
document.querySelector('#clear').addEventListener('click', () => { input.value = ''; render(); input.focus(); });
document.querySelector('#copy-report').addEventListener('click', async () => {
  const report = `# Campaign Lens 审阅清单\n\n${current.length ? current.map((item, i) => `${i + 1}. [${item.severity}] ${item.category}：“${item.match}”\n   - 原因：${item.reason}\n   - 核查：${item.question}\n   - 修改：${item.suggestion}`).join('\n') : '当前无规则命中。'}\n\n仅供人工复核参考，不构成法律意见。`;
  try { await navigator.clipboard.writeText(report); document.querySelector('#copy-report').textContent = '已复制'; }
  catch { document.querySelector('#copy-report').textContent = '复制失败，请检查浏览器权限'; }
  setTimeout(() => document.querySelector('#copy-report').textContent = '复制审阅清单', 2500);
});
render();
