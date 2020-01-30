import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ReadMore, FaqQuestionsButton, FaqButtonLabel, FaqContainer,
} from './StyleSheet.js';
import FaqEntry from './FaqEntry.jsx';

const FaqList = ({ faqList }) => {
  if (typeof faqList === 'string') {
    faqList = JSON.parse(faqList)
  }

  const [toggle, setToggle] = useState(true);
  return (
    <div>
      <FaqContainer>
        <FaqQuestionsButton onClick={() => setToggle(!toggle)}>
          <FaqButtonLabel> FAQ's </FaqButtonLabel>
        </FaqQuestionsButton>
        <ReadMore toggle={toggle}>
          {faqList.map((faq, index) => <FaqEntry key={index} faq={faq} />)}
        </ReadMore>
      </FaqContainer>
    </div>

  );
};

FaqList.propTypes = {
  // faqList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default FaqList;
