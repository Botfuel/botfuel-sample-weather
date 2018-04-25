const request = require('request-promise-native');
const { PromptDialog } = require('botfuel-dialog');

class Weather extends PromptDialog {
  async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {
    if (missingEntities.size === 0) {
      const date = matchedEntities.date && new Date(matchedEntities.date.values[0].milliseconds);
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const location = matchedEntities.location && matchedEntities.location.values[0].value;

      const options = {
        uri: 'http://api.worldweatheronline.com/premium/v1/weather.ashx',
        qs: {
          key: '556a3f21bf184a0c808150832182304', // World Weather Online key
          q: location,
          format: 'json',
          date: formattedDate,
          lang: 'fr',
        },
        headers: {},
        json: true, // Automatically parses the JSON string in the response
      };

      const requestResult = await request(options);
      const weatherData = requestResult.data;
      return { weatherData };
    }

    return null;
  }
}

Weather.params = {
  namespace: 'weather',
  entities: {
    location: {
      dim: 'city',
      priority: 10,
    },
    date: {
      dim: 'time',
    },
  },
};

module.exports = Weather;
