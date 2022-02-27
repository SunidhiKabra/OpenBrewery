import React from 'react';
import { useEffect, useState } from 'react';
import { Header, Icon } from 'semantic-ui-react';
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
    </div>
  );
}