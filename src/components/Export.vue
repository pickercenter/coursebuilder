<template>
  <div id="app">

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-large">
              <h1>IMPORT</h1>
              <p>If you have previously saved an export file from this version of Coursebuilder you can use the input below to import all of the data into this
              session. Warning! This will overwrite all information you have currently entered.</p>
              <h4>Select a ".json" file from a previous data export</h4>

              <form>
                <button class="uk-button uk-button-default" v-if="hasImportData" @click.prevent="performImport">
                  File read successfully! Click here to confirm import.
                </button>
                <div class="uk-margin" uk-margin>
                   <input style="display:inline-block;" class="uk-padding" type="file" accept=".json" name="import-file" @change="onImportFileChange" />
                   <!-- <input style="display:inline-block;" class="uk-padding" type="file" name="import-file2" @change="onImportFileChange2" /> -->
                   <br> <br>
                </div>
              </form>
            </div>
        </div>
        <div>
            <div class="uk-background-secondary uk-padding uk-light uk-height-large">
              <h1>EXPORT</h1>
              <p>If you have completed your class or want to save the data you have previously submitted, click the export button to
               save a ".json" file that you can import at a later date (using the import section to the left).</p>
               <br> <br> <br>
              <button class="uk-button-large uk-button-default" type="button" name="button" @click="exportJSON">Export</button>

            </div>
        </div>

    </div>

  <div class="clearfix"></div>

  <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left uk-margin-medium-top" uk-grid>
      <div class="uk-background-muted uk-padding">
  		<p>Copyright © Columbia University. All rights reserved.</p>
     	</div>
  </div>

  </div>
</template>

<script>

import { EventBus } from '../bus'
import saveFile from '../util/save-file'
import JSZip from 'JSZip'

export default {
  name: 'Export',
  data () {
    return {
      hasImportData: false,
      fullscreenLoading: false,
      exportData: {}
    }
  },
  computed: {
    loading: {
      get () {
        return this.$store.getters.loading
      },
      set (payload) {
        this.$store.commit('updateLoading', payload)
      }
    },
  },
  mounted () {
  },
  methods: {
    onImportFileChange (changeEvent) {
      let file = changeEvent.target.files[0]
      if (!file) {
        return
      }

      let reader = new FileReader()
      reader.onload = loadEvent => {
        this.importData = JSON.parse(loadEvent.target.result)
        this.hasImportData = !!this.importData
      }

      reader.readAsText(file)
    },
    onImportFileChange2 (changeEvent) {
      let files = changeEvent.target.files
      console.log(files)
      JSZip.loadAsync(files[0]).then(function(zip) {
        console.log(zip)
        zip.file("wiki_content/day-1.html", "<h1><strong>TEST OF HTML</strong></h1>");
        zip.generateAsync({type:"blob"})
        .then(function (blob) {
          saveFile({
            name: 'ziptest.zip',
            data: blob
          })
        });
        zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
        });
      })

    },
    performImport () {
      this.$store.commit('updateInfo', this.importData.store.info)
      this.$store.commit('updateTheme', this.importData.store.theme.theme)
      this.$store.commit('updateWeeks', this.importData.store.weeks)
      this.$router.push({path: '/home'});
    },
    exportJSON () {
      this.exportData = {}
      this.exportDataIfPossible()
    },
    exportDataIfPossible () {
      console.log("here")

      let waitTime = 0;

      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + "-" + today.getMinutes();
      let dateTime = date+' '+time;

      // get store
      this.exportData.store = this.$store.getters.getStore

      // save file as json
      console.log ('exporting..')
      setTimeout( () => {
        saveFile({
          name: this.$store.state.info.title + " " + dateTime + '.json',
          data: JSON.stringify(this.exportData)
        })
      }, waitTime)
    }
  }
}
</script>

<style>

*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    font-size: 100%;
}

.export-container{
  width: 100%;
  text-align: center;
}

.export-button{
  width: 80px;
  height: 50px;
}

.center{
  text-align: center;
}

</style>
