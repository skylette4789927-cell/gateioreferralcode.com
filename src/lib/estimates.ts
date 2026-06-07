import type {Exchange, TradeType} from '@/lib/exchanges';

export type FeeSavingsEstimate = {
  annualVolume: number;
  assumedAnnualFees: number;
  savingsRange: readonly [number, number];
  discountRange: readonly [number, number];
};

export function estimateFeeSavings({
  exchange,
  monthlyVolume,
  tradeType
}: {
  exchange: Exchange;
  monthlyVolume: number;
  tradeType: TradeType;
}): FeeSavingsEstimate {
  const annualVolume = Number.isFinite(monthlyVolume) && monthlyVolume > 0 ? monthlyVolume * 12 : 0;
  const tier = exchange.feeModel[tradeType];
  const assumedAnnualFees = annualVolume * tier.takerFeeRate;
  const [low, high] = tier.possibleDiscountRange;
  const lowSavings = assumedAnnualFees * low;
  const highSavings = assumedAnnualFees * high;

  return {
    annualVolume,
    assumedAnnualFees,
    savingsRange: [lowSavings, highSavings],
    discountRange: [low, high]
  };
}

