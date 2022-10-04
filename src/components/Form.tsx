import { Component, createSignal } from 'solid-js'

import Milkdown from './Milkdown'
import Input from './Input'
import Select, { Option } from './Select'
import { filename, format, MarkdownProps } from '../md'
import DatePicker from './DatePicker'

interface FormProps {
  mdProps: MarkdownProps | undefined,
  md: string
}

const Form: Component<FormProps> = (props: FormProps) => {
  const [title, setTitle] = createSignal(props.mdProps?.title || "")
  const [author, setAuthor] = createSignal(props.mdProps?.author || "Jean Mercier")
  const [youtubeMovieTrailer, setYoutubeMovieTrailer] = createSignal(props.mdProps?.youtubeMovieTrailer || "")
  const [excerpt, setExcerpt] = createSignal(props.mdProps?.excerpt || "")
  const [categories, setCategories] = createSignal<string[]>(props.mdProps?.categories || [])
  const [tags, setTags] = createSignal<string[]>(props.mdProps?.tags || [])
  const [markdown, setMarkdown] = createSignal(props.md || "")
  const [date, setDate] = createSignal(props.mdProps?.date || new Date())
  
  const categoriesOptions = [
    {id: "", label: "Aucune"},
    {id: "Revisiting classics", label: "Classiques revisités"},
    {id: "More on hermeneutics", label: "Plus sur l'herméneutique"},
    {id: "Economics", label: "Économie"},
    {id: "Environment", label: "Environnement"},
    {id: "Globalization", label: "Globalisation"},
    {id: "Media transformation", label: "Transformation des médias"},
    {id: "National culture", label: "Culture nationale"},
    {id: "Sociology", label: "Sociologie"},
  ]
  
  const tagsOptions = [
    {id: "", label: "Aucun"},
    {id: "Africa and the Middle East", label: "Afrique et Moyen-Orient"},
    {id: "Asia", label: "Asie"},
    {id: "Australia-New Zealand", label: "Australie - Nouvelle-Zélande"},
    {id: "Eastern and Central Europe (including Russia)", label: "Europe de l'Est et centrale (incluant la Russie)"},
    {id: "Latin America", label: "Amérique latine"},
    {id: "North America", label: "Amérique du Nord"},
    {id: "Western Europe", label: "Europe de l'Ouest"},
    {id: "Comedy", label: "Comédie"},
    {id: "Documentary", label: "Documentaire"},
    {id: "Drama", label: "Drame"},
    {id: "History", label: "Histoire"},
    {id: "Horror", label: "Horreur"},
    {id: "Science Fiction / Futuristic", label: "Science fiction / Futuriste"},
  ]

  const handleSubmit = () => {
    const val = format({
      title: title(),
      author: author(),
      youtubeMovieTrailer: youtubeMovieTrailer(),
      date: date(),
      excerpt: excerpt(),
      categories: categories().filter(x => x != ""),
      tags: tags().filter(x => x != ""),
      markdown: markdown()
    })

    const element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(val));
    element.setAttribute('download', filename(title() + ".md"));
    document.body.appendChild(element);
    element.click();
    element.parentNode?.removeChild(element)
  }

  return (
    <form class="container mx-auto max-w-4xl" onSubmit={(event) => {event.preventDefault(); handleSubmit()}}>
        <div>
          <Input label="Titre" defaultValue={title()} onChange={(value) => setTitle(value)} />
          <Input label="Auteur" defaultValue={author()} onChange={(value) => setAuthor(value)} />
          <Input label="Youtube" defaultValue={youtubeMovieTrailer() || ""} onChange={(value) => setYoutubeMovieTrailer(value)} />
          <DatePicker label="Date" type='date' defaultValue={date()} onChange={(value) => setDate(value)} />
        </div>
        <div class="flex">
          <Select label="Catégories" defaultValue={categories()} options={categoriesOptions} onChange={(value) => setCategories(value)} />
          <Select label="Tags" defaultValue={tags()} options={tagsOptions} onChange={(value) => setTags(value)} />
        </div>
        <div class="form-control">
          <label for="excerpt-input" class="label">
            <span>Extrait</span>
          </label>
            <textarea id="excerpt-input" class="textarea textarea-bordered h-48" value={excerpt()} onChange={(event) => setExcerpt(event.currentTarget.value)}></textarea>
        </div>

        <h2>Texte</h2>
        <Milkdown defaultValue={markdown()} onChange={value => setMarkdown(value)} />
        <button class="btn block mx-auto my-10" type="submit">Enregistrer</button>
    </form>
  )
}

export default Form;
