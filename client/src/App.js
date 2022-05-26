import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute, } from './pages'


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

function App() {
  // const { user } = useAppContext()
  // let x = false;
  // if (user && user.email === "sm@sm.com") {
  //   x = true;
  // }
  return (
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
  )
}

export default App
