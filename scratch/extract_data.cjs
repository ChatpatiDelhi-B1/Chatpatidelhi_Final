const fs = require('fs');
const path = require('path');

// Mocking the export to read the file
const content = fs.readFileSync('./src/data/menuData.js', 'utf8');
const match = content.match(/export const menuItems = (\[[\s\S]*?\]);/);

if (match) {
    let itemsStr = match[1];
    // Remove comments and handle potential JS quirks for JSON parsing
    // This is a bit risky but we'll try a simpler approach by using eval in a controlled way
    const menuItems = eval(itemsStr);
    fs.writeFileSync('./menu_items.json', JSON.stringify(menuItems, null, 2));
    console.log('Successfully created menu_items.json with', menuItems.length, 'items.');
} else {
    console.error('Could not find menuItems in menuData.js');
}
