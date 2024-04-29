import React from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { useLoginForm } from "../../hooks/loginFormHook";

const Header: React.FC = () => {
    const { username, password, setUsername, setPassword, handleLoginSignup, isFormValid } =
        useLoginForm();

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/0/04/Funny_movie_logo.png"} alt="Logo" style={{ width: "auto", height: "50px" }} /> {/* Use your logo image here */}

            <Box display="flex" gap={2} alignItems="center">
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" onClick={handleLoginSignup} disabled={!isFormValid}>
                    {isFormValid ? "Login" : "Sign Up"}
                </Button>
            </Box>
        </Box>
    );
};

export default Header;
