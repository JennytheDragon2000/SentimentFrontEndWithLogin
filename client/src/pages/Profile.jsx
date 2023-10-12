import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
    const [account, setAccount] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.put(`http://localhost:10000/admin/update/${account._id}`, account);
            if (result) {
                window.alert('Profile updated');
            }
        } catch (error) {
            console.log(error);
        }
        console.log(account);
    }
    const handleFirstname = (e) => {
        const updatedAccount = { ...account, firstName: e.target.value };
        setAccount(updatedAccount);
    }
    const handleLastname = (e) => {
        const updatedAccount = { ...account, lastName: e.target.value };
        setAccount(updatedAccount);
    }

    useEffect(() => {
        const user = JSON.parse(Cookies.get('user'));
        console.log(user);
        setAccount(user);
    }, [])

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    User Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            marginBottom: 2,
                        }}
                    >
                        <img
                            src="https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?pid=ImgDet&rs=1" // Replace with your profile image URL
                            alt="User Profile"
                            style={{ width: '100%', margin: '0px auto' }}
                        />
                    </Avatar>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={account.username}
                        margin="normal"
                    />
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={account.firstName}
                        onChange={handleFirstname}
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={account.lastName}
                        onChange={handleLastname}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" size="large" type="submit">
                        Save Changes
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default Profile;
