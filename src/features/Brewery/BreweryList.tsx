import React from 'react';
import { useEffect, useState } from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import './BreweryList.css';
import 'semantic-ui-css/semantic.min.css';

export function BreweryList(): JSX.Element {
  const [breweries, setBreweries] = useState<any[]>([]);

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

  return (
    <div className={"brewery-list"}>
      <Header as='h1' icon textAlign='center'>
        <Icon name='beer' circular />
        <Header.Content>Breweries in Chicago!</Header.Content>
      </Header>
      <Card.Group itemsPerRow={3}>
        {breweries.map((brewery) => (
          <Card key={brewery.id} color='blue' fluid>
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
              <div>
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
      </div>
  );
}