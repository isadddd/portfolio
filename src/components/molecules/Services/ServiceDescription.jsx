const ServiceDescription = ({ service }) => (
  <p>
    <u>{service.lead}</u> {service.detail}
    <br />
    <u>Good for:</u> {service.goodFor}
  </p>
);

export default ServiceDescription;
