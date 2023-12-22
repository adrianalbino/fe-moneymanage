import { AddEntryFields } from "../types/fields";
import api, { DefaultResponse } from "./api";

async function addEntry(id: number, token: string, fields: AddEntryFields) {
  try {
    const response = await api.post(
      "entry/" + id,
      { ...fields },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

async function getMyEntries(id: number, token: string) {
  try {
    const response = await api.get("entry/showByUser/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export default {
  addEntry,
  getMyEntries,
};
