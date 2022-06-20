import React from 'react'

function Selectors({ columns, form, updateForm, renderFromAutomated, schemas}) {

    const [rerender, setRerender] = React.useState(false)


    React.useEffect(() => {
        console.log("Re-rendering Selectors");

    }, [rerender])

  return (
    <>
     { !renderFromAutomated ?
                        <>
                        {columns.map((c,i) => (
                            <td key={i}>
                        <select className="bg-gray-200 w-full py-2 border border-gray-300 shadow focus:border-gray-400"
                            onChange={(e) => {
                              console.log(e.target.value)
                              updateForm(e.target.value, i); 
                              setRerender(!rerender)
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
                              setRerender(!rerender)

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
}
    </>
  )
}

export default Selectors