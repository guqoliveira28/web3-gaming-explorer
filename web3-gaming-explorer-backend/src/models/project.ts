export type Project = {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  cmc_rank: number;
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
