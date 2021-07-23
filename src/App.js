import './App.css';
import MainPage from './main';
import { Switch, Route } from 'react-router-dom';
import ProductPage from './product';
import UploadPage from './upload';
import Header from './include/header';
import Footer from './include/footer';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path={"/"} exact={true}>
          <MainPage />
        </Route>
        <Route path={"/product/:id"} exact={true}>
          <ProductPage />
        </Route>
        <Route path={"/upload"} exact={true}>
          <UploadPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
