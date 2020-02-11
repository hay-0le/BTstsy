import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemDescription from './itemDescription.jsx';
import ShopPolicies from './ShopPolicies.jsx';
import FaqList from './FaqList.jsx';
import Messages from './Messages.jsx';
import sampleData from '../sampleData.js';

function App() {
  const sample = sampleData.sampleData[1];
  const [description, getDescription] = useState(sample.productid, sample.productdescription);
  const [data, setData] = useState(sample);



  console.log("First time", cache)


  function getProductId() {
    const productId = Number(window.location.search.slice(1)) || 1;
    return productId;
  }


  async function fetchData(productId) {


      const res = await axios.get(`/api/description/${productId}`);
      const tempData = res.data[0];
      return tempData;


  }

    useEffect(() => {
      const Id = getProductId();
      fetchData(Id);

    }, []);



  return (
    <div>
      <div>
        <ItemDescription description={data.productdescription} />
      </div>
      <div>
        <ShopPolicies policies={data.policies} country={data.vendorcountry} />
      </div>
      <div>
        <Messages
          vendorName={data.vendor}
          vendorFirstName={data.vendorname}
          vendorLocation={data.vendorCountry}
          vendorPhoto={data.vendorphoto}
        />
      </div>
      <div>
        <FaqList faqList={data.faq} />
      </div>
    </div>
  );
}

export default App;
