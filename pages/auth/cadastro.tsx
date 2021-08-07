import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Lottie from "react-lottie";
import background from "public/lottie/businessteam.json";
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { api } from 'services/api' 
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles';

import {Division, Container, LeftSide, RightSide, Hr, DownSide, ButtonGroup, Gap} from './styles-cadastro';

// layout for page
import User from "layouts/User";
//import { sha512 } from 'js-sha512';

const useStyles = makeStyles((theme) => ({
  realizeSeuCadastro: {
    color: '#2265FF',
    fontWeight: 900,
    fontSize: '32px',
    textTransform: 'uppercase',
    fontStyle: 'italic',
    letterSpacing: '0.05em',
  },
  preenchaSeusDados: {
    fontWeight: 600,
    letterSpacing: '3px',
    color: '#666666'
  }

}));

export default function Dashboard() {
  const styles = useStyles();
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const handleClickShowPassword = (field) => {
    field === 'password' ? setShowPassword(!showPassword) : setConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function validaCamposCadastro(data){
    console.log(data);

    if(data.name === '' && (data.email === undefined || data.email === '')){
      enqueueSnackbar('Preencha todos os campos!',{variant: 'error',});
    }else{
      if(data.password.length > 0 && data.confirmPassword.length > 0){
        if(data.password === data.confirmPassword){
          save(data);
        } else {
          enqueueSnackbar('As senhas não coincidem!',{variant: 'error',});
        }
      }else{
        enqueueSnackbar('Preencha os campos de senha!',{variant: 'error',});
      }
    }
  }
  
  async function save(data) {
    try {
      console.log(data)
      //const dados = { ...data, password: sha512(data.password)}
      const dados = { ...data, password: data.password}
      await api.post('/users',dados)
      enqueueSnackbar('Cadastro realizado com sucesso.',{variant: 'success',});
      Router.push('/auth/login');
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Problema ao salvar',{variant: 'error',});
    }
  }

  return (
    <User>
      <form id="formCadastroUsuario" noValidate onSubmit={handleSubmit(validaCamposCadastro)}>
        <Division>
          <Container >
            <LeftSide >
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: background,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
              />
            </LeftSide>

            <RightSide>
              <Grid container spacing={3}>
                <Grid item sm={12}>
                  <Typography className={styles.preenchaSeusDados} variant="h6">Cadastre-se</Typography>
                </Grid>
                <Grid item sm={12}>
                  <TextField {...register('name')} variant="outlined" margin="normal" required
                    fullWidth id="name" label="Nome" name="name" autoFocus/>
                </Grid>
                <Grid item sm={12}>
                  <TextField {...register('email')} variant="outlined" margin="normal" required
                    fullWidth id="email" label="Email" name="email" autoComplete="email" />
                </Grid>
                <Grid item sm={12}>
                  <TextField {...register('password')} variant="outlined" margin="normal" required
                    fullWidth id="password" label="Senha" name="password" autoComplete="email"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={() => {handleClickShowPassword('password')}}
                            onMouseDown={handleMouseDownPassword} >
                            {showPassword ? ( <Visibility /> ) 
                            :
                            ( <VisibilityOff /> )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField {...register('confirmPassword')} variant="outlined" margin="normal" required
                    fullWidth id="confirmPassword" label="Confirme a senha senha" name="confirmPassword" autoComplete="email"
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={() => {handleClickShowPassword('confirmPassword')}}
                            onMouseDown={handleMouseDownPassword} >
                            {showConfirmPassword ? ( <Visibility /> ) 
                            :
                            ( <VisibilityOff /> )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </RightSide>
            <Hr />
            <DownSide>
              <ButtonGroup>
                <Button fullWidth variant="contained" color="secondary" onClick={() => Router.push('/auth/login')} style={{fontWeight: 600,color: '#555',letterSpacing: '3px',height: '40px',fontSize: '12px', padding: '4px'}}>
                  Voltar
                </Button>
                <Gap />
                <Button type="submit" fullWidth variant="contained"  color="primary" style={{fontWeight: 600,color: '#fff',letterSpacing: '3px',fontSize: '12px', padding: '4px',height: '40px'}} >
                  Confirmar
                </Button>
              </ButtonGroup>
            </DownSide>
          </Container>
        </Division>
      </form>
    </User>
  );
}
