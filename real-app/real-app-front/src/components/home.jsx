import Logo from "../img/logo.jpg";
import PageHeader from "./common/pageHeader";

const Home = () => {
  return (
    <PageHeader
      title={
        <>
          Real
          <img className="logo" src={Logo} alt="Logo" />
          App
        </>
      }
      description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut excepturi iure voluptatibus veritatis illo maiores, officiis laboriosam ut qui maxime ab nemo, nulla tenetur alias quasi deserunt in, assumenda pariatur?"
    />
  );
};
export default Home;
