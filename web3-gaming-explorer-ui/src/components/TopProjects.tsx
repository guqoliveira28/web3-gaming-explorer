import { formatPrice } from "../shared/shared";
import Projects from "./Projects";

export default function TopProjects({
  projects,
  selectProject,
}: {
  projects: Project[];
  selectProject: Function;
}) {
  const title = "Top Web3 Gaming Projects!";
  return (
    <Projects projects={projects} selectProject={selectProject} title={title} />
  );
}
