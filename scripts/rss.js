let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');

(async () => {

  let feed = await parser.parseURL('https://bariweiss.substack.com/feed');
	fs.writeFile('feed.json', JSON.stringify(feed), (err) => {
		if(err) throw err;
		console.log("Done");
	})

})();