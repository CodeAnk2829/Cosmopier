import { ReactNode } from "react";
import Image from "next/image";

function GetActionImg() {
    return <Image src="https://zapier.com/generated/GoogleMailV2CLIAPI/64/" alt="Gmail logo" width={14} height={14} />
}

export default function Icons({ trigger, actions }: {
    trigger: string,
    actions: string[]
}) {
    let triggerImg: ReactNode;

    if (trigger === "Webhooks") {
        triggerImg = <Image src="https://zapier.com/generated/WebHookAPI/64/" alt="Webhook logo" width={14} height={14} />
    }


    return <div>
        <table className="table-auto">
            <tbody>
                <tr>
                    <td className="pr-1">
                        <span>{triggerImg}</span>
                    </td>
                    {actions.map((action, key) => {
                        return <td className="px-1" key={key}>
                            <div>
                                <GetActionImg />
                            </div>
                        </td>
                    })}
                </tr>
            </tbody>
        </table>
    </div>
}