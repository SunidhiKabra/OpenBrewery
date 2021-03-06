import React, { useState } from 'react';
import './BreweryDetails.css';
import GoogleMapReact from 'google-map-react';
import { Card, Icon } from 'semantic-ui-react';
import _ from 'lodash';

export interface Props {
  brewery: any;
}  

//Add your key here! 
const apiKey: string = '';

export function BreweryDetails(props: Props): JSX.Element {
  const {brewery} = props;
  const [lat, setLat] = useState<number>(_.toNumber(brewery.latitude));
  const [lng, setLng] = useState<number>(_.toNumber(brewery.longitude)); 
  const center: GoogleMapReact.Coords = {lat, lng};

  return (
      <div className={"brewery-details"}>
        <Card centered>
          <Card.Header>
            {brewery.name}
          </Card.Header>
          <Card.Content>
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


            {lat != 0 && <div className='map-wrapper'>
              <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={center}
                defaultZoom={13}
              >
                <Marker
                  lat={lat}
                  lng={lng}
                />
              </GoogleMapReact>
          </div>}
        </Card.Content>
      </Card>
    </div>
  );
}

const Marker = ({text}: any) => 
  <div>
    <Icon name='map marker alternate' size='huge' />
  </div>;

