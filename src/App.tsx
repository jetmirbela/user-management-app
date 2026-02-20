import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { loadUsers } from './store/slices/usersSlice';
import Layout from './components/Layout';
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
