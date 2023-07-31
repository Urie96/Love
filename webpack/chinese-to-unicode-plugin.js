const { Compilation } = require('webpack');
const fs = require('fs');
const path = require('path');

module.exports = class ChineseToUnicodePlugin {
  constructor() {
    this.pluginName = 'ChineseToUnicodePlugin';
  }

  /** @param {import('webpack').Compiler} compiler */
  apply(compiler) {
    // before gzip
    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          for (const name in assets) {
            if (name.endsWith('.js')) {
              const result = this.chineseToUnicode(assets[name].source());
              assets[name].source = () => result;
            }
          }
        }
      );
    });

    // after output
    compiler.hooks.afterEmit.tap(this.pluginName, (compilation) => {
      const outputPath = compilation.outputOptions.path;
      fs.readdir(outputPath, (err, files) => {
        files.forEach((name) => {
          if (name.endsWith('.js')) {
            const filePath = path.resolve(outputPath, name);
            fs.readFile(filePath, (_, data) => {
              fs.writeFile(
                filePath,
                this.chineseToUnicode(data.toString()),
                null,
                () => {}
              );
            });
          }
        });
      });
    });
  }

  /** @param {String} str */
  chineseToUnicode(str) {
    return str.replace(/[\u4e00-\u9fa5]/g, this.encodeUnicode);
  }

  encodeUnicode(str) {
    const res = [];
    for (let i = 0; i < str.length; i++) {
      res[i] = (`00${str.charCodeAt(i).toString(16)}`).slice(-4);
    }
    return `\\u${res.join('\\u')}`;
  }
};
