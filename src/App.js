import React from 'react'
import { useRoutes } from 'react-router-dom'
import axios from 'axios'
import UploadImage1 from './components/uploadimage1'
import './components/loader/loader.css'
import { useState, useEffect } from 'react'
import Editor from './editor/editor'
export default function App() {
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      setLoader(true)
      
      return config;
    }, function (error) {
      setLoader(false);
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      setLoader(false);
      return response;
    }, function (error) {
      setLoader(false);
      return Promise.reject(error);
    });
  }, [])

  const routes = useRoutes([
    { path: '/', element: <Editor /> }
  ])
  return (<>
    {routes}
    {loader &&
      <div class="lds-hourglass" style={{ position: 'fixed', top: '42%', left: '45%', width: 'auto', textAlign: 'center', color: 'blue' }}>
        
      </div>

    }
  </>
  )
}
