
import * as React from 'react';

import { Case } from '../interfaces/models/case';

type CaseDetailProps = {
  item: Case
}

const CaseDetail: React.FunctionComponent<CaseDetailProps> = ({
  item: guitarCase,
}) => (
  <div>
    <h4>{guitarCase.name}</h4>
    {guitarCase.description 
      ? <p>{guitarCase.description}</p> 
      : null}
    <p>Case Style: {guitarCase.caseStyle}</p>
    {guitarCase.purchaseDate 
      ? <p>Purchased {guitarCase.purchaseDate}</p> 
      : null}
    <p>Purchase Store: {guitarCase.purchaseStore}</p>
    {guitarCase.purchasePrice
        ? <p>Purchase price: ${guitarCase.purchasePrice}</p>
        : null}
    {guitarCase.productUrl
      ? <p>Product Link: <a href={guitarCase.productUrl}>{guitarCase.productUrl}</a></p>
      : null}
    <div className="json">
      <pre>{JSON.stringify(guitarCase, undefined, 2)}</pre>
    </div>
  </div>
);

export default CaseDetail;
