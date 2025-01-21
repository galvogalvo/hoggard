#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Builds HTML pages by merging page templates with components.
 * @param {Object} options - Configuration options.
 * @param {string} options.pagesDir - Directory containing the HTML page templates.
 * @param {string} options.componentsDir - Directory containing the HTML components.
 * @param {string} options.outputDir - Directory to output the built pages.
 */
function hoggard({ pagesDir = '_pages', componentsDir = '_components', outputDir = 'build' } = {}) {
    console.log("Starting to build pages...");

    // Check if directories exist
    if (!fs.existsSync(pagesDir)) {
        throw new Error(`Pages directory "${pagesDir}" does not exist.`);
    }
    if (!fs.existsSync(componentsDir)) {
        throw new Error(`Components directory "${componentsDir}" does not exist.`);
    }

    // Get all HTML files from the pages and components directories
    const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));
    const components = fs.readdirSync(componentsDir).filter(file => file.endsWith('.html'));

    if (pages.length === 0) {
        console.warn(`No pages found in "${pagesDir}".`);
        return;
    }
    if (components.length === 0) {
        console.warn(`No components found in "${componentsDir}".`);
        return;
    }

    // Process each page
    pages.forEach(page => {
        const name = path.parse(page).name;
        console.log(`Processing page: ${name}`);

        // Read the content of the page
        let content = fs.readFileSync(path.join(pagesDir, page), 'utf8');

        // Process each component
        components.forEach(component => {
            const componentName = path.parse(component).name;
            let componentContent = fs.readFileSync(path.join(componentsDir, component), 'utf8');
            console.log(`  Incorporating component: ${componentName}`);

            // Handle the 'nav' component for active class
            if (componentName === 'nav') {
                let urlMatch = `/${name}`;
                if (name === 'index') {
                    console.log("    Setting active class for index page.");
                    urlMatch = '/';
                }
                const find = `<a href='${urlMatch}'>`;
                const replace = `<a href='${urlMatch}' class='active'>`;
                componentContent = componentContent.replaceAll(find, replace);
            }

            // Replace placeholder in the page content
            const placeholder = `<!--### ${componentName} ###-->`;
            content = content.replace(placeholder, componentContent);
        });

        // Ensure the output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Save the updated content to the build folder
        const outputPath = path.join(outputDir, `${name}.html`);
        fs.writeFileSync(outputPath, content, 'utf8');
        console.log(`  Built page saved to: ${outputPath}`);
    });

    console.log("All pages built successfully!");
}

// If the script is run directly, handle CLI arguments
if (require.main === module) {
    const args = process.argv.slice(2);
    const options = {
        pagesDir: args[0] || '_pages',
        componentsDir: args[1] || '_components',
        outputDir: args[2] || 'build',
    };

    try {
        hoggard(options);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Export the function for programmatic use
module.exports = { hoggard };