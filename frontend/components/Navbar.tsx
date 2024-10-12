"use client";

import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton"

export default function Appbar() {
    const router = useRouter();

    return <div className="flex justify-between border-b border-slate-400 p-5">
        <div className="text-3xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
            _rapidflow
        </div>
        <div className="text-sm text-slate-400 hover:text-slate-300 hover:underline flex cursor-pointer">
            <LinkButton onClick={() => {
                router.push("/contact-sales")
            }}>Contact Sales</LinkButton>
            <div className="content-center">
                <svg className="border rounded-full border-violet-500" fill="none" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg"><g fill="#292d32"><path d="m12 22.01c5.5228 0 10-4.4771 10-10 0-5.52284-4.4772-9.99999-10-9.99999-5.52285 0-10 4.47715-10 9.99999 0 5.5229 4.47715 10 10 10z" opacity=".4" /><path d="m12 6.93994c-2.07 0-3.75 1.68-3.75 3.74996 0 2.03 1.59 3.68 3.7 3.74h.09.07.02c2.02-.07 3.61-1.71 3.62-3.74 0-2.06996-1.68-3.74996-3.75-3.74996z" /><path d="m18.7807 19.36c-1.78 1.64-4.16 2.65-6.78 2.65s-5-1.01-6.78-2.65c.24-.91.89-1.74 1.84-2.38 2.73-1.82 7.17-1.82 9.88 0 .96.64 1.6 1.47 1.84 2.38z" /></g></svg>
            </div>
        </div>
    </div>
}