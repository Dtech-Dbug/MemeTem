/*

To Use pMemeScrapper.js file 
> In the file, you can replace the BASE_URL to scrape with your own URL. 
> Please note that this may require you to adjust the scraping logic unless you are scraping from the specified website.
> This File will Automatically Load Scrapped Data in scrappedImages.json file
> This File will Automatically Load Scrapped Data in scrappedImages.json file ,
> After This You Can add this Scrapped Data in Data/memeTemplates Folder and Import it in Collections.jsx file.

*/

const axios = require('axios');
const fs = require('fs');       

const REACT_BASE_URL = 'http://localhost:8080';
const BASE_URL = "https://imgflip.com/memesearch?q=jujutsu&nsfw=on";
const scrapeAllPages = async () => {
    let page = 1;
    let allImages = [];
    let hasMorePages = true; 
  
    while (hasMorePages) {
      try {
        const response = await axios.get(
          `${REACT_BASE_URL}/scrape?url=${encodeURIComponent(`${BASE_URL}&page=${page}`)}`
        );
  
        const images = response.data;
  
        if (images.length > 0) {
          allImages = allImages.concat(images); 
          page++; 
        } else {
          hasMorePages = false; 
        }
  
      } catch (error) {
        console.error(`Error scraping page ${page}:`, error);
        hasMorePages = false; 
      }
    }
  

    fs.writeFileSync('scrapedImages.json', JSON.stringify(allImages, null, 2), 'utf-8');
    console.log('Scraped data has been saved to scrapedImages.json');
  };
  

  scrapeAllPages()
    .then(() => {
      console.log('Scraping completed successfully.');
    })
    .catch((error) => {
      console.error('Error occurred during scraping:', error);
    });