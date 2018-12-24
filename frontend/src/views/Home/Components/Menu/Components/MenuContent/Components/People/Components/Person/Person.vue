<template>
  <div class="person">
    <div class="person__info">
      <div class="person__info__avatar">
        <img
          class="person__info__avatar__image"
          :src="imageLink"
        >
      </div>
      <div class="person__info__name">
        {{ name | truncateString(20) }}
      </div>
    </div>
    <div
      v-if="!isFriend"
      class="person__button"
      @click="addContact"
    >
      <v-icon class="person__button__icon">
        person_add
      </v-icon>
      <span class="person__button__text">
        Add contact
      </span>
    </div>
    <div
      v-else
      class="person__button person__button--friend"
      @click="removeContact"
    >
      <v-icon class="person__button__icon">
        person_add_disabled
      </v-icon>
      <span class="person__button__text">
        Remove contact
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageLink() {
      return this.$store.getters['person/getAvatarLink'](this.person._id);
    },
    name() {
      return this.$store.getters['person/getName'](this.person._id);
    },
    isFriend() {
      return !!this.$store.getters['contact/getName'](this.person._id);
    }
  },
  methods: {
    addContact() {
      this.$store.dispatch('contact/add', this.person._id);
    },
    removeContact() {
      this.$store.dispatch('contact/remove', this.person._id);
    }
  }
};
</script>

<style lang="scss" scoped>
.person {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  &__info {
    display: flex;
    align-items: center;
    &__name {
      color: rgba($color-purple-light, 0.7);
    }
    &__avatar {
      display: flex;
      align-items: center;
      margin-right: 15px;
      &__image {
        height: 35px;
        width: 35px;
        border-radius: 50%;
      }
    }
  }
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba($color-purple-light, 0.5);
    opacity: 0.5;
    border-radius: 5px;
    padding: 3px 5px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.8;
    }
    &__icon {
      color: $color-purple-light;
      margin-right: 5px;
      font-size: 20px;
    }
    &__text {
      color: $color-purple-light;
      transition: 0.3s;
    }
  }
}
</style>
