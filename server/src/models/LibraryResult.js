const { Model } = require('../container.js');

class LibraryResult extends Model {
    static get tableName() {
        return 'library_result';
    }
}

module.exports = LibraryResult;