import test from 'node:test';
import assert from 'node:assert/strict';
import { review } from './rules.js';

test('returns explainable findings in text order', () => {
  const findings = review('全网第一，保证见效，限时抢购');
  assert.deepEqual(findings.map(item => item.id), ['absolute', 'guarantee', 'scarcity']);
  assert.ok(findings.every(item => item.reason && item.question && item.suggestion));
});

test('does not flag neutral copy', () => {
  assert.deepEqual(review('欢迎查看产品功能和使用说明。'), []);
});
