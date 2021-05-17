const fs = require('fs');
const dirs = ["./pdfs", "./data", "./data/general", "./data/resumes", "./data/cover_letters"];
dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});
const puppeteer = require('puppeteer');


const render = async (path, file_name) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://localhost:8080/${path}`, { waitUntil: 'networkidle2' }).catch("Could not go to http://localhost:8080/${path}");
    await page.pdf({ 
        path: `${__dirname}/pdfs/${file_name}.pdf`, 
        format: "A4", // "A4" standard
        scale: 0.93 // 0.93 standard
    }).catch("Could not render http://localhost:8080/${path}");

    await browser.close();
}

(async () => {
    
    fs.readdir(`${__dirname}/data/resumes`, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
    
        files.forEach((file) => {
            console.log(file);
            const name = file.replace(/\.[^/.]+$/, "");
    
            render(`data/resumes/${name}/index.html`, name);
        });
    });
 
    fs.readdir(`${__dirname}/data/cover_letters`, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
    
        files.forEach((file) => {
            console.log(file);
            const name = file.replace(/\.[^/.]+$/, "");
    
            render(`data/cover_letters/${name}/index.html`, name);
        });
    });

    fs.readdir(`${__dirname}/data/general`, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
    
        files.forEach((file) => {
            console.log(file);
            const name = file.replace(/\.[^/.]+$/, "");
    
            render(`data/general/${name}/index.html`, name);
        });
    });
    

})();