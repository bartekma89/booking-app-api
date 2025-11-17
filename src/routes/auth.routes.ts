import { Router } from "express";

import type { Router as RouterType } from "express";

import { login, register } from "#controllers/auth.controller.js";

const router: RouterType = Router();

router.post("/register", register);

router.post("/login", login);

export default router;
