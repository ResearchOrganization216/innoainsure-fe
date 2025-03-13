import { Message } from "primereact/message";
import { FC } from "react";

const Forbidden: FC = () => {
  return (
    <div className="m-6">
      <Message
        severity="error"
        text={
          <div className="flex flex-col space-y-3 p-2">
            <div className=" font-bold">403 Forbidden </div>
            Sorry, you are not authorised to access this page.
          </div>
        }
        className="text-sm"
      />
    </div>
  );
};

export default Forbidden;
