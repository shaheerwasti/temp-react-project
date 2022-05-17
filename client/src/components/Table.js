import DataTable from 'react-data-table-component';
import { useAppContext } from '../context/appContext'
let columns = [
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
        // year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        // year: '1984',
    },
]

const Table = () => {
    const { gTableData } = useAppContext()
    const { values, status } = gTableData
    let newCol = [];
    let newData = [];

    if (status === 'fulfilled') {

        values.forEach((element, index) => {
            if (index === 0) {
                element.forEach((item) => {
                    newCol.push({
                        name: item,
                        selector: row => row.item,
                    });
                })
            }
            else
                newData.push({
                    id: index,
                    // "#": element[0],
                    "Criterion name": element[1],
                    Type: element[3]

                })
            // element.forEach((item, index) => {
            //     newData.push({
            //         id: index,

            //     })
            // });

        });

    }
    console.log(newCol, newData);
    return (
        <DataTable
            columns={newCol}
            data={newData}
            pagination
        />
    );
};

export default Table