import React, { useState, useEffect } from 'react';
import ItemDescription from './itemDescription.jsx';
import ShopPolicies from './ShopPolicies.jsx';
import FaqList from './FaqList.jsx';
import sampleData from '../sampleData.js';


function App() {
  // const [description, getDescription] = useState(sampleData[0].productId.productDescription);

  return (
    <div>
      <div>
        <ItemDescription description={sampleData.sampleData[0].productId.productDescription} />
      </div>
      <div>
        <ShopPolicies policies={sampleData.sampleData[0].shopPolicies} />
      </div>
      <div>
        <FaqList faqList={sampleData.sampleData[0].faq} />
      </div>
    </div>
  );
}

export default App;