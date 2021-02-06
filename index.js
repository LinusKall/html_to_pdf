const fs = require('fs');
const puppeteer = require('puppeteer');
/*
const render = async (path, file_name) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://localhost:8080/${path}`, { waitUntil: 'networkidle2' }).catch("Could not go to http://localhost:8080/${path}");
    await page.pdf({ path: `${__dirname}/pdfs/${file_name}.pdf`, format: "A4", scale: 1 }).catch("Could not render http://localhost:8080/${path}");

    await browser.close();
}

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
*/
(async () => {                                  // declare function
    const browser = await puppeteer.launch();     // run browser
    const page = await browser.newPage();         // create new tab
    await page.goto('http://localhost:8080/data/resumes/');  // go to page

    await page.pdf({
        path: 'page.pdf',
        format: "A4",
        scale: 0.95
    });
    await browser.close();                        // close browser
  })();
  