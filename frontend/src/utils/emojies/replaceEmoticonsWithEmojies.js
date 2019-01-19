import emojiShorcuts from './emojisShorcuts';

export default (message) => {
  let replacedMessage = message;
  Object.keys(emojiShorcuts).forEach((shortcut) => {
    replacedMessage = replacedMessage.replace(shortcut, emojiShorcuts[shortcut]);
  });
  return replacedMessage;
};
