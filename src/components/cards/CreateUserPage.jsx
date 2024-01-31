import React, { useState } from 'react';
import axios from 'axios';

const CreateUserPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        isAdmin: false,
        password: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to create a new user
            await axios.post('http://127.0.0.1:8080/users', userData);

            // Redirect or perform any other actions after successful user creation
            console.log('User created successfully!');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Is Admin:
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={userData.isAdmin}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUserPage;
