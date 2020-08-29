const { Model } = require('../container.js');

class LibraryResult extends Model {
    static get tableName() {
        return 'library_result';
    }

    static get jsonAttributes() {
        return ['profiles', 'steamapps'];
    }

    $beforeUpdate() {
        const [date, time] = new Date().toISOString().split('T');
        const [hms] = time.split('.');
        this.updated_at = `${date} ${hms}`;
    }
}

module.exports = LibraryResult;