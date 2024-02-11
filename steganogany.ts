#!/home/shiro/.bun/bin/bun

import { program } from "commander";
import { Hide } from "./actions/Hide";
import { Reveal } from "./actions/Reveal";

program.name("steganegany")
.description("This hide message into an image (only png supported)");

program.command("hide")
.argument('<input-file>',"This is the image to hide the message")
.argument('[message]',"This is the message to hide")
.argument('[output-file]',"This is the image that hide a message")
.action(new Hide().execute);

program.command("reveal")
.argument('<input-file>',"This is the image that hide a message")
.action(new Reveal().execute)

program.parse();