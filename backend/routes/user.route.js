import express from "express";
import protectRoute from "../../middlewares/protectRoute.js";
import { getUsersForSidebar } from "../controller/users.controller.js";

const router = express.Router();

router.get("/", protectRoute ,getUsersForSidebar);

export default router;