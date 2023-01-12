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
  axios
    .get(
      `playlists?key=${key}&channelId=UC2MwzbekHetez7-kKrVfcLg&part=snippet,status,contentDetails&maxResults=${
        req.query.maxResults ? req.query.maxResults : "10"
      }&pageToken=${req.query.nextPageToken ? req.query.nextPageToken : ""}`
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

app.get("/playlistItems", (req: Request, res: Response) => {
  const { playlistId, nextPageToken, maxResults } = req.query;

  console.log(req.query.playlistId, "흥!");

  axios
    .get(
      `playlistItems?key=${key}&part=snippet&playlistId=${playlistId}&maxResults=${
        maxResults ? maxResults : "10"
      }&pageToken=${nextPageToken ? nextPageToken : ""}`
    )
    .then((value) => {
      console.log(value, "안녕");

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
