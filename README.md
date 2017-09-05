## template-gulp

npm dedupe

https://github.com/ai/browserslist#queries

```
// 将设置放入此文件中以覆盖默认设置
{
    "workbench.iconTheme": "vscode-icons",

    "eslint.enable": true,
    
    // "less.compile": {
    //     "compress":  true,  // true => remove surplus whitespace
    //     "sourceMap": false,  // true => generate source maps (.css.map files)
    //     "out":       true, // false => DON'T output .css files (overridable per-file, see below)
    //     "relativeUrls": false
    // },

    "liveServer.settings.port": 0,

    "liveServer.settings.ignoreFiles": [
        ".vscode/**",
        "**/*.scss",
        "**/*.sass",
        "**/*.less"
    ],

    "liveServer.settings.donotShowInfoMsg": true,

       // A list of remote style sheets.
    "css.remoteStyleSheets": ["https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"],

    // A list of style sheet file extensions you want the extension to look for.
    "css.fileExtensions": [
        "css",
        "scss",
        "less"
    ]
}
```