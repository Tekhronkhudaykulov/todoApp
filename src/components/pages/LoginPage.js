import React, {useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { setProfile } from '../../store/actions/profile';

const LoginPage = ({setProfile}) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try{
      setIsLoading(true)
        const res = await axios.post('https://api-nodejs-todolist.herokuapp.com/user/login', values);
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
        setProfile(res.data);
        history.push('/home');
    }catch (e) {

    }finally{
      setIsLoading(false);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="loginContainer">
      <h1>Login</h1>
        <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
         <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type:'email',
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: false,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {
            isLoading ? <ReactLoading width={20} type="spinningBubbles" color={"red"} /> : "Submit"
          }
        </Button>
      </Form.Item>
      <div>
        <p>Akkauntingiz bolmasa royhatdan oting</p>
        <div className="login">
        <Link to={'/register'}>Register</Link>
        </div>
      </div>
    </Form>
    </div>
  );
};

const mapDispatchToProps = {
  setProfile
}


export default connect(null, mapDispatchToProps)(LoginPage);