import { Router } from "express"
import * as replayController from "../controllers/replay-controller.js"
import authenticate from "../middlewares/authenticate.js"

export const router = Router()

router.post('/',authenticate, replayController.saveReplay)
router.get('/:id',authenticate, replayController.getReplay)
router.get('/',authenticate, replayController.getUserReplayList)