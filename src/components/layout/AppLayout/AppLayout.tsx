import { Outlet } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <NavigationBar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
