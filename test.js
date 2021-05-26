const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
		"type": "service_account",
		"project_id": "ebdmdev",
		"private_key_id": "ede95232a2591c175958dede461cf4b99a4196bc",
		"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCym723oaWJEeFH\nKkx/nZ+I1UO1AN+Padw/ogQYNFQ8xgCjqOsZVHm7i00MXApAQ689Bh9/EzbyDhP9\nnGc73XC0KY3HWkk0Zv72CMFH/uSJYPzkx1+a1SVH3pFSCJ1td4NWAx22u7UR7/L9\n29umcwJeVjfsK90uOETk8Mz0UGhO23UySkZrc8IMGL8TtD8kIzdyphDA+SeQW4fT\nHWTdgtRB+ctImjVg9rr9cASrLKIMjxUH3aYxHabYqgAzTPV0N6DC2xyxvEEzEcOB\nh7QhnIItP+tm0RK672kudqY7M5+BoRwaKnIhs0KaCcBlWCSJxpZ4mGKEMsgJIW23\nTnXO89cZAgMBAAECggEATiEKcFVpj/geT38VT42nx7dikr77DEUGb19z4xKg9qS2\niuDNVps5VOyum4V3hn0VHuCazn+dPW0jGYFdNza6olS7DEVWWHHlfcJ+qfu6BM5E\nUd9U1un+EN4vO29BTi1Fak6apOCfaGVKKfoOr1UH6DRW6hyV+C3tFSiwvv6dYkCp\nxNh7Gvre4Smw3yC8h59GS10bCAB/PybgSzXCXAb6+LK/jTFVt4tTSMJJnJ6xZlKv\n8kFSiwxm1zq1aqjR1xypEPuT+z/7XaWQAdQpZnLxrxGcDdrVV40wfLmNRkWZMejT\nRrJg5MtAZTPfz9hkGLoYWJqNhkTlRl7jAz/TRfvJMQKBgQDpz1kAw5gp6hFXiisy\nVzwdSGf1T4XCOMAHFKfnIwQURmPnSvIRqkQCtFqrcOw3ty1q7VfjinioWM4VNK0j\nOyEGqyanHwyyyEagraQSUATLbnjHldKvnYpddv5EzFHuHymPSGWP1Qtc9n0DkkiC\n5uTpgo1zqMKdAeOqjERab2qI7wKBgQDDjzbaidYBZbY7aqjX3HpkL/+vKw1jaqB5\nC7OOpLro/cjlPdYetIKLh0rVuA1awDeRIJ6BtcNf1nbl6QenEyHQ8VYwAJgjB86f\nLAHSX6UkoqxSk+NRssAFvAYrEeoXeYYKoH9Xm+FAZcDFgbn6I3ywC2mkO3c1dwFi\na9g4ZZTQdwKBgQClGuWn03c1SfPbFFeyocVyjDnVEcXLxBVeKqjyYFi2FIrhvpu3\n+7sxCbjpTcGRCopI8rdYl+TiRGuqr9r/gPauZdfStetaqHCvcE7nG5h3K1ig39y6\nZI5bt/aQEJReiaToaGBHtFLk366iAf+waGoHt0g5/1cGVlo1if2OuxTJAwKBgQCN\npHFqoGMs5+qx5nMcxkivwERFL72mwFgy1FLdglsO3qJfyAYKf1v+i6OcYI7rqEWX\nDDVCZdB43fGIXNx6GtVnbSWr5wJKfSEfENTQ9w26F0kRFqSTTBDhFmqxT2xqTE7V\n66HQZssjxY92fpuhnYp2SA3gMmIJi4SpMMuPLaQ3yQKBgAFI4/6WHrObq/87m4js\nialYEop2TKdq0/6cJby+Me92zPh6zZ4L9bh3XBO5sE11DIi1trOQDOloFpgG9jvF\nQUOryi5C2OhyVXQPglNCahfcAjjg3h6dc3hqxFabY+B9XglyHkHLRc7LVrIqF8v/\nAXADmDcZyDa1s3HtztzN7zqe\n-----END PRIVATE KEY-----\n",
		"client_email": "firebase-adminsdk-gexct@ebdmdev.iam.gserviceaccount.com",
		"client_id": "103375172792746049193",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://oauth2.googleapis.com/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gexct%40ebdmdev.iam.gserviceaccount.com"
	})
});
const db = admin.firestore();
const quotes = require('./quotes.json');

let batch = db.batch();
quotes.forEach(item => {
	const quoteRef = db.collection("Quotes").doc(item.text.split(' ').join('').toLowerCase().slice(0, 20));
	batch.set(quoteRef, {
		Quote: item.text,
		Attribution: item.attribution
	})
})
batch.commit().then(items => {
	console.log(items);
})