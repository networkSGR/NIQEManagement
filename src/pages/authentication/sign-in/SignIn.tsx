import React, { useState, useEffect } from 'react';
import { Loader, Button, Panel, Stack, Form, Navbar } from 'rsuite';
import { useNavigate } from 'react-router-dom'; // For redirect
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'; //   For cookie handling
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'; // Custom hooks
import { login } from '@/redux/slices/authSlice';


interface DecodedToken {
  role: string;
  exp: number;
  iat: number;
}


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const auth = useAppSelector((state) => state.auth); // Access auth state to get tokens

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      await dispatch(login(email, password))
      
    } catch (error) {
      console.error('Login failed');
    } finally {
      setLoading(false); // Stop loading
      navigate('/dashboard');
    }
  };
  // Watch for changes in auth.isAuthenticated and act accordingly
  useEffect(() => {
    if (auth.isAuthenticated) {
      // Set the access and refresh tokens in cookies
      Cookies.set('accessToken', auth.accessToken, { expires: 1 });
      Cookies.set('refreshToken', auth.refreshToken, { expires: 7 });
      // Decode the accessToken to extract role

      if(auth.accessToken){
        try {
          const decodedToken = jwtDecode(auth.accessToken) as DecodedToken;
          const userRole = decodedToken.role; // Assuming the role is stored as `role`
          // Save the role in cookies for future use
          Cookies.set('userRole', userRole, { expires: 1 });
        } catch (error) {
          console.error("Failed to decode access token", error);
        }

      }

      // Redirect to dashboard
      navigate('/dashboard');
    }
  }, [auth.isAuthenticated, auth.accessToken, auth.refreshToken, navigate]); // Re-run when auth changes

  return (
    <>
    <Navbar appearance="inverse">
          <Navbar.Brand>Brand</Navbar.Brand>
    </Navbar>
    <Stack justifyContent="center" alignItems="center" direction="column" style={{ height: '100vh' }}>
      <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Sign In</h3>}>
        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Email address</Form.ControlLabel>
            <Form.Control name="email" value={email} onChange={setEmail} disabled={loading} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name="password" type="password" value={password} onChange={setPassword} disabled={loading} />
          </Form.Group>
          <Form.Group>
            <Button appearance="primary" onClick={handleLogin} disabled={loading}>
              {loading ? <Loader speed="slow" content="Signing you in..." /> : 'Sign in'}
            </Button>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
    </>
  );
};

export default SignIn;
