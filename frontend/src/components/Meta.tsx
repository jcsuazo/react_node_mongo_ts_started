import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
interface ChildProps {
  title?: string;
  description?: string;
  keywords?: string;
}
const Meta: React.FC<ChildProps> = ({
  title = 'Welcome To Proshop',
  description = 'We sell the best products for cheap',
  keywords = 'electronics, buy electronics, cheap electronics',
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Helmet>
    </HelmetProvider>
  );
};
// Meta.defaultProps = {
//   title: 'Welcome To Proshop',
//   description: 'We sell the best products for cheap',
//   keywords: 'electronics, buy electronics, cheap electronics',
// };

export default Meta;
