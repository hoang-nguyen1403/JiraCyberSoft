import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../configStore';
import { http } from '../../utils/setting';
import { history } from '../../index';


const initialState = {
  projectDetail:{}
}

export interface detailProjectApiDataType{
  key: number
}

const kanbanBoardReducer = createSlice({
  name: "kanbanBoardReducer",
  initialState,
  reducers: {
    getDetailProduct:(state,action:PayloadAction<detailProjectApiDataType[]>)=>{
      state.projectDetail = action.payload
    }
  }
});

export const {getDetailProduct} = kanbanBoardReducer.actions

export default kanbanBoardReducer.reducer


export const getProductDetailAPI = (params:any)=>{
  return async (dispatch: AppDispatch)=>{
    // b2 thực thi thunk
    let {id} = params
    try{
      // Project/getProjectDetail/{projectId}
      let result = await http.get(`/Project/getProjectDetail?id=${id}`)
      const action = getDetailProduct(result.data.content)
      dispatch(action)
      }catch(err:any){
        if (err.response.status === 404){
          alert(err)
          history.push("/dashboard")
        }
         
      }
  }
}