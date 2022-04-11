import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import path from "path";
import "./push_command"
require("dotenv").config();

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, any>;
    }
}

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands"));

for (const file of commandFiles) {
    const command = require(`${path.join(__dirname, "commands")}/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync(path.join(__dirname, "events"));

for (const file of eventFiles) {
    const event = require(`${path.join(__dirname, "events")}/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN);

//ref https://github.com/manybaht/manybaht-music
