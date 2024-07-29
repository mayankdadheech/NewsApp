// types.ts
export interface HeadlinesState {
  headlines: Article[]; // Replace `Article` with the actual type of your headlines
  displayedHeadlines: Article[];
  pinnedHeadlines: Article[];
  deletedHeadlines: Article[];
}

export interface DisplayedHeadlinesState {
  headlines: Article[];
}

export interface RootState {
  headlines: HeadlinesState;
}

// Define the Article type based on your API response structure
export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: {
    name: string;
  };
  author: string;
}
