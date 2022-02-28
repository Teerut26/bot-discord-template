import { optionsType } from "./enum/command_option_type";

require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

export default class RegisterCommand {
  private commands = [
    {
      name: "ping",
      description: "Replies with Pong!",
      options: [
        { name: "number", description: "number", required: false, type: optionsType.INTEGER },
      ],
    },
  ];

  // ref https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
  private client_id = process.env.CLIENT_ID;
  private guild_id = process.env.GUILD_ID;
  private rest: any;

  constructor() {
    this.rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
    this.register();
  }

  register(): void {
    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        await this.rest.put(
          Routes.applicationGuildCommands(this.client_id, this.guild_id),
          { body: this.commands }
        );

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  }
}
