export type User = {
  uid: string;
  id: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
  timestamp: Date;
};

export type Post = {
  uid: string;
  type: number;
  comment: string;
  timestamp: Date;
};

export type UserInput = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  id: string;
  image?: any;
};

export type PostInput = {
  type: string | number;
  comment?: string;
};
