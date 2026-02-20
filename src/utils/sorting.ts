import { User, SortField } from '../types/user';

export const sortUsers = (users: User[], sortField: SortField, sortDirection: 'asc' | 'desc'): User[] => {
  if (!sortField) return users;

  const sorted = [...users].sort((a, b) => {
    let aValue: string;
    let bValue: string;

    if (sortField === 'company.name') {
      aValue = a.company.name.toLowerCase();
      bValue = b.company.name.toLowerCase();
    } else {
      aValue = a[sortField].toLowerCase();
      bValue = b[sortField].toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};
