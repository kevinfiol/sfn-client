import { Model } from '../container.js';

class LibraryResult extends Model {
    static get tableName() {
        return 'library_result';
    }
}

export default LibraryResult;