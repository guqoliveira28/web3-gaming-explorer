import { Project } from "./project";

export type ProjectDetails = Project & {
  description: string;
  logo: string;
  tagNames: string[];
  urls: {
    website: string[];
    twitter: string[];
    message_board: string[];
    chat: string[];
    explorer: string[];
    reddit: string[];
    technicalDoc: string[];
    sourceCode: [];
    announcement: string[];
  };
  platform: {
    name: string;
    symbol: string;
    token_address: string;
  };
  date_launched: string;
};
