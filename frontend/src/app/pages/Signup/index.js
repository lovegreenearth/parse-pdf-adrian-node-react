import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from '../../utils/UserContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import contant from '../../utils/constant';

const Signin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState("");

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    if(!displayName) {
      alert("User Name is required!")
      return ;
    }
    if(!email) {
      alert("Email is required!")
      return ;
    }
    if(!password) {
      alert("Password is required!")
      return ;
    }
    if(!passwordCheck) {
      alert("Confirm Password is required!")
      return ;
    }
    

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post(contant.BACKEND_URL + "/users/register", newUser);
      const loginRes = await Axios.post(contant.BACKEND_URL + "/users/login", {
        email,
        password,
      });
      
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("role", loginRes.data.user.role);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      alert(err.response.data.msg)
    }
  };

  return (
      <div className="signin-page">
        <div className="signin-form"> 
          <div className="page-title">Sign Up</div>
          <div className="form-group">
            <Input name="username" type="text" placeholder="User Name *" onChange={setDisplayName} />
            <Input name="email" type="email" placeholder="Email *" onChange={setEmail} />
            <Input name="password" type="password" placeholder="Password *" onChange={setPassword} />
            <Input name="confirmpassword" type="password" placeholder="Confirm Password *" onChange={setPasswordCheck} />
            <Button field="Sign Up" onClick={submit} />
          </div>
        </div>
      </div>
  );
}

export default Signin;