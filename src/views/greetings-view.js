const { View, BotTextMessage } = require('botfuel-dialog');

class GreetingsView extends View {
  render() {
    return [new BotTextMessage('Bonjour humain!')];
  }
}

module.exports = GreetingsView;
