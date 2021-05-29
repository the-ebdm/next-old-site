const functions = require("firebase-functions");
const { LinkedInProfileScraper } = require("@ebdm/linkedin-profile-scraper");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.addLinkedinProfileToContact = functions.firestore
  .document("Contacts/{docId}")
  .onWrite(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    if (newValue.Social.Linkedin !== previousValue.Social.Linkedin) {
      const scraper = new LinkedInProfileScraper({
        sessionCookieValue:
          "AQEDARXLXOEFIdJ9AAABeahAWLoAAAF5zEzcuk0AasW_I8kCeKDB73qdfxqxH2ogGawnKHMxtQUvKpsdAWbeDTIwgfU1uTmhVZEO_FWoULLgYssOAsxIG-M5VJrpvLC46IiTIipjMGLEs1tmll3i9E2a",
        keepAlive: false,
      });
      await scraper.setup();
      const result = await scraper.run(newValue.Social.Linkedin);
      return change.after.ref.set(
        {
          Social: {
            ...newValue.Social,
            LinkedinProfile: result,
          },
        },
        { merge: true }
      );
    }
  });