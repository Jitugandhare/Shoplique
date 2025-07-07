import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './Routes/AllRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './features/user/userSlice';
import UserDashboard from './User/UserDashboard';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <AllRoutes />
      {isAuthenticated && user && <UserDashboard user={user} />}
    </Router>
  );
};

export default App;
