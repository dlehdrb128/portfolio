import React, { useEffect, useState, useRef, useCallback } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";

const Footer = () => {
    return (
        <div className="flex items-center justify-around fixed bottom-0 w-[352px] bg-black h-16 px-4">
            <button className="text-white flex items-center justify-center">
                <div className="text-white flex items-center justify-center flex-col">
                    <AiOutlineHome size={"28"} />
                    <p>홈</p>
                </div>
            </button>

            <button className="text-white flex items-center justify-center">
                <div className="text-white flex items-center justify-center flex-col">
                    <MdOutlineMessage size={"28"} />
                    <p>연락처</p>
                </div>
            </button>
        </div>
    );
};

export default React.memo(Footer);
