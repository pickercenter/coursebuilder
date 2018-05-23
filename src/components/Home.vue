<template>
  <div class="hello">

    <!-- This Div contains all of the information inputs -->
    <!-- Currently it uses a component from the Element UI library for the tabs -->

    <div class="clearfix"></div>

    <!-- Popover Tips -->

    <el-popover
    ref="titlepop" placement="top-start"
    title="Course Title" width="300"
    trigger="hover" :open-delay=2000
    content="The course title should be below 30-40 characters to properly fit on the banner"
    :disabled="!info.usePops">
    </el-popover>

    <el-popover
    ref="urlpop" placement="top-start"
    title="Course URL" width="300"
    trigger="hover" :open-delay=2000
    :disabled="!info.usePops"
    content="The course url is necessary to properly link other pages to your canvas site. Please double check it is correct before copying to canvas.">
    </el-popover>

    <div>
    	<ul class="uk-tab uk-flex-center" data-uk-tab="{connect:'#tab-content'}">
        <li class="uk-active"><a href="#">Course Info</a></li>
        <li><a href="#">Description</a></li>
    		<li><a href="#">Professor</a></li>
    		<li v-if="info.tas.length > 0"><a href="#">TA</a></li>
    		<li><a href="#">Meeting Times</a></li>
    		<li><a href="#">Media Input</a></li>
        <li><a href="#">Banner</a></li>
        <li><a href="#">Buttons</a></li>
    	</ul>
    	<ul id="tab-content" class="uk-switcher uk-margin">
    		<li class="uk-active uk-text-center">

          <!-- Alerts based on validation of course title and url -->
          <el-alert
            title="Course Info Incomplete"
            type="warning" class="alert" show-icon
            description="The course title or course URL are currently empty or not valid. Please complete these sections to continue."
            v-show="!checkTitle">
          </el-alert>
          <el-alert
            title="The length of the course title is longer than 35 characters and may not display properly. Please change the title or use a wide banner"
            type="warning" class="alert" center show-icon
            v-show="info.title.length > 35 && !info.wideBanner">
          </el-alert>

          <el-input style="width: 220px;" v-popover:titlepop placeholder="Please input your Course Title" :value="info.title" @input="updateProp('title', $event)"></el-input>

          <el-input title="This is your Course ID" style="width: 200px;" v-model="info.semester" @input="updateProp('semester', $event)" v-tippy="{delay: [1000,200]}"></el-input>
          <el-input style="width: 400px;" v-popover:urlpop placeholder="Please input your Course URL"  v-model="info.url" @input="updateProp('url', $event)"></el-input>

        </li>

    		<li class="uk-text-center">
          <div class='quill'>
            <quill-editor ref="myTextEditor"
                          v-model="info.description"
                          @input="updateProp('description', $event)"
                          :config="editorOption">
            </quill-editor>
          </div>
    		</li>

    		<li class="uk-text-center">

          <div v-for="prof in info.profs">
          <el-input autosize v-model="prof.name" style="width: 150px;" @input="updateUser(prof, 'name', $event)"></el-input>
          <el-input autosize v-model="prof.email" style="width: 250px;" @input="updateUser(prof, 'email', $event)"></el-input>
          <el-input autosize v-model="prof.office" style="width: 400px;" @input="updateUser(prof, 'office', $event)"></el-input> <br>
          </div>
        </li>

    		<li class="uk-text-center" v-if="info.tas.length > 0">
          <div v-for="ta in info.tas">
            <el-input autosize v-model="ta.name" style="width: 150px;" @input="updateUser(ta, 'name', $event)"></el-input>
            <el-input autosize v-model="ta.email" style="width: 250px;" @input="updateUser(ta, 'email', $event)"></el-input>
            <el-input autosize v-model="ta.office" style="width: 400px;" @input="updateUser(ta, 'office', $event)"></el-input> <br>
          </div>
    		</li>

    		<li class="uk-text-center">
          <el-input autosize style="width: 400px;" v-model="info.meetings" @input="updateProp('meetings', $event)"></el-input>
          <el-input autosize style="width: 400px;" v-model="info.discussions" @input="updateProp('discussions', $event)"></el-input> <br>
    		</li>

    		<li class="uk-text-center">
          <button type="button" class="uk-button uk-button-primary " name="button" @click="mediaSwitch">{{userInput.mediaSwitchText}}</button>
          <el-input autosize style="width: 400px;" v-show="this.info.isVideo" v-model="info.video" @input="updateProp('video', $event)" ></el-input>
          <form  style="display: inline-block;"v-show="!this.info.isVideo" class="your-form-class" v-on:submit.prevent="onFormSubmit('image')">
            <input style="display: inline-block;" name="image" id="image-file" type="file">
            <input style="display: inline-block;" type="submit" class="uk-button uk-button-primary" value="Submit!">
          </form>
        </li>

        <li class="uk-text-center">
          <label>
            Banner Image:
            <select style="display: inline-block; width:150px" v-model="theme" name="Choose Banner" class="uk-select">
              <option selected disabled>Choose Banner</option>
              <option v-for="theme in $store.getters.getThemeOptions" :value="theme">{{theme.option}}</option>
            </select>

              <el-checkbox v-if="theme.wide" v-model="info.wideBanner" @input="updateProp('wideBanner', $event)" >Use Wide Banner</el-checkbox>
          </label>

          <!-- Old Logo select; may need for independant banner switching -->
          <!-- <label>
            Logo Image:
            <select style="display: inline-block; width:150px" v-model="theme.logo" name="Choose Logo" class="uk-select">
              <option selected disabled>Choose Logo</option>
              <option :value="this.$store.state.imageServer + 'SipaLogo2.png'">SIPA</option>
              <option :value="this.$store.state.imageServer + 'SSW_logo.png'">SSW</option>
              <option :value="this.$store.state.imageServer + 'Mailman_logo.png'">Mailman</option>
            </select>
          </label> -->
          <!-- <textarea v-show="!this.userInput.isVideo" v-model="userInput.image" class="code-input uk-input" rows="1" cols="50"></textarea> -->

    		</li>
        <li class="uk-text-center">
          Syllabus Button
          <el-switch
            v-model="info.sylButton"
            @input="updateProp('sylButton', $event)">
          </el-switch>
          <br>
          Activities Button
          <el-switch
            v-model="info.weekButton"
            @input="updateProp('weekButton', $event)">
          </el-switch>
        </li>
    	</ul>
    </div>

    <hr />

    <div class="clearfix"></div>

    <!-- Where the code preview is displayed and where you change how the template parses the store info-->
    <div class="uk-grid-collapse uk-child-width-expand@s" uk-grid>
        <div class="">
        <div id="canvas-code" class="show-content user_content clearfix enhanced ic-Layout-contentMain">
          <div :class="['pad-box-mega','STV1_Banner', info.wideBanner ? theme.wide : theme.banner]">
            <img :src="theme.logo"/>
            <p>{{info.title.toUpperCase()}}</p>
            <p class="STV1_CourseCode">{{info.semester}}</p>
          </div>
          <div class="content-box">
            <div class="grid-row">
              <div class="col-xs-6">
                <div class="styleguide-section__grid-demo-element">
                  <div v-if="!this.userInput.isVideo" >
                    <img :src="this.info.image" class="STV1_WeeklyIconIMG" alt=""> </img>
                  </div>
                  <div v-if="this.userInput.isVideo" class="embed-container">
                    <iframe :src="this.videoLink" width="300" height="150" allowfullscreen="allowfullscreen"
                    webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe>
                  </div>
                </div>
              </div>
              <div class="col-xs-6">
                <div class="styleguide-section__grid-demo-element">
                  <div class="STV1_Welcome">WELCOME TO {{info.title.toUpperCase()}}</div>
                  <p class="html" v-html="info.description"></p>
                  <p>&nbsp;</p>
                  <p>
                    <a class="Button" v-if="info.sylButton" style="text-decoration: none;" :href="info.url + 'assignments/syllabus'" >Course Syllabus</a>
                    <a class="Button" v-if="info.weekButton" style="text-decoration: none;" :href="weeklyUrl" >Weekly Activites</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box">
            <div class="grid-row">
              <div class="col-xs-6">
                <div class="styleguide-section__grid-demo-element pad-box-mini border border-tbl">
                  <p>Instructor:</p>
                  <p v-for="prof in info.profs">Professor {{prof.name}} (<a :href="'mailto:' + prof.email">{{prof.email}}</a>) <br /> {{prof.office}}</p>
                </div>
              </div>
              <div class="col-xs-6" v-if="info.tas.length > 0">
                <div class="styleguide-section__grid-demo-element pad-box-mini border border-tbl">
                  <p>TA:</p>
                  <p v-for="ta in info.tas"> {{ta.name}} (<a :href="'mailto:' + ta.email">{{ta.email}}</a>) <br /> {{ta.office}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="content-box pad-box-mini border border-b">
            <p><strong>MEETING DATES / TIMES:</strong> {{info.meetings}}</p>
            <p><strong>SPECIAL DISCUSSION FORUMS:</strong> {{info.discussions}}</p>
          </div>
        </div>
        <!-- <home-view> </home-view> -->
      </div>
    </div>

    <div class="uk-float-right">
      <a class="uk-button uk-button-primary" href="#modal-overflow" @click="viewCode" uk-toggle>View the Code</a>
      <button class="uk-button uk-button-primary" @click="copyText('aux')">Copy the Code</button>
      <button class="uk-button uk-button-danger" @click="setToDefault">Reset to Default</button>
    </div>

    <div id="modal-overflow" uk-modal>
        <div class="uk-modal-dialog">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <div class="uk-modal-header">
                <h2 class="uk-modal-title">Canvas Code</h2>
            </div>

            <div class="uk-modal-body" uk-overflow-auto>
              <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea>
            </div>

            <div class="uk-modal-footer uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
                <button class="uk-button uk-button-primary" type="button" @click="copyText">Copy Code</button>
            </div>

        </div>
    </div>

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left uk-margin-medium-top" uk-grid>
        <div class="uk-background-muted uk-padding">
    		<p>Copyright © Columbia University. All rights reserved.</p>
       	</div>
    </div>



  </div>

</template>

<script>

import { EventBus } from '../bus'
import saveState from 'vue-save-state';
import { quillEditor } from 'vue-quill-editor';
import validator from 'validator';
import _ from 'lodash'
import mutations from '../store/mutations'
import homeView from './render/home-view'

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote',{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] },'clean'],
  ['link']
];

export default {
  name: 'Home',
  data () {
    return {
      userInput: {
        themeOptions: this.$store.getters.getThemeOptions,
        semester: "U6411 // SPRING 2017",
        professor: "Glenn Denning",
        pEmail: "professor@sipa.columbia.edu",
        ta: "Chandani Punia",
        tEmail:"cp2868@columbia.edu",
        office: "Office Hours: Monday 3:00-6:00 pm (IAB Room 1434)",
        tOffice: "Tuesday 1:00-2:30 pm (Publique, IAB 6th floor)",
        meetings: "Tuesday 9:00-10:50 am (IAB Room 411)",
        discussions: "Thursday 9:00-10:50 am (IAB Room 411)",
        video:"https://vimeo.com/199382848/1dd8fc0f31",
        image:"http://assets.ce.columbia.edu/i/ce/intl/intl-fp@2x.jpg",
        isVideo: false,
        mediaSwitchText: "Toggle to input Video",
        taInfo:"Instructor: \nProfessor Glenn Denning (gd2147@sipa.columbia.edu) Office Hours: Monday 3:00-6:00 pm (IAB Room 1434)",
        description: "Here you’ll find course materials and a range of tools to help you get the most out of the class. \n Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester."
      },
      activeName: '1',
      outputCode: "",
      editorOption:{
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor, homeView
  },
  mixins: [saveState, mutations],
  computed: {
    // Parses an inputted video link to output the correct embed link for the source
    videoLink(){
      let output;
      let link = this.info.video;
      let parts = link.split('/') || [];
      if (parts[2].includes('vimeo.com')){
        output = 'https://player.vimeo.com/video/' + parts[3]
      }
      else if (parts[2].includes('youtube')){
        let split = link.split('=')
        output = 'https://www.youtube.com/embed/' + split[1]
      }
      else {
        output = link;
      }
      return output;
    },
    checkTitle(){
      if (this.info.title.length < 1 || this.info.url.length < 1) return false
      return validator.isURL(this.info.url)
    },
    weeklyUrl(){
      let ending = 'pages/weekly-activities'
      if (this.info.classType.dateType == "Session") ending = 'pages/session-activities'
      return this.info.url + ending
    }
  },
  methods: {
    viewCode(){
      console.log('firing')
      this.updateCode()
    },
    // Toggles button to insert video or image
    mediaSwitch(){
      this.updateProp('isVideo', !this.info.isVideo)
      this.userInput.mediaSwitchText = this.info.isVideo ? "Toggle to input Image" : "Toggle to input Video"
    },
    setToDefault(){
      console.log('resetting data...')
      let dInfo = _.cloneDeep(this.$store.getters.dInfo)
      let props = ['description', 'title', 'url', 'video', 'image', 'meetings','discussions']

      props.forEach( (prop) => {
        this.updateProp(prop, dInfo[prop])
      })
    },
    onFormSubmit (type, ev){
      var formData = new FormData();

      if (type == 'url'){
        console.log('uploading url...')
        var imageurl = document.querySelector('#image-url'); // Gets form data in html
        if (imagefile.files.length == 0) return;
        formData.append("imageUrl", imageurl.value);  // Adds api header to tell server that it is a url
      }
      else {
        console.log('uploading file...')
        var imagefile = document.querySelector('#image-file');
        if (imagefile.files.length == 0) return;
        formData.append("image", imagefile.files[0]); // Adds api header to tell server that it is a file
      }

      // More api headers to tell the server the dimensions to crop
      formData.append('imageWidth', 450)
      formData.append('imageHeight', 250)

      // Send post request to Amazon server using vue-resource with form data
      this.$http.post('http://ec2-34-229-16-148.compute-1.amazonaws.com:3000/image',formData).then( response => {
        console.log('success')
        let imageData = JSON.parse(response.bodyText);
        this.updateProp('image', imageData.imageUrls[0])
        // this.info.image = imageData.imageUrls[0] // Change requisite weekly activity image src to the hosted file
      }, response => {
        console.log(response)
      });
    },
    getSaveStateConfig() {
      return {
          'cacheKey': 'Home',
      };
    }
  },
  mounted(){
    // Once the component is loaded, update the code text box
    this.updateCode();
  },
  beforeCreate(){
    EventBus.$on('import-data', data => {
      this.userInput = { ...data.home.userInput}
      console.log('importing data to home...')
    })

    EventBus.$on('export-data', () => {
      let home = this.$data
      console.log('sending home')
      EventBus.$emit('home-data', home)
    })
  },
  beforeUpdate(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

.alert{
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
}

textarea {
  width: auto;
}

.quill{
  width: 700px;
  margin: auto;
}

el-tab-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: 'blue';
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.textbox{
  margin-left: 40px;
}

#canvas-code {
  width: 1000px;
  margin: auto;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  margin-right: 30px;
  width: 30%;
}

#copy-text-area {
  width: 100%;
}

.GFbanner {
  height: 190px;
}

.STV1_Banner {
  height: 190px;
}

.crop {
  width: 450px;
  height: 250px;
  object-fit: cover;
}

</style>
