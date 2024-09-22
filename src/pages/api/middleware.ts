import axios, { AxiosRequestConfig } from "axios";
import auth0 from "./auth/_initAuth0";
import { NextApiRequest, NextApiResponse } from "next";
import {
  isCommandLineClients,
  isApiPlatformAgents,
  unAthorized_Error,
} from "./_config";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { baseURL } from "@/utilities/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const method = req.method;
    const params = method === "GET" ? req.query : req.body;
    const suffix = params["suffix"];
    delete params["suffix"];

    /* To retrieve all auth0 token including idToken */
    const session = await auth0.getSession(req, res);

    if (session?.idToken) {
      const idToken = jwtDecode(session?.idToken);
      const tokenExpireAt: number = idToken?.exp || 0;
      if (tokenExpireAt < moment().unix()) {
        res.status(401).end("Unathorized!");
      }
      /* Restrict APIs call from API platform sites & command-line clients */
      const userAgent = req.headers["user-agent"];
      if (userAgent) {
        if (isApiPlatformAgents(userAgent) || isCommandLineClients(userAgent)) {
          res.status(401).json(unAthorized_Error(userAgent));
        }
      }
      console.log("node_env variable ::: " + process.env.NODE_ENV);
      console.log("baseURL :: " + baseURL);
      const config: AxiosRequestConfig = {
        method: method,
        url: `${baseURL}${suffix}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.idToken}`,
          "Api-Token": process.env.API_TOKEN,
        },
      };
      method === "GET" ? (config.params = params) : (config.data = params);

      const response = await axios(config);
      res.status(200).json(response.data);
    }
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      res.status(error.request.status).json(error.request.data);
    } else {
      res.status(error.status || 500).end(error.message);
    }
  }
}
