# 🗺️ Address Converter
- [About the Project](#-about-the-project)
- [Purpose of the App](#-purpose-of-the-app)
- [How to Use](#-how-to-use)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)

## 🌎 About the Project
**Address Converter App** is an backend application that allows you to input your ```.json``` file, with field **name of address** is required. The app will read and convert that address name into ```Geolocation Postion: Latitude , Longitude ``` using Google Maps API, and save down to your current input file while preserving the original data structure.

## 🎯 Purpose of the App
I'm currently developing an app called VAYA, which involves displaying all national parks in Thailand (~151 locations). However, the dataset only contains park names without geolocation data needed to pin them on a map.

I am a lazy developer and need everythin to be automatic, so I created the converter to help with this job! Hope whoever find this find it useful!
It might not be accurate but most of the time it is!

## 😏 How to Use:
1.  **Clone or Download** the project
2.  **Open the folder** in any of your comfort IDE
3. Install dependencies
```
npm install
```
4. **Create ``.env`` file** in the root of the project and add your [Google Map Api Key](https://developers.google.com/maps/documentation/geolocation/get-api-key):
```
GOOGLE_API_KEY=yourapikeyhere!!
```

5. Put you ``.json`` file in the folder named **data**. In the folder you will find a sample file.
```
src/
  └── data/
      ├── sample.json
      └── yourfilehere.json
```

6. Update the file path in ``src/index.js`` to point to your file.
7. Use Postman (or any API client) and make a ``GET`` request to:
```
  http://localhost:3000/geocode
```

8. **DONE!!** Your file will now include latitude and longitude for each address:
```
[
  {
    "name": "Khao Yai National Park",
    "lat": 14.3109229,
    "lng": 101.5278666
  }
]

```


## 🎮 Tech Stack
- Node.js
- Express.js
- Axios
- Google Maps Geocoding API
- dotenv

## 📸 Screenshots
<img width="584" height="333" alt="Screenshot 2568-07-20 at 15 12 04" src="https://github.com/user-attachments/assets/366e060b-08da-4b22-842d-8a8e9c8c485e" />
<img width="971" height="594" alt="Screenshot 2568-07-20 at 15 14 32" src="https://github.com/user-attachments/assets/43eac18c-5194-4155-ba45-c8d823e8c908" />


