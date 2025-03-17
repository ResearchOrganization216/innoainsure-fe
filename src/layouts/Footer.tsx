import useSidebarStore from "@/stores/SidebarStore";
import { FC } from "react";

const Footer: FC = () => {
  const { isExpanded } = useSidebarStore();

  return (
    <div
      className={`flex w-full items-center justify-center ${
        isExpanded && "lg:pl-[240px]"
      }`}
    >
      <span className="text-xs">Copyright by InnoAInsure</span>
    </div>
  );
};

Footer.displayName = "Footer";
export default Footer;
