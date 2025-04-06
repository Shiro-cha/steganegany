#!/home/shiro/.bun/bin/bun

import { program } from "commander";
import { Hide } from "./actions/Hide";
import { Reset } from "./actions/Reset";
import { Reveal } from "./actions/Reveal";

program.name("steganegany")
.description("This hide message into an image (only png supported)");

program.command("hide")
.argument('<input-file>',"This is the image to hide the message")
.argument('[message]',"This is the message to hide")
.argument('[output-file]',"This is the image that hide a message")
.option("-t,--target <string>","This is the path where the output will be stored")
.action(new Hide().execute);

program.command("reveal")
.argument('<input-file>',"This is the image that hide a message")
.action(new Reveal().execute);

program.command("reset")
.description('This reset the saved recognized password in the system')
.action(new Reset().execute)

program.parse();