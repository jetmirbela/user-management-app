import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSortField, deleteUser } from '../store/slices/usersSlice';
import { filterUsers } from '../utils/filtering';
import { sortUsers } from '../utils/sorting';
import { User } from '../types/user';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import UserCard from '../components/UserCard';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';

const UserList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error, searchQuery, sortField, sortDirection } = useAppSelector(
    (state) => state.users
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredUsers = filterUsers(users, searchQuery);
  const sortedUsers = sortUsers(filteredUsers, sortField, sortDirection);

  const handleSort = (field: 'name' | 'email' | 'company.name' | null) => {
    dispatch(setSortField(field));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading users</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            {sortedUsers.length} {sortedUsers.length === 1 ? 'user' : 'users'} found
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </button>
      </div>

      <div className="mb-6">
        <SearchBar />
      </div>

      {sortedUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'Try adjusting your search query.' : 'Get started by adding a new user.'}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-white">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cards
              </button>
            </div>
          </div>

          {viewMode === 'table' ? (
            <UserTable
              users={sortedUsers}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </>
      )}

      {showAddForm && <AddUserForm onClose={() => setShowAddForm(false)} />}
      {editingUser && (
        <EditUserForm user={editingUser} onClose={() => setEditingUser(null)} />
      )}
    </div>
  );
};

export default UserList;
