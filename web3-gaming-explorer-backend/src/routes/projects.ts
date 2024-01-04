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
  const id = <string>req.query.id;

  if (id) {
    getProjectDetails(id).then(
      (data: any) => {
        const projects: ProjectDetails[] = [];
        const idList = id.split(",");
        idList.map((i: string) => {
          projects.push(convertToProjectDetails(data[i]));
        });
        res.status(200).json(projects);
      },
      (rejected) => {
        res.status(500).json(rejected);
      }
    );
  } else {
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
  }
});

export default router;
