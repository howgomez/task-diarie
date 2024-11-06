

export interface Task {
  id: string;
  title: string;
  description: string;
  image?: string;
  visibility: 'public' | 'private';
  date: string;
  user: { _id:string, username: string; email: string };
  createdAt: string;
  updatedAt: string;
}