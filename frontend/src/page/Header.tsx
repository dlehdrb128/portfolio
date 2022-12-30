import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { AiOutlineBell } from "react-icons/ai";

// const Header = useMemo(() => {
//     return (
//         <div className="flex justify-between items-center bg-black text-white h-16 px-4">
//             <p className="cursor-pointer">질러 노래방</p>
//             <AiOutlineBell className="cursor-pointer" size="24" />
//         </div>
//     );
// }, []);

const Header = () => {
    return (
        <div className="flex justify-between items-center bg-black text-white h-16 px-4">
            <p className="cursor-pointer">질러 노래방</p>
            <AiOutlineBell className="cursor-pointer" size="24" />
        </div>
    );
};

export default React.memo(Header);
