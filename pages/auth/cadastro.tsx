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
import background from "public/lottie/background.json";
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { api } from 'services/api' 
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles';

// layout for page
import User from "layouts/User";
import { sha512 } from 'js-sha512'

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
    fontWeight: 900,
    fontSize: '14px',
    textTransform: 'uppercase'
  }

}));

export default function Dashboard() {
  const styles = useStyles();
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function validaSenha(data){
    if(data.password === data.confirmPassword){
      save(data);
    } else {
      enqueueSnackbar('As senhas não coincidem!',{variant: 'error',});
    }
  }
  async function save(data) {
    try {
      console.log(data)
      const dados = { ...data, password: sha512(data.password)}
      await api.post('/users',dados)
      enqueueSnackbar('Cadastro realizado com sucesso.',{variant: 'success',});
      Router.push('/auth/login');
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Problema ao salvar',{variant: 'error',});
    }
  }

  return (
    <User title="Cadastro">
      <form  noValidate onSubmit={handleSubmit(validaSenha)}>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4  mt-10">
                  <div className="flex  py-4 lg:pt-4 pt-8">
                    <Grid container spacing={3}>
                      <Grid item sm={12}>
                        <Grid container>
                          <Grid item sm={12}>
                            <Typography className={styles.realizeSeuCadastro} variant="h6">Realize o seu cadastro!</Typography>
                          </Grid>
                          <Grid item sm={8} style={{padding: '20px'}}>
                            <div id="container" style={{position: 'relative'}}>
                              <div style={{ width: '100%',height:' 100%',zIndex: 10}}>
                                <Lottie
                                  options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: background,
                                    rendererSettings: {
                                      preserveAspectRatio: "xMidYMid slice",
                                    },
                                  }}
                                  height={500}
                                  width={850}
                                />
                              </div>
                            </div>
                          </Grid>

                          <Grid item sm={4}>
                            <Grid container spacing={3}>
                              <Grid item sm={12}>
                                <Typography className={styles.preenchaSeusDados} variant="h6">Preencha seus dados nos campos abaixo:</Typography>
                              </Grid>
                              <Grid item sm={12}>
                                <TextField {...register('name')} variant="outlined" margin="normal"
                                  required fullWidth id="name" label="Nome" name="name" autoFocus />
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
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
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
                                  fullWidth id="password" label="Confirme a senha senha" name="password" autoComplete="email"
                                  type={showPassword ? "text" : "password"}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
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
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sm={12}>
                        <Divider />
                      </Grid>
                      <Grid item sm={12}>
                        <Grid item sm={12}>
                          <Grid container spacing={3} justifyContent="flex-end" alignItems="flex-end">
                            <Grid item sm={2}>
                              <Button fullWidth variant="contained" color="secondary" onClick={() => Router.push('/auth/login')} >
                                Voltar
                              </Button>
                            </Grid>
                            <Grid item sm={2}>
                              <Button type="submit" fullWidth variant="contained" color="primary" >
                                Confirmar
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </User>
  );
}
