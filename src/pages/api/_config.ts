const apiPlatformAgents: string[] = [
  "postman",
  "postmanruntime",
  "paw",
  "insomnia",
  "thunder client",
  "advanced rest client",
];

const commadLineClients: string[] = [
  "curl",
  "httpie",
  "wget",
  "aria2c",
  "http-prompt",
  "httpx",
  "axel",
  "postman-runtime",
];

export function isApiPlatformAgents(userAgent: string) {
  return (
    userAgent &&
    apiPlatformAgents.some((platform: string) =>
      userAgent.toLowerCase().includes(platform),
    )
  );
}

export function isCommandLineClients(userAgent: string) {
  return (
    userAgent &&
    commadLineClients.some((platform: string) =>
      userAgent.toLowerCase().includes(platform),
    )
  );
}

export const unAthorized_Error = (param: string): string =>
  `Unauthorized: Requests from ${param} are not allowed.`;
