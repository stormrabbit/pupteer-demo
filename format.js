const {readFilePlus} = require('eschew-materials').fsTools;

const  main = async () => {
  const text =   await readFilePlus('test.txt');
  console.log(text.match(/.*章：/g));
}

main()