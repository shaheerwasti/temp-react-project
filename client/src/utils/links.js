import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { FaTable } from 'react-icons/fa'
import { FaChartLine, FaMapMarked } from 'react-icons/fa'

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all Numbers', path: 'all-numbers', icon: <MdQueryStats /> },
  { id: 3, text: 'add Number', path: 'add-number', icon: <FaWpforms /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
  { id: 5, text: 'graph', path: 'my-graph', icon: <FaChartLine /> },
  { id: 6, text: 'map', path: 'fsbo-map', icon: <FaMapMarked /> },
  //{ id: 6, text: 'table', path: 'my-table', icon: <FaTable /> },
]

export default links
