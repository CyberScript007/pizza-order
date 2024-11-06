import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    return navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const geolocationPosition = await getPosition();
    const position = {
      longitude: geolocationPosition.coords.longitude,
      latitutde: geolocationPosition.coords.latitude,
    };

    const addressObj = await getAddress(position.latitutde, position.longitude);

    console.log(addressObj);
    const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.postcode === "" ? "" : `${addressObj?.postcode},`} ${addressObj?.countryName}`;

    return { position, address };
  },
);

const initialState = {
  username: "",
  status: "idle",
  address: "",
  position: {},
  error: "",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address, make sure you fill this field";
      });
  },
});

export default userReducer.reducer;

export const { updateUsername } = userReducer.actions;

export const getUsername = (state) => state.user.username;
