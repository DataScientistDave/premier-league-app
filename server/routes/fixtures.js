import express from "express";
import axios from "../axios.js";
import requests from "../requests.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/fixtures", checkAuth, async (req, res) => {
  const { data } = await axios.get(requests.fetchFixtures);
  const { response } = data;
  const fixtures = response.map((obj) => {
    const id = obj?.fixture?.id;
    const date = obj?.fixture?.date;
    const location = obj?.fixture?.venue?.name;
    const status = obj?.fixture?.status?.short;
    const homeTeamLogo = obj?.teams?.home?.logo;
    const homeTeamGoals = obj?.goals?.home;
    const awayTeamLogo = obj?.teams?.away?.logo;
    const awayTeamGoals = obj?.goals?.away;
    return {
      id,
      date,
      location,
      status,
      homeTeamLogo,
      homeTeamGoals,
      awayTeamLogo,
      awayTeamGoals,
    };
  });
  return res.json(fixtures);
});

export default router;
