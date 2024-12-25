export interface PostProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number | null;
  authorAdmin: boolean | null;
  authorId: string | null;
  authorName: string | null;
  authorImage: string | null;
}
