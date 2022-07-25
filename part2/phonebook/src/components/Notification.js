const notificaton =  ({message, messageClass}) => {
    if(message === null){
      return null
    }
  
    return(
      <div className={messageClass}>
        {message}
      </div>
    )
}

export default notificaton