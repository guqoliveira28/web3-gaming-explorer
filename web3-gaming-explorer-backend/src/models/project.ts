export type Project = {
  id: number;
  name: string;
  symbol: string;
  circulatingSupply: number;
  cmcRank: number;
  quote: {
    USD: {
      price: number;
      percentChange1h: number;
      percentChange24h: number;
      percentChange7d: number;
      percentChange30d: number;
      percentChange60d: number;
      percentChange90d: number;
      marketCap: number;
    };
  };
};

export const convertToProject = (value: {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  cmc_rank: number;
  quote: {
    USD: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      market_cap: number;
    };
  };
}): Project => {
  return {
    id: value.id,
    name: value.name,
    symbol: value.symbol,
    circulatingSupply: value.circulating_supply,
    cmcRank: value.cmc_rank,
    quote: {
      USD: {
        price: value.quote.USD.price,
        percentChange1h: value.quote.USD.percent_change_1h,
        percentChange24h: value.quote.USD.percent_change_24h,
        percentChange7d: value.quote.USD.percent_change_7d,
        percentChange30d: value.quote.USD.percent_change_30d,
        percentChange60d: value.quote.USD.percent_change_60d,
        percentChange90d: value.quote.USD.percent_change_90d,
        marketCap: value.quote.USD.market_cap,
      },
    },
  };
};
