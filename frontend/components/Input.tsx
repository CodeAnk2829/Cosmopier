export function Input({ type, name, id, placeholder, label }: {
    type: string,
    name: string,
    id: string,
    placeholder: string,
    label: string
}) {
    return <div className="p-4 text-slate-400 flex flex-col items-start">
        <div>
            <label htmlFor="id">{label}</label>
        </div>
        <div>
            <input className="p-2 text-slate-100 bg-slate-600" type={type} name={name} id={id} placeholder={placeholder} />
        </div>
    </div>
}