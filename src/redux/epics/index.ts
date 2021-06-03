import { combineEpics } from "redux-observable";

import authEpic from "./AuthEpic";

const epics = combineEpics(...authEpic);

export default epics;
