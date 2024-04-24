import React from "react";
import { useState, useEffect } from "react";
import { useGetData } from "../custom-hook/DetailsData";
import Image from "next/image";

// just to display the stuff
type ModalProps = {
  // id: string;
  open: any;
  onClose?: () => void;
};

const Modal = (props: ModalProps) => {
  if (!props.open) return <></>;

  return (
    <div
      onClick={props.onClose}
      className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-[#0000008a]  z-1  text-black  "
    >
      {/* Modal */}
      <div
        className="absoulte top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-600px lg:w-[40%] md:w-[60%] w-[90%] fixed  items-start  bg-white    shadow-xl rounded"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-center px-4 py-2">
            <h1 className="text-[24px]  font-[700]">Movie title</h1>

            <p
              className="flex justify-start m-3 bg-slate-300 rounded p-2 hover:bg-slate-700 text-white"
              onClick={props.onClose}
            >
              X
            </p>
          </div>

          {/* <div className='flex flex-col items-start text-center mt-3 p-2 py-4'>
                        <p>{detailData}</p>
                        asdasdasdasd
                       
                    </div> */}
        </div>

        <div className="    px-4  w-full">
          <div className="relative top-1/2 h-[400px]    w-full  ">
            <Image
              src={props.open.image?.url}
              alt={`Poster for ${props.open.title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>

          <div className="py-2">
            <p className=" text-[18px] ">
              <label className="mr-4 ">Movie:</label>
              {props.open.title}
            </p>

            <div>
              <p className=" text-[18px] ">
                <label className="mr-4 ">Year:</label>
                {props.open.year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
