import { CheckFeature } from "@/components/CheckFeature";
import { SigninComponent } from "@/components/SigninComponent";
import React from "react";

export default function Signin() {
    return <div className="flex">
        <div>
        <div className="text-wrap max-w-md font-bold text-2xl m-4">
            Join millions worldwide who automate their work using Zapier.
        </div>
        <div className="m-4">
            <CheckFeature label={"Easy setup, no coding required"} />
            <CheckFeature label={"Free forever for core features"} />
            <CheckFeature label={"14-day trial of premium features & apps"} />
        </div>
        </div>
        <div>
            <SigninComponent />
        </div>
    </div>
}