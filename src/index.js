import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { DataFile } from './models/DataFile.js';

dotenv.config();

const app = express();
app.use(express.json());

//Your File Name
const fileName = 'sample.json'

app.get('/geocode', async (req, res) => {

    const data = await DataFile.getDataFromFile(fileName);
    const results = [];

    for (let loc of data) {

        //Your kinda condition to make it more precise
        //Me personally I want the lat,long, to be precise
        const address = `อุทยานแห่งชาติ${loc.nameTH}, ${loc.province}, Thailand`;
        console.log(address);
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: address,
                    //Put your GOOGLE API KEY HEREEE
                    key: process.env.GOOGLE_API_KEY,
                    language: 'en'
                }
            });

            console.log(`Response for ${loc.nameTH}:`, response.data);

            const result = response.data.results[0];

            //Optional Condition
            const engAddress = result.formatted_address;
            let add = engAddress.split(',');
            console.log(result.formatted_address);

            if (result) {
                loc.nameEN = add[0].trim();
                loc.lat = result.geometry.location.lat;
                loc.lng = result.geometry.location.lng;

            } else {
                results.push({
                    name: loc.nameTH,
                    latitude: null,
                    longitude: null
                });
            }
        } catch (error) {
            console.error(`Error geocoding ${loc.name}:`, error.message);
            results.push({
                name: loc.name,
                latitude: null,
                longitude: null,
                error: 'API error'
            });
        }
    }


    //Save updated data back to file
    const filePath = path.resolve('src', 'data', fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    res.json(data);
});


app.get('/locations', async (req, res) => {
    try {
        const filePath = path.resolve('src', 'data', fileName); // adjust path if needed
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(rawData);

        res.json(data);
    } catch (err) {
        console.log('Error readin JSON', err);
        res.status(500).json({ error: 'Failes to load locations' });
    }


});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} `);
});
