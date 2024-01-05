import { ReactElement, useEffect, useState } from "react";
import {
  formatPrice,
  getFavoritesFromStorage,
  localStorageFavorites,
} from "../shared/shared";

const chosenLinks = Object.freeze({
  Website: "website",
  Twitter: "twitter",
  Reddit: "reddit",
});

export default function ProjectDetails({
  project,
  goBack,
}: {
  project: Project;
  goBack: Function;
}) {
  const [favorites, setFavorites] = useState(() => {
    return getFavoritesFromStorage();
  });

  const isFavorite: boolean = favorites.find((id) => id === project.id)
    ? true
    : false;
  const urls: ProjectUrls | undefined = project.details?.urls;
  let links: Array<ReactElement> = [];

  Object.keys(chosenLinks).forEach((key) => {
    const projectUrlsKey = chosenLinks[key as keyof typeof chosenLinks];
    if (urls && urls[projectUrlsKey as keyof ProjectUrls].length > 0) {
      const urlArray = urls[projectUrlsKey as keyof ProjectUrls];
      if (urlArray[0] !== "") {
        links.push(
          <a key={key} href={urlArray[0]} target="_blank">
            {key}
          </a>
        );
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageFavorites, JSON.stringify(favorites));
  }, [favorites]);

  function handleSelectFavorite(projectId: number) {
    setFavorites((prevFavorites) => {
      let favs: number[] = [];
      if (prevFavorites.find((id) => id === projectId)) {
        favs = prevFavorites.filter((i) => i !== projectId);
      } else {
        favs = [...prevFavorites, projectId];
      }
      return [...favs];
    });
  }

  return (
    <div className="project-details">
      <header>
        <div className="back" onClick={() => goBack()}>
          Back
        </div>
        <div className="tags">
          {project.details?.tagNames.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <div className="title">
          <img src={project.details?.logo} alt={project.name + " logo"} />
          <div>
            <h2>{project.name}</h2>
            <h1>{formatPrice(project.quote.USD.price)}</h1>
          </div>
          <div className="favorite">
            <i
              className={"fa-regular fa-star" + (isFavorite ? " active" : "")}
              onClick={() => handleSelectFavorite(project.id)}
            ></i>
          </div>
        </div>
      </header>
      <main>
        <div className="description">{project.details?.description}</div>
        <table>
          <thead>
            <tr>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>1m</th>
              <th>3m</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{project.quote.USD.percentChange1h.toFixed(2)} %</td>
              <td>{project.quote.USD.percentChange24h.toFixed(2)} %</td>
              <td>{project.quote.USD.percentChange7d.toFixed(2)} %</td>
              <td>{project.quote.USD.percentChange30d.toFixed(2)} %</td>
              <td>{project.quote.USD.percentChange90d.toFixed(2)} %</td>
            </tr>
          </tbody>
        </table>
        <div className="links">
          <h2>Links</h2>
          {links}
        </div>
      </main>
    </div>
  );
}
