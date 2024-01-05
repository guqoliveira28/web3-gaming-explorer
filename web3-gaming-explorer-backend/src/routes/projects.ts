import express from "express";
import {
  getGamingProjects,
  getProjectDetails,
  getProjectQuotes,
} from "./cmc-api/cmc-api-requests";
import { Project, convertToProject } from "../models/project";
import {
  ProjectDetails,
  convertToProjectDetails,
} from "../models/projectDetails";

const router = express.Router();

// Get projects from Gaming category if no params are provided
// Get projects metadata if params provided
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

// Get projects metadata and quotes. This returns a Project type with
// a new key 'details' of type ProjectDetails
router.get("/fullprojects", (req, res) => {
  const id = <string>req.query.id;

  if (id) {
    getProjectQuotes(id).then(
      (data: any) => {
        const projects: Project[] = [];
        const idList = id.split(",");
        idList.map((i: string) => {
          projects.push(convertToProject(data[i]));
        });

        getProjectDetails(id).then(
          (data: any) => {
            const listOfProjects: any[] = [];
            const idList = id.split(",");
            idList.map((i: string) => {
              listOfProjects.push({
                ...projects.find((project) => project.id === Number(i)),
                details: convertToProjectDetails(data[i]),
              });
            });
            res.status(200).json(listOfProjects);
          },
          (rejected) => {
            res.status(500).json(rejected);
          }
        );
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
