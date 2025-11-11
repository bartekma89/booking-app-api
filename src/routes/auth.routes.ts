import { Router } from "express";
import type { Router as RouterType, Request, Response } from "express";

const router: RouterType = Router();

router.get("/register", (req: Request, res: Response) => {
	res.send("register");
});

router.get("/login", (req: Request, res: Response) => {
	res.send("login");
});

export default router;
