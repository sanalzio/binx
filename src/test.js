import { compile } from "./index";

console.log(compile(`!DOCTYPE[html]
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
}`).output);