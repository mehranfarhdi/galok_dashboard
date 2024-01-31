import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            // Make an API request to delete the user with the given ID
            await axios.delete(`/users/${userId}`);

            // Update the users state by removing the deleted user
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Is Admin</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                        <td>{user.created_at}</td>
                        <td>{user.updated_at}</td>
                        <td>
                            {/* Add an icon (e.g., trash icon) for deleting the user */}
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleDeleteUser(user.id)}
                            >
                  &#128465; {/* Unicode for trash icon */}
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementTable;
