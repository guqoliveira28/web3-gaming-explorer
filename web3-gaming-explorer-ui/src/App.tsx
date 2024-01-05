import { ReactElement, useEffect, useState } from "react";
import "./App.scss";
import TopProjects from "./components/TopProjects";
import { ProjectsContext } from "./store/projects-context";
import ProjectDetails from "./components/ProjectDetails";
import { getFavoritesFromStorage } from "./shared/shared";
import Favorites from "./components/Favorites";

const URL: string = "http://localhost:3001/v1";
let error = "";

function getTopProjects() {
  const endpoint: string = URL + "/projects";
  return (async () => {
    let projectList: Project[] = [];
    error = "";
    try {
      const data = await fetch(endpoint).then((res) => res.json());

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
      const details: any = await fetch(endpoint + "?" + queryParams).then(
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

    return projectList;
  })();
}

function getFavProjects() {
  const endpoint = URL + "/fullprojects";
  return (async () => {
    let projectList: Project[] = [];
    try {
      let paramIdList: string = "";
      getFavoritesFromStorage().map((id) => {
        if (paramIdList === "") {
          paramIdList = id.toString();
        } else {
          paramIdList += "," + id.toString();
        }
      });
      if (paramIdList === "") {
        return projectList;
      }

      const queryParams = new URLSearchParams({ id: paramIdList });
      const data = await fetch(endpoint + "?" + queryParams).then((res) =>
        res.json()
      );

      data.map((project: Project) => {
        projectList.push(project);
      });
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        error = err.message;
      }
    }

    return projectList;
  })();
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [favorites, setFavorites] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project>();
  let view: ReactElement | undefined = undefined;

  useEffect(() => {
    getTopProjects().then((p) => setProjects(p));

    getFavProjects().then((p) => setFavorites(p));
  }, [selectedProject]);

  useEffect(() => {}, [favorites]);

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
        let viewFavorites: boolean = favorites.length > 0;
        view = (
          <>
            <TopProjects
              projects={projects}
              selectProject={(project: Project) => handleSelectProject(project)}
            />
            {viewFavorites && (
              <Favorites
                projects={favorites}
                selectProject={(project: Project) =>
                  handleSelectProject(project)
                }
              />
            )}
          </>
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
