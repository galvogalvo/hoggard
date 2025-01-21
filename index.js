const fs = require('fs');
const path = require('path');

// Get all HTML files from the _pages folder
console.log("Building pages...");
const pages = fs.readdirSync('_pages').filter(file => file.endsWith('.html'));
const components = fs.readdirSync('_components').filter(file => file.endsWith('.html'));

// Process each page
pages.forEach(page => {
    const name = path.parse(page).name;
    console.log(name);

    // Read the content of the page
    let content = fs.readFileSync(path.join('_pages', page), 'utf8');

    // Process each component
    components.forEach(component => {
        const componentName = path.parse(component).name;

        // Read the content of the component
        let componentContent = fs.readFileSync(path.join('_components', component), 'utf8');
        console.log(`>>> ${componentName}`);

        // Handle the 'nav' component for active class
        if (componentName === 'nav') {
            let urlMatch = `/${name}`;
            if (name === 'index') {
                console.log(">>> index nav detected");
                urlMatch = '/';
            }
            let find = `<a href='${urlMatch}'>`;
            let replace = `<a href='${urlMatch}' class='active'>`;
            //replace all instances of the find string with the replace string
            componentContent = componentContent.replaceAll(find, replace);
        }

        // Replace placeholder in the page content
        const placeholder = `<!--### ${componentName} ###-->`;
        content = content.replace(placeholder, componentContent);
    });

    // Save the updated content to the build folder
    const outputDir = 'build';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    fs.writeFileSync(path.join(outputDir, `${name}.html`), content, 'utf8');
});