import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { Form,FloatingLabel,Button } from 'react-bootstrap';
import instance from '../../../utils/axios';



const Register = () => {

  const userSchema = yup.object().shape({
    fullName : yup.string().required("Required field").min(4,"Full name must be atleast 4 characters"),
    email: yup.string().required("Required field").email("Please enter a valid email"),
    password:yup.string().required("Required field").min(5,"Password must be atleast 5 characters").max(16)
  })
  
  const {handleSubmit,register, formState:{errors}} = useForm({
    resolver:yupResolver(userSchema)
  });
  const formSubmit = (data) =>{
    console.log(data)
    instance.post('http://localhost:5000/api/v1/userRegister',data)
  }
  return (
    <div className='container col-md-4 px-5 mt-5'>
      <h3 className='text-center mt-4 mb-3 '>SIGN IN</h3>
      <Form onSubmit={handleSubmit(formSubmit)}>

      <FloatingLabel controlId="floatingFullname"  label="Full Name" className="mb-3">
       <Form.Control type="text" placeholder="Full Name"  {...register("fullName")} />
       <p className='text-danger'>{errors.fullName?.message}</p>
      </FloatingLabel>

      <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3" >
      <Form.Control type="email" placeholder="name@example.com"  {...register("email")} />
      <p className='text-danger'>{errors.email?.message}</p>
      </FloatingLabel>
      
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
        <Form.Control type="password" placeholder="Password" {...register("password")}/>
        <p className='text-danger'>{errors.password?.message}</p>
      </FloatingLabel>
      
      <Button type="submit" variant='info' className='mb-4 text-white'>SIGN IN</Button>

      </Form>
    
    </div>
  );
}

export default Register;
