<template>
  <div class="hello">
    <div class="uk-child-width-1-1@s uk-light" uk-grid>
        <div>
            <div class="uk-background-cover uk-height-large uk-panel uk-text-center" style="background-image: url(static/images/cover01.jpg);">
               <p>&nbsp;</p>
               <p>&nbsp;</p>
               <img class="columbia-logo" src="https://s3.amazonaws.com/cu-coursebuilder/images/CCB_logo.jpg" />
               <br><br>
               <router-link class="router" to="/guide">
               <el-button type="primary" size="large" style="display: inline-block; margin-left: 15px; margin-right: 20px;">View Guide</el-button>
               </router-link>
               <el-button type="primary" size="large" style="display: inline-block; margin-right: 20px;" @click="dialogFormVisible = true">Get Started</el-button>
            </div>
        </div>
    </div>


        <el-dialog  title="Course Info" :visible.sync="dialogFormVisible" style="width: 80%; margin:auto;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <el-form-item label="Course Title" prop="title">
              <el-input autosize style="width: 80%" placeholder="Please input your Course Title" v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="Course URL" prop="url">
              <el-input autosize style="width: 80%" placeholder="Please input your Course URL" v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="School" prop="theme">
              <select style="display: inline-block; width:150px" v-model="ruleForm.theme" name="Choose Banner" class="uk-select">
                <option v-for="theme in $store.getters.getThemeOptions" :value="theme">{{theme.option}}</option>
              </select>
            </el-form-item>
            <el-form-item label="Course Type" prop="classType">
              <select style="display: inline-block; width:150px" v-model="ruleForm.classType" name="Choose Banner" class="uk-select">
                <option v-for="type in info.classOptions" :value="type">{{type.option}}</option>
              </select>
            </el-form-item>
            <el-form-item label="Online Class" prop="isBlended">
              <el-switch
                v-model="ruleForm.isBlended"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="confirmForm">Confirm</el-button>
          </span>
        </el-dialog>


    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>1</h1>
            	<h5>DESIGN IN REAL TIME</h5>
            	<p>This website allows Columbia Professors and TA’s to quickly build Canvas class websites using our pre-built course template. </p>
            </div>
        </div>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>2</h1>
            	<h5>EXPORT CODE</h5>
            	<p>Once each page is built, you can copy the code for the page template.</p>
            </div>
        </div>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>3</h1>
            	<h5>INSERT INTO CANVAS</h5>
            	<p>And insert it into the canvas Page! See <router-link class="router" to="/guide">user guide</router-link> for details.</p>
            </div>
        </div>
    </div>

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left" uk-grid>
        <div class="uk-background-muted uk-padding">
    		<p>Copyright © Columbia University. All rights reserved.</p>
       	</div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../bus'
import saveState from 'vue-save-state';
import mutations from '../store/mutations'
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'Home',
  data () {
    return {
      dialogFormVisible: false,
      ruleForm: {
        title: this.$store.getters.getInfo.title,
        url: this.$store.getters.getInfo.urlArgs,
        classType: this.$store.getters.getInfo.classType,
        isBlended: this.$store.getters.getInfo.isBlended,
        theme: this.$store.getters.getTheme,
      },
      rules: {
        title: [
          { required: true, message: 'Course Title is required', trigger: 'blur' },
          { min: 0, max: 35, message: 'Length should be less than 35 characters', trigger: 'blur' }
        ],
        url: [
          { required: true, message: 'Course URL is required', trigger: 'blur' },
          { type: "url" , message: 'Must be a valid URL', trigger: 'blur' }
        ],

      }
    }
  },
  mixins: [saveState, mutations],
  computed: {
  },
  methods: {
    getStarted(){
      this.$router.push({path: '/home'});
    },
    getStartedModal(){
      this.dialogFormVisible = false
      this.$router.push({path: '/home'});
    },
    confirmForm(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.updateProp('title', this.ruleForm.title)
          this.updateProp('url', this.ruleForm.url)
          this.updateProp('classType', this.ruleForm.classType)
          this.updateProp('isBlended', this.ruleForm.isBlended)
          this.theme = this.ruleForm.theme
          this.dialogFormVisible = false

          this.$router.push({path: '/home'});
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    getSaveStateConfig() {
      return {
          'cacheKey': 'Splash',
      };
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .columbia-logo {
    width: 400px;
  }
  .el-button--large {
    padding: 21px 29px;
    font-size: 24px;
    border-radius: 4px;
  }
</style>
