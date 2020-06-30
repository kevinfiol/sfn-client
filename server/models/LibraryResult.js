import { DATA_TYPES, Model } from '../deps.js';

class LibraryResult extends Model {
    static table = 'library_result';
    static timestamps = false;

    static fields = {
        id: {
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: DATA_TYPES.STRING
            unique: true,
            allowNull: false
        }
    };
}

export default LibraryResult;