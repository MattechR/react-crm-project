import "./pageHeader.css";

const PageHeader = ({ title, description }) => {
  return (
    <>
      <div className="row">
        <div className="page-header col-12 mt-4">
          <h1>{title}</h1>
        </div>
        <div className="row">
          <div className="page-description col-12">{description}</div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
