import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://64ce66900c01d81da3eec7fe.mockapi.io/api";

export const fetchContacnts = createAsyncThunk (
    "contacts/fetchAll", async(_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            console.log(response.data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
    
)
export const addContact  = createAsyncThunk (
    "contacts/addContact", async (newContact, thunkAPI) => {
         try {
            const response = await axios.post("/contacts", newContact);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteContact  = createAsyncThunk (
    "contacts/deleteContact", async (contactID, thunkAPI) => {
         try {
            const response = await axios.delete(`/contacts/${contactID}`);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)