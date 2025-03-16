import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import loadingBot from "../assets/loading_bot.gif";
import "../styles/premiumload.css";

interface LoadingProps {
  message?: string;
  isLoading: boolean;
}

const PremiumLoad: React.FC<LoadingProps> = ({
  message = "Communicating with Insurance Agent",
  isLoading,
}) => {
  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center mt-4'>
          <div className='flex flex-col items-center'>
            {/* Animated Loading Image */}
            <img src={loadingBot} alt='Loading' className='w-24 h-24' />

            <small className='text-gray-500'>
              {message} <span className='dot-flashing'>.</span>
              <span className='dot-flashing'>.</span>
              <span className='dot-flashing'>.</span>
            </small>

            {/* Progress Spinner */}
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth='8'
              fill='#ffffff'
              animationDuration='.5s'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumLoad;
