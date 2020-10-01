import React from 'react'
export default ()=>{
    return (
    <div className = "more-info">
   <div>
     <h1>We Will Like To Hear From You:</h1>
     
      <p><span>Name:</span><input type = "text" /></p>
      <p><span>Tel:</span><input type = "text" /></p>
      <p><span>Email:</span><input type = "text" /></p>
      <p><span>Plan</span>
        <select >
          <option value = "Basic">
            Basic
          </option>
            <option value = "Prestige">
              Prestige
            </option>
            <option value = "Custom">
              Custom
            </option>
        </select></p>
      <button>Submit</button>

   </div>
    
  </div>
    )
}