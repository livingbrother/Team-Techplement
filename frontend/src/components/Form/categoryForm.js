import react from 'react'

const categoryFrom = ({ handlesubmit, value, setvalue }) => {
    return(
        <>
    <form onsubmit = {handlesubmit}>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder = 'Enter new category' 
    value = {value} 
    onchange = {(e) => setvalue(e.target.value)}
    />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

        </>
    )
}
export default categoryFrom