import { CheckFeature } from "@/components/CheckFeature";
import { SignupComponent } from "@/components/SIgnupComponent";

export default function Signup() {
    return <div>
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
            <SignupComponent />
        </div>
    </div>
}