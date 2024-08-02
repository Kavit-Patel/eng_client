export interface Iuser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  tset?: Itset[];
  audio?: Iaudio[];
}
export interface Itset {
  id: number;
  sentance: string;
  answer: string[];
  userId: number;
  createdAt: Date;
  audio?: Iaudio[];
}
export interface Iaudio {
  id: number;
  file: Buffer;
  userId: number;
  tsetId: number;
  createdAt: Date;
}
