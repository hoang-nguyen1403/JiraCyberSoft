import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../utils/setting';
import { AppDispatch } from '../configStore';

const initialState = {
  allProject: []
}

export interface creatorType{
  id: number,
  name: string
}
export interface memberType{
  userId: number,
  name: string,
  avatar: string
}

export interface projectApiDataType{
  key: number,
  members: memberType[];
  id: string;
  categoryName: string;
  description: string;
  categoryId: string;
  projectName: string;
  alias: string;
  creator: creatorType;
  deleted: boolean;
}

const projectManagementReducer = createSlice({
  name: "projectManagementReducer",
  initialState,
  reducers: {
    getAllProductAction:(state:any, action:PayloadAction<projectApiDataType[]>)=>{
      state.allProject = action.payload;
   }
  }
});

export const {getAllProductAction} = projectManagementReducer.actions

export default projectManagementReducer.reducer


export const getAllProject = ()=>{
  return async(dispatch: AppDispatch)=>{
    try{
       const result = await http.get('/Project/getAllProject')
       let apiallUser:projectApiDataType[] = result.data.content
       let allProducts:any= apiallUser.map((prop, index)=>{
         return {...prop, "key": index}
       })
       const action = getAllProductAction(allProducts)
       dispatch(action)
    }catch(err){
      console.log(err)
     }
  } 
}