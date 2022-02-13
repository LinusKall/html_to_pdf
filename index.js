const puppeteer = require('puppeteer');
const fs = require('fs');
const connect = require('connect');
const serveStatic = require('serve-static');

connect()
    .use(serveStatic(__dirname))
    .listen(8080, () => {});

// Look for folders in these subdirectories
const dirs_to_render = ["/data/general", "/data/resumes", "/data/cover_letters"];

// Create necessary directories if they don't exist
const dirs = ["./pdfs", "./data", "./data/general", "./data/resumes", "./data/cover_letters"];
dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});

// Render a single HTML instance
const render = async (path, file_name) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page
        .goto(`http://localhost:8080/${path}`, { waitUntil: 'networkidle2' })
        .catch("Could not go to http://localhost:8080/${path}");
    await page
        .pdf({ 
            path: `${__dirname}/pdfs/${file_name}.pdf`, 
            format: "A4", // "A4" standard, you can tweak this!
            scale: 0.93   // 0.93 standard, you can tweak this!
        })
        .catch("Could not render http://localhost:8080/${path}");

    await browser.close();
    
    return Promise.resolve(0);
}

// Render all HTML instances in dir_to_render
const renderDir = async (dir_to_render) => {
    fs.readdir(__dirname + dir_to_render, async (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
    
        return Promise.all(files.map(async (file) => {
            if (
                file != ".gitignore" && 
                file != "put your folders containing your HTML resumes here!" &&
                file != "put your folders containing your HTML cover letters here!" &&
                file != "put your folders containing your HTML here!"
            ) {
                const name = file.replace(/\.[^/.]+$/, "");
                const res = await render(`${dir_to_render + "/" + name}/index.html`, name);
                console.log("Rendered " + file);
                return res;
            }
        }));
    });
}

// Render all HTML instances in all dirs_to_render
(async () => {
    await Promise.all(dirs_to_render.map(async (dir) => { 
        return renderDir(dir);
    })).then(() => {
        console.log("Check out the pdfs/ folder!");
    }).catch(() => {

    });
    
})();


