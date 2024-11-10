

export interface Task {
  id: string;
  _id: string ;
  title: string;
  description: string;
  image?: string;
  visibility: 'public' | 'private';
  date: string;
  user: { _id:string};
  createdAt: string;
  updatedAt: string;
}