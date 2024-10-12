export default function CreateButton({ onClick }: {
    onClick: () => void
}) {
    return <button className="hover:bg-violet-700 bg-violet-800 rounded-sm cursor-pointer" onClick={onClick}>
        <div className="text-slate-100 flex">
            <div className="text-3xl font-normal pr-1 pl-3">
                +
            </div>
            <div className="hover:underline font-semibold text-sm content-center pl-2 pr-3">
                Create
            </div>
        </div>
    </button>
}