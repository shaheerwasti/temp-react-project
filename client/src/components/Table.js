import DataTable from 'react-data-table-component';
import { useAppContext } from '../context/appContext'
const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];

const data1 = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

const Table = () => {
    const { data } = useAppContext()
    console.log(data);
    return (
        <DataTable
            columns={columns}
            data={data1}
            pagination
        />
    );
};

export default Table