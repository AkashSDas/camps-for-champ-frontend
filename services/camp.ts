import { AxiosRequestConfig } from "axios";
import { CampDetailsInput } from "../lib/schema";

import fetchFromAPI from "./";

function fetchFromCamp(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/camp/${URL}`, config);
}

/** Create a camp */
export async function createCamp(accessToken: string) {
  var response = await fetchFromCamp("", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status == 201) return { success: true, camp: response.data };
  return { success: false, error: response.error };
}

/** Get camp */
export async function getCampInfo(campId: string) {
  var response = await fetchFromCamp(`${campId}/info`, {
    method: "GET",
  });

  if (response.status == 200) {
    return { success: true, camp: response.data.camp };
  }

  return { success: false, error: response.error };
}

/** Update camp settings */
export async function updateCampSettings(
  campId: string,
  data: CampDetailsInput,
  accessToken?: string
) {
  var response = await fetchFromCamp(`${campId}/details`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });
  console.log(response?.data?.camp);

  if (response.status == 200) {
    return { success: true, camp: response.data?.camp };
  }
  return { success: false, error: response.error };
}
