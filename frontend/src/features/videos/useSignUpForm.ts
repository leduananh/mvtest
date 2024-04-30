// import { useState, useCallback } from "react";

// interface Error { email: string, password: string, confirmPassword: string }

// interface SignUpFormHook {
//     email: string;
//     password: string;
//     confirmPassword: string;
//     isLoading: boolean;
//     setEmail: (email: string) => void;
//     setPassword: (password: string) => void;
//     setConfirmPassword: (password: string) => void;
//     handleSubmit: () => void;
//     error: Error;
//     isFormValid: boolean;
// }

// const isFormValid = (email: string, password: string, confirmPassword: string) => {
//     if ()
// }

// export const useLoginForm = (): SignUpFormHook => {
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [confirmPassword, setConfirmPassword] = useState<string>("");
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<Error>({ email: "", password: "", confirmPassword: "" });

//     const isFormValid = email.length > 0 && password.length > 0;

//     const handleSubmit = useCallback(async () => {
//         if (email && password) {
//             setIsLoading(true)
//             setTimeout(function () {

//             }, 2000);
//             setIsLoading(false)
//             // Implement login functionality
//         } else {
//             console.log("Redirect to Signup Page");
//             // Implement redirect to signup page
//         }
//     }, []);

//     return {
//         email,
//         password,
//         confirmPassword,
//         isLoading,
//         error,
//         setEmail,
//         setPassword,
//         setConfirmPassword,
//         handleSubmit,
//         isFormValid,
//     };
// };
