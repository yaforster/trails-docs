<script lang="ts">
let diagramCount = 0
let mermaidPromise: ReturnType<typeof loadMermaid> | undefined
let initializedTheme: 'dark' | 'default' | undefined
let renderQueue: Promise<void> = Promise.resolve()

function loadMermaid() {
  return import('mermaid').then(({ default: mermaid }) => mermaid)
}

async function renderMermaid(id: string, code: string) {
  const mermaid = await (mermaidPromise ??= loadMermaid())
  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'default'
  if (theme !== initializedTheme) {
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme })
    initializedTheme = theme
  }

  return (await mermaid.render(id, code)).svg
}

function queueRender(id: string, code: string) {
  const render = renderQueue.then(() => renderMermaid(id, code))
  renderQueue = render.then(() => undefined, () => undefined)
  return render
}
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{ code: string }>()
const diagram = ref<HTMLElement>()
const error = ref('')
const renderId = `mermaid-${diagramCount++}`
let renderVersion = 0
let observer: MutationObserver | undefined

async function renderDiagram() {
  const version = ++renderVersion
  error.value = ''

  try {
    const svg = await queueRender(renderId, props.code)
    if (version === renderVersion && diagram.value) diagram.value.innerHTML = svg
  } catch (cause) {
    console.error('Mermaid diagram rendering failed.', cause)
    error.value = 'Diagram could not be rendered.'
  }
}

onMounted(() => {
  renderDiagram()
  observer = new MutationObserver(renderDiagram)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => observer?.disconnect())
watch(() => props.code, renderDiagram)
</script>

<template>
  <div ref="diagram" class="mermaid-diagram" role="img" aria-label="Architecture diagram">
    <p v-if="error" class="mermaid-error">{{ error }}</p>
  </div>
</template>
