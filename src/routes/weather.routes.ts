import { Router } from "express";
import {
  getFavorites,
  removeFavorite,
  setFavorites,
} from "../controllers/favoriteController";
import { getUsers, setUser } from "../controllers/usersController";
import { getWeathers, setWeather } from "../controllers/weatherController";

const router = Router();

router.route("/users").post(setUser).get(getUsers);
router.route("/favorites").post(setFavorites).delete(removeFavorite);
router.route("/favorites/:userId").get(getFavorites);
router.route("/weathers").post(setWeather).get(getWeathers);

export default router;
