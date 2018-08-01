# botfuel-sample-weather

Sample bot to ask about weather using World Weather Online API.

Language: french

## Create an app

* Create a new app on Botfuel Trainer (https://app.botfuel.io). See the [Getting Started tutorial](https://tutorials.botfuel.io/#/codelab/getting-started?step=1) for how to create a new app.


* Add an intent with lable `greetings` with the following training phrases for examples:
  * Hi
  * Hello
  * Salut!
  * Bonjour

* Add an intent with lable `weather` with the following training phrases for examples:

  * Il fait beau?
  * Je veux la météo
  * Météo
  * Comment est la météo?
  * Quel temps fait-t-il à Paris?

* Add an intent with lable `reset` with the following training phrases for examples:

  * Je veux recommencer
  * Recommencer
  * Nouvelle discussion

You can get examples of intents here : https://github.com/Botfuel/botfuel-sample-tripplanner/blob/master/intents.xlsx

## Get an API key on worldweatheronline.com

Create an account  on [worldweatheronline.com](https://developer.worldweatheronline.com/api/)

Copy the API key and paste it in file `src/dialogs/wether.dialog.js` in `const WEATHER_API_KEY = '';`

## How to run the bot

Clone the repository:

```shell
git clone https://github.com/Botfuel/botfuel-sample-weather.git
```

Install dependencies:

```shell
cd botfuel-sample-weather
npm install
```
Create the greetings, reset and weather intents together with their training sets.

Start the bot:

```shell
BOTFUEL_APP_TOKEN=<YOUR_BOT_ID> BOTFUEL_APP_ID=<YOUR_BOTFUEL_APP_ID> BOTFUEL_APP_KEY=<YOUR_BOTFUEL_APP_KEY> npm start shell-config
```

If you set your app credentials right, you should see:

```shell
2017-12-07T16:12:09.131Z - info: [Config] You didn't specify any config file, using default config.
2017-12-07T16:12:09.131Z - info: [Environment] BOTFUEL_APP_TOKEN=<YOUR_BOT_ID>
2017-12-07T16:12:09.133Z - info: [Environment] BOTFUEL_APP_ID=<YOUR_BOTFUEL_APP_ID>
2017-12-07T16:12:09.133Z - info: [Environment] BOTFUEL_APP_KEY=<YOUR_BOTFUEL_APP_KEY>
```

Try typing `Quel temps fait-il?`

## Need help ?

* See [**Getting Started**](https://tutorials.botfuel.io/#/codelab/getting-started?step=1) to learn how to run a bot in minutes.
* See [**Concepts**](https://docs.botfuel.io/platform/concepts) for explanations about the internals of the SDK.

## License

See the [**License**](LICENSE.md) file.
