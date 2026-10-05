
import { useEffect, useState } from "react";
import axios from "axios";
import "../profile.css";

function Profile() {

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {

        const getProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login first!");
                    return;
                }

                const response = await axios.get(
                    "http://localhost:8000/api/users/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const profileUser = response.data.user;

                setUser(profileUser);
                setName(profileUser.name);
                setPhone(profileUser.phone);

            } catch (error) {

                console.log(
                    error.response?.data || error.message
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load profile"
                );
            }
        };

        getProfile();

    }, []);


    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await axios.put(
                "http://localhost:8000/api/users/profile",
                {
                    name,
                    phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(response.data.user);

            setName(response.data.user.name);
            setPhone(response.data.user.phone);

            setEditing(false);

            alert("Profile updated successfully!");

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        }
    };


    if (error) {
        return (
            <div className="profile-page">
                <h2>{error}</h2>
            </div>
        );
    }


    if (!user) {
        return (
            <div className="profile-page">
                <h2>Loading...</h2>
            </div>
        );
    }


    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-header">

                    <div className="profile-avatar">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h1>My Profile</h1>
                        <p>Manage your personal information</p>
                    </div>

                </div>


                {!editing ? (

                    <>

                        <div className="profile-info">

                            <div className="profile-field">
                                <span>Name</span>
                                <strong>{user.name}</strong>
                            </div>

                            <div className="profile-field">
                                <span>Email</span>
                                <strong>{user.email}</strong>
                            </div>

                            <div className="profile-field">
                                <span>Phone</span>
                                <strong>{user.phone}</strong>
                            </div>

                            <div className="profile-field">
                                <span>Role</span>
                                <strong className="role-badge">
                                    {user.role}
                                </strong>
                            </div>

                        </div>


                        <button
                            className="edit-profile-btn"
                            onClick={() => setEditing(true)}
                        >
                            Edit Profile
                        </button>

                    </>

                ) : (

                    <form
                        className="profile-edit-form"
                        onSubmit={handleUpdate}
                    >

                        <div className="form-group">

                            <label>Name</label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                value={user.email}
                                disabled
                            />

                            <small>
                                Email cannot be changed.
                            </small>

                        </div>


                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="profile-edit-actions">

                            <button
                                type="submit"
                                className="save-profile-btn"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="cancel-profile-btn"
                                onClick={() => {
                                    setName(user.name);
                                    setPhone(user.phone);
                                    setEditing(false);
                                }}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    );
}

export default Profile;

