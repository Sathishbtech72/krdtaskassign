import React, { useState, useEffect } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const ListComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const responsiveMobile = {
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     partialVisibilityGutter: 20, // Adjust gutter as needed
  //   },
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://krds-assignment.github.io/aoc/api-assets/data.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getColor = (index) => {
    const colors = [
      "#41ca6e",
      "#fab153",
      "#7277d5",
      "#f87d51",
      "#ed5466",
      "#4ec2e7",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const items = data.features.map((feature) => ({
    id: feature.id,
    name: feature.title,
    desc: feature.desc,
    logo: feature.logo,
    image: feature.image,
  }));

  return (
    <div className="list-wrpper">
      <div className="container-fluid">
        <div className="row">
          {items.map((item, index) => (
            <div
              className="col-md-4 groups-wrapeer-item"
              key={item.id}
              style={{ backgroundColor: getColor(index) }}
            >
              <div className="content-wrapper">
                <img
                  className="img-fluid logopic"
                  src={item.logo}
                  alt={`Logo ${index}`}
                />
                <p>{item.name}</p>
                <p>{item.desc}</p>
              </div>
              <div className="image-wrapper">
               <img src={item.image} alt={`Images ${index}`} /> 
                {/* <Carousel
                  responsive={responsiveMobile}
                  ssr={true} // Set to true if server-side rendering
                  partialVisible={true}
                  containerClass="carousel-container"
                  itemClass="carousel-item"
                >
                   <img src={item.image} alt={`Image ${index}`} /> 
                </Carousel> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
