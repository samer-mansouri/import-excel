import React, { useState } from 'react'
import ImportExcel from '../components/ImportExcel';
import ImportPhase from '../components/ImportPhase';
import ShowTableData from '../components/ShowTableData';
import ValuesForm from '../components/ValuesForm';
import {
    ArrowLeftIcon
} from '@heroicons/react/outline';
import Final from '../components/Final';



function Main() {


    const [importPhase, setImportPhase] = useState(4)
    const [data, setData] = useState({})

    const [mainPassword, setMainPassword] = useState('')
    const [selectedOption, setSelectedOption] = useState('')

    

    

    const IncrementPhase = () => {
        setImportPhase(importPhase + 1)
    }


    const decrementPhase = () => {
        setImportPhase(importPhase - 1)
    }

    const updateData = (data) => {
        setData(data)
    }


  return (
    <div className="h-screen flex items-center justify-center">
        <div className="relative border border-solid bg-white boroder-gray-200 rounded-xs shadow-md mx-16 my-16 py-16 px-16">
          
        
            <ImportPhase 
                currentPhase={importPhase}
            />
            <hr />
            {
                importPhase === 2 ?
                <ValuesForm 
                    currentPhase={importPhase}
                    incrementPhase={IncrementPhase}
                    decrementPhase={decrementPhase}
                    selectOption={(value) => setSelectedOption(value)}
                    mainPassword={(value) => setMainPassword(value)}
                /> : null
            }
            {
                importPhase === 1 ?
                <ImportExcel
                updateData={updateData}
                incrementPhase={IncrementPhase}
                /> : ''
            }

            {
                importPhase === 3 ?
                <ShowTableData 
                rows={data.data}
                columns={data.columns}
                decrementPhase={decrementPhase}
                incrementPhase={IncrementPhase}
                mainPassword={mainPassword}
                selectedOption={selectedOption}
                /> : ''

            }

            {
                importPhase === 4 ?
                <Final /> : ''
            }
        
        </div>
    </div>
  )
}

export default Main