import React from 'react'



function Final() {

 


  return (
    <div> 
                <div className="flex flex-col items-center">
                    
                    <div className="bg-gray-200 w-full py-8 rounded-t-md border border-gray-300 shadow-lg">
                    </div>
                    <div className="bg-white w-full py-6 border border-gray-300 pl-8">
                        
                        <div className="border w-64 border-gray-200 rounded-sm p-4 shadow-md mx-4 my-4">
                            <div className="flex flex-col items-center justify-between">
                                <h2 className="font-bold text-6xl text-curr">0</h2>
                                <h4 className="mx-8 text-center mt-4 font-thick text-lg">Total des clients importés</h4>
                            </div>
                        </div>
                        
                    
                    </div>
                    <div className="flex w-full items-center justify-end bg-gray-200 border border-gray-300 pb-4 rounded-b-md shadow-lg">
                   
                    <button
                    className="mt-4 disabled:bg-blue-400 shadow-lg bg-blue-500 hover:bg-blue-700 mr-4 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">
                        RETOUR À LA LISTE DES CLIENTS
                    </button>
                    
                    </div>
                </div>
            </div>
  )
}

export default Final