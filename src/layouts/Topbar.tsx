import Logo from "@/assets/logo.svg?react";
import UserIcon from "@/assets/user-icon-circle.svg?react";
import useAuthStore from "@/stores/authStore";
import useSidebarStore from "@/stores/SidebarStore";
import { FC } from "react";

const Topbar: FC = () => {
  // Destructure properties from user (if user exists)
  const user = useAuthStore((state) => state.user);
  const { Name, Roles, image_path } = user || {};

  const setIsSignOutVisible = useAuthStore(
    (state: any) => state.setIsSignOutVisible
  );
  const { toggleSidebar } = useSidebarStore();

  const onSignOutClick = () => {
    setIsSignOutVisible(true);
  };

  console.log("user :", user);

  return (
    <div className="fixed left-0 top-0 z-[997] flex h-[85px] w-full items-center justify-between bg-white px-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex items-center space-x-5 lg:w-fit">
        <Logo className="h-[70px] w-[76px]" />
        <i
          className="pi pi-bars cursor-pointer hover:text-primary-darkBlue"
          onClick={toggleSidebar}
        />
        <span className="text-nowrap text-[22px] text-[#1F2A37] lg:pl-6">
          Claim Management Portal
        </span>
      </div>

      <div className="mr-6 flex items-center space-x-2 text-black lg:space-x-5">
        {image_path ? (
          <img
            src={image_path}
            alt="User Avatar"
            className="h-8 w-8 rounded-full object-cover lg:h-12 lg:w-12"
          />
        ) : (
          <UserIcon className="size-6 lg:size-12" />
        )}
        <div className="flex flex-col">
          <span className="text-sm lg:text-base">{Name}</span>
          <span className="text-[11px] font-light">{Roles?.[0]}</span>
        </div>
        <i
          title="Logout"
          className="pi pi-sign-out cursor-pointer text-lg hover:text-primary-darkBlue"
          onClick={onSignOutClick}
        />
      </div>
    </div>
  );
};

Topbar.displayName = "Topbar";
export default Topbar;
