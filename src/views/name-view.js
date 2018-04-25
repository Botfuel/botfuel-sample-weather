const { PromptView, BotTextMessage } = require('botfuel-dialog');

class NameView extends PromptView {
  render(userMessage, { matchedEntities }) {
    const name = matchedEntities.name && matchedEntities.name.values[0].value;

    if (name) {
      const [firstLetter, ...letters] = name;
      const capitalizedName = `${firstLetter.toUpperCase()}${letters.join('')}`;

      return [
        new BotTextMessage(`Enchanté, ${capitalizedName}!`),
      ];
    }

    return [new BotTextMessage("J'ai pas compris!")];
  }
}

module.exports = NameView;
