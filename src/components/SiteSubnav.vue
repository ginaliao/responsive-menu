<template>
  <div :class="['site-nav-panel', `site-nav-panel--${level}`, { 'is-active': active, 'has-active-nav': activeNavIndex !== null }]">
    <div class="site-nav-panel__header">
      <button
        v-if="parent"
        type="button"
        class="site-nav-panel__button site-nav-panel__button--back"
        @click="goBack"
      >
        <FontAwesomeIcon
          
          icon="chevron-left"
        />
        <span class="site-nav-panel__heading">{{ parent }}</span>
      </button>

      <span
        v-else
        class="site-nav-panel__heading"
      >
        Menu
      </span>

      <button
        type="button"
        class="site-nav-panel__button site-nav-panel__button--close"
        @click="closeNav"
      >
        <FontAwesomeIcon icon="times" />
      </button>
    </div>

    <ul class="site-navlist">
      <li
        v-for="(child, index) in children"
        :key="`${child.label}`"
        :class="['site-navlist__item', { 'has-subnav': child.children, 'is-active': activeNavIndex === index }]"
      >
        <a
          :class="['site-navlist__link', { 'site-navlist__link--heading': level === 2 }]"
          :href="child.url"
          @click.prevent="child.children ? goTo(index) : null"
        >
          {{ child.label }}
          <FontAwesomeIcon
            v-if="child.children && (screen === 'small' || (level === 1 && screen === 'large'))"
            :key="screen === 'small' ? 'chevron-right' : 'chevron-down'"
            class="site-navlist__icon"
            :icon="screen === 'small' ? 'chevron-right' : 'chevron-down'"
          />
        </a>
        <SiteSubnav
          v-if="child.children" 
          :active="activeNavIndex === index"
          :children="child.children"
          :level="level + 1"
          :parent="child.label"
          @back="goTo(null)"
          @close="closeNav"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    children: {
      type: Array,
      default: (() => []),
    },
    level: {
      type: Number,
      default: 1,
    },
    parent: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      activeNavIndex: null,
      screen: 'large',
    };
  },
  mounted() {
    let mql = window.matchMedia('(max-width: 750px)');

    this.setScreen(mql.matches);

    mql.addEventListener('change', (e) => this.setScreen(e.matches));
  },
  methods: {
    closeNav() {
      this.$emit('back', null);
      this.$emit('close')
    },
    goBack() {
      this.$emit('back', null);
    },
    goTo(index) {
      this.$el.scrollTop = 0;
      this.activeNavIndex = index;
    },
    setScreen(matches) {
      this.screen = matches ? 'small' : 'large';
    }
  },
}
</script>

<style lang="scss">
.site-nav-panel {
  @media screen and (max-width: 750px) {
    background-color: #080705;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    top: 0;
    transform: translateX(100%);
    transition: transform .3s cubic-bezier(0.950, 0.050, 0.795, 0.035);
  }
  &.is-active {
    @media screen and (max-width: 750px) {
      transform: translateX(0);
      transition-timing-function: cubic-bezier(0.190, 1.000, 0.220, 1.000);
    }
   
  }
  &.has-active-nav {
    overflow: hidden;
  }
  &:not(.site-nav-panel--1) {
    @media screen and (min-width: 751px) {
      display: none;
    }
  }
  &--1 {
    background-color: #080705;
  }
  &--2 {
    &.is-active {
      @media screen and (min-width: 751px) {
        background-color: lighten(#100406, 3%);
        display: block;
        padding: 2rem 0;
        position: absolute;
        top: 100%;
        width: 100%;
      }
    }
    &.is-active .site-nav-panel {
      @media screen and (min-width: 751px) {
        display: block;
      }
    }
  }
}

.site-nav-panel__header {
  align-items: center;
  background-color: #C33149;
  color: #080705;
  display: flex;
  padding: 1rem;
  width: 100%;
  @media screen and (min-width: 751px) {
    display: none;
  }
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
  line-height: 1;
  * + & {
    margin-left: 1rem;
  }
}

.site-navlist {
  list-style-type: none;
  margin: 0;
  padding: 0;
  .site-nav-panel--2 > & {
    @media screen and (min-width: 751px) {
      column-count: 4;
    }
  }
}

.site-navlist__item {
  break-inside: avoid-column;
  @media screen and (max-width: 750px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .site-nav-panel--1 > .site-navlist > & {
    @media screen and (min-width: 751px) {
      display: inline-flex;
    }
  }
  .site-nav-panel--2 > .site-navlist > & {
    @media screen and (min-width: 751px) {
      margin-bottom: 1rem;
    }
  }
}

.site-navlist__link {
  align-items: center;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  text-decoration: none;
  @media screen and (max-width: 750px) {
    border-bottom: 1px solid rgba(#fff, 0.25);
    padding: 1rem;
    transition: opacity .3s,
                transform .3s cubic-bezier(0.950, 0.050, 0.795, 0.035);
    width: 100%;
  }
  &:focus,
  &:hover {
    @media screen and (max-width: 750px) {
      background-color: #100406;
    }
  }
  &--heading {
    @media screen and (min-width: 751px) {
      font-weight: bold;
    }
  }
  .site-nav-panel.has-active-nav > .site-navlist > .site-navlist__item > & {
    @media screen and (max-width: 750px) {
      opacity: 0;
      transform: translateX(-100%);
      transition-timing-function: cubic-bezier(0.190, 1.000, 0.220, 1.000);
    }
  }
}

.site-navlist__icon {
  margin-left: 0.25rem;
}
</style>