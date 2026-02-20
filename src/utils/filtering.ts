import { User } from '../types/user';

export const filterUsers = (users: User[], searchQuery: string): User[] => {
  if (!searchQuery.trim()) return users;

  const query = searchQuery.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );
};
