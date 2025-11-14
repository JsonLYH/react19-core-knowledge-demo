import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
export const getTestDataAction = createAsyncThunk(
    'counter/getTestData',
    async (payload,extraInfo) => {
        const res = await axios.get(
          "https://api-v2.xdclass.net/api/teacher/v1/list"
        );
        return res.data;
    }
)