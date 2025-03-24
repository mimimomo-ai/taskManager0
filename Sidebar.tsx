"use client"

import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import Image from "next/image";
import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
    const {theme} = useGlobalState();

    const router = useRouter();
    const pathname = usePathname();
    
    const handleClick = (link : string) => {
        router.push(link);
    };

    console.log(theme);

    return <SidebarStyled theme={theme}>
        <div className = "profile">
            <div className = "profile-overlay"></div>
            <div className="image">            
                <Image width={70} height={70} src="/profilepic.png" 
                                                alt="profile" />
            </div>
            <h1>
                <span>Gojo</span>
                <span>Satoru</span>
            </h1>   
        </div>
        <ul className="nav-items">
            {menu.map((item) => {

                const link = item.link;

            return (
                <li className={`nav-item ${pathname === link ? "active": ""}`}
                onClick={() => {
                    handleClick(link);
                }}> 
                    {item.icon}
                    <Link href = {link}>
                        {item.title}
                    </Link>
                </li>
            );
            })}
        </ul>
        <button>

        </button>
    </SidebarStyled>
}



const SidebarStyled = styled.nav`
    position: relative;
    width : ${(props) => props.theme.sidebarWidth};
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    color: ${(props) => props.theme.colorGray3};
    .profile{
        margin: 1rem;
        padding: 1.7rem 1rem;
        position: relative;

        border-radius: 1rem;
        cursor: pointer;
        font-weight: 500;
        color: ${(props) => props.theme.colorGray0};

        display: flex;
        align-items: center;

        .profile-overlay{
            position: absolute:
            top: 0;
            left: 0;
            backdrop-filter: blur (10px);
            transition: all 0.55 linear;
            border-radius: 1rem;
        }

        h1{
            display: flex;
            flex-direction: column;

            line-height: 1.1;
        }
        
        .image{
            position: relative;
            z-index: 1;
        }

        .image{
            flex-shrink: 0;
            display: inline-block;
            overflow: hidden;
            border-radius: 100%;

            width: 70px;
            height: 70px;
        }
        
        > h1 {
            margin-left: 0.8rem;
            font-size: clamp(1.2rem, 4vw, 1.2rem);
            line-height: 100%;
        }

        &:hover {
            .profile-overlay {
                opacity: 1;
                border: 2px solid ${(props) => props.theme.borderColor2};
            }
        }
        
        
    }
    .nav-item {
        position: relative;
        padding: 2rem 1rem 0.8rem 1rem;
        padding-left: 2.5rem;
        margin: 0.3rem 0;

        display: grid;
        grid-template-columns: 40px 1fr;
        cursor: pointer;
    }
    
    &::after{
        position: absolute;
        content: "";
        height: 100%;
        background-color: ${(props) => props.theme.activeNavLinkHover};
        z-index: 1;
        transition: all 0.3s ease-in-out;
    }
    &::before{
        position: absolute;
        content: "";
        height: 100%;
        background-color: ${(props) => props.theme.colorBg2};
        z-index: 1;
        transition: all 0.3s ease-in-out;
    }
`;
export default Sidebar;