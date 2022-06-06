import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext()

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   password2: ''
  // })

  // const { name, email, password, password2 } = formData



  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }



  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      })
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      })
    }
  }


  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault()
  // }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )

  // return <>
  //   <Wrapper className='full-page'>
  //     <section className='heading'>
  //       <h1>
  //         <FaUser></FaUser> Regiser
  //       </h1>
  //       <p>Please create an account</p>
  //     </section>

  //     <section>
  //       <form onSubmit={onSubmit} className='form'>
  //         <div className="form-group">
  //           <FormRow type="text"
  //             className="form-control"
  //             id='name'
  //             name='name'
  //             value={name}
  //             placeholder='Enter your name'
  //             handleChange={onChange} />
  //         </div>
  //         <div className="form-group">
  //           <FormRow type="email"
  //             className="form-control"
  //             id='email'
  //             name='email'
  //             value={email}
  //             placeholder='Enter your email'
  //             handleChange={onChange} />
  //         </div>
  //         <div className="form-group">
  //           <FormRow type="passsword"
  //             className="form-control"
  //             id='password'
  //             name='password'
  //             value={password}
  //             placeholder='Enter your password'
  //             handleChange={onChange} />
  //         </div>
  //         <div className="form-group">
  //           <FormRow type="password"
  //             className="form-control"
  //             id='password2'
  //             name='password2'
  //             value={password2}
  //             placeholder='Confirm password'
  //             handleChange={onChange} />
  //         </div>
  //         <div className="form-group">

  //           <button type="submit" className='btn btn-block'>
  //             Submit
  //           </button>
  //         </div>
  //       </form>
  //     </section>
  //   </Wrapper>
  // </>
}
export default Register
