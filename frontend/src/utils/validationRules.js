class Rules {
  constructor(rules) {
    Object.keys(rules).forEach(rule => (this[rule] = rules[rule]));
    this.all = [ ...Object.values(rules) ];
  }
}

export const passwordRules = new Rules({
  required: value => !!value || 'Password is required',
  atLeastChars: value => value.length >= 6 || 'Password should contain at least 8 characters'
});

export const usernameRules = new Rules({
  required: value => !!value || 'Username is required',
  atLeastChars: value => value.length >= 2 || 'Username should contain at least 2 characters',
  maxChars: value => value.length <= 30 || 'Username should contain max 30 characters.'
});
