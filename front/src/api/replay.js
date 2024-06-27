import axios from "../config/axios"

export const saveReplay = data => axios.post("/replay", data)
export const getUserReplayList = () => axios.get("/replay")
export const getReplay = id => axios.get(`/replay/${id}`)