"use client";

import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";

export default function Appbar() {
    const router = useRouter();

    return <div className="flex justify-between border-b border-slate-400 p-5">
        <div className="text-3xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
            _rapidflow
        </div>
        <div className="text-sm text-slate-400 flex cursor-pointer">
            <LinkButton onClick={() => {
                router.push("/contact-sales")
            }}>Contact Sales</LinkButton>

            <LinkButton onClick={() => {
                router.push("/login")
            }}>Log in</LinkButton>

            <div className="px-4 content-center">
                <PrimaryButton styles={"bg-purple-700 px-5 py-2"} onClick={() => {
                    router.push("/signup")
                }}>Sign up</PrimaryButton>
            </div>
        </div>
    </div>
}