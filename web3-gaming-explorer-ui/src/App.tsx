import { ReactElement, useEffect, useState } from "react";
import "./App.scss";
import TopProjects from "./components/TopProjects";
import { ProjectsContext } from "./store/projects-context";
import ProjectDetails from "./components/ProjectDetails";

const URL: string = "http://localhost:3001/v1/projects";
let error = "";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project>();
  let view: ReactElement | undefined = undefined;

  useEffect(() => {
    (async () => {
      let projectList: Project[] = [];
      error = "";
      try {
        const data = await fetch(URL).then((res) => res.json());

        let idList: string = "";
        data.map((project: Project) => {
          if (idList === "") {
            idList = project.id.toString();
          } else {
            idList += "," + project.id.toString();
          }
          projectList.push(project);
        });
        const queryParams = new URLSearchParams({ id: idList });
        const details: any = await fetch(URL + "?" + queryParams).then(
          (detailsJson) => detailsJson.json()
        );
        if (details) {
          projectList.forEach((project) => {
            project.details = details.find(
              (d: ProjectDetails) => d.id === project.id
            );
          });
        }
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          error = err.message;
        }
      }

      setProjects(projectList);
    })();
  }, []);

  function handleSelectProject(project: Project) {
    setSelectedProject(project);
  }

  function handleDeselectProject() {
    setSelectedProject(undefined);
  }

  const ctxValue = {
    projects: projects,
  };

  if (selectedProject) {
    view = (
      <ProjectDetails
        project={selectedProject}
        goBack={handleDeselectProject}
      />
    );
  } else {
    if (error === "") {
      if (projects.length > 0) {
        view = (
          <TopProjects
            projects={projects}
            selectProject={(project: Project) => handleSelectProject(project)}
          />
        );
      } else {
        // loading
      }
    } else {
      view = <p className="error">{error}</p>;
    }
  }

  return (
    <div className="App">
      <ProjectsContext.Provider value={ctxValue}>
        {view}
      </ProjectsContext.Provider>
    </div>
  );
}

export default App;
