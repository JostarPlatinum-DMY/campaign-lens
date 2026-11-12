export const rules = [
  { id: 'absolute', category: '绝对化表述', severity: '高', pattern: /(?:全网第一|行业第一|最(?:好|强|低|快)|100%|百分之百|绝对(?:安全|有效))/gi, reason: '绝对性或排名表述通常需要特别充分的依据，并可能让受众形成无法兑现的预期。', question: '是否有可核验的比较口径、时间范围和证据？', suggestion: '改成有来源和范围的具体描述；无法证明时删除排名或绝对措辞。' },
  { id: 'guarantee', category: '效果承诺', severity: '高', pattern: /(?:保证(?:成功|见效|收益)|稳赚不赔|零风险|永久有效|包治百病)/gi, reason: '确定性结果承诺可能掩盖个体差异或实际限制。', question: '承诺的结果是否有充分证据？是否存在适用条件与例外？', suggestion: '写明可验证的功能、条件和限制，避免保证结果。' },
  { id: 'scarcity', category: '促销信息', severity: '中', pattern: /(?:仅剩\s*\d+\s*(?:份|个|席|件)|最后\s*\d+\s*(?:小时|天)|今日(?:最后|截止)|限时(?:抢购|优惠))/gi, reason: '稀缺或限时信息需要与实际库存、活动期限一致。', question: '库存和截止时间是否真实、可更新，并与活动规则一致？', suggestion: '补充明确的截止时间、适用条件，并确认展示数据准确。' },
  { id: 'privacy', category: '个人信息', severity: '中', pattern: /(?:无需授权.{0,12}(?:收集|获取)|自动(?:采集|抓取).{0,12}(?:用户|个人)|随意(?:分享|出售).{0,12}(?:数据|信息))/gi, reason: '涉及个人信息处理的宣传应核实具体数据来源、权限和使用范围。', question: '数据类型、处理目的和授权依据是什么？', suggestion: '明确说明数据处理边界，并交由隐私负责人复核。' },
  { id: 'copyright', category: '素材权利', severity: '中', pattern: /(?:直接(?:搬运|盗用|复制).{0,12}(?:图片|视频|素材)|无需授权.{0,12}(?:图片|视频|音乐|素材))/gi, reason: '第三方素材的使用范围可能受著作权或许可条款限制。', question: '素材来源、许可范围和商业使用权限是否有记录？', suggestion: '使用自有或获许可素材，并保存授权记录。' },
];

export function review(text) {
  const findings = [];
  for (const rule of rules) {
    const matches = [...text.matchAll(new RegExp(rule.pattern.source, rule.pattern.flags))];
    for (const match of matches) findings.push({ ...rule, match: match[0], index: match.index });
  }
  return findings.sort((a, b) => a.index - b.index || a.id.localeCompare(b.id));
}
