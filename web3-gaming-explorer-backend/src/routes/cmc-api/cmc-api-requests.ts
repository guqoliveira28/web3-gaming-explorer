import { cmcApiKey } from "../../config/credentials";

const CMC_URL = "https://pro-api.coinmarketcap.com";
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("X-CMC_PRO_API_KEY", cmcApiKey!);

// Returns information about the Gaming coin category
// Includes a paginated list of the cryptocurrency quotes and metadata for the category
function getGamingProjects<T>(limit: number = 5) {
  const endpoint: string = "/v1/cryptocurrency/category?";
  const gamingCategoryId: string = "6051a82166fc1b42617d6dc1";
  const queryParams = new URLSearchParams({
    id: gamingCategoryId,
    limit: limit.toString(),
  });

  let response: Awaited<T> | null = null;

  return new Promise(async (resolve, reject) => {
    try {
      response = await fetch(CMC_URL + endpoint + queryParams, {
        method: "GET",
        headers: requestHeaders,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json() as Promise<{ data: T }>;
        })
        .then((data) => {
          return data.data;
        });
    } catch (ex) {
      // error
      console.log(ex);
      reject(ex);
    }
    if (response) {
      // success
      resolve(response);
    }
  });
}

function getProjectDetails<T>(projectId: string) {
  const endpoint: string = "/v2/cryptocurrency/info?";
  const queryParams = new URLSearchParams({ id: projectId });

  let response: Awaited<T> | null = null;

  return new Promise(async (resolve, reject) => {
    try {
      response = await fetch(CMC_URL + endpoint + queryParams, {
        method: "GET",
        headers: requestHeaders,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json() as Promise<{ data: T }>;
        })
        .then((data) => {
          return data.data;
        });
    } catch (ex) {
      // error
      console.log(ex);
      reject(ex);
    }
    if (response) {
      // success
      resolve(response);
    }
  });
}

export { getGamingProjects, getProjectDetails };
