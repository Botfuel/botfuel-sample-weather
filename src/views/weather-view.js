const { PromptView, BotTextMessage, BotImageMessage, WebAdapter } = require('botfuel-dialog');

const makeInfo = (entities) => {
  const location = entities.location && entities.location.values[0].value;
  const date = entities.date && new Date(entities.date.values[0].milliseconds);

  return `
    D'accord. Je peux vous donner de l'information sur la météo 
    ${location ? `à ${location}` : ''} ${
    date ? `le ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` : ''
  }
  `;
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

class WeatherView extends PromptView {
  render(userMessage, { matchedEntities, missingEntities, weatherData }) {
    const messages = [];
    const location = matchedEntities.location && matchedEntities.location.values[0].value;
    const date = matchedEntities.date && new Date(matchedEntities.date.values[0].milliseconds);

    // Print info of obtained information
    if (
      Object.keys(matchedEntities).filter(key => matchedEntities[key]).length !== 0 &&
      missingEntities.size !== 0
    ) {
      messages.push(new BotTextMessage(makeInfo(matchedEntities)));
    }

    // Ask for any missing information
    if (missingEntities.size !== 0) {
      messages.push(new BotTextMessage(askInfo(missingEntities.keys().next().value)));
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
        messages.push(
          new BotImageMessage(
            WebAdapter.getStaticUrl(
              `images/${description
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')}.jpg`,
            ),
          ),
        );
      }
    }

    return messages;
  }
}

module.exports = WeatherView;