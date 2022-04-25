import axios from 'axios';
import { APPLICATION, ROOM } from '../../constants/Api';
import { getToken } from '../../misc/sessionManager';

const access_token = getToken();

export async function getAllRooms() {
  try{
    const res = await axios.get(ROOM,{
      headers:{
        'access_token': access_token
      }
    })
    return res.data;
  } 
  catch(err){
    throw err;
  }
}

export async function addRoom(payload) {
  try{
    const res = await axios.post(ROOM+'/register',payload,{
      headers:{
        'access_token': access_token
      }
    })
    return res;
  } 
  catch(err){
    throw err;
  }
}

export async function getById(id) {
  try{
    const res = await axios.get(ROOM+`/${id}`,{
      headers:{
        'access_token': access_token
      }
    })
    return res;
  } 
  catch(err){
    throw err;
  }
}


export async function addApplication(payload) {
  try{
    const res = await axios.post(APPLICATION+'/register',payload,{
      headers:{
        'access_token': access_token
      }
    })
    return res;
  } 
  catch(err){
    throw err;
  }
}

export async function approveApplication(id) {
  try{
    const res = await axios.post(APPLICATION+'/approve/'+id,{},{
      headers:{
        'access_token': access_token
      }
    })
    return res;
  } 
  catch(err){
    throw err;
  }
}

export async function archiveRoom(id) {
  try{
    const res = await axios.delete(ROOM+'/'+id,{
      headers:{
        'access_token': access_token
      }
    })
    return res;
  } 
  catch(err){
    throw err;
  }
}

export async function getMyApplications() {
  try{
    const res = await axios.get(ROOM+'/applications',{
      headers:{
        'access_token': access_token
      }
    })
    return res;
  } 
  catch(err){
    throw err;
  }
}

export async function availableRoom(id) {
  try{
    const res = await axios.put(ROOM+'/available/'+id,{},{
      headers:{
        'access_token': access_token
      }
    })
    return res;
  } 
  catch(err){
    throw err;
  }
}