import data from 'emoji-mart-vue/data/messenger.json';
import { NimbleEmojiIndex } from 'emoji-mart-vue';

const emojiIndex = new NimbleEmojiIndex(data);

export default (message) => {
  const emoticonRegex = /(:\w+:|<[/\\]?3|[()\\\D|*$][-^]?[:;=]|[:;=B8][-^]?[3DOPp@$*\\)(/|])(?=\s|[!.?]|$)/g;
  const replacedMessage = message.replace(emoticonRegex, (match) => {
    if (match.replace(' ', '').length !== 1) {
      const foundEmojies = emojiIndex.search(match);
      if (foundEmojies[0]) {
        return foundEmojies[0].native;
      }
    }
    return match;
  });
  return replacedMessage;
};
