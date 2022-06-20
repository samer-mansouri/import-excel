import React from 'react'

function ImportPhase({ currentPhase }) {
  return (
    <div className="flex items-center justify-center mb-16">
        
        <div className="flex items-baseline justify-center">
        <div className="flex flex-wrap flex-col items-center justify-start">
            <div className={`h-24 w-24 border-4 rounded-full flex items-center justify-center  ${currentPhase > 1 ? 'border-succ' : 'border-curr'} transition duration-500 ease-in-out`}>
                <span className={`text-4xl ${currentPhase > 1 ? 'text-succ' : 'text-curr'  } `}>1</span>
            </div>
            <h3 className={`text-center ${currentPhase > 1 ? 'text-succ' : 'text-curr'  }  text-xl font-bold mt-2 transition duration-500 ease-in-out`}>ETAPE 1</h3>
            <h4  style={{maxWidth:"75px"}} className={`text-center ${currentPhase > 1 ? 'text-succ' : 'text-curr'  }  break-all truncate overflow-hidden  whitespace-normal
            	 max-w-xs font-medium mt-0.5 transition duration-500 ease-in-out`}>Sélection de fichier</h4>
            </div>
            <div className={`h-1 w-24 ${currentPhase > 1 ? 'bg-succ' : 'bg-curr'  } `}></div>
            <div className={`h-1 w-24 ${currentPhase > 2 ? 'bg-succ' : currentPhase == 2 ? 'bg-curr' : 'bg-gray-300 '  }`}></div>
            <div className="flex flex-wrap flex-col items-center justify-start">

            <div className={`h-24 w-24 border-4 rounded-full  ${currentPhase > 2 ? 'border-succ' : currentPhase == 2 ? 'border-curr' : 'border-gray-300 '  } flex items-center justify-center`}>
                <span className={`text-4xl ${currentPhase > 2 ? 'text-succ' : currentPhase == 2 ? 'text-curr' : 'text-gray-800 '  }`}>2</span>
            </div>
            <h3 className={`text-center ${currentPhase > 2 ? 'text-succ' : currentPhase == 2 ? 'text-curr' : 'text-gray-500 '  } text-xl font-bold mt-2`}>ETAPE 2</h3>
            <h4 className={`text-center ${currentPhase > 2 ? 'text-succ' : currentPhase == 2 ? 'text-curr' : 'text-gray-500 '  } text-sm font-medium mt-0.5`}>Configuration</h4>
            </div>
            <div className={`h-1 w-24 ${currentPhase > 2 ? 'bg-succ' : currentPhase == 2 ? 'bg-curr' : 'bg-gray-300 '  }`}></div>
            <div className={`h-1 w-24 ${currentPhase > 3 ? 'bg-succ' : currentPhase == 3 ? 'bg-curr' : 'bg-gray-300 '  }`}></div>
            <div className="flex flex-wrap flex-col items-center justify-start">
            <div className={`h-24 w-24 border-4 rounded-full  ${currentPhase > 3 ? 'border-succ' : currentPhase == 3 ? 'border-curr' : 'border-gray-300 '  } flex items-center justify-center`}>
                <span className={`text-4xl ${currentPhase > 3 ? 'text-succ' : currentPhase == 3 ? 'text-curr' : 'text-gray-800 '  }`}>3</span>
            </div>
            <h3 className={`text-center ${currentPhase > 3 ? 'text-succ' : currentPhase == 3 ? 'text-curr' : 'text-gray-500 '  } text-xl font-bold mt-2`}>ETAPE 3</h3>
            <h4 className={`text-center ${currentPhase > 3 ? 'text-succ' : currentPhase == 3 ? 'text-curr' : 'text-gray-500 '  } text-sm font-medium mt-0.5`}>Affectation</h4>
            </div>
            <div className={`h-1 w-24 ${currentPhase > 3 ? 'bg-succ' : currentPhase == 3 ? 'bg-curr' : 'bg-gray-300 '  }`}></div>
            <div className={`h-1 w-24 ${currentPhase > 4 ? 'bg-succ' : currentPhase == 4 ? 'bg-curr' : 'bg-gray-300 '  }`}></div>
            <div className="flex flex-wrap flex-col items-center justify-start">
            <div className={`h-24 w-24 border-4 rounded-full  ${currentPhase > 4 ? 'border-succ' : currentPhase == 4 ? 'border-curr' : 'border-gray-300 '  } flex items-center justify-center`}>
                <span className={`text-4xl ${currentPhase > 4 ? 'text-succ' : currentPhase == 4 ? 'text-curr' : 'text-gray-800 '  }`}>4</span>
            </div>
            <h3 className={`text-center ${currentPhase > 4 ? 'text-succ' : currentPhase == 4 ? 'text-curr' : 'text-gray-500 '  } text-xl font-bold mt-2`}>ETAPE 4</h3>
            <h4 className={`text-center ${currentPhase > 4 ? 'text-succ' : currentPhase == 4 ? 'text-curr' : 'text-gray-500 '  } text-sm font-medium mt-0.5`}>Fin</h4>
            </div>
            <hr />

        </div>
    </div>
  )
}

export default ImportPhase