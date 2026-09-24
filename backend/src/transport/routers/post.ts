import { Router } from "express";

import { getAll, getById, addPost } from "../handlers/post.js";

const router: Router = Router();

router.get("/posts", getAll);
router.get("/posts/:id", getById);

router.post("/posts", addPost);

export default router;
