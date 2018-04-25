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

const {
  PromptView,
  BotTextMessage,
  BotImageMessage,
  QuickrepliesMessage,
  WebAdapter,
} = require('botfuel-dialog');

const makeInfo = (entities) => {
  const location = entities.location && entities.location.values[0].value;
  const date = entities.date && new Date(entities.date.values[0].milliseconds);

  return `D'accord. Je peux vous donner de l'information sur la météo ${
    location ? `à ${location}` : ''
  }${date ? ` le ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` : ''}`;
};

const askInfo = (entityName) => {
  switch (entityName) {
    case 'location':
      return 'Dans quelle ville?';
    case 'date':
      return 'Quel jour?';
    default:
      return '';
  }
};

const images = {
  Clair: 'clair.jpg',
  'Pluie modérée': 'pluie.jpg',
  'Pluie modérée par moments': 'pluie.jpg',
  'Pluie forte par moments': 'pluie.jpg',
  'Pluie forte': 'pluie.jpg',
  'Pluie éparse à proximité': 'pluie.jpg',
  'Pluie verglaçante légère': 'pluie-legere.jpg',
  'Pluie légère': 'pluie-legere.jpg',
  'Averse de pluie légère': 'pluie-legere.jpg',
  'Pluie légère éparse': 'pluie-legere.jpg',
  Ensoleillé: 'ensoleille.jpg',
  Nuageux: 'nuageux.jpg',
  Brume: 'brume.jpg',
  'Grésil éparse à proximité': 'neige.jpg',
  'Neige éparse à proximité': 'neige.jpg',
  Blizzard: 'neige.jpg',
  'Rafales de neige': 'neige.jpg',
  'Partiellement nuageux': 'partiellement-nuageux.jpg',
  Couvert: 'couvert.jpg',
  'Foyers orageux à proximité': 'foyers.jpg',
  Brouillard: 'brouillard.jpg',
  'Brouillard givrant': 'brouillard.jpg',
  'Bruine verglaçante éparse à proximité': 'bruine.jpg',
  'Bruine légère éparse': 'bruine.jpg',
  'Bruine légère': 'bruine.jpg',
  'Bruine verglaçante': 'bruine.jpg',
  'Forte bruine verglaçante': 'bruine.jpg',
};

class WeatherView extends PromptView {
  render(userMessage, { matchedEntities, missingEntities, weatherData }) {
    const messages = [];
    const location = matchedEntities.location && matchedEntities.location.values[0].value;
    const date = matchedEntities.date && new Date(matchedEntities.date.values[0].milliseconds);

    // Print info of obtained information
    if (Object.keys(matchedEntities).length !== 0 && missingEntities.size !== 0) {
      messages.push(new BotTextMessage(makeInfo(matchedEntities)));
    }

    // Ask for any missing information
    if (missingEntities.size !== 0) {
      const entityName = missingEntities.keys().next().value;
      messages.push(new BotTextMessage(askInfo(entityName)));
      if (entityName === 'date') {
        messages.push(new QuickrepliesMessage(["Aujourd'hui", 'Demain', 'Dans 7 jours']));
      }
    }

    if (missingEntities.size === 0) {
      if (date - Date.now() > 15 * 86400000) {
        messages.push(new BotTextMessage("Desolé, On n'a pas les données pour cette date"));
      } else {
        messages.push(
          new BotTextMessage(
            `Voila la météo pour ${location} le ${date.getDate()}-${date.getMonth() +
              1}-${date.getFullYear()}.`,
          ),
        );
        const maxTemp = weatherData.weather[0].maxtempC;
        const minTemp = weatherData.weather[0].mintempC;
        const description = weatherData.weather[0].hourly[0].lang_fr['0'].value;
        messages.push(new BotTextMessage(`${description}, ${minTemp} - ${maxTemp} degrés Celsius`));
        if (Object.keys(images).includes(description)) {
          messages.push(
            new BotImageMessage(WebAdapter.getStaticUrl(`images/${images[description]}`)),
          );
        }
      }
    }

    return messages;
  }
}

module.exports = WeatherView;
