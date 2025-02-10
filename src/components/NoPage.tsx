import { Link } from "react-router";
import { Button } from "./ui/button";

const NoPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="text-8xl">404</div>
      <div className="text-2xl">Uh Oh, That page doesn't exist.</div>
      <Link to="/">
      {/* 7acf71 */}
        <Button className="px-3 py-2 font-bold mt-3 rounded-lg"> 
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default NoPage;
