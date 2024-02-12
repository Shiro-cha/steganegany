# steganegany

To install dependencies:

```bash
bun install
```

To run:

```bash
bun steganegany.ts
```

# Usage: 
```bash
steganegany [options] [command]

This hide message into an image (only png supported)

Options:
  -h, --help                                 display help for command

Commands:
  hide <input-file> [message] [output-file]
  reveal <input-file>
  help [command]                             display help for command
```

## Hide:
```bash
Usage: steganegany hide [options] <input-file> [message] [output-file]

Arguments:
  input-file   This is the image to hide the message
  message      This is the message to hide
  output-file  This is the image that hide a message

Options:
  -h, --help   display help for command
```

## Reveal
```bash
Usage: steganegany reveal [options] <input-file>

Arguments:
  input-file  This is the image that hide a message

Options:
  -h, --help  display help for command
```
## Reset
```bash
Usage: steganegany reset [options]

This reset the saved recognized password in the system

Options:
  -h, --help  display help for command
```

This project was created using `bun init` in bun v1.0.22. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
