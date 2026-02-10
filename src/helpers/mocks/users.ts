import { User } from '@src/types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'juan@example.com',
    password: 'password123',
    name: 'Juan Pérez',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-2',
    email: 'maria@example.com',
    password: 'password123',
    name: 'María García',
    avatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 'user-3',
    email: 'carlos@example.com',
    password: 'password123',
    name: 'Carlos Rodríguez',
    avatar: 'https://i.pravatar.cc/150?img=12',
    createdAt: new Date('2024-03-05'),
  },
  {
    id: 'user-4',
    email: 'ana@example.com',
    password: 'password123',
    name: 'Ana López',
    avatar: 'https://i.pravatar.cc/150?img=9',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'user-5',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Usuario Demo',
    avatar: 'https://i.pravatar.cc/150?img=8',
    createdAt: new Date('2024-01-01'),
  },
];

export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const validateCredentials = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};
