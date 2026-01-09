import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  console.log("currentUser", currentUser);
  return (
    <>
      {/* <h1>{currentUser.email}</h1> */}
      <Header currentUser={currentUser} />
      <div className="container">
      <Component currentUser={currentUser} {...pageProps} />
      </div>
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // page component getInitialProps
  // context === {req,res};
  //Custom App Component getInitialProps
  //context === {Component, ctx:{req,res}}
  //appContext is same as context just renamed
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser").catch((err) => {
    console.log("error in getInitialProps for /api/users/currentuser", err);
  });
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  console.log("data in AppComponent", data);
  console.log("data in pageProps", pageProps);
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
