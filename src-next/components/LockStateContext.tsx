import { createContext, Dispatch, SetStateAction } from "react";

type LockStateContextType = {
    isUnlocked: boolean,
    setUnlocked: Dispatch<SetStateAction<boolean>>
}

export default createContext<LockStateContextType>({
    isUnlocked: false,
    setUnlocked: () => {}
});