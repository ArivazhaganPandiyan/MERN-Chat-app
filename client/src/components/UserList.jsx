import React from 'react';

const UsersList = ({ users, onSelectUser }) => {
  return (
    <div className="users-list">
      {users.map(user => (
        <div
          key={user._id}
          className="user-item"
          onClick={() => onSelectUser(user)}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default UsersList;
