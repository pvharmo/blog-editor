import yaml from "js-yaml"

export interface MarkdownProps {
    title: string
    author: string
    youtubeMovieTrailer: string
    categories: string[]
    tags: string[]
    excerpt: string
    markdown: string
    date: Date
}

const arrayToString = (options: string[]) => {
    let result = ""
    for (let i = 0; i < options.length; i++) {
        result += `  - ${options[i]}\n`
    }

    return result
}

export const format = ({markdown, title, author, youtubeMovieTrailer, categories, tags, excerpt, date}: MarkdownProps) => {
    
    return `---
title: "${title}"
author: ${author}
youtubeMovieTrailer: ${youtubeMovieTrailer}
date: ${date.toISOString()}
category:
${arrayToString(categories)}
tags:
${arrayToString(tags)}
excerpt: ${excerpt.replaceAll(/\n/g, '\n  ')}
---
${markdown}`
}

export const filename = (title: string) => {
    let formattedTitle = ""
    const accents = "àáâãäåòóôõöøèéêëðçìíîïùúûüñšÿýž"
    const accentsOut = "aaaaaaooooooeeeeeciiiiuuuunsyyz"
    const charactersToRemove = ",/[]{}<>:;`¸^!\"$%?&*()|\\="
    for (let i = 0; i < title.length; i++) {
        const charIndex = accents.indexOf(title[i])
        if (charIndex >= 0) {
            formattedTitle += accentsOut[charIndex]
        } else if (charactersToRemove.indexOf(title[i]) >= 0) {
            formattedTitle += ""
        } else {
            formattedTitle += title[i].toLocaleLowerCase()
        }
    }

    return formattedTitle.replaceAll(" ", "-")
}

export const readHeader = (headers: string): MarkdownProps => {
    const parsed = yaml.load(headers) as any
    parsed.categories = parsed.category
    return parsed as MarkdownProps
}