export function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return '$0';
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(value);
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

