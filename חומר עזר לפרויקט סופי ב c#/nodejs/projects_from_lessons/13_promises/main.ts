import fs, {promises} from "node:fs";
import superagent, {Response} from "superagent";
import { Weather } from "./models";
import { readFilePromise } from "./promise";

const INPUT_FILE = "city.txt";
const OUTPUT_FILE = "weather.json";
const API_KEY = "e783a67e92ab0ca19c593318aa9465d0"; // Sensitive data

const WEATHER_URL = (city: string) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
let city: string;

function weatherCall() {
    readFilePromise(INPUT_FILE)
        .then((data: string) => {
            city = data;
            const url = WEATHER_URL(city);
            return superagent.get(url);
        }).then((res: Response) => {
            const weatherData = res.body as Weather;
            
            const output = {
                city,
                temperature: weatherData.main.temp,
                description: weatherData.weather[0].description
            };
            return promises.writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2));
        }).then(() => {
            console.log("Success");
        }).catch((err) => {
            console.log("Failed somewhere", err.message);
        });
}

weatherCall();