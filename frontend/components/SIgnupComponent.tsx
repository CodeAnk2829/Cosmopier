"use client";

import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react"
import { Input } from "./Input";

// TODO: ensure form validation

export function SignupComponent() {
    const BACKEND_URL = process.env.NEXT_PUBLIC_URL;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const form = new FormData(e.currentTarget);
            const formData = Object.fromEntries(form.entries());

            const response = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if(!response.ok) {
                throw new Error("Failed to submit the data. Please try again.")
            }
            const data = await response.json();
            localStorage.setItem("token", data.token);
            router.push("/zaps");

        } catch(error) {
            // @ts-expect-error/failed-submit-details
            setError(error.message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return <div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="w-1/3 text-center">
        <form onSubmit={handleSubmit}>
            <Input type="text" name="name" id="name" placeholder="Name" label="Full Name"/>
            <Input type="email" name="username" id="username" placeholder="Email" label="Email"/>
            <Input type="password" name="password" id="password" placeholder="Password" label="Password"/>
                <button type="submit" disabled={isLoading} className="bg-gradient-to-r from-red-800 to-red-500 p-2">
                {isLoading ? "Loading" : "Create an Account"}
            </button>
        </form>
        </div>
    </div>
}