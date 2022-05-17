import { Loading, Table } from '../../components'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


const MyTable = () => {

    const { getSheetsData, isLoading, gTableData } = useAppContext()

    useEffect(() => {
        getSheetsData()
    }, [])

    const { values } = gTableData


    if (isLoading) {
        return <Loading center />
    }



    return (
        <Wrapper>
            this is going to be table
            <Table />
        </Wrapper>
    )

}

export default MyTable;