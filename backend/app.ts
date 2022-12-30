import express, { Express, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

axios.defaults.baseURL = "https://www.googleapis.com/youtube/v3/";

const app: Express = express();
const port = process.env.PORT;
const key = process.env.YOUTUBE_API_KEY;

app.use(cors());

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
    res.send("express Server!");
});

app.get("/playlists", (req: Request, res: Response) => {
    console.log(req.query);

    axios
        .get(
            `playlists?key=${key}&channelId=UCDqaUIUSJP5EVMEI178Zfag&part=snippet,status,contentDetails&maxResults=${
                req.query.maxResults ? req.query.maxResults : "10"
            }&pageToken=${
                req.query.nextPageToken ? req.query.nextPageToken : ""
            }`
        )
        .then((value) => {
            return res.status(200).json(value.data);
        })
        .catch((e) => {
            res.status(400).json({
                Message: "데이터 요청 에러 입니다.",
                error: e,
            });
        });
});

app.listen(port, () => {
    console.log(`express Server Start ${port}`);
});
