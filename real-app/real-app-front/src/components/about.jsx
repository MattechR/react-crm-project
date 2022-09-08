import "./Logo.css";
import Logo from "../img/logo.jpg";
import PageHeader from "./common/pageHeader";

const About = () => {
  return (
    <PageHeader
      title={
        <div>
          About
          <img className="logo" src={Logo} alt="logo" />
          Us
        </div>
      }
      description="This is a site that provides connectivity for users and for businesses."
    />
  );
};
export default About;
