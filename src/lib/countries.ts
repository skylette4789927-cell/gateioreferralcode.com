import type {BonusType, ExchangeId, TradeType} from '@/lib/exchanges';

export type Region = 'Asia' | 'Middle East' | 'Oceania' | 'North America' | 'South America' | 'Europe' | 'Africa';

export type DepositMethod = 'bank-transfer' | 'card' | 'p2p' | 'crypto' | 'e-wallet';

export type AvailabilityStatus = 'available' | 'limited' | 'not-available';

export type CountryId =
  | 'vietnam'
  | 'uae'
  | 'australia'
  | 'singapore'
  | 'canada'
  | 'taiwan'
  | 'brazil'
  | 'philippines';

export type Country = {
  id: CountryId;
  name: string;
  flag: string;
  region: Region;
  kycRequired: boolean;
  depositMethods: DepositMethod[];
  supports: Record<TradeType, boolean>;
  tags: {
    highBonusPotential: boolean;
    easyDeposit: boolean;
    kycRequired: boolean;
  };
  riskNote: string;
  updatedAt: string;
  featuredExchangeIds: ExchangeId[];
};

export type CountryExchangeOffer = {
  countryId: CountryId;
  exchangeId: ExchangeId;
  status: AvailabilityStatus;
  bonusTypes: BonusType[];
  feeDiscountNote: string;
  kycRequired: boolean;
  depositMethods: DepositMethod[];
  bestFor: string;
  supports: Record<TradeType, boolean>;
  updatedAt: string;
  restrictionNote?: string;
};

export type UserType = 'new' | 'existing';

const countries: Country[] = [
  {
    id: 'vietnam',
    name: 'Vietnam',
    flag: '🇻🇳',
    region: 'Asia',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'p2p', 'crypto'],
    supports: {spot: true, futures: true},
    tags: {highBonusPotential: true, easyDeposit: true, kycRequired: true},
    riskNote: 'Rewards and availability can vary by regulation, KYC status, and exchange campaign rules.',
    updatedAt: '2026-06-07',
    featuredExchangeIds: ['gate-io', 'okx', 'binance']
  },
  {
    id: 'uae',
    name: 'UAE',
    flag: '🇦🇪',
    region: 'Middle East',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    supports: {spot: true, futures: true},
    tags: {highBonusPotential: true, easyDeposit: true, kycRequired: true},
    riskNote: 'Local rules may affect KYC and product availability. Always confirm official terms.',
    updatedAt: '2026-06-07',
    featuredExchangeIds: ['binance', 'okx', 'gate-io']
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'Oceania',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    supports: {spot: true, futures: true},
    tags: {highBonusPotential: false, easyDeposit: true, kycRequired: true},
    riskNote: 'KYC requirements are common. Futures availability can be restricted by product rules.',
    updatedAt: '2026-06-07',
    featuredExchangeIds: ['binance', 'okx', 'gate-io']
  },
  {
    id: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    region: 'Asia',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto', 'e-wallet'],
    supports: {spot: true, futures: true},
    tags: {highBonusPotential: false, easyDeposit: true, kycRequired: true},
    riskNote: 'Availability can vary by exchange license and customer type.',
    updatedAt: '2026-06-07',
    featuredExchangeIds: ['okx', 'binance', 'gate-io']
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'North America',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    supports: {spot: true, futures: true},
    tags: {highBonusPotential: false, easyDeposit: true, kycRequired: true},
    riskNote: 'Regional restrictions can apply. Always check product availability and terms before registering.',
    updatedAt: '2026-06-07',
    featuredExchangeIds: ['binance', 'okx', 'gate-io']
  },
  {
    id: 'taiwan',
    name: 'Taiwan',
    flag: '🇹🇼',
    region: 'Asia',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'p2p', 'crypto'],
    supports: {spot: true, futures: true},
    tags: {highBonusPotential: true, easyDeposit: true, kycRequired: true},
    riskNote: 'Campaign eligibility can be region-dependent and may require KYC.',
    updatedAt: '2026-06-07',
    featuredExchangeIds: ['gate-io', 'okx', 'binance']
  },
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    region: 'South America',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'p2p', 'crypto'],
    supports: {spot: true, futures: true},
    tags: {highBonusPotential: true, easyDeposit: true, kycRequired: true},
    riskNote: 'Rewards may vary by exchange, payment method, and campaign rules.',
    updatedAt: '2026-06-07',
    featuredExchangeIds: ['binance', 'gate-io', 'okx']
  },
  {
    id: 'philippines',
    name: 'Philippines',
    flag: '🇵🇭',
    region: 'Asia',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'e-wallet', 'p2p', 'crypto'],
    supports: {spot: true, futures: true},
    tags: {highBonusPotential: true, easyDeposit: true, kycRequired: true},
    riskNote: 'Availability can be impacted by local rules, KYC status, and exchange campaign changes.',
    updatedAt: '2026-06-07',
    featuredExchangeIds: ['binance', 'okx', 'gate-io']
  }
];

const offers: CountryExchangeOffer[] = [
  {
    countryId: 'vietnam',
    exchangeId: 'gate-io',
    status: 'available',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    feeDiscountNote: 'Fee discount ranges can vary by tier and campaign.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'p2p', 'crypto'],
    bestFor: 'Altcoins and new listings',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'vietnam',
    exchangeId: 'okx',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Fee discounts may require VIP tiers or token holding.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    bestFor: 'Derivatives and active traders',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'vietnam',
    exchangeId: 'binance',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Discounts can be affected by BNB holding and campaign terms.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'p2p', 'crypto'],
    bestFor: 'Liquidity and broad product coverage',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'uae',
    exchangeId: 'binance',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Discount eligibility may vary by account status.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    bestFor: 'Liquidity and multi-product users',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'uae',
    exchangeId: 'okx',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Fee discounts may vary by tier and region.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    bestFor: 'Futures and advanced tools',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'uae',
    exchangeId: 'gate-io',
    status: 'limited',
    bonusTypes: ['fee-discount', 'trading'],
    feeDiscountNote: 'Campaign rewards can be region-dependent.',
    kycRequired: true,
    depositMethods: ['crypto', 'card'],
    bestFor: 'Altcoins',
    supports: {spot: true, futures: true},
    restrictionNote: 'Some signup campaigns may be limited by region.',
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'australia',
    exchangeId: 'binance',
    status: 'limited',
    bonusTypes: ['fee-discount', 'trading'],
    feeDiscountNote: 'Availability may depend on local product eligibility.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    bestFor: 'Spot-first traders',
    supports: {spot: true, futures: false},
    restrictionNote: 'Futures availability can be restricted for some users.',
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'australia',
    exchangeId: 'okx',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Fee discounts can vary by tier and campaign.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    bestFor: 'Derivatives and active traders',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'australia',
    exchangeId: 'gate-io',
    status: 'limited',
    bonusTypes: ['fee-discount', 'trading'],
    feeDiscountNote: 'Region and KYC can affect eligibility.',
    kycRequired: true,
    depositMethods: ['crypto', 'card'],
    bestFor: 'Altcoins',
    supports: {spot: true, futures: true},
    restrictionNote: 'Some promotions may not be available to all regions.',
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'singapore',
    exchangeId: 'okx',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Fee discounts can be tier-dependent.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    bestFor: 'Derivatives and power users',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'singapore',
    exchangeId: 'binance',
    status: 'limited',
    bonusTypes: ['fee-discount', 'trading'],
    feeDiscountNote: 'Eligibility can vary by local rules and customer type.',
    kycRequired: true,
    depositMethods: ['crypto'],
    bestFor: 'Crypto-to-crypto users',
    supports: {spot: true, futures: false},
    restrictionNote: 'Some products may be unavailable for certain users.',
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'singapore',
    exchangeId: 'gate-io',
    status: 'available',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    feeDiscountNote: 'Campaign rewards can change over time.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    bestFor: 'Altcoins',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'canada',
    exchangeId: 'binance',
    status: 'not-available',
    bonusTypes: [],
    feeDiscountNote: 'Not available for this location on this tool.',
    kycRequired: true,
    depositMethods: ['crypto'],
    bestFor: 'N/A',
    supports: {spot: false, futures: false},
    restrictionNote: 'Availability may be limited by region and product policies.',
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'canada',
    exchangeId: 'okx',
    status: 'limited',
    bonusTypes: ['fee-discount', 'trading'],
    feeDiscountNote: 'Some campaigns and products may be restricted.',
    kycRequired: true,
    depositMethods: ['crypto', 'bank-transfer'],
    bestFor: 'Spot and basic tools',
    supports: {spot: true, futures: false},
    restrictionNote: 'Futures availability can be restricted for some users.',
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'canada',
    exchangeId: 'gate-io',
    status: 'limited',
    bonusTypes: ['fee-discount', 'trading'],
    feeDiscountNote: 'Campaign availability can vary by region.',
    kycRequired: true,
    depositMethods: ['crypto'],
    bestFor: 'Altcoins',
    supports: {spot: true, futures: false},
    restrictionNote: 'Not all products are available in all locations.',
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'taiwan',
    exchangeId: 'gate-io',
    status: 'available',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    feeDiscountNote: 'Discount eligibility can be tier- and campaign-dependent.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'p2p', 'crypto'],
    bestFor: 'Altcoins',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'taiwan',
    exchangeId: 'okx',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Fees and discounts can vary by tier.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    bestFor: 'Derivatives',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'taiwan',
    exchangeId: 'binance',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Discount eligibility can vary by account.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'p2p', 'crypto'],
    bestFor: 'Liquidity',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'brazil',
    exchangeId: 'binance',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Discount and bonus terms can change by campaign.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'p2p', 'crypto'],
    bestFor: 'Liquidity',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'brazil',
    exchangeId: 'gate-io',
    status: 'limited',
    bonusTypes: ['fee-discount', 'trading'],
    feeDiscountNote: 'Some signup campaigns can be region-dependent.',
    kycRequired: true,
    depositMethods: ['crypto', 'card'],
    bestFor: 'Altcoins',
    supports: {spot: true, futures: true},
    restrictionNote: 'Some campaigns may be limited by region.',
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'brazil',
    exchangeId: 'okx',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Discount tiers can vary.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'crypto'],
    bestFor: 'Derivatives',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'philippines',
    exchangeId: 'binance',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Discount tiers can vary.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'p2p', 'crypto', 'e-wallet'],
    bestFor: 'Broad coverage',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'philippines',
    exchangeId: 'okx',
    status: 'available',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    feeDiscountNote: 'Fee discounts can change by campaign and tier.',
    kycRequired: true,
    depositMethods: ['bank-transfer', 'card', 'crypto'],
    bestFor: 'Derivatives',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  },
  {
    countryId: 'philippines',
    exchangeId: 'gate-io',
    status: 'available',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    feeDiscountNote: 'Discount eligibility can be region-dependent.',
    kycRequired: true,
    depositMethods: ['card', 'p2p', 'crypto'],
    bestFor: 'Altcoins',
    supports: {spot: true, futures: true},
    updatedAt: '2026-06-07'
  }
];

export function getCountries(): Country[] {
  return countries;
}

export function getCountryById(countryId: CountryId): Country | null {
  return countries.find((c) => c.id === countryId) ?? null;
}

export function getCountryByName(name: string): Country | null {
  const q = name.trim().toLowerCase();
  return countries.find((c) => c.name.toLowerCase() === q) ?? null;
}

export function getCountryPageSlug(countryId: CountryId): string {
  return `crypto-exchange-bonus-${countryId}`;
}

export function getCountryIdFromPageSlug(slug: string): CountryId | null {
  if (!slug.startsWith('crypto-exchange-bonus-')) return null;
  const id = slug.replace('crypto-exchange-bonus-', '') as CountryId;
  return getCountryById(id) ? id : null;
}

export function getOffersForCountry(countryId: CountryId): CountryExchangeOffer[] {
  return offers.filter((o) => o.countryId === countryId);
}

export function getOffer(countryId: CountryId, exchangeId: ExchangeId): CountryExchangeOffer | null {
  return offers.find((o) => o.countryId === countryId && o.exchangeId === exchangeId) ?? null;
}

export function getAllCountryPageSlugs(): string[] {
  return countries.map((c) => getCountryPageSlug(c.id));
}

export function checkCountryAvailability({
  countryId,
  exchangeId,
  userType,
  tradeType
}: {
  countryId: CountryId;
  exchangeId: ExchangeId;
  userType: UserType;
  tradeType: TradeType;
}): {
  status: AvailabilityStatus;
  bonusTypes: BonusType[];
  kycRequired: boolean;
  depositMethods: DepositMethod[];
  note: string;
  updatedAt: string;
} {
  const offer = getOffer(countryId, exchangeId);
  if (!offer) {
    return {
      status: 'not-available',
      bonusTypes: [],
      kycRequired: true,
      depositMethods: ['crypto'],
      note: 'No listing found for this country and exchange.',
      updatedAt: '2026-06-07'
    };
  }

  const supportsTradeType = offer.supports[tradeType];
  const baseBonusTypes = offer.bonusTypes;
  const filteredByUserType =
    userType === 'new' ? baseBonusTypes : baseBonusTypes.filter((bt) => bt !== 'signup');
  const status: AvailabilityStatus =
    offer.status === 'available' && supportsTradeType ? 'available' : offer.status === 'not-available' ? 'not-available' : 'limited';

  const noteParts: string[] = [];
  if (!supportsTradeType) noteParts.push('Selected trade type may be restricted.');
  if (offer.restrictionNote) noteParts.push(offer.restrictionNote);
  noteParts.push('Rewards may vary by country, campaign, and account status.');

  return {
    status,
    bonusTypes: status === 'not-available' ? [] : filteredByUserType,
    kycRequired: offer.kycRequired,
    depositMethods: offer.depositMethods,
    note: noteParts.join(' '),
    updatedAt: offer.updatedAt
  };
}

