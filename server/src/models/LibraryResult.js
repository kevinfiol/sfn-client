const { Model } = require('../container.js');

class LibraryResult extends Model {
    static get tableName() {
        return 'library_result';
    }

    static get jsonAttributes() {
        return ['profiles', 'steamapps'];
    }
}

module.exports = LibraryResult;