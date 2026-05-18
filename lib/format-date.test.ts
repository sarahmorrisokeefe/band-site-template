import { describe, expect, it } from 'vitest';

import { formatShowDate, formatYear } from './format-date';

describe('formatShowDate', () => {
  it('formats an ISO datetime as a short date', () => {
    expect(formatShowDate('2026-06-01T20:00:00Z')).toBe('Jun 1, 2026');
  });

  it('falls back to "Date TBA" for null', () => {
    expect(formatShowDate(null)).toBe('Date TBA');
  });

  it('falls back to "Date TBA" for an unparseable string', () => {
    expect(formatShowDate('not-a-date')).toBe('Date TBA');
  });
});

describe('formatYear', () => {
  it('extracts the year from an ISO date', () => {
    expect(formatYear('2025-03-10')).toBe('2025');
  });

  it('returns an empty string for null', () => {
    expect(formatYear(null)).toBe('');
  });

  it('returns an empty string for an unparseable string', () => {
    expect(formatYear('whenever')).toBe('');
  });
});
