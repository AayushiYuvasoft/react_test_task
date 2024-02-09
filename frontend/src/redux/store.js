import { configureStore } from '@reduxjs/toolkit'
import  dataSlice  from './DataSlice'

export default configureStore({
  reducer: {
    datas:dataSlice
  },
})