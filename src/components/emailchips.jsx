import React, { useState } from 'react'
import './chipsCss/emailchips.css'
export default function Chips(props) {
    
  const {handleChange,handleDelete,handleKeyDown,chipsvalue} = props
  
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div className='wrapper'>
                    {chipsvalue.chips?.map((email, id) => <div key={id}
                       style={{ display: "flex ",height:'auto', backgroundColor: "lightgray",fontSize:'10px', padding: "2px", gap: "2px", borderRadius: "8px" }}>
                        {email}
                        <button
                        oncop
                        style={{ border: "none", backgroundColor: 'white', borderRadius: "10px" }}
                            type="button"
                            onClick={() => handleDelete(email)}>
                            &times;
                        </button>
                    </div>)}
                    <input type='text' placeholder='Enter Emails...' style={{ border: "none", width: "100%" }}
                        value={chipsvalue.val}
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
            </div>
        </>
    )
}
