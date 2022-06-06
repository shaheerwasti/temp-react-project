//import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute, Login, Generator } from './pages'


import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  MyGraph,
  MyTable,
  FsboMap,
} from './pages/dashboard'

import Header from './components/Header'

function App() {
  // const { user } = useAppContext()
  // let x = false;
  // if (user && user.email === "sm@sm.com") {
  //   x = true;
  // }
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-numbers' element={<AllJobs />} />
          <Route path='add-number' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
          <Route path='my-graph' element={<MyGraph />} />
          <Route path='fsbo-map' element={<FsboMap />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>

      {/* <Router>
        <div className='container'>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login></Login>} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router> */}



    </>
  )
}

export default App
