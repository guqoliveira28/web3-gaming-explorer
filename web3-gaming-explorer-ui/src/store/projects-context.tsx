import { createContext } from "react";

export const ProjectsContext = createContext<{ projects: Project[] }>({
  projects: [],
});
