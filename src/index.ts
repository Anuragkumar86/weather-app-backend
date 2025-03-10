import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = process.env.WEATHER_API_KEY as string;

app.get("/weather", async (req: any, res: any) => {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
        return res.status(400).json({ msg: "Please provide city name or latitude/longitude" });
    }

    try {
        let response;
        if (city) {
            response = await axios.get(`${WEATHER_API}?q=${city}&appid=${API_KEY}&units=metric`);
        } else {
            response = await axios.get(`${WEATHER_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        }

        res.json(response.data);
    } catch (e: any) {

        return res.status(404).json({ msg: "City does not exist" });


        // console.error("Error fetching weather data:", e.response?.data || e.message);
        // res.status(400).json({ msg: "Unable to fetch data", error: e.response?.data || e.message });
    }
});

app.get("/forecast", async (req: any, res: any) => {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
        return res.status(400).json({ msg: "Please provide city name or latitude/longitude" });
    }

    try {
        let response;
        if (city) {
            response = await axios.get(`${FORECAST_API}?q=${city}&appid=${API_KEY}&units=metric`);
        } else {
            response = await axios.get(`${FORECAST_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        }

        res.json(response.data);
    } catch (e: any) {
        console.error("Error fetching forecast data:", e.response?.data || e.message);
        res.status(400).json({ msg: "Unable to fetch forecast data", error: e.response?.data || e.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
