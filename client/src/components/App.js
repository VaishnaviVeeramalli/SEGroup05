import React from 'react';
import './App.css';

import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

import StudentLoginPage from './views/LoginPage/StudentLoginPage';
import ClubLoginPage from './views/LoginPage/ClubLoginPage';
import AdminLoginPage from './views/LoginPage/AdminLoginPage';
import StudentRegisterPage from './views/RegisterPage/StudentRegisterPage';
import ClubRegisterPage from './views/RegisterPage/ClubRegisterPage';
import LandingPage from './views/LandingPage/LandingPage';
import Footer from './views/Footer/Footer';
import NavBar from './views/NavBar/NavBar';
import UploadPage from './views/UploadProduct/UploadProduct';
import AboutPage from './views/AboutPage/AboutPage';

import Auth from '../hoc/Auth';
import ProductDetail from './views/ProductDetail/ProductDetail';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';

import { Row,Col } from 'antd';
import Nothing from './views/Nothing/Nothing';
import Orders from './views/Orders/Orders';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside


function App() {

  return (

    <div className="App">
    
    <Row>
      <Col span={24}>
        <NavBar></NavBar>
      </Col>
    </Row>
        
    <Row style={{minHeight:600}}>
      <Col span={24}>
        <Switch>

          <Route exact path="/products" component={Auth(LandingPage,null)}/>
          <Route exact path="/" component={Auth(AboutPage,null)}/>
          <Route exact path="/studentlogin" component={Auth(StudentLoginPage,false)}/>
          <Route exact path="/clublogin" component={Auth(ClubLoginPage,false)}/>
          <Route exact path="/adminlogin" component={Auth(AdminLoginPage,false)}/>
          <Route exact path="/studentregister" component={Auth(StudentRegisterPage,false)}/>
          <Route exact path="/clubregister" component={Auth(ClubRegisterPage,false)}/>
          <Route exact path="/upload/product" component={Auth(UploadPage,true)}/>
          <Route exact path="/product/:productId" component={Auth(ProductDetail,true)}/>
          <Route exact path="/cart" component={Auth(CartPage,true)}/>
          <Route exact path="/history" component={Auth(HistoryPage,true)}/>
          <Route exact path="/orders" component={Auth(Orders,true)}/>
          <Route exact path="*" component={Auth(Nothing,null)}/>
         
        </Switch>
      </Col>
    </Row>

    <Row>
      <Col span={24}>
        <Footer></Footer>
      </Col>
    </Row>
        
    </div>
  );
}

export default App;
