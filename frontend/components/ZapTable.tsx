import { useRouter } from "next/navigation"
import Icons from "./Icons"

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

export default function ZapTable({ zaps }: {
    zaps: Zap[]
}) {
    const router = useRouter();

    return <div className="flex justify-center">
        <div className="w-full max-w-screen-lg md:max-w-screen-2xl p-6">

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="text-start p-3 border-b border-slate-400">Name</th>
                        <th className="text-start p-3 border-b border-slate-400">Apps</th>
                        <th className="text-start p-3 border-b border-slate-400">Location</th>
                        <th className="text-start p-3 border-b border-slate-400">Last modified</th>
                        <th className="text-start p-3 border-b border-slate-400">Status</th>
                        <th className="text-start p-3 border-b border-slate-400">Owner</th>
                        <th className="text-start p-3 border-b border-slate-400"></th>
                    </tr>
                </thead>
                <tbody>
                    {zaps.map((zap, key) => {
                        return <tr key={key}>
                            <td className="p-3 border-b border-slate-400">
                                <div className="flex">
                                    <div className="content-center text-purple-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="violet" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                        </svg>
                                    </div>
                                    <div className="pl-1">
                                        <button className="hover:underline" onClick={() => {
                                            router.push(`/zap/${zap.id}`)
                                        }}>{zap.name}</button>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3 border-b border-slate-400">
                                <Icons trigger="Webhooks" actions={["Email"]} />
                            </td>
                            <td className="p-3 border-b border-slate-400">1961</td>
                            <td className="p-3 border-b border-slate-400">1961</td>
                            <td className="p-3 border-b border-slate-400">running</td>
                            <td className="p-3 border-b border-slate-400">owner-image</td>
                            <td className="p-3 border-b border-slate-400">...</td>
                        </tr>
                    })}


                </tbody>
            </table>
        </div>
    </div>
}