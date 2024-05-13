import { useLocation } from "react-router-dom";
import Expense from "./Expense";
import Dashboard from "./Dashboard";
import Categories from "./Categories";
import Debt from "./Debt"
import Reports from "./Reports";
import NavBar from "./NavBar";

export default function Component() {
  const location = useLocation().pathname;
  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-2">
        <div>
          <div>
            <switch>
              {location === "/home" ? <Dashboard /> : null}
              {location === "/expense" ? <Expense /> : null}
              {location === "/categories" ? <Categories /> : null}
              {location === "/debt" ? <Debt /> : null}
              {location === "/reports" ? <Reports /> : null}
            </switch>
          </div>
        </div>
      </div>
    </>
  );
}