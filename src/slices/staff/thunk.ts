import axios from 'axios'
import { isLoading, setErrorMessage, setIsLoadingFalse, getStaffSuccess } from "./reducer"

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'

export const getAllStaff = async (dispatch: any, page: number, itemsPerPage: number) => {
    dispatch(isLoading());
    try {
      const response = await axios.get(`${baseURL}/staff/get_all`, {
        params: {
          page,
          itemsPerPage,
        },
      });
  
      if (response.data.message.code === successCode) {
        dispatch(getStaffSuccess(response.data.data));
      } else {
        dispatch(setErrorMessage(response.data.message.description));
      }
    } catch (error) {
      dispatch(setIsLoadingFalse());
      console.error(error);
    }
  };
