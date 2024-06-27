import * as replayService from "../services/replay-service.js";

export async function saveReplay(req, res, next) {
  try {
    console.log(req.body);
    console.log(req.user);
    const { row, col, rule, type, gameHistory } = req.body;

    const data = {
      row,
      column: col,
      rule,
      type,
      gameHistory,
      userId: req.user.id,
    };

    await replayService.saveReplay(data);
    res.status(200).json({ message: "save replay" });
  } catch (error) {
    next(error);
  }
}

export async function getReplay(req, res, next) {
  try {
    console.log(req.params);
    const id = +req.params.id;
    const replay = await replayService.getReplayByReplayId({ id });
    res.status(200).json({ message: "get a replay", replay });
  } catch (error) {
    next(error);
  }
}

export async function getUserReplayList(req, res, next) {
  try {
    console.log(req.user);
    const replayList = await replayService.getAllReplayByUserId(req.user.id);
    res.status(200).json({ message: "get replay list", replayList });
  } catch (error) {
    next(error);
  }
}
