import { AddCategoryFields } from "../types/fields";
import api, { DefaultResponse } from "./api";

async function getMyCategories(id: number, token: string) {
  try {
    const response = await api.get("category/getAccountCategories/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

async function addCategory(
  id: number,
  token: string,
  fields: AddCategoryFields
) {
  try {
    const response = await api.post(
      "category/" + id,
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

export default {
  getMyCategories,
  addCategory,
};
