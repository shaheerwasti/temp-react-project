import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  SHOW_GRAPH_BEGIN,
  SHOW_GRAPH_SUCCESS,
  SHOW_TGRAPH_BEGIN,
  SHOW_TGRAPH_SUCCESS,
  FETCH_GOOGLE_SHEET_DATA_BEGIN,
  FETCH_GOOGLE_SHEET_DATA_SUCCESS,
  FETCH_GEOCODE_DATA_BEGIN,
  FETCH_GEOCODE_DATA_SUCCESS,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['ported', 'not ported'],//['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['cold', 'warm', 'hot'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  statistics: {},
  gTableData: {},
  geoCodeData: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const sample_data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300
  }
]

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, location, token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })
    try {
      const { position, company, jobLocation, jobType, status } = state
      await authFetch.post('/jobs', {
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: CREATE_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_JOBS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { jobs, totalJobs, numOfPages } = data
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } })
  }
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })

    try {
      const { position, company, jobLocation, jobType, status } = state
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: EDIT_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN })
    try {
      await authFetch.delete(`/jobs/${jobId}`)
      getJobs()
    } catch (error) {
      logoutUser()
    }
  }
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/jobs/stats')
      //const { data } = await authFetch('/graph')
      //console.log(data);
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const graphData = async (req, res) => {
    dispatch({ type: SHOW_GRAPH_BEGIN })
    try {
      //const { data } = await authFetch('/jobs/stats')
      const { data } = await authFetch('/graph/rawData')
      //console.log(data);
      dispatch({
        type: SHOW_GRAPH_SUCCESS,
        payload: {
          stats: data,
          monthlyNumbers: data.name,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const totalGraph = async (req, res) => {
    dispatch({
      type: SHOW_TGRAPH_BEGIN
    })
    try {
      //const { data } = await authFetch('/jobs/stats')
      const { data } = await authFetch('/graph')
      //console.log(data);
      dispatch({
        type: SHOW_TGRAPH_SUCCESS,
        payload: {
          stats: data,
          totalNumbers: data.name,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const getSheetsData = async (req, res) => {
    dispatch({
      type: FETCH_GOOGLE_SHEET_DATA_BEGIN
    })

    try {
      const { data } = await authFetch.post('/gsheet/tvr', {
        "spreadsheetId": "18O_GODzo7ER4Efv5tAtnCWfV8ZtsageJkSM54f6Jn0g",
        "range": "Criteria 5"
      })
      //console.log(data);
      dispatch({
        type: FETCH_GOOGLE_SHEET_DATA_SUCCESS,
        payload: {
          data,
        }
      })
    } catch (error) {
      logoutUser()
    }

  }

  const getFisbo = async (req, res) => {
    dispatch({
      type: FETCH_GEOCODE_DATA_BEGIN
    })
    try {
      const { data } = await authFetch.post('/gsheet/ListOfAddr', {
        "spreadsheetId": "1CRvmhE5XGUn-f72yFrovq4N1QE-pqAXhu-II0ZvT1yA",
        "range": "experimental-sheet"
      })
      //console.log(data);
      dispatch({
        type: FETCH_GEOCODE_DATA_SUCCESS,
        payload: {
          data,
        }
      })

    } catch (error) {
      logoutUser()
    }

  }



  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        graphData,
        totalGraph,
        getSheetsData,
        getFisbo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
