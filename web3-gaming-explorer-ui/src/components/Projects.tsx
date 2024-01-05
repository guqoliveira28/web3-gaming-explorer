import { formatPrice } from "../shared/shared";

export default function Projects({
  projects,
  selectProject,
  title,
}: {
  projects: Project[];
  selectProject: Function;
  title: string;
}) {
  return (
    <div className="projects">
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            <th id="rank">Rank</th>
            <th id="name">Name</th>
            <th id="price">Price</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project: Project) => (
            <tr key={project.id} onClick={() => selectProject(project)}>
              <td id="rank">{project.cmcRank}</td>
              <td id="name">
                <img src={project.details?.logo} alt={project.name + " logo"} />
                {project.name}
                <span className="symbol">{project.symbol}</span>
              </td>
              <td id="price">{formatPrice(project.quote.USD.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
