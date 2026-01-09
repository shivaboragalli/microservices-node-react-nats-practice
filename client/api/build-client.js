import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // we are on server!
    // as it will try to use pod domain as prefix so not ingress srv
    // so we have to explicitly set it
    // 'http://SERVICENAME.NAMESPACE.svg.cluster.local' OR 'DOMAIN_NAME YOU PURCHASE FOR PROD'
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient