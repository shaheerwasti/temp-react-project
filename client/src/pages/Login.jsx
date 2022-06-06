import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'


const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password, } = formData


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return <>
    <Wrapper className='full-page'>
      <section className='heading'>
        <h1>
          <FaSignInAlt></FaSignInAlt> Login
        </h1>
        <p>Please enter your credentials to login</p>
      </section>

      <section>
        <form onSubmit={onSubmit} className='form'>
          <div className="form-group">
            <FormRow type="email"
              className="form-control"
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              handleChange={onChange} />
          </div>
          <div className="form-group">
            <FormRow type="passsword"
              className="form-control"
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              handleChange={onChange} />
          </div>
          <div className="form-group">
            <button type="submit" className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </Wrapper>
  </>
}
export default Login
