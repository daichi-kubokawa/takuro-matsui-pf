export type MicroCMSImage = {
  url: string;
  width?: number;
  height?: number;
};

export type Work = {
  id: string;
  title: string;
  coverImage: MicroCMSImage;
  gallery?: MicroCMSImage[];
  description?: string;
  tags?: string[];
  featured?: boolean;
  client?: string;

  // ★ microCMSの「セレクト」が複数選択になってると配列で来る
  layout?: string | string[];
};
