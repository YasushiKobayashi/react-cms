export type Article = {
  id: number;
  title: string;
  content: string;
  htmlContent: string;
  created: Date;
  updated: Date;
  comments: Array;
  commentsCount: number;
  categories: Array;
};
