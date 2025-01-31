import cl from './ErrorPage.module.css'
import { NavLink } from 'react-router'

function ErrorPage() {
  return (
    <div className={cl.wrapper}>
        <h3>Ooops...  404!</h3>
        <h6>It looks like you've come to nowhere....</h6>
        <h6>Return to Home page - <NavLink to='/'>Back to the Future!</NavLink> </h6>
    </div>
  )
}

export default ErrorPage