import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UrlsList from './components/UrlsList';
import CreateUrls from './components/CreateUrl';
import SlugRedirect from './components/SlugRedirect';
import { Container, Row, Col } from 'react-bootstrap';
import { Url } from './models/url.model';
import services from './services/urls.service'

function App() {
  const [urls, setUrl] = useState<Url[]>([]);

  // get urls
  const getUrls = async () => { 
    const response = await services.get("/api/v1/url-shortner/get-all");
    return response.data;
  }

  const createUrl = async (url: Url) => {
    const request = {
      ...url
    };

    const response = await services.post("/api/v1/url-shortner/create-url", request);
    return response.data;
  };

  const deleteAll = async () => {
    await services.delete("/api/v1/url-shortner/delete-urls");
  };

  const getUrlBySlug = async (slug:string) => {
    const response = await services.get("/api/v1/url-shortner/get-slug-url/".concat(slug));
    return response.data;
  };

  useEffect(() => {
    const getAllUrls = async () => {
      const allUrls = await getUrls();
      if (allUrls) setUrl(allUrls);
    };

    getAllUrls();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/:slug" exact>
            <SlugRedirect getUrlBySlug={getUrlBySlug} />
          </Route>
          <Route path="/">
            <Header title="React App" />
              <Container className='mt-4'>
                <Row>
                  <Col>
                    <CreateUrls urls={urls} setUrl={setUrl} createUrl={ createUrl }  />
                  </Col>
                </Row>
                <Row><Col><br /></Col></Row>
                <Row>
                  <Col>
                  <UrlsList urls={urls} setUrl={setUrl} deleteAll={deleteAll} />
                  </Col>
                </Row>
              </Container>
            </Route>
          </Switch>
      </Router>
    </>
  );
}

export default App;
