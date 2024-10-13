import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const eventsSlice = createSlice({
    name : "events",
    initialState : {
        Inperson:[],
        virtual : [],
        hybrid : [],
        loading:false,
        error:null
    },
    reducers : {
        eventAddStart(state) {
          state.loading = true;
          state.error = null;
        },
        eventAddSuccess(state, action){
          const { eventType, data } = action.payload;
          console.log("eventtype",eventType);
          if (eventType === "Inperson") {
            console.log("data",data);
            state.Inperson.push(data);
          } else if (eventType === "Virtual") {
            state.virtual.push(data);
          } else {
            state.hybrid.push(data);
          }
          state.loading = false;
        },
        eventAddFailure (state,action){
          state.loading = false;
          state.error = action.payload;
        },
    }
})
export const {eventAddStart, eventAddSuccess, eventAddFailure} = eventsSlice.actions;

export const addEventAsync = (eventData) => async (dispatch)=> {
dispatch(eventAddStart());
try{
  const response = await axios.post('http://localhost:3003/post/event',eventData);
  dispatch(eventAddSuccess({eventType:eventData.eventType , data:response.data}))
}catch (error){
  dispatch(eventAddFailure(error.message));
}
};
export default eventsSlice.reducer;
