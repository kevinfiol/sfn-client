import { database } from './container.js';
import LibraryResult from './models/LibraryResult.js';

const models = [
    LibraryResult
];

async function sync_db() {
    database.link(models);
    
    try {
        await database.sync({ drop: true });
        await database.close();
        console.log('Successfully synced DB.');
    } catch(e) {
        console.log(e);
    }
}

export { sync_db };