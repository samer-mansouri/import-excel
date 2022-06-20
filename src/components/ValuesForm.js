import React, { useState } from 'react'
import {
    EyeIcon,
    EyeOffIcon
} from '@heroicons/react/solid'


function ValuesForm({ currentPhase, incrementPhase, decrementPhase, selectOption, mainPassword }) {

    const [inputsNumber, setInputsNumber] = useState(0)

    const [type, setType] = useState('password')

    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
         if(inputsNumber == 1) selectOption(1)
         else if(inputsNumber == 2) selectOption(2)
         else if(inputsNumber == 3) {
             selectOption(3)
             mainPassword(password)
         }
        incrementPhase()
    }

  return (
    <form onSubmit={handleSubmit}> 
                <div className="flex flex-col items-center">
                    
                    <div className="bg-gray-200 w-full py-4 rounded-t-md border border-gray-300 shadow-lg">
                        <h4 className="ml-4 font-medium text-gray-600">Sélectionner le mode d'attribution des mot de passes</h4>
                    </div>
                    <div className="bg-white w-full py-6 border border-gray-300 pl-8">
                        <div className="block">
                        <input className="mr-1 cursor-pointer h-4 w-4" type="radio" name="inputsNumber" value="1" onChange={
                            (e) => {setInputsNumber(1); setPassword(''); setPasswordErr(false)}
                            }  />
                        <label className="text-gray-500 text-md font-bold mb-2" htmlFor="inputsNumber">Utiliser les nom d'utilisateurs</label>
                        </div>
                        <div className="block mt-2">
                        <input className="mr-1 cursor-pointer h-4 w-4" type="radio" name="inputsNumber" value="2" onChange={
                            (e) => {setInputsNumber(2); setPassword(''); setPasswordErr(false)}
                            }  />
                        <label className="text-gray-500 text-md font-bold mb-2" htmlFor="inputsNumber">Générer des mot de passes aléatoirement</label>
                        </div>
                        <div className="flex items-center justify-between">
                        <div className="block mt-2">
                        <input className="mr-1 cursor-pointer h-4 w-4" type="radio" name="inputsNumber" value="3" onChange={
                            (e) => {setInputsNumber(3); setPassword(''); setPasswordErr(false)}
                            } />
                        <label 
                        className="text-gray-500 text-md font-bold mb-2" htmlFor="inputsNumber">Attribuer un mot de passe pour tout les utilisateurs</label>
                        </div>

                        {
                            inputsNumber == 3 ?
                            <>
                            <div className="mt-4 flex flex-col mr-8">
                            <div className="relative flex items-center">
                            <input 
                            type={type}
                            className={`bg-gray-200  pl-4 pr-16 py-2  mr-8  rounded-md border border-gray-300" placeholder="Mot de passe`}
                             value={password}
                              onChange={(e) => {
                                  setPassword(e.target.value)
                                 if(e.target.value.length < 6) setPasswordErr(true)
                                    else setPasswordErr(false)
                                }
                             } />
                             {
                                 type === 'password' ?
                                 <EyeIcon className="absolute  top-0.5 right-8 mr-4 mt-2 h-6 w-6 text-gray-500 cursor-pointer" 
                                onClick={() => {
                                    if(type == 'password') {
                                        setType('text')
                                    }
                                    else {
                                        setType('password')
                                    }
                                    
                                }}
                             /> 
                                : <EyeOffIcon className="absolute  top-0.5 right-8 mr-4 mt-2 h-6 w-6 text-gray-500 cursor-pointer" 
                                onClick={() => {
                                    if(type == 'password') {
                                        setType('text')
                                    }
                                    else {
                                        setType('password')
                                    }
                                    
                                }}
                             /> 
                             }
                            </div>
                             <>
                        {
                            passwordErr ?
                            <div className="text-red-500 text-sm italic mt-1 font-bold"> Le mot de passe doit contenir au moins 6 caractères</div>
                            :
                            null
                        }
                        
                        </>
                        </div> 
                        
                            </>
                        : ''
                        }
                        </div>
                        
                    
                    </div>
                    <div className="flex w-full items-center justify-between bg-gray-200 border border-gray-300 pb-4 rounded-b-md shadow-lg">
                    <button
                    onClick={() => decrementPhase()}
                    className="mt-4 disabled:bg-blue-400 shadow-lg bg-blue-500 hover:bg-blue-700 ml-4 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">
                        ETAPE PRÉCÉDENTE
                    </button>
                    <button
                    disabled={inputsNumber === 0 || inputsNumber === 3 && password.length === 0 || passwordErr}
                    className="mt-4 disabled:bg-blue-400 shadow-lg bg-blue-500 hover:bg-blue-700 mr-4 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">
                        ETAPE SUIVANTE
                    </button>
                    
                    </div>
                </div>
            </form>
  )
}

export default ValuesForm