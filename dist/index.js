"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = process.env.WEATHER_API_KEY;
app.get("/weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, lat, lon } = req.query;
    if (!city && (!lat || !lon)) {
        return res.status(400).json({ msg: "Please provide city name or latitude/longitude" });
    }
    try {
        let response;
        if (city) {
            response = yield axios_1.default.get(`${WEATHER_API}?q=${city}&appid=${API_KEY}&units=metric`);
        }
        else {
            response = yield axios_1.default.get(`${WEATHER_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        }
        res.json(response.data);
    }
    catch (e) {
        return res.status(404).json({ msg: "City does not exist" });
        // console.error("Error fetching weather data:", e.response?.data || e.message);
        // res.status(400).json({ msg: "Unable to fetch data", error: e.response?.data || e.message });
    }
}));
app.get("/forecast", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { city, lat, lon } = req.query;
    if (!city && (!lat || !lon)) {
        return res.status(400).json({ msg: "Please provide city name or latitude/longitude" });
    }
    try {
        let response;
        if (city) {
            response = yield axios_1.default.get(`${FORECAST_API}?q=${city}&appid=${API_KEY}&units=metric`);
        }
        else {
            response = yield axios_1.default.get(`${FORECAST_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        }
        res.json(response.data);
    }
    catch (e) {
        console.error("Error fetching forecast data:", ((_a = e.response) === null || _a === void 0 ? void 0 : _a.data) || e.message);
        res.status(400).json({ msg: "Unable to fetch forecast data", error: ((_b = e.response) === null || _b === void 0 ? void 0 : _b.data) || e.message });
    }
}));
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
