import Logo from "@/assets/logo_1.svg?react";
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
    <div className="fixed left-0 top-0 z-[997] flex h-[85px] w-full items-center justify-between bg-primary-blue px-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex items-center space-x-5 lg:w-fit">
        <i
          className="pi pi-arrow-circle-left pl-4 cursor-pointer text-white hover:text-primary-darkBlue"
          onClick={toggleSidebar}
        />
        <Logo className="h-[48px] w-[52px] !ml-[80px]" />
        <span className="text-nowrap text-[22px] text-white !ml-[70px] font-semibold">
          InnoAInsure General Insurance
        </span>
      </div>

      <div className="mr-6 flex items-center space-x-2 text-black !lg:space-x-5">
        {/* {image_path ? ( */}
        <img
          src="https://github.com/ResearchOrganization216/innoainsure-fe/blob/development/src/assets/authentication-assets/user1.jpg"
          alt="User Avatar"
          className="h-8 w-8 rounded-full object-cover lg:h-12 lg:w-12"
        />
        {/* ) : (
          <UserIcon className="size-6 lg:size-12" />
        )} */}
        <div className="flex flex-col pr-6">
          <span className="text-sm lg:text-base text-white">William Smith</span>
          <span className="text-[11px] font-light text-white">
            Technical Officer
          </span>
        </div>
        <i
          title="Logout"
          className="pi pi-bars text-white cursor-pointer text-lg hover:text-primary-darkBlue"
          onClick={onSignOutClick}
        />
      </div>
    </div>
  );
};

Topbar.displayName = "Topbar";
export default Topbar;
