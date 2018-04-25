# botfuel-sample-weather

Sample bot to ask about weather using World Weather Online API.

Language: french

## How to run the bot

Clone the repository:

```shell
git clone git@github.com:Botfuel/botfuel-sample-weather.git
```

Install dependencies:

```shell
cd botfuel-sample-weather
npm install
```

Train the bot:

```shell
npm run train shell-config
```

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

* See [**Getting Started**](https://docs.botfuel.io/dialog/tutorials/getting-started) to learn how to run a bot in minutes.
* See [**Concepts**](https://docs.botfuel.io/dialog/concepts) for explanations about the internals of the SDK.

## License

See the [**License**](LICENSE.md) file.
