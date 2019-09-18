
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
    {pickup.description 
      ? <p>{pickup.description}</p> 
      : null}
    <p>Position: {pickup.position}</p>
    <p>Type: {pickup.type}</p>
    {pickup.output 
      ? <p>Output: {pickup.output}</p> 
      : null}
    {pickup.purchaseDate 
      ? <p>Purchase Date: {pickup.purchaseDate}</p> 
      : null}
      {pickup.purchasePrice
        ? <p>Purchase price: ${pickup.purchasePrice}</p>
        : null}
    {pickup.purchaseStore 
      ? <p>Purchase Store: {pickup.purchaseStore}</p> 
      : null}
    {pickup.productUrl
      ? <p>Product Link: <a href={pickup.productUrl}>{pickup.productUrl}</a></p>
      : null}
    <div className="json">
      <pre>{JSON.stringify(pickup, undefined, 2)}</pre>
    </div>
  </div>
);

export default PickupDetail;
