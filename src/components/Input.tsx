interface InputInterface {
    label: string
    defaultValue: string
    onChange: (value: string) => void
    placeholder?: string
    type?: string
}

export default (props: InputInterface) => {
    return <div class="form-control">
        <label for={`${props.label}-input`} class="label">
            <span class="label-text">{props.label}</span>
        </label>
        <input id={`${props.label}-input`} type={props.type || "text"} placeholder={props.placeholder || ""} class="input input-bordered" value={props.defaultValue} onChange={(event) => props.onChange(event.currentTarget.value)} />
    </div>
}