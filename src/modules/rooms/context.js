import * as Service from './services'
import { createSlice } from "@reduxjs/toolkit"

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    rooms: [],
    refresh: false,
    applications:[],
  },
  reducers: {
    setRooms: (state, data) => {
      state.rooms = data.payload;
    },
    setApplications: (state, data) => {
      state.applications = data.payload;
    }
  }
})

export const getAllRoomsAsync=()=>async(dispatch)=>{
 try{
   const res = await Service.getAllRooms();
   dispatch(setRooms(res));
 } 
 catch(err){
   throw err;
 }
}

export const addRoomAsync=(payload)=>async(dispatch)=>{
 try{
   const res = await Service.addRoom(payload);
   dispatch(getAllRoomsAsync());
   return res;
 } 
 catch(err){
   throw err;
 }
}

export const addApplicationAsync=(payload)=>async(dispatch)=>{
 try{
   const res = await Service.addApplication(payload);
   //dispatch(getAllRoomsAsync());
   return res;
 } 
 catch(err){
   throw err;
 }
}

export const approveApplicationAsync=(id)=>async(dispatch)=>{
 try{
   const res = await Service.approveApplication(id);
   //dispatch(getAllRoomsAsync());
   return res;
 } 
 catch(err){
   throw err;
 }
}

export const archiveRoomAsync=(id)=>async(dispatch)=>{
 try{
   const res = await Service.archiveRoom(id);
   dispatch(getAllRoomsAsync());
   return res;
 } 
 catch(err){
   throw err;
 }
}

export const availableRoomAsync=(id)=>async(dispatch)=>{
 try{
   const res = await Service.availableRoom(id);
   dispatch(getAllRoomsAsync());
   return res;
 } 
 catch(err){
   throw err;
 }
}
export const getMyApplicationsAsync=()=>async(dispatch)=>{
 try{
   const res = await Service.getMyApplications();
   dispatch(setApplications(res.data));
   return res;
 } 
 catch(err){
   throw err;
 }
}



export default roomSlice.reducer;
export const {setRooms, setApplications}  = roomSlice.actions;