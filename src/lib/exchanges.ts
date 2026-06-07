export type Locale = 'en' | 'vi' | 'es' | 'pt' | 'tr' | 'id' | 'ru' | 'zh';

export type ExchangeId =
  | 'gate-io'
  | 'okx'
  | 'binance'
  | 'bybit'
  | 'kucoin'
  | 'coinbase'
  | 'kraken'
  | 'bitget'
  | 'mexc'
  | 'htx'
  | 'bitfinex'
  | 'gemini'
  | 'bitstamp'
  | 'crypto-com'
  | 'bingx'
  | 'upbit'
  | 'bithumb'
  | 'coincheck'
  | 'bitflyer'
  | 'lbank'
  | 'poloniex'
  | 'deribit'
  | 'bitmart'
  | 'phemex'
  | 'woo-x'
  | 'deepcoin'
  | 'coinex'
  | 'bitrue'
  | 'whitebit'
  | 'ascendex'
  | 'bitso'
  | 'bitpanda'
  | 'exmo'
  | 'bitvavo'
  | 'indodax'
  | 'coinswitch'
  | 'wazirx'
  | 'zebpay'
  | 'coindcx'
  | 'bitkub'
  | 'novadax'
  | 'mercado-bitcoin'
  | 'bitbank'
  | 'btcbox'
  | 'okcoin'
  | 'bitmex'
  | 'bitopro'
  | 'cex-io'
  | 'coins-ph'
  | 'pionex'
  | 'btse'
  | 'bitrabbit';

export type BonusType = 'signup' | 'trading' | 'fee-discount' | 'voucher' | 'cashback';

export type TradeType = 'spot' | 'futures';

export type BestForTag = 'altcoins' | 'new_listings' | 'derivatives' | 'advanced_traders' | 'liquidity' | 'low_spreads';

export type CodeRules = {
  minLength: number;
  maxLength: number;
  pattern: string;
};

export type FeeTierAssumption = {
  takerFeeRate: number;
  makerFeeRate: number;
  possibleDiscountRange: [number, number];
};

export type FeeModel = Record<TradeType, FeeTierAssumption>;

export type Exchange = {
  id: ExchangeId;
  name: string;
  logo?: string;
  primaryCode: string;
  codeRules?: CodeRules;
  registerUrl: string;
  bonusTypes: BonusType[];
  bestFor: BestForTag[];
  feeModel: FeeModel;
  updatedAt: string;
  availabilityNote?: string;
  riskNote?: string;
  kycRequired?: boolean;
  countries?: string[];
};

const defaultFeeModel: FeeModel = {
  spot: {takerFeeRate: 0.001, makerFeeRate: 0.001, possibleDiscountRange: [0.03, 0.2]},
  futures: {takerFeeRate: 0.0006, makerFeeRate: 0.0002, possibleDiscountRange: [0.03, 0.2]}
};

const defaultAvailabilityNote = 'Availability can vary by country and campaign rules.';
const defaultRiskNote = 'Rewards and fee discounts are not guaranteed and may require KYC, deposits, and/or trading tasks.';

const exchanges: Exchange[] = [
  {
    id: 'gate-io',
    name: 'Gate.io',
    logo: '/logos/gate-io.svg',
    primaryCode: 'YOURGATE',
    codeRules: {minLength: 4, maxLength: 20, pattern: '^[0-9A-Za-z]+$'},
    registerUrl: 'https://www.gateport.business/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['altcoins', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-06',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true,
    countries: ['Vietnam', 'UAE', 'Australia', 'Singapore', 'Taiwan']
  },
  {
    id: 'okx',
    name: 'OKX',
    logo: '/logos/okx.svg',
    primaryCode: 'YOUR_OKX_CODE',
    codeRules: {minLength: 6, maxLength: 20, pattern: '^[0-9A-Za-z]+$'},
    registerUrl: 'https://www.okx.com/join',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    bestFor: ['derivatives', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-06',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true,
    countries: ['Vietnam', 'UAE', 'Australia', 'Singapore', 'Taiwan']
  },
  {
    id: 'binance',
    name: 'Binance',
    logo: '/logos/binance.svg',
    primaryCode: 'YOUR_BINANCE_CODE',
    codeRules: {minLength: 4, maxLength: 20, pattern: '^[0-9A-Za-z]+$'},
    registerUrl: 'https://www.binance.com/en/register',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-06',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true,
    countries: ['Vietnam', 'UAE', 'Australia', 'Singapore', 'Taiwan']
  },
  {
    id: 'bybit',
    name: 'Bybit',
    primaryCode: 'YOUR_BYBIT_CODE',
    registerUrl: 'https://www.bybit.com/en-US/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['derivatives', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'kucoin',
    name: 'KuCoin',
    primaryCode: 'YOUR_KUCOIN_CODE',
    registerUrl: 'https://www.kucoin.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['altcoins', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    primaryCode: 'YOUR_COINBASE_CODE',
    registerUrl: 'https://www.coinbase.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'kraken',
    name: 'Kraken',
    primaryCode: 'YOUR_KRAKEN_CODE',
    registerUrl: 'https://www.kraken.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitget',
    name: 'Bitget',
    primaryCode: 'YOUR_BITGET_CODE',
    registerUrl: 'https://www.bitget.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['derivatives', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'mexc',
    name: 'MEXC',
    primaryCode: 'YOUR_MEXC_CODE',
    registerUrl: 'https://www.mexc.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['altcoins', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'htx',
    name: 'HTX',
    primaryCode: 'YOUR_HTX_CODE',
    registerUrl: 'https://www.htx.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['altcoins', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitfinex',
    name: 'Bitfinex',
    primaryCode: 'YOUR_BITFINEX_CODE',
    registerUrl: 'https://www.bitfinex.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'gemini',
    name: 'Gemini',
    primaryCode: 'YOUR_GEMINI_CODE',
    registerUrl: 'https://www.gemini.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitstamp',
    name: 'Bitstamp',
    primaryCode: 'YOUR_BITSTAMP_CODE',
    registerUrl: 'https://www.bitstamp.net/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'crypto-com',
    name: 'Crypto.com',
    primaryCode: 'YOUR_CRYPTODOTCOM_CODE',
    registerUrl: 'https://crypto.com/exchange',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bingx',
    name: 'BingX',
    primaryCode: 'YOUR_BINGX_CODE',
    registerUrl: 'https://bingx.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['derivatives', 'altcoins'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'upbit',
    name: 'Upbit',
    primaryCode: 'YOUR_UPBIT_CODE',
    registerUrl: 'https://upbit.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bithumb',
    name: 'Bithumb',
    primaryCode: 'YOUR_BITHUMB_CODE',
    registerUrl: 'https://www.bithumb.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'altcoins'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'coincheck',
    name: 'Coincheck',
    primaryCode: 'YOUR_COINCHECK_CODE',
    registerUrl: 'https://coincheck.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitflyer',
    name: 'bitFlyer',
    primaryCode: 'YOUR_BITFLYER_CODE',
    registerUrl: 'https://bitflyer.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'lbank',
    name: 'LBank',
    primaryCode: 'YOUR_LBANK_CODE',
    registerUrl: 'https://www.lbank.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['altcoins', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'poloniex',
    name: 'Poloniex',
    primaryCode: 'YOUR_POLONIEX_CODE',
    registerUrl: 'https://poloniex.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['altcoins', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'deribit',
    name: 'Deribit',
    primaryCode: 'YOUR_DERIBIT_CODE',
    registerUrl: 'https://www.deribit.com/',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    bestFor: ['derivatives', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitmart',
    name: 'BitMart',
    primaryCode: 'YOUR_BITMART_CODE',
    registerUrl: 'https://www.bitmart.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['altcoins', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'phemex',
    name: 'Phemex',
    primaryCode: 'YOUR_PHEMEX_CODE',
    registerUrl: 'https://phemex.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['derivatives', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'woo-x',
    name: 'WOO X',
    primaryCode: 'YOUR_WOOX_CODE',
    registerUrl: 'https://woo.org/',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    bestFor: ['low_spreads', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'deepcoin',
    name: 'Deepcoin',
    primaryCode: 'YOUR_DEEPCOIN_CODE',
    registerUrl: 'https://www.deepcoin.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['derivatives', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'coinex',
    name: 'CoinEx',
    primaryCode: 'YOUR_COINEX_CODE',
    registerUrl: 'https://www.coinex.com/',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    bestFor: ['altcoins', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitrue',
    name: 'Bitrue',
    primaryCode: 'YOUR_BITRUE_CODE',
    registerUrl: 'https://www.bitrue.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['altcoins', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'whitebit',
    name: 'WhiteBIT',
    primaryCode: 'YOUR_WHITEBIT_CODE',
    registerUrl: 'https://whitebit.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['altcoins', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'ascendex',
    name: 'AscendEX',
    primaryCode: 'YOUR_ASCENDEX_CODE',
    registerUrl: 'https://ascendex.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['altcoins', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitso',
    name: 'Bitso',
    primaryCode: 'YOUR_BITSO_CODE',
    registerUrl: 'https://bitso.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitpanda',
    name: 'Bitpanda',
    primaryCode: 'YOUR_BITPANDA_CODE',
    registerUrl: 'https://www.bitpanda.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'exmo',
    name: 'EXMO',
    primaryCode: 'YOUR_EXMO_CODE',
    registerUrl: 'https://exmo.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['altcoins', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitvavo',
    name: 'Bitvavo',
    primaryCode: 'YOUR_BITVAVO_CODE',
    registerUrl: 'https://bitvavo.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'indodax',
    name: 'Indodax',
    primaryCode: 'YOUR_INDODAX_CODE',
    registerUrl: 'https://indodax.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['altcoins', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'coinswitch',
    name: 'CoinSwitch',
    primaryCode: 'YOUR_COINSWITCH_CODE',
    registerUrl: 'https://coinswitch.co/',
    bonusTypes: ['signup'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'wazirx',
    name: 'WazirX',
    primaryCode: 'YOUR_WAZIRX_CODE',
    registerUrl: 'https://wazirx.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['altcoins', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'zebpay',
    name: 'ZebPay',
    primaryCode: 'YOUR_ZEBPAY_CODE',
    registerUrl: 'https://zebpay.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'coindcx',
    name: 'CoinDCX',
    primaryCode: 'YOUR_COINDCX_CODE',
    registerUrl: 'https://coindcx.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['altcoins', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitkub',
    name: 'Bitkub',
    primaryCode: 'YOUR_BITKUB_CODE',
    registerUrl: 'https://www.bitkub.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'novadax',
    name: 'NovaDAX',
    primaryCode: 'YOUR_NOVADAX_CODE',
    registerUrl: 'https://www.novadax.com.br/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'mercado-bitcoin',
    name: 'Mercado Bitcoin',
    primaryCode: 'YOUR_MERCADOBITCOIN_CODE',
    registerUrl: 'https://www.mercadobitcoin.com.br/',
    bonusTypes: ['signup'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitbank',
    name: 'bitbank',
    primaryCode: 'YOUR_BITBANK_CODE',
    registerUrl: 'https://bitbank.cc/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'btcbox',
    name: 'BtcBox',
    primaryCode: 'YOUR_BTCBOX_CODE',
    registerUrl: 'https://www.btcbox.co.jp/',
    bonusTypes: ['signup'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'okcoin',
    name: 'OKCoin',
    primaryCode: 'YOUR_OKCOIN_CODE',
    registerUrl: 'https://www.okcoin.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitmex',
    name: 'BitMEX',
    primaryCode: 'YOUR_BITMEX_CODE',
    registerUrl: 'https://www.bitmex.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['derivatives', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitopro',
    name: 'BitoPro',
    primaryCode: 'YOUR_BITOPRO_CODE',
    registerUrl: 'https://www.bitopro.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'cex-io',
    name: 'CEX.IO',
    primaryCode: 'YOUR_CEXIO_CODE',
    registerUrl: 'https://cex.io/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['low_spreads', 'liquidity'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'coins-ph',
    name: 'Coins.ph',
    primaryCode: 'YOUR_COINS_PH_CODE',
    registerUrl: 'https://coins.ph/',
    bonusTypes: ['signup'],
    bestFor: ['liquidity', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'pionex',
    name: 'Pionex',
    primaryCode: 'YOUR_PIONEX_CODE',
    registerUrl: 'https://www.pionex.com/',
    bonusTypes: ['signup', 'trading', 'fee-discount'],
    bestFor: ['advanced_traders', 'low_spreads'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'btse',
    name: 'BTSE',
    primaryCode: 'YOUR_BTSE_CODE',
    registerUrl: 'https://www.btse.com/',
    bonusTypes: ['signup', 'fee-discount', 'trading'],
    bestFor: ['liquidity', 'advanced_traders'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  },
  {
    id: 'bitrabbit',
    name: 'BitRabbit',
    primaryCode: 'YOUR_BITRABBIT_CODE',
    registerUrl: 'https://bitrabbit.com/',
    bonusTypes: ['signup', 'fee-discount'],
    bestFor: ['altcoins', 'new_listings'],
    feeModel: defaultFeeModel,
    updatedAt: '2026-06-07',
    availabilityNote: defaultAvailabilityNote,
    riskNote: defaultRiskNote,
    kycRequired: true
  }
];

export function getExchanges(): Exchange[] {
  return exchanges;
}

export function getExchangeById(id: string): Exchange | null {
  return exchanges.find((x) => x.id === id) ?? null;
}

export function getExchangeDetailHref(id: ExchangeId): string {
  if (id === 'gate-io') return '/gate-io-referral-code';
  if (id === 'okx') return '/okx-referral-code';
  if (id === 'binance') return '/binance-referral-code';
  return `/exchange/${id}`;
}
