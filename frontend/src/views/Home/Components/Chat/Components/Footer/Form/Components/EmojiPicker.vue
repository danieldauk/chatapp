<template>
  <emoji-picker
    v-click-outside="clearSearch"
    :search="search"
    @select="$emit('select', $event)"
  >
    <v-icon
      slot="emoji-invoker"
      slot-scope="{ events }"
      v-on="events"
    >
      insert_emoticon
    </v-icon>
    <div
      slot="emoji-picker"
      slot-scope="{ emojis }"
      class="emoji-picker-container"
    >
      <div class="emoji-picker">
        <div
          class="emoji-picker__search"
        >
          <v-text-field
            :value="search"
            solo
            hide-details
            placeholder="Search emojies"
            class="emoji-picker__search__input"
            prepend-icon="search"
            clearable
            :clear-icon-cb="clearSearch"
            type="text"
            @click.native.stop
            tabindex="-1"
            @input="search = $event.toLowerCase()"
          />
        </div>
        <div
          v-for="(emojiGroup, category) in emojis"
          :key="category"
          class="emoji-picker__category"
        >
          <h5 class="emoji-picker__category__header">
            {{ category }}
          </h5>
          <div class="emoji-picker__category__emojies">
            <div
              v-for="(emoji, emojiName) in emojiGroup"
              :key="emojiName"
              class="emoji-picker__category__emojies__emoji"
              :title="emojiName"
              @click="$emit('addEmoji', emoji)"
            >
              {{ emoji }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </emoji-picker>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker';

export default {
  components: {
    EmojiPicker
  },
  data() {
    return {
      search: ''
    };
  },
  methods: {
    clearSearch() {
      this.search = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.emoji-picker-container {
  position: absolute;
  bottom: 61px;
  right: 0;
  background: white;
  padding: 10px 0px 10px 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}
.emoji-picker {
  @include custom-scrollbar;
  height: 225px;
  width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  &__search {
    border-radius: 5px;
    padding: 0 10px;
    margin-right: 10px;
    border: 1px solid rgba($color-silver, 0.6);
    overflow: hidden;
    margin-bottom: 5px;
    &__input {
      /deep/ .v-input__prepend-outer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        margin: 0;
        margin-right: 10px;
        .v-icon {
          font-size: 20px;
          color: $color-silver !important;
        }
      }
      /deep/ .v-input__control {
        min-height: 32px;
      }
      /deep/ .v-input__slot {
        padding: 0;
        box-shadow: none !important;
        .v-input__append-inner {
          display: flex;
          align-items: center;
          height: 100%;
          .v-icon {
            color: $color-silver !important;
            cursor: pointer;
            font-size: 16px;
          }
        }

        input {
          font-size: 15px;
          text-transform: lowercase;
          &::placeholder {
            color: $color-silver;
            text-transform: none;
          }
        }
      }
    }
  }
  &__category {
    width: 100%;
    &__header {
      color: $color-purple-medium;
      font-weight: 700;
    }
    &__emojies {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      &__emoji {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 23px;
        height: 23px;
        cursor: pointer;
        border-radius: 50%;
        &:hover {
          background: rgba($color-silver, 0.2);
          transform: scale(1.3);
          transition: 0.1s;
        }
      }
    }
  }
}
</style>
