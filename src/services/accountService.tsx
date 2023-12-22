import { GettingStartedFields, UpdateAccountFields } from "../types/fields";
import api, { DefaultResponse } from "./api";

async function createAccount(fields: GettingStartedFields) {
  try {
    const response = await api.post(
      "/account/" + fields.id,
      { ...fields },
      {
        headers: {
          Authorization: "Bearer " + fields.token,
        },
      }
    );
    console.log(response);
    return response.data as DefaultResponse;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
}
async function getAccount(id: number, token: string) {
  try {
    const response = await api.get("account/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

async function updateAccount(id: number, token: string, fields: UpdateAccountFields) {
  try {
    const response = await api.put(
      "/account/"  + id,
      { ...fields },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response);
    return response.data as DefaultResponse;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
}

export default {
  createAccount,
  getAccount,
  updateAccount,
};
