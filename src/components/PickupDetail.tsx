
import * as React from 'react';

import { Pickup } from '../interfaces/models/pickup';

type PickupDetailProps = {
  item: Pickup
}

const PickupDetail: React.FunctionComponent<PickupDetailProps> = ({
  item: pickup,
}) => (
  <div>
    <h4>{pickup.name}</h4>
    <p>json: {JSON.stringify(pickup)}</p>
    {pickup.description 
      ? <p>Description: {pickup.description}</p> 
      : null}
    <p>Position: {pickup.position}</p>
    <p>Type: {pickup.type}</p>
    {pickup.output 
      ? <p>Output: {pickup.output}</p> 
      : null}
    {pickup.purchaseDate 
      ? <p>Purchase Date: {pickup.purchaseDate}</p> 
      : null}
    {pickup.purchaseStore 
      ? <p>Purchase Store: {pickup.purchaseStore}</p> 
      : null}
    {pickup.productUrl
      ? <p>Product Link: <a href={pickup.productUrl}>{pickup.productUrl}</a></p>
      : null}
  </div>
);

export default PickupDetail;
