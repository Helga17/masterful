import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Intro from './components/Intro/Intro';
import Workshop from './components/Workshop/Workshop';
import Blog from './components/Blog/Blog';
import Footer from './components/Footer/Footer'
import UserProfile from './components/UserProfile/UserProfile';
import Register from './components/Register/Register';
import Main from './dashboard/Main/Main';
import Posts from './dashboard/Posts/Posts';
import Header from './dashboard/Header/Header';
import SideBar from './dashboard/SideBar/SideBar';
import CreatePost from './dashboard/Posts/CreatePost';
import Masters from './dashboard/Masters/Masters';
import Schedule from './dashboard/Schedule/Schedule';
import { ToastProvider } from 'react-toast-notifications';
import CreateSchedule from './dashboard/Schedule/CreateSchedule';
import Login from './components/Login/Login';
import CreateMaster from './dashboard/Masters/CreateMaster';

import BetaAccess from './components/BetaAccess/BetaAccess';
import Beta from './components/Beta/Beta';

import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  useEffect(() => {
    const token = localStorage.getItem('passport') || '';

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    if (user === null && token.length > 0) {
      axios.get('http://127.0.0.1:8001/api/user', config)
        .then(result => {
          if (result.data) {
            sessionStorage.setItem('user', JSON.stringify(result.data));
            setUser(result.data);
          } else {
            sessionStorage.removeItem('user');
          }
        });
    }
    
  }, [user]);

  const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return (
      <Route {...rest} render={props => (
        <Layout {...props}>
          <ToastProvider>
            <Component {...props} {...rest} />
          </ToastProvider>
        </Layout>
      )} />
    )
  }

  const AuthLayout = props => (
    <div className="app-wrapper">
      <ToastProvider>
        {props.children}
      </ToastProvider>
    </div>
  )

  const DashboardLayout = props => {
    return user ?(
      <div className="container">
        <Header />
        <SideBar />
        <ToastProvider>
          {props.children}
        </ToastProvider>
      </div>
    ) : <Redirect to="/"/>
  }
  

  const MainLayout = (props) => {
    if (props.children.props.isSecure && !user) {
      return <Redirect to="/"/>
    }

    return (
      <div className="app-wrapper">
        <div className="app-wrapper-content">
          <Navbar currentUser={user} setUser={setUser} />
          {props.children}
          <Footer />
        </div>
      </div>
    )
  }

  return (

    <BrowserRouter>
  
      <Switch>
        <AppRoute path="/betaaccess" layout={AuthLayout} component={BetaAccess} />
        <AppRoute path="/beta" layout={AuthLayout} component={Beta} />

        <AppRoute path="/register" layout={AuthLayout} component={Register} setUser={setUser} />
        <AppRoute path="/login" layout={AuthLayout} component={Login} setUser={setUser} />

        <AppRoute exact path="/" layout={MainLayout} component={Intro} />

        <AppRoute path="/workshop" layout={MainLayout} component={Workshop} />
        <AppRoute path="/blog" layout={MainLayout} component={Blog} />
        <AppRoute path="/user" layout={MainLayout} component={UserProfile} isSecure={true}/>

        <AppRoute exact path="/dashboard" layout={DashboardLayout} component={Main} />
        <AppRoute path="/dashboard/posts" layout={DashboardLayout} component={Posts} />
        <AppRoute path="/dashboard/post/create" layout={DashboardLayout} component={CreatePost} />
        <AppRoute path="/dashboard/schedule/create" layout={DashboardLayout} component={CreateSchedule} />
        <AppRoute path="/dashboard/master/create" layout={DashboardLayout} component={CreateMaster} />

        <AppRoute path="/dashboard/masters" layout={DashboardLayout} component={Masters} />
        <AppRoute path="/dashboard/schedules" layout={DashboardLayout} component={Schedule} />

      </Switch>
    </BrowserRouter>
  )
}

export default App;
