import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";

function PublicLayout() {
  return (
    <>
     <Navbar />

      <main>
        <Outlet />
      </main>

      {/* Footer will go here */}
    </>
  );
}

export default PublicLayout;
