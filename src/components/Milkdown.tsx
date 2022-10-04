import { onCleanup, onMount } from 'solid-js'
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { commonmark } from '@milkdown/preset-commonmark'
import { nord } from '@milkdown/theme-nord'
import { destroy } from '@milkdown/utils'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { menu } from '@milkdown/plugin-menu'
import { tooltip } from '@milkdown/plugin-tooltip'

interface MilkdownProps {
    onChange: (value: string) => void
    defaultValue: string
}

export default (props: MilkdownProps) => {
    let ref: any
    let editor: any
    onMount(async () => {
        editor = await Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, ref)
                ctx.set(defaultValueCtx, props.defaultValue)
                ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
                    props.onChange(markdown)
                })
            })
            .use(commonmark)
            .use(nord)
            .use(listener)
            .use(menu)
            .use(tooltip)
            .create()
    });

    onCleanup(() => {
        editor.action(destroy())
    });

    return <div ref={ref} style="position: relative;" />;
};