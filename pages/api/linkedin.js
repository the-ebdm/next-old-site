import { LinkedInProfileScraper } from '@viliv/linkedin-profile-scraper';

export default async function Linkedin(req, res) {
	console.log("I was hit!")
  const scraper = new LinkedInProfileScraper({
    sessionCookieValue: 'AQEDARXLXOEFIdJ9AAABeahAWLoAAAF5zEzcuk0AasW_I8kCeKDB73qdfxqxH2ogGawnKHMxtQUvKpsdAWbeDTIwgfU1uTmhVZEO_FWoULLgYssOAsxIG-M5VJrpvLC46IiTIipjMGLEs1tmll3i9E2a',
    keepAlive: true
  });
  await scraper.setup()
  const result = await scraper.run('https://www.linkedin.com/in/ebdmuir/')
  res.status(200).json(result)
}