const fs = require('fs');
const puppeteer = require('puppeteer');

const render = async (path, file_name) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://localhost:8080/${path}`, { waitUntil: 'networkidle2' }).catch("Could not go to http://localhost:8080/${path}");
    await page.pdf({ path: `${__dirname}/pdfs/${file_name}.pdf`, format: "A4", scale: 0.93 }).catch("Could not render http://localhost:8080/${path}");

    await browser.close();
}

(async () => {
    
    fs.readdir(`${__dirname}/data/resumes`, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
    
        files.forEach((file) => {
            const name = file.replace(/\.[^/.]+$/, "");
    
            render(`resume/${name}`, name);
        });
    });
    
    fs.readdir(`${__dirname}/data/cover_letters`, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
    
        files.forEach((file) => {
            const name = file.replace(/\.[^/.]+$/, "");
    
            render(`cover-letter/${name}`, name);
        });
    });
    

})();

/*
(async () => {                                  // declare function
    const browser = await puppeteer.launch();     // run browser
    const page = await browser.newPage();         // create new tab

    await page.goto('http://localhost:8080/data/resumes/');  // go to page
    await page.pdf({
        path: 'Linus_Käll_Resume.pdf',
        format: "A4",
        printBackground: true,
        scale: 0.93
    });

    await page.goto('http://localhost:8080/data/cover_letters/');  // go to page
    await page.pdf({
        path: 'Linus_Käll_Cover_Letter_to_SAAB.pdf',
        format: "A4",
        printBackground: true,
        scale: 0.93
    });

    await browser.close();                        // close browser
  })();
  */