
export function InputBox({type,label, value, onChange}) {
    return <div className="text-sm font-medium text-left py-2">
        <div >
        {label}
        </div>
        <input type={type} onChange={onChange} value={value} className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
}