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

.line-bullet {
    width: 40px;
    height: 40px;
    background-color: rgba(30,30,30,1);
    border-radius: 20px;
    text-align: center;
    font-size: 20px;
    z-index: 10000;
    color: white;
    padding-top: 0px;
    margin: auto;
    align-self: start;
}
.line-bullet > i {
    padding-top: 10px;
    padding-left: 2px;
}
*/



(async () => {                                  // declare function
    const browser = await puppeteer.launch();     // run browser
    const page = await browser.newPage();         // create new tab
    await page.goto('http://localhost:8080/data/resumes/');  // go to page

    await page.pdf({
        path: 'Linus_Käll_CV.pdf',
        format: "A4",
        printBackground: true,
        scale: 0.93
    });
    await browser.close();                        // close browser
  })();
  