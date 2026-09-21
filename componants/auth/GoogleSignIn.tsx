"use client";
import serverCallFuction from "@/lib/constantFunction";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

export default function GoogleSignIn({ setError, returnPath = "/" }) {
    const googleButton = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.google) {
            window.google.accounts.id.initialize({
                client_id: "102621798557-slottudnqi91ro3amqckq1lpt78cpioh.apps.googleusercontent.com",
                callback: handleCallbackResponse,
            });

            window.google.accounts.id.renderButton(
                googleButton.current!,
                { theme: "outline", size: "large" } // Customization options
            );
        }
    }, []);

    async function handleCallbackResponse(response: any) {
        try {


            const idToken = response.credential;
            console.log("Encoded JWT ID token: " + idToken);

            // 👇 1. DECODE THE JWT TO GET USER DETAILS
            const base64Url = idToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            const userProfile = JSON.parse(jsonPayload);

            // Now you have access to the data!
            console.log("User Email:", userProfile.email);
            console.log("User Full Name:", userProfile.name);
            console.log("First Name:", userProfile.given_name);
            console.log("Last Name:", userProfile.family_name);
            console.log("Profile Picture:", userProfile.picture);



            // SEND THIS TO YOUR BACKEND API FOR VERIFICATION
            const res = await serverCallFuction('POST', "api/ecom/auth/google",
                { token: idToken }
            );


            if (res.status && res.token) {
                Cookies.set("token", res.token as string, { expires: 1 });
                window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}`;
            } else {
                setError(res.message || "Login Failed");
            }

        } catch (error) {
            console.log("google sign in error - ", error);

        } finally {

        }
    }

    return <div ref={googleButton}></div>;
}