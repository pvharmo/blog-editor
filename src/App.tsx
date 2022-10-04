import { Component, createSignal, Match, Switch } from 'solid-js'

import Form from './components/Form'
import Home from './Home'
import { MarkdownProps } from './md'

const App: Component = () => {
  const [showForm, setShowForm] = createSignal(false)
  const [mdProps, setMdProps] = createSignal<MarkdownProps | undefined>()
  const [md, setMd] = createSignal("")

  const handleLoad = (md: string, mdProps: MarkdownProps | undefined) => {
    setMdProps(mdProps)
    setMd(md)
    setShowForm(true)
  }

  return <Switch>
    <Match when={!showForm()}>
      <Home onNext={handleLoad} />
    </Match>
    <Match when={showForm()}>
      <Form mdProps={mdProps()} md={md()} />
    </Match>
  </Switch>
}

export default App;
