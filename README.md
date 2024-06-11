# binx
Binx file to xml/html compiler.

Binx is not a programing language. It's just a simple document formating style.

<details>
<summary>Example synax</summary>

![binx syntax](./assets/syntax.svg)
</details>

- [binx](#binx)
  - [❔ Usage](#-usage)
  - [✔ Installation](#-installation)
  - [📗 Documentation](#-documentation)

## ❔ Usage

### 🏳 flags

- `compile` or `c`<br>
    Compiles binx file into xml/html.<br>
    If output not specified, writes to stdout.

- `serve` or `s`<br>
    serves path on local host.

- `version`<br>
    print binx version

- `help`<br>
    shows help menu

### 📜 examples

```bash
# writes output to stdout
$ binx compile /path/to/input.bx

# writes output to output file
$ binx c /path/to/input.bx /path/to/output.html

# compiles and serves path on local host
$ binx serve /path/

# compiles and serves path on local host with spesific port
# default is 8080
$ binx serve /path/ 3000
```

## ✔ Installation

Read [installation.md](./docs/installation.md) for information about installation.

### -> [Click to go installation.md](./docs/installation.md)

## 📗 Documentation

### -> [Click to go doc.md](./docs/doc.md)
