#!/usr/bin/env node

import { program } from "commander";
import { Hide } from "./actions/Hide.js";
import { Reset } from "./actions/Reset.js";
import { Reveal } from "./actions/Reveal.js";

program
  .name("steganegany")
  .description("Hide messages inside PNG images using steganography.");

program
  .command("hide")
  .argument("<input-file>", "Image file where the message will be hidden")
  .argument("[message]", "The message to hide (optional)")
  .argument("[output-file]", "Output file name (optional)")
  .option("-t, --target <string>", "Path where the output image will be stored")
  .action(async (input, message, output, options) => {
    await new Hide().execute(input, message, output, options);
  });

program
  .command("reveal")
  .argument("<input-file>", "Image that contains a hidden message")
  .action(async (input) => {
    await new Reveal().execute(input);
  });

program
  .command("reset")
  .description("Reset the saved recognized password in the system")
  .action(async () => {
    await new Reset().execute();
  });

program.parse();
