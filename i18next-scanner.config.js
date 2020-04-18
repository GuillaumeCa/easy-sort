const fs = require("fs");
const chalk = require("chalk");

module.exports = {
  input: [
    "src/**/*.{js,jsx}",
    // Use ! to filter out files or directories
    "!src/**/*.spec.{js,jsx}",
    "!public/locale/**",
    "!node_modules/**",
  ],
  output: "./",
  options: {
    debug: true,
    func: {
      list: ["t"],
      extensions: [".js", ".jsx"],
    },
    trans: {
      component: "Trans",
      extensions: [],
    },
    lngs: ["en", "fr"],
    ns: ["common", "account", "create-list", "view-list", "menu"],
    defaultLng: "en",
    defaultNs: "common",
    resource: {
      loadPath: "public/locale/{{lng}}/{{ns}}.json",
      savePath: "public/locale/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: ":", // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: function customTransform(file, enc, done) {
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(
      content,
      { list: ["i18next._", "i18next.__"] },
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: false,
            keySeparator: false,
          })
        );
        ++count;
      }
    );

    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative)
        )}`
      );
    }

    done();
  },
};
