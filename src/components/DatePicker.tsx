interface InputInterface {
    label: string
    defaultValue: Date
    onChange: (value: Date) => void
    placeholder?: string
    type?: string
}

export default (props: InputInterface) => {
    return <div class="form-control">
        <label for={`${props.label}-input`} class="label">
            <span>{props.label}</span>
        </label>
        <input
            id={`${props.label}-input`}
            type={props.type || "text"}
            placeholder={props.placeholder || ""}
            class="input input-bordered"
            value={props.defaultValue.toLocaleDateString()}
            onChange={(event) => props.onChange(new Date(event.currentTarget.value))} />
    </div>
}