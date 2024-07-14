const ErrorDraw=({show,error})=>{
    return(
        <>
           {show && <p>{error}</p>}
        </>
    )
}

export default ErrorDraw;