let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');

(async () => {
  let feed = await parser.parseURL('https://bariweiss.substack.com/feed');
	const { items } = feed;
	console.log(items[0])
	// items.forEach(item => {
	// 	console.log(item.title)
	// 	console.log(Object.keys(item))
	// })
})();