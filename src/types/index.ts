export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  userId: string;
  title?: string;
  description?: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface TrendingLink extends Link {
  user: Pick<User, 'id' | 'name' | 'avatar'>;
  clicksLastWeek: number;
  clicksLastMonth: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export type LoginCredentials = {
  email: string;
  password: string;
};
