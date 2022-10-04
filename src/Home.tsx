import { Component } from 'solid-js'
import { readHeader } from './md'
import type { MarkdownProps } from './md'

interface HomeProps {
    onNext: (md: string, mdProps?: MarkdownProps) => void
}

export default (props: HomeProps) => {
    let input: any

    const handleFileLoad = () => {
        var reader = new FileReader();

        reader.onload = function (evt) {
            const text = evt.target?.result as string;
            const headerString = text.split("---")[1]
            props.onNext(text.split("---")[2], readHeader(headerString))
        };

        reader.onerror = function (evt) {
            console.error("An error ocurred reading the file",evt);
        };

        reader.readAsText(input.files[0], "UTF-8");
    }

    return <div class="h-screen flex place-content-center place-items-center">
        <div class="w-96 h-fit flex flex-col">
            <button class="btn block mx-auto" onClick={() => props.onNext("")}>Créer un nouvel article</button>
            <div class="divider">OU</div>
            <input ref={input} style="display:none;" onChange={() => handleFileLoad()} type="file" />
            <button class="btn block mx-auto" onClick={() => {input.click()}}>Charger un article</button>
        </div>
    </div>
}
