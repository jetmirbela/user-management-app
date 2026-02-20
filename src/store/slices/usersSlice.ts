import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserFormData, SortField, SortDirection } from '../../types/user';
import { fetchUsers } from '../../services/api';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  searchQuery: '',
  sortField: null,
  sortDirection: 'asc',
};

// Async thunk for fetching users
export const loadUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetchUsers();
  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      if (state.sortField === action.payload) {
        // Toggle direction if same field
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = action.payload;
        state.sortDirection = 'asc';
      }
    },
    addUser: (state, action: PayloadAction<UserFormData>) => {
      const newUser: User = {
        id: Date.now(), // Generate a temporary ID
        name: action.payload.name,
        username: action.payload.name.toLowerCase().replace(/\s+/g, ''),
        email: action.payload.email,
        phone: action.payload.phone || '',
        website: action.payload.website || '',
        address: {
          street: action.payload.address?.street || '',
          suite: '',
          city: action.payload.address?.city || '',
          zipcode: action.payload.address?.zipcode || '',
          geo: {
            lat: '',
            lng: '',
          },
        },
        company: {
          name: action.payload.company?.name || '',
          catchPhrase: '',
          bs: '',
        },
      };
      state.users.unshift(newUser); // Add to the top
    },
    updateUser: (state, action: PayloadAction<{ id: number; data: UserFormData }>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          name: action.payload.data.name,
          email: action.payload.data.email,
          phone: action.payload.data.phone || state.users[index].phone,
          website: action.payload.data.website || state.users[index].website,
          address: {
            ...state.users[index].address,
            street: action.payload.data.address?.street || state.users[index].address.street,
            city: action.payload.data.address?.city || state.users[index].address.city,
            zipcode: action.payload.data.address?.zipcode || state.users[index].address.zipcode,
          },
          company: {
            ...state.users[index].company,
            name: action.payload.data.company?.name || state.users[index].company.name,
          },
        };
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setSearchQuery, setSortField, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
