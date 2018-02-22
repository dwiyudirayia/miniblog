import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';

class Loader extends Component {
  render() {
    const loaders = [1, 2];
    const listLoader = loaders.map((k) => (
      <div className="pt-4" key={k}>
        <ContentLoader
          height={50}
          width={600}
          speed={2}
          primaryColor={"#f3f3f3"}
          secondaryColor={"#ecebeb"}
        >
          <rect x="0" y="0" rx="3" ry="3" width="70" height="5" />
          <rect x="80" y="0" rx="3" ry="3" width="100" height="5" />
          <rect x="190" y="0" rx="3" ry="3" width="10" height="5" />
          <rect x="15" y="20" rx="3" ry="3" width="130" height="5" />
          <rect x="155" y="20" rx="3" ry="3" width="130" height="5" />
          <rect x="15" y="40" rx="3" ry="3" width="90" height="5" />
          <rect x="115" y="40" rx="3" ry="3" width="60" height="5" />
          <rect x="185" y="40" rx="3" ry="3" width="60" height="5" />
          <rect x="0" y="60" rx="3" ry="3" width="30" height="5" />
        </ContentLoader>
      </div>
    ));
    return (
      <div>
        {listLoader}
      </div>
    );
  }
}

export default Loader;