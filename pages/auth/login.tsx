import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CoMeetingLogo from 'public/imagens/CoMeetingLogo.svg';
import Lottie from 'react-lottie';
import meeting from 'public/lottie/meeting.json'
import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(16, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#11cbef'
  },
}));




export default function SignInSide() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data) {
    try {
      await signIn(data)
    } catch (error) {
      enqueueSnackbar('Login invalido',{variant: 'error',});
    }
  }


  return (
    <Grid container component="main" className={classes.root}>

      <Grid item md={8}  className={classes.image}>
        <Grid component={Paper} elevation={2} square style={{borderRadius: '0px 25px 25px 0px',width: '100%', height: '98%', padding: '20px',  display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
          <div style={{textAlign: 'left', marginBottom: '80px'}}>
            <Typography variant="h3">Lorem ipsum dolor sit</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna
            </Typography>
          </div>
          <Lottie 
            options={{
              loop: true,
              autoplay: true,
              animationData: meeting,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
              }
            }}
            height={500}
            width={850}
          />
        </Grid>       
      </Grid>
      <Grid item sm={12} md={4}  style={{    display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}} >
        <div className={classes.paper}>
          <CoMeetingLogo />
     
          <form className={classes.form} noValidate onSubmit={handleSubmit(handleSignIn)}>
            <TextField
              {...register('email')}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Logar
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{marginTop: '10px'}}
              onClick={() => Router.push('/auth/cadastro') }
            >
              Cadastrar-se
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

  // await apiClient.get('/users')

  return {
    props: {}
  }
}

