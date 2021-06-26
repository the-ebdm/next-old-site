// 

const im = require('imagemagick');

const assetDir = `${__dirname}/assets`
const layoutImg = `${assetDir}/greetingscard_layout.jpg`
const outputImg = `${assetDir}/greetingscard_finished.jpg`
const getImagePath = index => {
  return `${assetDir}/greetingscard_${index}.jpg`
}

const getOperations = ops => {
  return Object.keys(ops).flatMap(op => {
    if(op === 'label') {
      return [`:${op} "${ops[op]}"`];
    }
    return [`-${op}`, ops[op]]
  })
}

const convert = (input, ops, output = null) => { 
  if(typeof input === "object") {
    return new Promise((resolve, reject) => {
      console.log(getOperations(input), ops)
      im.convert([...getOperations(input), ops], (err, stdout) => {
        if (err) reject(err);
        resolve(stdout);
      });
    })
  }
  if (output === null) {
    return Promise.reject("You need an output path")
  }
  return new Promise((resolve, reject) => {
    im.convert([input, ...getOperations(ops), output], (err, stdout) => {
      if (err) reject(err);
      resolve(stdout);
    });
  })
}

const getImageDimensions = image => {
  return new Promise((resolve, reject) => {
    im.identify(['-format', '%wx%h', image], function(err, output){
      if (err) throw reject();
      resolve(output.split('x'))
    });
  })
}

const getTextLength = text => {
  const ops = {
    'font': "Arial",
    'pointsize': 52,
    'label': text,
  }
  const path = `${assetDir}/length.png`
  return convert(ops, path).then(() => {
    return getImageDimensions(path)
  });
}

const addText = async (input, text, opts = {}, output) => {
  const length = await getTextLength(text);
  console.log(length);
  const ops = {
    'font': "Arial",
    'fill': opts?.color || 'black',
    'gravity': opts?.gravity || 'West',
    'pointsize': opts?.size || 52,
    'draw': `text ${opts?.loc || '0,300'} '${text}'`,
  }
  await convert(input, ops, output);
  return output;
}

const xMargin = 4750
addText(layoutImg, 'Dear Mama Rita', {loc: `${xMargin},-500`}, getImagePath(1)).then(path => {
  return addText(path, 'Thank you very much for the money and birthday wishes that you sent me.', {loc: `${xMargin},-300`}, getImagePath(2))
}).then(path => {
  return addText(path, 'Apologies', {loc: `${xMargin},-200`}, getImagePath(3))
}).then(path => {
  return addText(path, 'Love Eric', {loc: `${xMargin},0`}, outputImg)
}).then(path => {
  return getTextLength("We like to boogie")
}).then(width => {
  console.log("Tis done")
  console.log(width)
})