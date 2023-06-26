import { Toaster } from "react-hot-toast";
import { useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { BlogProvider } from "./blogContext";


export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <>
            {/* <AuthProvider>{outlet}</AuthProvider> */}
            <Toaster />
            <BlogProvider>{outlet}</BlogProvider>
        </>
    );
};