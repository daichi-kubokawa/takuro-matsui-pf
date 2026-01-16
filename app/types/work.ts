export type Work = {
  id: string;
  title: string;
  coverImage: {
    url: string;
    width: number;
    height: number;
  };
  tags?: string[];
  client?: string;
};
