<template lang="html">
  <transition name="fade">
    <li>
      <div class="ig-row ig-published">
        <div class="ig-row__layout">
          <div class="ig-type-icon" aria-hidden="true">
            <i class="icon-assignment"></i>
          </div>
          <div class="ig-info">
            <a class="ig-title" :href="data.link" :data-api-endpoint="data.link" data-api-returntype="Assignment"> Assignment 1</a>
          <div class="ig-details">
            <div class="ig-details__item">
              <strong>Due</strong> {{data.due}}
            </div>
            <div class="ig-details__item">
              <strong>Available</strong> {{data.available}}
            </div>
            <!-- <div class="ig-details__item">{{data.points}} pts</div> -->
          </div>
          </div>
        </div>
      </div>
    </li>
  </transition>
</template>

<script>

export default {
  data() {
    return {
      url: this.$store.state.info.url
    }
  },
  props: ['data', 'index']
}
</script>

<style lang="css">
</style>
