<template>
  <header>
    <h3 align="center">
      <a href="https://github.com/GoodwinGuo/g-json-view.git" target="_blank">G Json View</a>
    </h3>
    <div align="center">
      <p>A Vue component for rendering JSON data as a tree structure.</p>
    </div>
  </header>

  <main>
    <div class="textarea-wrap">
      <textarea class="textarea" v-model="jsonStr"></textarea>
    </div>
    <div class="g-json-view-wrap">
      <g-json-view :json="parseJson" v-if="!hasError" />
      <div v-if="hasError">{{ hasError }}</div>
    </div>
  </main>
</template>

<script>
import GJsonView from 'g-json-view';
import json from '../../src/assets/json.js';

export default {
  name: "ClassifyGuide",
  components: {
    GJsonView
  },
  data() {
    return {
      hasError: '',
      jsonStr: json,
      parseJson: JSON.parse(json),
    }
  },
  watch: {
    jsonStr() {
      let newJson
      try {
        newJson = JSON.parse(this.jsonStr)
      } catch (error) {
        this.hasError = error
        return
      }
      this.parseJson = newJson
      this.hasError = ''
    },
  }
}
</script>

<style scoped>
main {
  height: calc(100vh - 110px);
  .textarea-wrap, .g-json-view-wrap {
    width: 50%;
    height: 100%;
    overflow: auto;
    display: inline-block;
  }
  .textarea {
    width: 98%;
    height: 98%;
  }

}
</style>
