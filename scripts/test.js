
const admin = require('../lib/admin');
const db = admin.firestore();
const quotes = require("./quotes.json");

let batch = db.batch();
quotes.forEach((item) => {
  item.oldId = item.text.split(" ").join("").toLowerCase().slice(0, 20);
  item.id = item.oldId.replace(/[^0-9a-z]/gi, '');
	const oldRef = db.collection("Quotes").doc(item.oldId);
	if(item.oldId !== item.id) {
		batch.delete(oldRef);
	}
  const quoteRef = db.collection("Quotes").doc(item.id);
  batch.set(quoteRef, {
    Quote: item.text,
    Attribution: item.attribution,
		Tags: item.tags || []
  });
});

batch.commit().then((items) => {
  console.log(`Updated ${items.length} items`);
});