import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemDescription from './itemDescription.jsx';
import ShopPolicies from './ShopPolicies.jsx';
import FaqList from './FaqList.jsx';
import Messages from './Messages.jsx';
import sampleData from '../sampleData.js';
import { LRUCache } from '../../../server/database/LRUcache.js';



function App() {
  const sample = sampleData.sampleData[1];
  const [description, getDescription] = useState(sample.productid, sample.productdescription);
  const [data, setData] = useState(sample);

  //cache to hold top 25 most recently searched queries
  const [cache, setCache] = useState(new LRUCache(25));

  console.log("First time", cache)


  function getProductId() {
    const productId = Number(window.location.search.slice(1)) || 1;
    return productId;
  }


  async function fetchData(productId) {

    let cachedItem = cache.get(productId);
    console.log("cached item", cachedItem);

    if (cachedItem) {
      setData(cachedItem);

    } else {

      const res = await axios.get(`/api/description/${productId}`);
      const tempData = res.data[0];

      console.log("hellooo", cache);
      let updatedCache = cache.set(productId, tempData);
      console.log(updatedCache);
      setCache(updatedCache);
      console.log("after cached", cache)
      setData(tempData);
    }


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
