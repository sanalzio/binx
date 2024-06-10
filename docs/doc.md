# How to write binx document?

Binx syntax similar to xml syntax. Anyone knows xml syntax can easily write a binx document.

- [How to write binx document?](#how-to-write-binx-document)
- [Module](#module)
  - [Import module](#import-module)
  - [Usage `compile` function](#usage-compile-function)
- [CLI](#cli)
  - [flags](#flags)
  - [examples](#examples)
- [Writing binx document.](#writing-binx-document)
  - [Normal tags](#normal-tags)
  - [Self-closed tags](#self-closed-tags)
  - [Non Self-closed tags](#non-self-closed-tags)
  - [Question tags](#question-tags)
  - [Exclamation tags](#exclamation-tags)
  - [Set tag id](#set-tag-id)
  - [Set tag class](#set-tag-class)
  - [Set tag attributes](#set-tag-attributes)
  - [New line](#new-line)
  - [Reversed slash](#reversed-slash)
  - [Tab space](#tab-space)
  - [Space in tab content](#space-in-tab-content)
- [Examples](#examples-1)

# Module

## Import module

```js
import { compile } from "/path/to/binx/index.js";
```

## Usage `compile` function

```js
console.log(
    compile(`!DOCTYPE[html]
html[lang="tr"]{
    head{
        title{BINX}
    }
    body{
        p#tag-id.tag-class.class2[style="color:gray;"]{
            \\tbinx is\\s not\\nxml
        }
    }
    script[src="./script.js"]{}
}`);
)
```

# CLI

## flags

- `compile` or `c`<br>
    Compiles binx file into xml/html.<br>
    If output not specified, writes to stdout.

- `serve` or `s`<br>
    serves binx file on local host.

- `version`<br>
    print binx version

- `help`<br>
    shows help menu

## examples

```bash
# writes output to stdout
$ binx compile /path/to/input.bx

# writes output to output file
$ binx c /path/to/input.bx /path/to/output.html

# compiles and serves binx file on local host
$ binx serve /path/to/input.bx

# compiles and serves binx file on local host with spesific port
# default is 8080
$ binx serve /path/to/input.bx 3000
```

# Writing binx document.

## Normal tags

### in xml

```xml
<tag-name attribute="value" id="tag-id" class="class class2">
    tag content
</tag-name>
```

### in binx

```
tag-name#tag-id.class.class2[attribute="value"]{
    tag content
}
```

## Self-closed tags

### in xml

```xml
<tag-name attribute="value" id="tag-id" class="class class2" />
```

### in binx

```
tag-name#tag-id.class.class2[attribute="value"]&
```

## Non Self-closed tags

### in xml

```html
<tag-name attribute="value" id="tag-id" class="class class2">
```

### in binx

```
tag-name#tag-id.class.class2[attribute="value"]%
```

## Question tags

### in xml

```xml
<?php echo 'Hello, world!'; ?>
```

### in binx

```
?php{
    echo 'Hello, world!';
}
```

## Exclamation tags

### in html

```html
<!DOCTYPE html>
```

### in binx

```
!DOCTYPE[html]
```

## Set tag id

### in xml

```xml
<tag-name id="tag-id"></tag-name>
```

### in binx

```
tag-name#tag-id{}
```

## Set tag class

### in xml

```xml
<tag-name class="class class2"></tag-name>
```

### in binx

```
tag-name.class.class2{}
```

## Set tag attributes

### in xml

```xml
<tag-name attribute="value"></tag-name>
```

### in binx

```
tag-name[attribute="value"]{}
```

## New line

### in html

```html
<br>
```

### in xml

```html
<br/>
```

### in binx

```
\n
```

## Reversed slash

### in xml

```xml
\
```

### in binx

```
\\
```

## Tab space

### in xml

```xml
&emsp;
```

### in binx

```
\t
```

## Space in tab content

### in xml

```xml
&nbsp;
```

### in binx

```
\s
```

# Examples

### -> [Click to go example.bx file.](../examples/example.bx)

![binx syntax example](../assets/syntax.svg)
