const { Bot, BotTextMessage, UserTextMessage } = require('botfuel-dialog');
const config = require('../test-config');

describe('Test bot answers', () => {
  test('Understand weather intent 1', async () => {
    const bot = new Bot(config);
    const { userId } = bot.adapter;
    await bot.play([new UserTextMessage('Météo')]);
    expect(bot.adapter.log[1]).toEqual(new BotTextMessage('Dans quelle ville?').toJson(userId));
  });

  test('Understand weather intent 2', async () => {
    const bot = new Bot(config);
    const { userId } = bot.adapter;
    await bot.play([new UserTextMessage('Je veux la meteo')]);
    expect(bot.adapter.log[1]).toEqual(new BotTextMessage('Dans quelle ville?').toJson(userId));
  });

  test('Complete interaction', async () => {
    const bot = new Bot(config);
    const { userId } = bot.adapter;
    await bot.play([
      new UserTextMessage('Quel temps fait-il?'),
      new UserTextMessage('Paris'),
      new UserTextMessage('Demain'),
    ]);

    expect(bot.adapter.log[1]).toEqual(new BotTextMessage('Dans quelle ville?').toJson(userId));
    expect(bot.adapter.log[3]).toEqual(
      new BotTextMessage(
        "D'accord. Je peux vous donner de l'information sur la météo à Paris",
      ).toJson(userId),
    );
    expect(bot.adapter.log[4]).toEqual(new BotTextMessage('Quel jour?').toJson(userId));
  });
});
