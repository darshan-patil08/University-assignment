import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router";
import MyRouter from './routes/MyRouter.jsx'


createRoot(document.getElementById('root')).render(

  <RouterProvider router={MyRouter} />

)
