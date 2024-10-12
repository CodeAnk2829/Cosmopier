"use client";

import Navbar from "@/components/Navbar";
import CreateButton from "@/components/buttons/CreateButton";
import ZapTable from "@/components/ZapTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL;

interface Zap {
    "id": string,
    "name": string,
    "userId": number
    "trigger": {
        "type": {
            "id": string,
            "name": string
        }
    },
    "actions": {
        "id": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "name": string
        }
    }[]
}

function useZaps() {
    const [loading, setLoading] = useState<boolean>(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    const token = localStorage.getItem("token");

    console.log(token);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }            
        })
        .then(async (res) => {
            if(!res.ok) {
                console.log("something went wrong while fetching zaps");
                throw new Error("Something went wrong while fetching zaps");
            }
            const data = await res.json();
            setZaps(data.zaps);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
        });
    }, [])

    return { 
        loading, zaps
    }
}


export default function Zap() {
    const router = useRouter();
    const { loading, zaps } = useZaps();

    return <div>
        <Navbar />
        <div className="flex justify-center pt-4">
            <div className="w-full max-w-screen-lg md:max-w-screen-2xl p-6">
                <div className="flex justify-between">
                    <div className="text-violet-600 text-4xl font-semibold">
                        Zaps
                    </div>
                    <div className="content-center">
                        <CreateButton onClick={() => {
                            router.push("/zap/create");
                        }} />
                    </div>
                </div>

            </div>
        </div>
        {loading ? "Loading..." : <ZapTable zaps={zaps} />}             
    </div>
}