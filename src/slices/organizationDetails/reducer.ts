import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface OrganizationDetails {
//   _id: string; 
// }

// interface OrganizationDetailsState {
//   loading: boolean;
//   organizationDetails: OrganizationDetails[];
//   errorMsg: string;
// }

export const initialState = {
  loading: false,
  organizationDetails: [],
  errorMsg: "",
};

const organizationDetailsSlice = createSlice({
  name: "organizationDetails",
  initialState,
  reducers: {
    isLoading(state) {
      state.loading = true;
    },
    setIsLoadingFalse(state) {
      state.loading = false;
    },
    getOrganizationDetailsSuccess(state,action) {
      state.loading = false;
      state.organizationDetails = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.loading = false;
      state.errorMsg = action.payload;
    },
    // deleteOrganizationSuccess(state, action: PayloadAction<string>) {
    //   const organizationIdToDelete = action.payload;
    //   state.organizationDetails = state.organizationDetails.filter(
    //     (org) => org._id !== organizationIdToDelete
    //   );
    // },
    
  },
});


export const {
  isLoading,
  setIsLoadingFalse,
  getOrganizationDetailsSuccess,
  setErrorMessage,
 
} = organizationDetailsSlice.actions;

export default organizationDetailsSlice.reducer;
