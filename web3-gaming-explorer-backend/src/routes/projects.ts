import express from "express";
import {
  getGamingProjects,
  getProjectDetails,
} from "./cmc-api/cmc-api-requests";

const router = express.Router();

router.get("/projects", (req, res) => {
  getGamingProjects().then(
    (data) => {
      res.status(200).json(data);
    },
    (rejected) => {
      res.status(500).json(rejected);
    }
  );
});

router.get("/projects/:id", (req, res) => {
  getProjectDetails(req.params.id).then(
    (data) => {
      res.status(200).json(data);
    },
    (rejected) => {
      res.status(500).json(rejected);
    }
  );
});

export default router;
