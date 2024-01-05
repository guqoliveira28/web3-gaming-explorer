export type ProjectDetails = {
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
    name: string | null;
    symbol: string | null;
    tokenAddress: string | null;
  };
  dateLaunched: string;
  selfReportedCirculatingSupply: number;
  selfReportedMarketCap: number;
};

export const convertToProjectDetails = (value: {
  id: number;
  name: string;
  symbol: string;
  description: string;
  logo: string;
  "tag-names": string[];
  urls: {
    website: string[];
    twitter: string[];
    message_board: string[];
    chat: string[];
    facebook: string[];
    explorer: string[];
    reddit: string[];
    technical_doc: string[];
    source_code: string[];
    announcement: string[];
  };
  platform: {
    name: string;
    symbol: string;
    tokenAddress: string;
  };
  dateLaunched: string;
  self_reported_circulating_supply: number;
  self_reported_market_cap: number;
}): ProjectDetails => {
  return {
    id: value.id,
    name: value.name,
    symbol: value.symbol,
    description: value.description,
    logo: value.logo,
    tagNames: value["tag-names"],
    urls: {
      website: value.urls.website,
      twitter: value.urls.twitter,
      messageBoard: value.urls.message_board,
      chat: value.urls.chat,
      explorer: value.urls.explorer,
      reddit: value.urls.reddit,
      technicalDoc: value.urls.technical_doc,
      sourceCode: value.urls.source_code,
      announcement: value.urls.announcement,
    },
    platform: {
      name: value.platform?.name,
      symbol: value.platform?.symbol,
      tokenAddress: value.platform?.tokenAddress,
    },
    dateLaunched: value.dateLaunched,
    selfReportedCirculatingSupply: value.self_reported_circulating_supply,
    selfReportedMarketCap: value.self_reported_market_cap,
  };
};
