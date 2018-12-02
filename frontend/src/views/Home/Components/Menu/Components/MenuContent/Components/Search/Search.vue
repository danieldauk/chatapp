<template>
  <v-form @submit.prevent class="search-form">
    <v-text-field
      class="search-form__input"
      solo
      clearable
      :clear-icon-cb="clearSearchTerm"
      prepend-icon="search"
      :value="term"
      hide-details
      height="60"
      placeholder="Search"
      @input="inputHandler"
    ></v-text-field>
  </v-form>
</template>

<script>
import { ActiveTabEnum } from "@/utils/enumerators";

export default {
  date() {
    return {
      debouncedSearch: null
    };
  },
  computed: {
    term() {
      return this.$store.state.searchForm.data.term;
    },
    isPeopleTabShown() {
      return this.$store.state.UI.activeMenuTab === ActiveTabEnum.PEOPLE;
    }
  },
  methods: {
    async inputHandler(value) {
      this.setFormElementValue(value);
      // on input clear interval for debounced search
      clearTimeout(this.debouncedSearch);
      if (!this.term || !this.isPeopleTabShown) {
        return;
      }
      // add debounced search that will be fired after 500 ms since last input
      this.debouncedSearch = setTimeout(() => {
        this.$store.dispatch("people/search", value);
      }, 500);
    },
    setFormElementValue(value) {
      this.$store.dispatch("searchForm/setValue", {
        value,
        id: "term"
      });
    },
    clearSearchTerm() {
      this.setFormElementValue("");
    }
  }
};
</script>


<style lang="scss" scoped>
.search-form {
  padding: 0 15px;
  border-bottom: 1px solid rgba($color-silver, 0.3);
  &__input {
    /deep/ .v-input__prepend-outer {
      margin: 0;
      height: 60px;
      display: flex;
      align-items: center;
      .v-icon {
        color: rgba($color-purple-light, 0.7);
        font-size: 20px;
      }
    }
    /deep/ .v-input__slot {
      box-shadow: none !important;
      padding-right: 0;
      background: $color-purple-dark;
      .v-input__icon--clear .v-icon {
        color: rgba($color-purple-light, 0.7);
        font-size: 18px;
      }
      input {
        font-size: 15px;
        background: transparent;
        color: $color-purple-light;
        &::placeholder {
          color: rgba($color-purple-light, 0.7);
        }
      }
    }
  }
}
</style>
