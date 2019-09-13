
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
    <p>json: {JSON.stringify(guitarCase)}</p>
    {guitarCase.description 
      ? <p>Description: {guitarCase.description}</p> 
      : null}
    <p>Case Style: {guitarCase.caseStyle}</p>
    {guitarCase.purchaseDate 
      ? <p>Purchased {guitarCase.purchaseDate}</p> 
      : null}
    <p>Purchase Store: {guitarCase.purchaseStore}</p>
    {guitarCase.productUrl
      ? <p>Product Link: <a href={guitarCase.productUrl}>{guitarCase.productUrl}</a></p>
      : null}
  </div>
);

export default CaseDetail;
