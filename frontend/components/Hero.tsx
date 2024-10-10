"use client";

import Image from "next/image";

import { PrimaryButton } from "./buttons/PrimaryButton";

export default function Hero() {

    return <div className="grid grid-cols-2 m-12">
        <div>
            <div className="content-center">
                <div className="text-balance mb-4 text-8xl md:text-8xl sm:text-6xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">Automate without limits</div>
                <div className="text-wrap text-lg font-bold p-4">Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. The only limit is your imagination.</div>
                <div>
                    <PrimaryButton styles={"bg-purple-700 px-7 py-3 my-4"} onClick={() => {}}>Start free with email</PrimaryButton>
                </div>
                <div>
                    <PrimaryButton styles={"border-purple-700 border-b px-5 py-3 my-2"} onClick={() => {}}>Start free with Google</PrimaryButton>
                </div>
            </div>

        </div>
        <div>
            <div className="p-2">
                <Image
                    src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
            </div>

        </div>
    </div>
}