import React from 'react'
import {
    CheckIcon,
    InformationCircleIcon
} from '@heroicons/react/solid'
import Selectors from './Selectors'
import axios from 'axios'


function ShowTableData({ columns, rows, decrementPhase, incrementPhase, mainPassword, selectedOption }) {

    console.log(mainPassword, selectedOption)

    const [form, setForm] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [precision, setPrecision] = React.useState('')
    const [showInfo, setShowInfo] = React.useState(false)
    const [renderFromAutomated, setRenderFromAutomated] = React.useState(false)
    const [correspandanceErr, setCorrespandanceErr] = React.useState(false)
    const [completeErr, setCompleteErr] = React.useState(false)

    

    const pushToArray = (value) => {
        setForm([...form, value ])
    }

    let schemas = [
        {
            name: 'client',
            columns: [
                'Nom',
                'Prenom',
                'CIN',
                'Email',
                'username',
                'tel',
                'RS'
            ],
        },
    ]

    const checkComplete = () => {
        let complete = true
        schemas[0].columns.map((column,index) => {
            if(!form.includes(column)){
                complete = false
            }
        })
        return complete
    }



    const updateForm = (value, index) => {
        //let newForm = [...form]
        let newForm = form
        newForm[index] = value
        setForm(newForm)
        console.log(form)
        setRenderFromAutomated(false)
        
    }

    const anotherUpdateForm = (value, index) => {
        let newForm = form
        newForm[index] = value
        setForm(newForm)
    }

    const deleteFromForm = (value) => {
        let newForm = form
        // newForm = newForm.filter(item => item !== value)
        // setForm(newForm)
        delete newForm[newForm.indexOf(value)]
        console.log(value, newForm);
        setForm(newForm)
    }

    // const updateArea = (e, lang, index) => {
    //     const updatedAreas = [...areas];
    //     updatedArea[index][lang] = e.target.value;
    //     setAreas(updatedAreas);
    //   }
      

    //Faire la correspandance entre les inputs et les données du tableau
    const correspondanceBetweenFormAndRows = () => {

        let correspondanceTab = []

        rows.forEach((row, index) => {
            let usr = {}
            form.forEach((value, i) => {
                usr[value] = row[i]
            })
            correspondanceTab.push(usr)
        })

        correspondanceTab.forEach((usr, index) => {
            Object.keys(usr).forEach((key, i) => {
                if(!usr[key] || key === '' || correspondanceTab[index][key] === undefined) {
                    delete correspondanceTab[index][key]
                }
            })
        })



        return correspondanceTab
    }


    const autoAffect = () => {
        //let flag = false;

        setForm([])
        for (let i = 0; i < columns.length; i++) {
            console.log("executed");
            setForm(prevState => [...prevState, ''])
        }
        
        let correspondanceTab = []
        columns.forEach((column, index) => {
            let compStr = column.substring(0, precision)
            console.log(compStr)
            schemas[0].columns.forEach((schema, i) => {
                if(schema.substring(0, precision).toLowerCase() === compStr.toLowerCase()) {
                    console.log(schema, column, compStr);
                    correspondanceTab.push([column, i]);
                }
                else {
                    console.log("Not the same")
                }

                })
            })
            if(correspondanceTab.length > 0) {
                setCorrespandanceErr(false)
                console.log(correspondanceTab);
                let finalCorrespondance = []
                rows.forEach((row, index) => {
                    let usr = {}
                    correspondanceTab.forEach((value, i) => {
                        usr[value[0]] = row[value[1]]
                        deleteFromForm(value[0])
                        anotherUpdateForm(value[0], value[1])
                        setRenderFromAutomated(true)
                        
                    })
                    finalCorrespondance.push(usr)
                })
                console.log(finalCorrespondance);
                console.log(form);
        } else {
            setCorrespandanceErr(true)
        }
        
            
    }

    const resetForm = () => {
        setForm([])
        for (let i = 0; i < columns.length; i++) {
            setForm(prevState => [...prevState, ''])
        }
        console.log(form);
    }

    const sendData = () => {
        
        if(checkComplete()) {
            setCompleteErr(false)
            setLoading(true)
            let newData = correspondanceBetweenFormAndRows()


        let data = []
        if(selectedOption === 1) {
            newData.map((usr, index) => {
                let user = {...usr, password: usr.username }
                data.push(user)
            })
            console.log(data);
        } else if (selectedOption === 2) {
            newData.map((usr, index) => {
                let user = {...usr, password: '' }
                data.push(user)
            })
            console.log(data);
        } else if (selectedOption === 3) {
            newData.map((usr, index) => {
                let user = {...usr, password: mainPassword }
                data.push(user)
            })
            console.log(data);
        }

        axios.post('http://localhost:5000/api/users/add', JSON.stringify(data))
        .then(res => {
            console.log(res.data);
            incrementPhase()
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })

    
        // let arrayToSend = []
        // data.forEach((usr, index) => {
        //     let user = []
        //     Object.keys(usr).forEach((key, i) => {
        //         user.push(usr[key])
        //     })
        //     arrayToSend.push(user)
        
        // })
        // console.log(arrayToSend);
        
        // let arrays = []

        // let k = 0;

        // for(let i=0; i<form.length; i++) {
        //     if(form[i] !== ''){
        //         k++
        //     }
        // }

        // for(let i=0; i<k; i++) {
        //     let array = []
        //     for(let j=0; j<arrayToSend.length; j++) {
        //         console.log(arrayToSend[j][i]);
        //         array.push(arrayToSend[j][i])
        //     }
        //     arrays.push(array)
        // }

        // console.log(arrays);

        // var formdata = new FormData();
        // formdata.append("Nom", arrays[0]);
        // formdata.append("Prenom", "samer");
        // formdata.append("CIN", "234223");
        // formdata.append("Email", "samer@gmail.com");
        // formdata.append("username", "samersamer@gmail.com");
        // formdata.append("tel", "12345678");
        // formdata.append("RS", "samer");
        // formdata.append("password", "12345678");
        // formdata.append("id", "1");
        } else {
            setCompleteErr(true)
        }

        
    }

    

    React.useEffect(() => {
        setForm([])
        for (let i = 0; i < columns.length; i++) {
            console.log("executed");
            setForm(prevState => [...prevState, ''])
        }
    

    }, []);
    

    
    
  return (
      <>
      <div className="bg-gray-200 w-full py-4 rounded-t-md border border-gray-300 shadow-x-lg shadow-t-lg">
                        <h4 className="ml-4 font-medium text-gray-600">Sélectionner les champs de la base de données</h4>
        </div>
        <div className="border-l relative border-r border-l-gray-300 border-r-gray-300 shadow-lg py-4 px-4  flex items-center justify-between">
            <div>
            <p className="flex items-center"><CheckIcon className="h-5 w-5 text-green-500 mr-1" /> La première ligne de votre fichier contient-elle les noms des colonnes
            <InformationCircleIcon className="h-5 w-5 text-blue-500 ml-1 cursor-pointer" 
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
            />
            </p>
            {
                showInfo ?
                <div className="absolute bg-white z-50 w-96 py-3 px-3 rounded-lg shadow-lg border left-96">
                        Ci-dessous, vous pouvez faire la correspondance entre les colonnes présentes dans le fichier que vous importez, et les colonnes présentes dans la structure de la campagne. Si vous
souhaitez omettre une colonne de votre fichier, vous pouvez laisser le champs de correspondance vide.
            </div> : ''
            }
            <div className="flex items-center mt-3  ml-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                    disabled={precision === ''}
                    onClick={() => {
                        autoAffect()
                    }}
                >Affectation automatique</button>
                <p className="ml-4 text-gray-600">Précision</p>
                <select className="ml-4" onChange={(e) => {setPrecision(e.target.value); console.log(precision)}}>
                    <option value="">Sélectionner</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                </select>
            </div>
            {
                correspandanceErr ?
                <div className="text-red-500 text-sm italic mt-1 font-bold  flex justify-start ml-4">Acune correspandance n'est trouvée</div> : ''
            }
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3"
            onClick={() => resetForm()}
            >
                RESET
            </button>

            
            
        </div>
       
        
    <div className="h-80 overflow-auto shadow-l-lg shadow-r-lg">
        
   
        
        <table className="table-auto w-full h-96  bg-white  border border-gray-300 shadow-lg ">
        
            <thead className="text-center text-white bg-gray-400 sticky top-0">
                <tr>
                    {columns.map((column,index) => (
                        <th key={index} className="px-4 py-2">{column}</th>
                    ))}
                </tr>
            </thead>
            

            <tbody className="">

                <tr className="sticky top-10">
                    <Selectors
                        columns={columns}
                        form={form}
                        updateForm={updateForm}
                        renderFromAutomated={renderFromAutomated}
                        schemas={schemas}
                    />
                    {/* { !renderFromAutomated ?
                        <>
                        {columns.map((c,i) => (
                            <td key={i}>
                        <select className="bg-gray-200 w-full py-2 border border-gray-300 shadow focus:border-gray-400"
                            onChange={(e) => {
                              console.log(e.target.value)
                              updateForm(e.target.value, i); 
                            }}
                            //value={form[i] ? form[i] : 'Sélectionner'}
                        >
                        <option value={form[i] ? form[i] : ''}>{form[i] ? form[i] : 'Sélectionner'}</option>
                    {schemas[0].columns.map((column,index) => (
                         <option key={index} className="px-4 py-2" value={column}
                         disabled={form.includes(column)}
                         >{column}</option> 
                        
                        
                    ))}
                     </select>   

                    </td>
                        ))
                    }
                        </> :
                        <>
                        {columns.map((c,i) => (
                            <td key={i}>
                        <select className="bg-gray-200 w-full py-2 border border-gray-300 shadow focus:border-gray-400"
                            onChange={(e) => {
                              console.log(e.target.value)
                              updateForm(e.target.value, i); 
                            }}
                            value={form[i] ? form[i] : ''}
                        >
                        <option value={form[i] ? form[i] : ""}>{form[i] ? form[i] : "Sélectionner"}</option>
                    {schemas[0].columns.map((column,index) => (
                         <option key={index} className="px-4 py-2" value={column}
                         disabled={form.includes(column)}
                         >{column}</option> 
                        
                        
                    ))}
                     </select>   

                    </td>
                        ))
                    }
                        </> 
} */}
                </tr>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border px-4 py-2">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    <div className="flex w-full items-center justify-between bg-gray-200 border border-gray-300 pb-8 rounded-b-md shadow-lg">
                     <button
                            onClick={() => decrementPhase()}
                            className="mt-4 disabled:bg-blue-400 shadow-lg bg-blue-500 hover:bg-blue-700 ml-4 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">
                                ETAPE PRÉCÉDENTE
                    </button>
                    <div className="relative">
                    <button
                    onClick={() => sendData()}
                    disabled={loading}
                    className="mt-4 mb-2 disabled:bg-blue-400 shadow-lg bg-blue-500 hover:bg-blue-700 mr-4 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">
                        {loading ? 
                        <div>
          <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin mb-1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>
          Chargement...
        </div> : 'ETAPE SUIVANTE' }
                    </button>
                    {
                        completeErr ?
                        <div className="text-red-500 text-sm w-60 italic  font-bold absolute right-0.5 ">Vous devez remplir tous les champs</div> :
                        null
                    }
                    </div>
                    </div>
            {/* <button 
            onClick={() => {
                //console.log(form)
                //console.log(correspondanceBetweenFormAndRows())
                sendData()
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">TEST</button> */}
       

</>
  )
}

export default ShowTableData