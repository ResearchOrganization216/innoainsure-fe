import useAuthStore from "@/stores/authStore";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useNavigate } from "react-router-dom";
interface CommonModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const SignoutModal: React.FC<CommonModalProps> = ({
  visible,
  setVisible,
}) => {
  const setIsSignOutVisible = useAuthStore(
    (state: any) => state.setIsSignOutVisible
  );

  const navigate = useNavigate();

  const onLogout = async () => {
    localStorage.removeItem("token");
    setIsSignOutVisible(false);
    navigate("/auth/sign-in");
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Dialog
      visible={visible}
      onHide={onClose}
      header="Sign out confirmation"
      footer={
        <div className="flex justify-between space-x-6">
          <Button
            outlined
            className="min-w-[200px]"
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>

          <Button className="min-w-[200px]" onClick={onLogout}>
            Yes, Sign out
          </Button>
        </div>
      }
      pt={{
        content: { className: "h-fit" },
        root: {
          className: "w-fit min-w-[35vw]",
        },
      }}
    >
      <div className=" px-4 py-6 text-[20px] lg:px-8">
        <div>Are you sure you want to sign out from the application?</div>
      </div>
    </Dialog>
  );
};

export default SignoutModal;
