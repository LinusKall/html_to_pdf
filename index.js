const puppeteer = require('puppeteer');
const fs = require('fs');

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

    await page.goto(`http://localhost:8080/${path}`, { waitUntil: 'networkidle2' }).catch("Could not go to http://localhost:8080/${path}");
    await page.pdf({ 
        path: `${__dirname}/pdfs/${file_name}.pdf`, 
        format: "A4", // "A4" standard, you can tweak this!
        scale: 0.93 // 0.93 standard, you can tweak this!
    }).catch("Could not render http://localhost:8080/${path}");

    await browser.close();
}

// Render all HTML instances in dir_to_render
const renderDir = async (dir_to_render) => {
    fs.readdir(__dirname + dir_to_render, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
    
        files.forEach((file) => {
            if (
                file != ".gitignore" && 
                file != "put your folders containing your HTML resumes here!" &&
                file != "put your folders containing your HTML cover letters here!" &&
                file != "put your folders containing your HTML here!"
            ) {
                console.log(file);
                const name = file.replace(/\.[^/.]+$/, "");
                render(`${dir_to_render + "/" + name}/index.html`, name);
            }
        });
    });
}

// Render all HTML instances in all dirs_to_render
(async () => {
    dirs_to_render.forEach(async (dir) => { renderDir(dir) } );
})();