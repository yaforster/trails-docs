<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{ code: string }>()
const diagram = ref<HTMLElement>()
const error = ref('')
let renderVersion = 0
let observer: MutationObserver | undefined

async function renderDiagram() {
  const version = ++renderVersion
  error.value = ''

  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
    })

    const { svg } = await mermaid.render(`mermaid-${version}`, props.code)
    if (version === renderVersion && diagram.value) diagram.value.innerHTML = svg
  } catch {
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
