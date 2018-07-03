/**
 * Copyright (c) 2017 - present, Botfuel (https://www.botfuel.io).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const request = require('request-promise-native');
const { PromptDialog } = require('botfuel-dialog');
const { Logger } = require('botfuel-dialog');

const logger = Logger('WeatherDialog');

const WEATHER_API_KEY = '';

class WeatherDialog extends PromptDialog {
  async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {
    // logger.debug('dialogWillDisplay', { matchedEntities, missingEntities });

    if (missingEntities.size === 0) {
      const date = matchedEntities.date && new Date(matchedEntities.date.values[0].milliseconds);
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const location = matchedEntities.location && matchedEntities.location.values[0].value;

      // logger.info('dialogWillDisplay', { formattedDate, location });

      const options = {
        uri: 'http://api.worldweatheronline.com/premium/v1/weather.ashx',
        qs: {
          key: WEATHER_API_KEY, // World Weather Online key
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

WeatherDialog.params = {
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

module.exports = WeatherDialog;
