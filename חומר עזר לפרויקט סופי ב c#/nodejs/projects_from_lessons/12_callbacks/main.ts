import fs from "node:fs";
import superagent, {Response} from "superagent";
import { Weather } from "./models";

const INPUT_FILE = "city.txt";
const OUTPUT_FILE = "weather.json";
const API_KEY = "e783a67e92ab0ca19c593318aa9465d0"; // Sensitive data

const WEATHER_URL = (city: string) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

function weatherCall() {
    fs.readFile(INPUT_FILE, (err, data: Buffer) => {
        if (err) {
            console.log(`Error on reading from file: ${err}`);
            return;
        }
        
        const city = data.toString();

        const url = WEATHER_URL(city);
        superagent.get(url, (err, res: Response) => {
            if (err) {
                console.log(`Error on API call: ${err}`);
                return;
            }

            const weatherData = res.body as Weather;
            
            const output = {
                city,
                temperature: weatherData.main.temp,
                description: weatherData.weather[0].description
            };
            fs.writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), (err) => {
                if (err) {
                    console.log(`Error on writing to file: ${err}`);
                    return;
                }
                console.log("Success");
            });
        });
    });
}

weatherCall();