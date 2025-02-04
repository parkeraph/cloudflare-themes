const getHost = () => {
  //@ts-ignore
  if (process.env.NODE_ENV === "development") return "parkeraph";
  return window.location.hostname.split(".")[1];
};

export default getHost;
