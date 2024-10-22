import express from "express";
import { upload } from "../middlewares/fileUpload.js";
import {
    addProject,
    displayProject,
    getProjectName,
    taskCreation,
    taskList,
    taskModalData,
    getroles,
    assignTo,
    assignedList,
    assignedListStatus,
    addModules,
    listingEpic,
    getEpicName,editEpic,
    updateProject
} from "../controllers/projectController/projectController.js";
import { validateToken } from "../middlewares/validateToken.js";
const router = express.Router();

router.post("/add", validateToken, addProject);
router.get("/display", validateToken, displayProject);
router.get("/getProjectName/:id", validateToken, getProjectName);
router.get("/getEpicName/:id", validateToken, getEpicName);
router.put('/updateProject/:id',updateProject)
router.put("/updateEpic/:id",editEpic)

router.post("/task/create", upload.array('files', 5), validateToken, taskCreation);
router.get("/task/getAll/:epicId", validateToken, taskList);
router.get("/task/getModalData", validateToken, taskModalData);
router.get("/task/assign/roles", validateToken, getroles);
// router.get('/task/assign/names',getnames)
router.put("/task/assignto", validateToken, assignTo);
router.get("/tasks/assignedlist", validateToken, assignedList);
router.patch("/tasks/assignedlist/:taskId", validateToken, assignedListStatus);

router.post("/addModules", validateToken, addModules);
router.get("/listEpic", validateToken, listingEpic);

export default router;
