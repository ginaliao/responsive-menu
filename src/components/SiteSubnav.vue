<template>
   <div :class="['site-nav-panel', { 'is-active': active, 'has-active-nav': activeNavIndex !== null }]">
     <div class="site-nav-panel__header">
       <button type="button" class="site-nav-panel__button site-nav-panel__button--back" v-if="parent" @click="goBack">
         <FontAwesomeIcon icon="chevron-left" />
         <span class="site-nav-panel__heading">{{ parent }}</span>
       </button>
       <button type="button" class="site-nav-panel__button site-nav-panel__button--close" @click="closeNav">
         <FontAwesomeIcon icon="times" />
       </button>
     </div>

      <ul class="site-navlist">
        <li
          v-for="(child, index) in children"
          :class="['site-navlist__item', { 'has-subnav': child.children, 'is-active': activeNavIndex === index }]"
          :key="child.label"
        >
          <a :href="child.url" class="site-navlist__link" @click.prevent="setActiveNav(index)">
            {{ child.label }}
            <FontAwesomeIcon icon="chevron-right" v-if="child.children" />
          </a>
          <SiteSubnav
            v-if="child.children" 
            :active="activeNavIndex === index"
            :children="child.children"
            :parent="child.label"
            @back="setActiveNav"
            @close="closeNav"
          />
        </li>
      </ul>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    children: {
      type: Array,
      default: (() => []),
    },
    parent: {
      type: String,
      default: '',
    }
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      activeNavIndex: null,
    };
  },
  methods: {
    closeNav() {
      this.$emit('back', null);
      this.$emit('close')
    },
    goBack() {
      this.$emit('back', null);
    },
    setActiveNav(index) {
      this.activeNavIndex = index;
    }
  }
}
</script>

<style lang="scss">
.site-nav-panel {
  background-color: #080705;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  transition: transform .3s;
  transform: translateX(100%);
  transition: transform .3s cubic-bezier(0.190, 1.000, 0.220, 1.000);
  &.is-active {
    transform: translateX(0);
    transition-timing-function: cubic-bezier(0.190, 1.000, 0.220, 1.000);
  }
  &.has-active-nav {
    overflow: hidden;
  }
}

.site-nav-panel__header {
  align-items: center;
  background-color: #C33149;
  color: #080705;
  display: flex;
  padding: 1rem;
  width: 100%;
}

.site-nav-panel__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  line-height: 1;
  margin: -1em;
  padding: 1em;
  &:focus {
    outline: 0;
  }
  &:focus-visible {
    outline: 1px dotted #fff;
  }
  &--close {
    margin-left: auto;
  }
}

.site-nav-panel__heading {
  display: inline-block;
  font-size: 1rem;
  * + & {
    margin-left: 1rem;
  }
}

.site-navlist {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.site-navlist__item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.site-navlist__link {
  border-bottom: 1px solid rgba(#fff, 0.25);
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  text-decoration: none;
  transition: opacity .3s,
              transform .3s cubic-bezier(0.190, 1.000, 0.220, 1.000);
  width: 100%;
  &:focus,
  &:hover {
    background-color: #100406;
  }
  .site-nav-panel.has-active-nav > .site-navlist > .site-navlist__item > & {
    opacity: 0;
    transform: translateX(-100%);
    transition-timing-function: cubic-bezier(0.190, 1.000, 0.220, 1.000);
  }
}
</style>