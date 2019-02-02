<template>
  <div class="mobile-header">
    <div class="mobile-header__logo">
      <img
        src="@/assets/logo.svg"
        @click="closeCurrentChat"
      >
    </div>
    <div class="mobile-header__menu-activator">
      <button
        :class="['hamburger hamburger--collapse', {'is-active': isMenuOpen}]"
        type="button"
        @click="toggleMenu"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner" />
        </span>
      </button>
      <div
        v-if="unreadMessagesCount"
        class="mobile-header__menu-activator__badge"
      >
        {{ unreadMessagesCount }}
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  computed: {
    isMenuOpen() {
      return this.$store.state.UI.isMenuOpen;
    },
    unreadMessagesCount() {
      return (
        this.$store.getters['message/getUnreadDialoguesCount']
        + this.$store.getters['message/getUnreadConversationsCount']
      );
    }
  },
  methods: {
    toggleMenu() {
      if (this.isMenuOpen) {
        this.$store.dispatch('UI/closeMenu');
        return;
      }
      this.$store.dispatch('UI/openMenu');
    },
    closeCurrentChat() {
      if (screenfull.enabled) {
        screenfull.toggle();
      } else {
        this.$store.dispatch('conversation/clearCurrent');
        this.$store.dispatch('conversation/clearHistory');
        this.$store.dispatch('conversation/clearPaginationInfo');
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.mobile-header {
  background: $color-purple-ultra-dark;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 15px;
  border-bottom: 1px solid rgba($color-purple-light, 0.7);
  &__logo {
    img {
      height: 40px;
      display: block;
      cursor: pointer;
    }
  }
  &__menu-activator {
    margin-left: auto;
    position: relative;
    &__badge {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color-white;
      font-size: 10px;
      width: 13px;
      height: 13px;
      background: $color-green;
      border-radius: 50%;
      position: absolute;
      bottom: -5px;
      left: -5px;
    }
  }
}

.hamburger {
  outline: none;
  display: flex;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.075s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
}
.hamburger.is-active .hamburger-inner,
.hamburger.is-active .hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after {
  background-color: $color-purple-light;
}

.hamburger-box {
  width: 25px;
  height: 24px;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 25px;
  height: 2px;
  background-color: $color-purple-light;
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.075s;
  transition-timing-function: ease;
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: "";
  display: block;
}
.hamburger-inner::before {
  top: -10px;
}
.hamburger-inner::after {
  bottom: -10px;
}
.hamburger--collapse .hamburger-inner {
  top: auto;
  bottom: 0;
  transition-duration: 0.065s;
  transition-delay: 0.065s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.hamburger--collapse .hamburger-inner::after {
  top: -20px;
  transition: top 0.1s 0.1s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    opacity 0.05s linear;
}
.hamburger--collapse .hamburger-inner::before {
  transition: top 0.06s 0.1s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    transform 0.065s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.hamburger--collapse.is-active .hamburger-inner {
  transform: translate3d(0, -10px, 0) rotate(-45deg);
  transition-delay: 0.11s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
.hamburger--collapse.is-active .hamburger-inner::after {
  top: 0;
  opacity: 0;
  transition: top 0.1s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
    opacity 0.05s 0.11s linear;
}
.hamburger--collapse.is-active .hamburger-inner::before {
  top: 0;
  transform: rotate(-90deg);
  transition: top 0.1s 0.08s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
    transform 0.065s 0.125s cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>
