import { NavBar } from "./components/navBar";
import { MyFooter } from "./components/footer";
import { CustomTable } from "./components/customTable";
import { InstallmentTable } from "./components/installmentTable";
import img from "./img/chalkboard.jpg";
import { Switch, Route } from "react-router";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <NavBar />
      <hr />
      <Switch>
        <Route path="/" exact component={CustomTable} />
        <Route path="/installments/:id" component={InstallmentTable} />
      </Switch>
      <hr />

      <MyFooter />
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${img});
  min-height: 90vh;
  padding: 20px;
`;

export default App;
