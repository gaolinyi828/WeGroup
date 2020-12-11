import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from "../components/Login";
import TabForm from "../components/TabForm";
import Post from "../components/Post";

const Routes = () => {
    return (
        <section>
            <Switch>
                <Route exact path={"/post_form"} component={Login}></Route>
                <Route exact path={"/tab_form_search"}>
                    <TabForm search={true}/>
                </Route>
                <Route exact path="/tab_form_create">
                    <TabForm search={false}/>
                </Route>
                <Route exact path={"/post"} component={Post}></Route>
                {/*<Tab.Container defaultActiveKey={key} onSelect={(k) => setKey(k)} activeKey={key}>*/}
                {/*    <Row>*/}
                {/*        <Col sm={4}>*/}
                {/*            <SideNav/>*/}
                {/*        </Col>*/}
                {/*        <Col sm={8}>*/}
                {/*            <Tab.Content>*/}
                {/*                <Tab.Pane eventKey={"activity"}>*/}
                {/*                    <Route component={Routes}/>*/}
                {/*                </Tab.Pane>*/}
                {/*            </Tab.Content>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Tab.Container>*/}
            </Switch>
        </section>
    )
}
export default Routes;