export function compile(content) {

    // asign input to text variable
    let text = content;

    // define object type variable for regexp
    const regExps = {

        comment: /```(?<inner>.*?)```/s,

        exclamationTags: /(?<tagName>![\w-]*?)\[(?<attrs>[^\[\]]*)\]/s,

        questionTags: /(?<tagName>\?[\w-]*?)(?<attrs>\[[^\[\]]*\])?\{(?<inner>[^\{\}]*)\}/s,

        tags: /(?<tagName>[\w-]+)(?<id>\#[\w-]*)?(?<class>\.[\w\-\.]*)*?(?<attrs>\[[^\[\]]*\])?\{(?<inner>[^\{\}]*)\}/s,

        selfClosingTags: /(?<tagName>[\w-]+)(?<id>\#[\w-]*)?(?<class>\.[\w\-\.]*)*?(?<attrs>\[[^\[\]]*\])?&/s,

        nonSelfClosingTags: /(?<tagName>[\w-]+)(?<id>\#[\w-]*)?(?<class>\.[\w\-\.]*)*?(?<attrs>\[[^\[\]]*\])?%/s,

        reversedSlash: /\\{2}/s,

        tab: /[^\\](\\t)/s,

        space: /[^\\](\\s)/s,

        newLine: /[^\\](\\n)/s,

    }

    // compile comments
    while (text.match(regExps.comment)) {

        // variable for regexp match in the text variable
        let match = text.match(regExps.comment);

        // variable for compiled 
        let out = `<!--${match[1]}-->`;

        // replace matched text with compiled text
        text = text.replace(match[0], out);

    }

    // compile exclamation tags
    while (text.match(regExps.exclamationTags)) {

        // variable for regexp match in the text variable
        let match = text.match(regExps.exclamationTags);

        // variable for compiled 
        let out = `<${match[1]} ${match[2]}>`;

        // replace matched text with compiled text
        text = text.replace(match[0], out);

    }

    // compile question tags
    while (text.match(regExps.questionTags)) {

        // variable for regexp match in the text variable
        let match = text.match(regExps.questionTags);

        // variable for compiled 
        let out = `<${match.groups.tagName}`;

        // add tag atrributes to output variable
        if(match.groups.attrs) {

            out += ` ${match.groups.attrs.slice(1,-1)}`;
        }

        // add tag content to output variable
        out += `${match.groups.inner}?>`;

        // replace matched text with compiled text
        text = text.replace(match[0], out);

    }

    // compile normal tags
    while (text.match(regExps.tags)) {

        // variable for regexp match in the text variable
        let match = text.match(regExps.tags);

        // variable for compiled 
        let out = `<${match.groups.tagName}`;

        // add tag atrributes to output variable
        if(match.groups.attrs) {

            out += ` ${match.groups.attrs.slice(1,-1)}`;
        }

        // add tag classes to output variable
        if(match.groups.class) {

            out += ` class="${match.groups.class.split(".").slice(1).join(" ")}"`;
        }

        // add tag id to output variable
        if(match.groups.id) {

            out += ` id="${match.groups.id.slice(1)}"`;
        }

        // if tag has content
        if(match.groups.inner) {

            // add tag content to output variable and close tag
            out += `>${match.groups.inner}</${match.groups.tagName}>`;

        } else { // else

            // close tag
            out += `></${match.groups.tagName}>`;

        }

        // replace matched text with compiled text
        text = text.replace(match[0], out);

    }

    // compile self closing tags
    while (text.match(regExps.selfClosingTags)) {

        // variable for regexp match in the text variable
        let match = text.match(regExps.selfClosingTags);
        
        // variable for compiled 
        let out = `<${match.groups.tagName}`;

        // add tag atrributes to output variable
        if(match.groups.attrs) {

            out += ` ${match.groups.attrs.slice(1,-1)}`;
        }

        // add tag classes to output variable
        if(match.groups.class) {

            out += ` class="${match.groups.class.split(".").slice(1).join(" ")}"`;
        }

        // add tag id to output variable
        if(match.groups.id) {

            out += ` id="${match.groups.id.slice(1)}"`;
        }

        // close tag
        out += `/>`;

        // replace matched text with compiled text
        text = text.replace(match[0], out);

    }

    // compile non self closing tags
    while (text.match(regExps.nonSelfClosingTags)) {

        // variable for regexp match in the text variable
        let match = text.match(regExps.nonSelfClosingTags);

        // variable for compiled 
        let out = `<${match.groups.tagName}`;

        // add tag atrributes to output variable
        if(match.groups.attrs) {

            out += ` ${match.groups.attrs.slice(1,-1)}`;
        }

        // add tag classes to output variable
        if(match.groups.class) {

            out += ` class="${match.groups.class.split(".").slice(1).join(" ")}"`;
        }

        // add tag id to output variable
        if(match.groups.id) {

            out += ` id="${match.groups.id.slice(1)}"`;
        }

        // close tag
        out += `>`;

        // replace matched text with compiled text
        text = text.replace(match[0], out);

    }

    // compile tabs
    while (text.match(regExps.tab)) {

        // variable for regexp match in the text variable
        let match = text.match(regExps.tab);

        // replace matched text with compiled text
        text = text.replace(match[1], "&emsp;");

    }

    // compile spaces
    while (text.match(regExps.space)) {

        // variable for regexp match in the text variable
        let match = text.match(regExps.space);

        // replace matched text with compiled text
        text = text.replace(match[1], "&nbsp;");

    }

    // compile new lines
    while (text.match(regExps.newLine)) {

        // variable for regexp match in the text variable
        let match = text.match(regExps.newLine);

        // replace matched text with compiled text
        text = text.replace(match[1], "<br>");

    }

    return text;
}

// import package.json file
import pkg from "../package.json";

// If module is called directly
if(process.argv[1] == import.meta.path.replaceAll("\\", "/")){
    // compile binx file into xml/html
    if (process.argv[2] == "c" || process.argv[2] == "compile") {

        // import input file
        const inputFile = Bun.file(process.argv[3]);
        const text = await inputFile.text();

        // if output file is specified
        if (process.argv[4]) {

            // write to output file
            Bun.write(process.argv[4], compile(text));

        }
        // else
        else {

            // write to stdout
            console.log(compile(text));

        }

    }
    // serve binx file
    else if (process.argv[2] == "s" || process.argv[2] == "serve") {

        // import colorama module for colored stdout outputs
        const { Fore } = require("./colorama.js");

        // import input file
        const file = Bun.file(process.argv[3]);
        const text = await file.text();

        // serve binx file
        const server = Bun.serve({

            // ser server port
            port: process.argv[4] ?? 8080,

            // define function to be called when a request is made
            async fetch(req) {

                // return response
                return new Response(

                    // compile binx file into xml/html
                    compile(text),

                    {
                        headers: {
                            // set content type
                            "Content-Type": "text/html",
                        },
                    }

                );

            },

        });

        // print server url
        console.log(`
   ${Fore.Green}┌──────────────────────────────────────────┐
   │                                          │
   │   Serving!                               │
   │                                          │
   │   ${Fore.Reset}- ${Fore.Bright}Network:${Fore.Reset}  ${server.url.href}${" ".repeat(24 - server.url.href.length)}   ${Fore.Green}│
   │                                          │
   │       Press Ctrl+C to stop server.       │
   │                                          │
   └──────────────────────────────────────────┘${Fore.Reset}
        `);
    }
    // print binx version
    else if(process.argv[2] == "v" || process.argv[2] == "version") {

        // import colorama module for colored stdout outputs
        const { Fore } = require("./colorama.js");

        // print version
        console.log(`${Fore.BrightMagenta}BINX ${Fore.Magenta}${pkg.version}${Fore.Reset}`);
    
    }
    // show help
    else {

        // import colorama module for colored stdout outputs
        const { Fore } = require("./colorama.js");

        // print help
        console.log(`
 ${Fore.BrightMagenta} BINX ${Fore.Magenta}is not xml ${Fore.Reset}

  ${Fore.Cyan} Flags${Fore.Reset}:
    ${Fore.BrightBlue}compile / c ${Fore.Reset}: ${Fore.Cyan}compiles binx file into xml/html.${Fore.Reset}
                  ${Fore.Cyan}if output not specified, writes to stdout.${Fore.Reset}
    ${Fore.BrightBlue}serve / s ${Fore.Reset}: ${Fore.Cyan}serves binx file on local host.${Fore.Reset}
    ${Fore.BrightBlue}version / v ${Fore.Reset}: ${Fore.Cyan}prints binx version.${Fore.Reset}
    ${Fore.BrightBlue}help / h ${Fore.Reset}: ${Fore.Cyan}shows this message.${Fore.Reset}

  ${Fore.Cyan} Usage${Fore.Reset}:
   ${Fore.Yellow} compile${Fore.Reset}: ${Fore.BrightBlue}binx${Fore.BrightRed} compile ${Fore.Green}[input] [output${Fore.Yellow}*${Fore.Green}]${Fore.Reset}
   ${Fore.Yellow} serve${Fore.Reset}: ${Fore.BrightBlue}binx${Fore.BrightRed} serve ${Fore.Green}[input] [port${Fore.Yellow}*${Fore.Green}]${Fore.Reset}
   ${Fore.Yellow} help${Fore.Reset}: ${Fore.BrightBlue}binx${Fore.BrightRed} help ${Fore.Reset}
   ${Fore.Yellow} version${Fore.Reset}: ${Fore.BrightBlue}binx${Fore.BrightRed} version ${Fore.Reset}

  ${Fore.Yellow} * ${Fore.Reset}: ${Fore.BrightBlue}Not required${Fore.Reset}

  ${Fore.Cyan} Examples${Fore.Reset}:
   ${Fore.Magenta} $ ${Fore.BrightBlue}binx${Fore.BrightRed} c ${Fore.Green}"./examples/example.bx"${Fore.Reset}
   ${Fore.Magenta} $ ${Fore.BrightBlue}binx${Fore.BrightRed} compile ${Fore.Green}"./examples/example.bx" "./examples/example.html"${Fore.Reset}
   ${Fore.Magenta} $ ${Fore.BrightBlue}binx${Fore.BrightRed} s ${Fore.Green}"./examples/example.bx"${Fore.Reset}
   ${Fore.Magenta} $ ${Fore.BrightBlue}binx${Fore.BrightRed} s ${Fore.Green}"./examples/example.bx 3000"${Fore.Reset}
   ${Fore.Magenta} $ ${Fore.BrightBlue}binx${Fore.BrightRed} version ${Fore.Reset}
        `);

    }
}