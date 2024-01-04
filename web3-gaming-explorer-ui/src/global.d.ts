export {};

declare global {
  type Project = {
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
    details: ProjectDetails | undefined;
  };

  type ProjectDetails = {
    id: number;
    name: string;
    symbol: string;
    description: string;
    logo: string;
    tagNames: string[];
    urls: {
      website: string[];
      twitter: string[];
      messageBoard: string[];
      chat: string[];
      explorer: string[];
      reddit: string[];
      technicalDoc: string[];
      sourceCode: string[];
      announcement: string[];
    };
    platform: {
      name: string;
      symbol: string;
      tokenAddress: string;
    };
    dateLaunched: string;
    selfReportedCirculatingSupply: number;
    selfReportedMarketCap: number;
  };
}
