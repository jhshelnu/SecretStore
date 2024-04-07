import LoginFilter from "@/types/LoginFilter";
import { Button } from "@mui/joy";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { SxProps } from "@mui/joy/styles/types";

type Props = {
    targetFilter: LoginFilter, // what this button will filter to
    targetFilterText: string,
    filter: LoginFilter, // the currently selected filter
    setFilter: Dispatch<SetStateAction<LoginFilter>>, // setter for the currently selected filter
    startDecorator?: ReactNode,
    sx?: SxProps,
}

export default function LoginsSidebarButton(props: Props) {
    return (
        <Button
            startDecorator={props.startDecorator}
            className={props.filter == props.targetFilter ? "bg-color-selected" : "bg-color-hoverable"}
            onClick={() => props.setFilter(props.targetFilter)}
            sx={{ justifyContent: "flex-start", ...props.sx }}
        >
            {props.targetFilterText}
        </Button>
    );
}