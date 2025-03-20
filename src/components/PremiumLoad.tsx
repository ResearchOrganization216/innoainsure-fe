import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import loadingBot from "../assets/loading_bot.gif";
import styles from "../styles/PremiumLoad.module.css";

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
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
          <div className='flex flex-col items-center relative'>
            {/* Animated Loading Image */}
            <img src={loadingBot} alt='Loading' className='w-24 h-24' />

            {/* Loading Message with Flashing Dots */}
            <small className='text-white mt-2'>
              {message} <span className={styles.dotFlashing}>.</span>
              <span className={styles.dotFlashing}>.</span>
              <span className={styles.dotFlashing}>.</span>
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
