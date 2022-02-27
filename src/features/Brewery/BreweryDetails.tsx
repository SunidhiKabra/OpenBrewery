import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Label } from 'semantic-ui-react';
import './BreweryDetails.css';

export interface Props {
  brewery: any;
}

export function BreweryDetails(props: Props): JSX.Element {
  const {brewery} = props;

  return (
    <div className={"brewery-details"}>
      <Card>
        <Card.Header>
          {brewery.name}
        </Card.Header>
      </Card>
    </div>
  );
}