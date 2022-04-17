import { Loading, Table } from '../../components'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


const MyTable = () => {

    const { getSheetsData, isLoading } = useAppContext()

    useEffect(() => {
        getSheetsData()
    }, [])

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