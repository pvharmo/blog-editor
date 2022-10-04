import { For } from "solid-js"

export interface Option {
    id: string,
    label: string
}

interface SelectProps {
    options: Option[]
    label: string
    onChange: (value: string[]) => void
    multiple?: boolean
    defaultValue?: string[]
}

export default (props: SelectProps) => {
    const handleChange = (options: HTMLOptionsCollection) => {
        const selected = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                const value = props.options.find(x => x.id == options[i].value)

                selected.push((value as Option).id);
            }
        }
        props.onChange(selected)
    }

    console.log(props.defaultValue)

    return <div class="form-control w-1/3">
        <label for={`${props.label}-input`} class="label">
            <span>{props.label}</span>
        </label>
        <select 
            id={`${props.label}-input`}
            multiple
            class="select select-bordered"
            style="height: 12rem;"
            onChange={(event) => handleChange(event.currentTarget.options)}>
            <For each={props.options}>
                {(option, i) => <option value={option.id} selected={!!props.defaultValue?.find(x => x == option.id)}>{option.label}</option>}
            </For>
        </select>
    </div>
}