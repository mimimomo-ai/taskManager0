"use client"
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import CreateContent from "../Modals/CreateContent";


function Tasks() {

    const {theme} = useGlobalState();

console.log("Theme from context:", theme);

return (
    <TaskStyled theme={theme}>
        <CreateContent />
    </TaskStyled>
    );

}

const TaskStyled = styled.div`
    padding: 2rem;
    width: 100%;
    min-height: 300px;  /* Add a min-height */
    background-color: ${(props) => props.theme?.colorBg2};
    border: 2px solid ${(props) => props.theme?.borderColor2};
    border-radius: 1rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }
`;



export default Tasks;
