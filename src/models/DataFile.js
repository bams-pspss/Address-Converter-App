
import fs from 'fs';
import path from 'path';


class DataFile {
    constructor(data) {
        this.filepath = data.filepath;
    }
    static async getDataFromFile(fileName) {
        try {
            const filePath = path.resolve('src', 'data', fileName); // adjust path if needed
            const rawData = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(rawData);
            return data;
        } catch (err) {
            console.log('Error readin JSON', err);
            res.status(500).json({ error: 'Failes to load locations' });
        }

    }

}

export { DataFile }