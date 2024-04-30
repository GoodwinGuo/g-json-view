import { defineComponent } from 'vue'
import GJsonView from './index'
// @ts-ignore
import json from './assets/json'

export default defineComponent({
  render() {
    return (
      <main>
        <GJsonView json={JSON.parse(json)} />
      </main>
    )
  }
})
