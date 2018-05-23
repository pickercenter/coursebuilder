<template>
  <div class="hello">
    <div class="uk-child-width-1-1@s uk-light" uk-grid>
        <div>
            <div class="uk-background-cover uk-height-large uk-panel uk-text-center" style="background-image: url(static/images/cover02.jpg);">
               <div class="uk-overlay uk-overlay-primary uk-height-large">
                 <p>&nbsp;</p>
                 <img src="static/images/sipalogo_trans.png" />
                 <h1 class="uk-heading">Credits</h1>
                 <p class="uk-width-1-2@s uk-margin-auto-left uk-margin-auto-right">This was a project of the Picker Center Digital Education Group (PCDEG) at SIPA, created with support and funding from the Office of the Provost (Columbia Online) and the Center for Teaching and Learning (CTL).</p>
               </div>
            </div>
        </div>
    </div>


    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
            <div class="uk-background-default uk-padding uk-height-small">
            	<h5>EXECUTIVE PRODUCER</h5>
            	<p class="uk-text-large">William B. Eimicke</p>
            </div>
        </div>
        <div>
            <div class="uk-background-default uk-padding uk-height-small">
            	<h5>PROJECT DIRECTOR</h5>
            	<p class="uk-text-large">Adam Stepan</p>
            </div>
        </div>
        <div>
            <div class="uk-background-default uk-padding uk-height-small">
            	<h5>DESIGN</h5>
            	<p class="uk-text-large">Siah Singh</p>
            </div>
        </div>
    </div>

    <div class="cleafix"></div>

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
            <div class="uk-background-default uk-padding uk-height-small">
            	<h5>CODING</h5>
            	<p class="uk-text-large">Bernhard Fasenfest</p>
            </div>
        </div>
        <div>
            <div class="uk-background-default uk-padding uk-height-small">
            	<h5>PROJECT LIAISON / PROVOSTS OFFICE</h5>
            	<p class="uk-text-large">Sandesh Tuladhar</p>
            </div>
        </div>
        <div>
            <div class="uk-background-default uk-padding uk-height-small">
            	<h5>PROJECT LIAISON / SIPA IT</h5>
            	<p class="uk-text-large">Harpreet Mahajan</p>
            </div>
        </div>
    </div>

    <div class="cleafix"></div>

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
            <div class="uk-background-default uk-padding uk-height-medium">
              <h5>PROJECT LIAISON / CTL</h5>
              <p class="uk-text-large">Andrew Flatgard</p>
            </div>
        </div>
        <div>
            <div class="uk-background-default uk-padding uk-height-medium">
              <h5>PROJECT LIAISON / CUIT</h5>
              <p class="uk-text-large">Douglas Ward</p>
            </div>
        </div>
        <div>
            <div class="uk-background-default uk-padding uk-height-medium">
              <h5>PROJECT COORDINATOR / PCDEG</h5>
              <p class="uk-text-large">Agustin Rivero</p>
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
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
