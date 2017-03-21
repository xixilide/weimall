let fs = require('fs'),
  path = require('path');


module.exports = (config) => {
  return (cb) => {
    let sass = config.sassDir || 'sass',
      link = config.link || 'link',
      output = config.output || 'style',
      dirs = config.dirs || [
        'module',
        'public',
      ];
    dirs.forEach((d) => {
      fileImport(`./${sass}/${d}`,
        `./${sass}/${link}/${d}-link.scss`);
    });
    cb();
    // fileImport(`./${sass}/${link}`, `${sass}/${output}/udm-${output}.scss`);
  };
};



/**
 * dir: files to be imported into target
 * target: in which file to put the contents of dir
 * @param {any} dir
 * @param {any} target
 */
function fileImport(dir, target) {
  let files = fs.readdirSync(dir)
    .filter((f) => {
      if (/^[^.].*\.scss$/.test(f)) {
        return true;
      }
    })
    .map((f) => {
      let targetDir = target.substring(0, target.lastIndexOf('/'));
      let rel = path.relative(targetDir, `${dir}/${f}`)
        .replace(/\\/g, '/');
      return `@import '${rel}';\n`;
    })
    .reduce((x, y) => {
      return x + y;
    });
  fs.writeFileSync(target, files, {
    encoding: 'utf8'
  });
}
