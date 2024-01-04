import express from "express";
import {
  getGamingProjects,
  getProjectDetails,
} from "./cmc-api/cmc-api-requests";
import { Project, convertToProject } from "../models/project";
import {
  ProjectDetails,
  convertToProjectDetails,
} from "../models/projectDetails";

const router = express.Router();

router.get("/projects", (req, res) => {
  getGamingProjects().then(
    (data: any) => {
      const projects: Project[] = [];
      data.coins.map((coin: any) => {
        projects.push(convertToProject(coin));
      });
      res.status(200).json(projects);
    },
    (rejected) => {
      res.status(500).json(rejected);
    }
  );
});

router.get("/projects/:id", (req, res) => {
  getProjectDetails(req.params.id).then(
    (data: any) => {
      const project: ProjectDetails = convertToProjectDetails(
        data[req.params.id]
      );
      res.status(200).json(project);
    },
    (rejected) => {
      res.status(500).json(rejected);
    }
  );
});

export default router;
