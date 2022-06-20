import React, { useState } from 'react'
import readXlsxFile from 'read-excel-file'
import { DocumentIcon } from '@heroicons/react/solid'

function ImportExcel({ updateData, incrementPhase, schema }) {

    const [file, setFile] = useState('')

    const [loading, setLoading] = useState(false)

    const [fileName, setFileName] = useState('')

    const [error, setError] = useState('')


    const handleSumbit = (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(file);
        readXlsxFile(file).then((rows) => {
            console.log(rows);
            const columns = rows[0]
            const data = rows.slice(1)
            if(columns.length > 7) {
                console.log(columns);
                console.log(data);
                updateData({ columns, data })
                incrementPhase()

            } else {
                setError('Le fichier doit contenir au moins 7 colonnes')
            }
            

        }).catch((err) => {
            console.log(err);
            setError("Erreur lors de l'import du fichier")
        })
        .finally(() => {
            setLoading(false)
        })
    }
  return (

            <form
                onSubmit={handleSumbit}
            >
                <div className="flex flex-col items-center">
                    {
                        JSON.stringify(schema) !== '{}'
                    }
                    <div className="bg-gray-200 w-full py-4 rounded-t-md border border-gray-300 shadow-lg">
                        <h4 className="ml-4 font-medium text-gray-600">Importer une liste des organisations</h4>
                    </div>
                    <div className="bg-white w-full py-6 border border-gray-300 flex items-center justify-around">
                    <label className="text-gray-500 text-sm font-bold mb-2 ml-8" htmlFor="file">Sélectionner votre fichier{' '}<span className="text-red-400">*</span></label>
                    <div className="flex flex-col items-center  pl-4 h-12 mr-8">
                    <div className="flex items-center  border border-gray-300 pl-4 pt-2 pb-2">
                    <span><DocumentIcon className="h-7 w-7 text-gray-600 mr-4" /> </span>
                    <div className="overflow-hidden  flex  items-center relative w-full justify-end">
                                                <p className="h-full w-56">{fileName}</p>

                        <div className="ml-8 relative flex items-center w-full ">
                        <button type="button" className="w-full absolute right-2 text-center h-12 bg-gray-200 font-bold text-gray-500 hover:cursor-pointer">CHOISISSEZ UN FICHIER</button>
                    <input className="abolute opacity-0 w-full h-full left-0 hover:cursor-pointer text-gray-700 focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="file"
                            type="file" 
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"

                            onChange={(e) => {
                                setFile(e.target.files[0])
                                setFileName(e.target.files[0].name)
                            }}
                    />
                        </div>
                        
                    </div>
                    </div>

                        <div className="flex justify-end w-full mr-4">
                        {
                            error ?
                            <div className="text-red-500 text-sm italic font-bold">{error}</div>
                            :
                            null
                        }
                        </div>
                    </div>
                    
                   
                                        
                    </div>
                    <div className="flex w-full items-center justify-end bg-gray-200 border border-gray-300 pb-4 rounded-b-md shadow-lg">
                    <button
                    disabled={loading || !file}
                    className="mt-4 disabled:bg-blue-400 shadow-lg bg-blue-500 hover:bg-blue-700 mr-4 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">
                        {loading ? 
                        <div>
          <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin mb-1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>
          Chargement...
        </div> : 'ETAPE SUIVANTE' }
                    </button>
                    </div>
                </div>
            </form>
        
  )
}

export default ImportExcel