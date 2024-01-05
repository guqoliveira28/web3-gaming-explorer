import { formatPrice } from "../shared/shared";
import Projects from "./Projects";

export default function Favorites({
  projects,
  selectProject,
}: {
  projects: Project[];
  selectProject: Function;
}) {
  const title = "Your Favorite Projects!";
  return (
    <Projects projects={projects} selectProject={selectProject} title={title} />
  );
}
