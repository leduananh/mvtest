import { useState, useCallback } from "react";

interface LoginFormHook {
    username: string;
    password: string;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    handleLoginSignup: () => void;
    isFormValid: boolean;
}

export const useLoginForm = (): LoginFormHook => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const isFormValid = username.length > 0 && password.length > 0;

    const handleLoginSignup = useCallback(() => {
        if (username && password) {
            console.log("Login Functionality here");
            // Implement login functionality
        } else {
            console.log("Redirect to Signup Page");
            // Implement redirect to signup page
        }
    }, [username, password]);

    return {
        username,
        password,
        setUsername,
        setPassword,
        handleLoginSignup,
        isFormValid,
    };
};
