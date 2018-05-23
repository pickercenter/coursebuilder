<template lang="html">
  <div>
    <div class="center">
      <button type="button" class="add-weekly uk-button uk-button-primary" name="button" @click="fn">Add New <slot></slot></button>
      <button type="button" class="add-weekly uk-button uk-button-danger"  name="button" @click="clear">Clear</button>
    </div>
    <hr>
    <transition name="fade">
    <div v-if="content.length > 0" >

      <div class="center drop-down">
        <select v-model="index" class="uk-select uk-form-width-small">
          <option v-for="n in content.length" :value="n"><slot></slot> {{n}}</option>
        </select>
        <button type="button" name="button" class="uk-button-small uk-button-primary" @click="editable = !editable">{{ editable ? "Save" : "Edit" }}</button>
        <button v-show="editable" type="button" class="uk-button-small uk-button-danger center" name="button" @click="remove"> Delete</button>
      </div>

      <div v-show="editable">
        <div class="code-input center uk-margin-small-top" v-for = "input in inputs">
          <label for="text-area">{{capitalize(input)}}</label>
          <textarea :value="currentItem[input]" @input="modify(currentItem, input, $event)" id="text-area" class="uk-textarea" rows="2" cols="50"></textarea> <br>
        </div>
      </div>

    </div>
    </transition>
  </div>

</template>

<script>

import mutations from '../../store/mutations'

export default {
  data() {
    return {
      index: 1,
      editable: false
    }
  },
  computed: {
    currentItem(){
      return this.content[this.index - 1];
    }
  },
  methods: {
    clear(){
      this.$emit('clearArr');
      console.log('clearing...')
    },
    capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
    remove(){
      this.content.splice(this.index - 1, 1);
    },
    modify(item, input, event){
      // let week = _.cloneDeep(this.$store.getters.getWeeks()[this.selected])
      let prop = _.cloneDeep(this.$store.getters.getWeeks[this.idx][this.property])
      prop[this.index - 1][input] = event.target.value

      console.log(prop[this.index - 1][input])
      console.log(this.property)
      this.updateWeek(this.idx, this.property, prop)
    }
  },
  props: ['content', 'fn', 'inputs','property','idx'],
  mixins: [mutations]
}
</script>

<style lang="css">
.add-weekly {
  margin-top: 20px;
}

.drop-down {
  margin-bottom: 10px;
}

textarea{
  margin-bottom: 10px;
  width: auto;
}

</style>

<!-- <div>
  <div class="center">
    <button type="button" class="add-weekly" name="button" @click="addVideo()">Add New Video</button>
    <button type="button" class="add-weekly"  name="button" @click="videos = []">Clear</button>
  </div>
  <hr>
  <transition name="fade">
  <div v-if="videos.length > 0" >

    <div class="center">
      <select v-model="userInput.videoNumber">
        <option v-for="n in videos.length" :value="n">Video {{n}}</option>
      </select>
      <button type="button" name="button" @click="videoEditable = !videoEditable">{{ videoEditable ? "Save" : "Edit" }}</button>
    </div>

    <div v-show="videoEditable">
      <div class="code-input center" id='textbox1'>
        <p style="font-weight: bold">Title</p>
        <textarea v-model="videos[userInput.videoNumber - 1].title" id="text-area" rows="3" cols="30"></textarea> <br>
      </div>
      <div class="code-input center" id='textbox1'>
        <p style="font-weight: bold">Description</p>
        <textarea v-model="videos[userInput.videoNumber - 1].description" id="text-area" rows="3" cols="30"></textarea> <br>
      </div>
      <div class="code-input center" id='textbox1'>
        <p style="font-weight: bold">Video</p>
        <textarea v-model="videos[userInput.videoNumber - 1].videoSrc" id="text-area" rows="3" cols="30"></textarea> <br>
      </div>
    </div>

  </div>
  </transition>
</div> -->
