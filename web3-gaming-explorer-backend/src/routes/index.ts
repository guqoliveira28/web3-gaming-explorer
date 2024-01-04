import express from "express";
import projects from "./projects";

export const routes = express.Router();

routes.use(projects);
