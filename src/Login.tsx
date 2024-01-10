import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface LoginProps {
  onLogin: (isLoggedIn: boolean) => void;
  onSetUserName: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSetUserName }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        if (password === '1234') {
            onLogin(true);
            onSetUserName(username);
        } else {
            alert('Contraseña incorrecta');
        }
    };

    return (
        <div>
            <h1 className="welcome-login">Student Management</h1>
            <div className="login-box">
                <TextField
                    type="text"
                    placeholder="User (any is valid)"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
                <p></p>
                <TextField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <p></p>
                <Button variant="outlined" color="success" onClick={handleLogin}>Login</Button>
            </div>
            <div className='copyright-instructions'>
                <h4 className="instructions">(Password: 1234)</h4>
                <h3 className="instructions">Student Management Web App © 2024 by Carlos Medina & Roberto García is licensed under Attribution-NonCommercial 4.0 International</h3>
            </div>
        </div>
    );
};

export default Login;
