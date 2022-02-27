import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Card, Header, Icon, Label } from 'semantic-ui-react';
import { BreweryDetails } from './BreweryDetails';
import './BreweryList.css';
import 'semantic-ui-css/semantic.min.css';

export function BreweryList(): JSX.Element {
  const [breweries, setBreweries] = useState<any[]>([]);
  const [open, setOpen] = useState<Boolean>(false);
  const [id, setId] = useState<string>();
  const [brewery, setBrewery] = useState();

  const url = "https://api.openbrewerydb.org/breweries?by_city=chicago";

  useEffect(() => {
    fetch(
      url,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(response => {
        setBreweries(response);
      })
      .catch(error => console.log(error));
  }, []);


  const breweryDetails = (id: string) => {
    setOpen(true);
    setId(id);
    const brewery = breweries.find(brewery => brewery.id == id);

    setBrewery(brewery);
  }

  return (
    <div className={"brewery-list"}>
      <Header as='h1' icon textAlign='center'>
        <Icon name='beer' circular />
        <Header.Content>Breweries in Chicago!</Header.Content>
      </Header>
      {open ? 
        (<>
          <Button onClick={() => setOpen(false)} content='Back' icon='left arrow' labelPosition='left' inverted/>
          <BreweryDetails brewery={brewery}/> 
        </>):
        <Card.Group itemsPerRow={3}>
        {breweries.map((brewery) => (
          <Card key={brewery.id} onClick={() => breweryDetails(brewery.id)} color='blue' fluid>
            <Card.Header>
              {brewery.name}
            </Card.Header>
            <Card.Content>
              <div>{brewery.type}</div>
              <div>
                  <p>
                    {brewery.street ? ` ${brewery.street}` : ''}
                    {brewery.city ? ` ${brewery.city},` : ''} 
                  </p>
                  <p>
                    {brewery.state ? ` ${brewery.state}` : ''} 
                    {brewery.postal_code ? ` ${brewery.postal_code}` : ''}
                  </p>
                </div>
            </Card.Content>
            <Card.Content>
              <div
              onClick = {()=> window.open(brewery.website_url)} 
              >
                {brewery.website_url && 
                  <>
                    <Icon name="mail"/>
                    {brewery.website_url}
                  </>
                } 
              </div>
            </Card.Content>
          </Card>
        ))}
        </Card.Group>
      }
      </div>
  );
}