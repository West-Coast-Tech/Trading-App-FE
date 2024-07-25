import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../actions/types';
import { getUsers } from '../../actions/userActions';

// Define a specific selector for users
const selectUsers = (state: AppState) => state.users.users;

const UsersList = () => {
  const dispatch = useDispatch<any>();
  const users = useSelector(selectUsers);
  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getUsers());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);
  const displayUsers = (users: any[]) => {
    if (!users.length) {
      return <div>No users found.</div>;
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user._id} className="py-4 flex flex-col space-y-2">
            <div className="text-lg font-medium text-white">{user.fullName}</div>
            <div className="text-lg text-gray-500">Email: {user.email}</div>
            <div className="text-lg text-gray-500">ID: {user._id}</div>

          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-white">Users List</h1>
      {displayUsers(users)}
    </div>
  );
};

export default UsersList;
