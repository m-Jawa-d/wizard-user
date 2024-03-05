import React, { useEffect, useState } from 'react';
import Filter from './filter';
import Itemcards from './itemcards';
import { Accordion, Offcanvas } from 'react-bootstrap';
import MultiRangeSlider from './multirangeslider'
import axios from 'axios';
import Environment from '@/utils/Enviroment';
import Link from 'next/link';
import { useWeb3React } from '@web3-react/core';

const Items = ({ idnft }) => {
    // console.log("items++++++++", idnft)
    let { account } = useWeb3React();
    const api_url = Environment.api_url;
    // const [show, setShow] = useState(false);
    // const [idnft, setidnft] = useState();
    const [dataset, setdataset] = useState();
    const [toggle, setToggle] = useState(false);
    const [grid, setGrid] = useState(undefined);

    useEffect(() => {
        let res = localStorage.getItem("toggle");
        let gridData = localStorage.getItem("grid");
        if (gridData) {
            setGrid(gridData);
        } else {
            setGrid(0)
        }
        if (res === "false") {
            setToggle(false);
        }
    }, [])

    const [searchbar, setSearchBar] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getCollectionItemsDetails = async () => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/launchpads/${idnft}/items?offset=1&limit=50`,
            headers: {
                authorization: `Bearer ` + tok
            },
        }

        axios(config)
            .then(function (response) {
                setdataset(response?.data?.data)
                // console.log(response.data.data);
                // setLoader(false);
                // setUpcomingdata(response.data.data.upcomingLaunchpads[0])
                // console.log("response data upcoming", response.data.data.upcomingLaunchpads[0])
            })
            .catch(function (error) {
                // setLoader(false);
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("user");
                // window.location.assign("/")
                // window.location.reload();
            });
    }
    useEffect(() => {
        getCollectionItemsDetails()
    }, [idnft])

    // console.log("dataset", dataset)

    return (
        <>
            <section className="items-section">
                <div className="upper-content">
                    {/* <div className="filter-btn displaynoneinmobile" onClick={() => { setToggle(!toggle), localStorage.setItem("toggle", !toggle) }}>
                        <a>
                            {toggle ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M18.3333 6.04199H13.3333C12.9916 6.04199 12.7083 5.75866 12.7083 5.41699C12.7083 5.07533 12.9916 4.79199 13.3333 4.79199H18.3333C18.6749 4.79199 18.9583 5.07533 18.9583 5.41699C18.9583 5.75866 18.6749 6.04199 18.3333 6.04199Z" fill="white" />
                                    <path d="M5.00008 6.04199H1.66675C1.32508 6.04199 1.04175 5.75866 1.04175 5.41699C1.04175 5.07533 1.32508 4.79199 1.66675 4.79199H5.00008C5.34175 4.79199 5.62508 5.07533 5.62508 5.41699C5.62508 5.75866 5.34175 6.04199 5.00008 6.04199Z" fill="white" />
                                    <path d="M8.33341 8.95833C6.38341 8.95833 4.79175 7.36667 4.79175 5.41667C4.79175 3.46667 6.38341 1.875 8.33341 1.875C10.2834 1.875 11.8751 3.46667 11.8751 5.41667C11.8751 7.36667 10.2834 8.95833 8.33341 8.95833ZM8.33341 3.125C7.06675 3.125 6.04175 4.15 6.04175 5.41667C6.04175 6.68333 7.06675 7.70833 8.33341 7.70833C9.60008 7.70833 10.6251 6.68333 10.6251 5.41667C10.6251 4.15 9.60008 3.125 8.33341 3.125Z" fill="white" />
                                    <path d="M18.3333 15.208H15C14.6583 15.208 14.375 14.9247 14.375 14.583C14.375 14.2413 14.6583 13.958 15 13.958H18.3333C18.675 13.958 18.9583 14.2413 18.9583 14.583C18.9583 14.9247 18.675 15.208 18.3333 15.208Z" fill="white" />
                                    <path d="M6.66675 15.208H1.66675C1.32508 15.208 1.04175 14.9247 1.04175 14.583C1.04175 14.2413 1.32508 13.958 1.66675 13.958H6.66675C7.00841 13.958 7.29175 14.2413 7.29175 14.583C7.29175 14.9247 7.00841 15.208 6.66675 15.208Z" fill="white" />
                                    <path d="M11.6667 18.1253C9.71667 18.1253 8.125 16.5337 8.125 14.5837C8.125 12.6337 9.71667 11.042 11.6667 11.042C13.6167 11.042 15.2083 12.6337 15.2083 14.5837C15.2083 16.5337 13.6167 18.1253 11.6667 18.1253ZM11.6667 12.292C10.4 12.292 9.375 13.317 9.375 14.5837C9.375 15.8503 10.4 16.8753 11.6667 16.8753C12.9333 16.8753 13.9583 15.8503 13.9583 14.5837C13.9583 13.317 12.9333 12.292 11.6667 12.292Z" fill="white" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M13.9775 6.90639L6.90639 13.9775C6.66479 14.2191 6.2641 14.2191 6.0225 13.9775C5.78091 13.7359 5.78091 13.3352 6.0225 13.0936L13.0936 6.0225C13.3352 5.78091 13.7359 5.78091 13.9775 6.0225C14.2191 6.2641 14.2191 6.66479 13.9775 6.90639Z" fill="white" />
                                    <path d="M13.9775 13.9775C13.7359 14.2191 13.3352 14.2191 13.0936 13.9775L6.0225 6.90639C5.78091 6.66479 5.78091 6.2641 6.0225 6.0225C6.2641 5.78091 6.66479 5.78091 6.90639 6.0225L13.9775 13.0936C14.2191 13.3352 14.2191 13.7359 13.9775 13.9775Z" fill="white" />
                                </svg>
                            }
                            Filters</a>
                    </div> */}
                    <div className="option-field displaynoneinmobile">
                        <input type="text" placeholder='Search by nft name' />
                        <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.58366 18.1253C4.87533 18.1253 1.04199 14.292 1.04199 9.58366C1.04199 4.87533 4.87533 1.04199 9.58366 1.04199C14.292 1.04199 18.1253 4.87533 18.1253 9.58366C18.1253 14.292 14.292 18.1253 9.58366 18.1253ZM9.58366 2.29199C5.55866 2.29199 2.29199 5.56699 2.29199 9.58366C2.29199 13.6003 5.55866 16.8753 9.58366 16.8753C13.6087 16.8753 16.8753 13.6003 16.8753 9.58366C16.8753 5.56699 13.6087 2.29199 9.58366 2.29199Z" fill="#555357" />
                            <path d="M18.3335 18.9585C18.1752 18.9585 18.0169 18.9002 17.8919 18.7752L16.2252 17.1085C15.9835 16.8669 15.9835 16.4669 16.2252 16.2252C16.4669 15.9835 16.8669 15.9835 17.1085 16.2252L18.7752 17.8919C19.0169 18.1335 19.0169 18.5335 18.7752 18.7752C18.6502 18.9002 18.4919 18.9585 18.3335 18.9585Z" fill="#555357" />
                        </svg>
                    </div>
                    {/* <div className='d-none displayblockinmobilec udvctdvtcvdtvtcd' style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "20px", width: "100%" }}>
                        <div className="filter-btn d-none displayblockinmobile" >
                            <a onClick={handleShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M18.3333 6.04199H13.3333C12.9916 6.04199 12.7083 5.75866 12.7083 5.41699C12.7083 5.07533 12.9916 4.79199 13.3333 4.79199H18.3333C18.6749 4.79199 18.9583 5.07533 18.9583 5.41699C18.9583 5.75866 18.6749 6.04199 18.3333 6.04199Z" fill="white" />
                                    <path d="M5.00008 6.04199H1.66675C1.32508 6.04199 1.04175 5.75866 1.04175 5.41699C1.04175 5.07533 1.32508 4.79199 1.66675 4.79199H5.00008C5.34175 4.79199 5.62508 5.07533 5.62508 5.41699C5.62508 5.75866 5.34175 6.04199 5.00008 6.04199Z" fill="white" />
                                    <path d="M8.33341 8.95833C6.38341 8.95833 4.79175 7.36667 4.79175 5.41667C4.79175 3.46667 6.38341 1.875 8.33341 1.875C10.2834 1.875 11.8751 3.46667 11.8751 5.41667C11.8751 7.36667 10.2834 8.95833 8.33341 8.95833ZM8.33341 3.125C7.06675 3.125 6.04175 4.15 6.04175 5.41667C6.04175 6.68333 7.06675 7.70833 8.33341 7.70833C9.60008 7.70833 10.6251 6.68333 10.6251 5.41667C10.6251 4.15 9.60008 3.125 8.33341 3.125Z" fill="white" />
                                    <path d="M18.3333 15.208H15C14.6583 15.208 14.375 14.9247 14.375 14.583C14.375 14.2413 14.6583 13.958 15 13.958H18.3333C18.675 13.958 18.9583 14.2413 18.9583 14.583C18.9583 14.9247 18.675 15.208 18.3333 15.208Z" fill="white" />
                                    <path d="M6.66675 15.208H1.66675C1.32508 15.208 1.04175 14.9247 1.04175 14.583C1.04175 14.2413 1.32508 13.958 1.66675 13.958H6.66675C7.00841 13.958 7.29175 14.2413 7.29175 14.583C7.29175 14.9247 7.00841 15.208 6.66675 15.208Z" fill="white" />
                                    <path d="M11.6667 18.1253C9.71667 18.1253 8.125 16.5337 8.125 14.5837C8.125 12.6337 9.71667 11.042 11.6667 11.042C13.6167 11.042 15.2083 12.6337 15.2083 14.5837C15.2083 16.5337 13.6167 18.1253 11.6667 18.1253ZM11.6667 12.292C10.4 12.292 9.375 13.317 9.375 14.5837C9.375 15.8503 10.4 16.8753 11.6667 16.8753C12.9333 16.8753 13.9583 15.8503 13.9583 14.5837C13.9583 13.317 12.9333 12.292 11.6667 12.292Z" fill="white" />
                                </svg>
                            </a>
                        </div>
                        <div className={searchbar ? "option-field d-none displayblockinmobile " : "option-field d-none displayblockinmobile custom-widthsearchbar"} onClick={() => { setSearchBar(!searchbar) }} >
                            <input type="text" placeholder='Search by collection' />
                            <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M9.58329 18.1253C4.87496 18.1253 1.04163 14.292 1.04163 9.58366C1.04163 4.87533 4.87496 1.04199 9.58329 1.04199C14.2916 1.04199 18.125 4.87533 18.125 9.58366C18.125 14.292 14.2916 18.1253 9.58329 18.1253ZM9.58329 2.29199C5.55829 2.29199 2.29163 5.56699 2.29163 9.58366C2.29163 13.6003 5.55829 16.8753 9.58329 16.8753C13.6083 16.8753 16.875 13.6003 16.875 9.58366C16.875 5.56699 13.6083 2.29199 9.58329 2.29199Z" fill="#555357" />
                                <path d="M18.3333 18.9585C18.175 18.9585 18.0166 18.9002 17.8916 18.7752L16.225 17.1085C15.9833 16.8669 15.9833 16.4669 16.225 16.2252C16.4666 15.9835 16.8666 15.9835 17.1083 16.2252L18.775 17.8919C19.0166 18.1335 19.0166 18.5335 18.775 18.7752C18.65 18.9002 18.4916 18.9585 18.3333 18.9585Z" fill="#555357" />
                            </svg>
                        </div>
                    </div> */}
                    {/* <div class={searchbar ? "dropdown trending-dropdown d-none" : "dropdown trending-dropdown"}>
                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Trending <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                                <g clipPath="url(#clip0_206_14525)">
                                    <path d="M5.49997 7.8497C5.32075 7.8497 5.14155 7.78127 5.00492 7.64469L0.705141 3.34487C0.43162 3.07135 0.43162 2.62788 0.705141 2.35447C0.978553 2.08106 1.42193 2.08106 1.69548 2.35447L5.49997 6.15919L9.30449 2.35461C9.57801 2.08119 10.0213 2.08119 10.2947 2.35461C10.5684 2.62802 10.5684 3.07149 10.2947 3.34501L5.99503 7.64483C5.85832 7.78142 5.67913 7.8497 5.49997 7.8497Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_206_14525">
                                        <rect width="10" height="10" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                            <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                            <li><a class="dropdown-item" href="#">Coming Soon...</a></li>
                        </ul>
                    </div> */}
                    {grid !== undefined &&
                        <div className="category-choose">
                            <a className={parseInt(grid) == 0 && "active"} onClick={() => { setGrid(0), localStorage.setItem("grid", 0) }}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <path d="M8.115 2H6.215C4.025 2 2.875 3.15 2.875 5.33V7.23C2.875 9.41 4.025 10.56 6.205 10.56H8.105C10.285 10.56 11.435 9.41 11.435 7.23V5.33C11.445 3.15 10.295 2 8.115 2Z" fill="#745F8C" />
                                <path d="M19.5445 2H17.6445C15.4645 2 14.3145 3.15 14.3145 5.33V7.23C14.3145 9.41 15.4645 10.56 17.6445 10.56H19.5445C21.7245 10.56 22.8745 9.41 22.8745 7.23V5.33C22.8745 3.15 21.7245 2 19.5445 2Z" fill="#745F8C" />
                                <path d="M19.5445 13.4297H17.6445C15.4645 13.4297 14.3145 14.5797 14.3145 16.7597V18.6597C14.3145 20.8397 15.4645 21.9897 17.6445 21.9897H19.5445C21.7245 21.9897 22.8745 20.8397 22.8745 18.6597V16.7597C22.8745 14.5797 21.7245 13.4297 19.5445 13.4297Z" fill="#745F8C" />
                                <path d="M8.115 13.4297H6.215C4.025 13.4297 2.875 14.5797 2.875 16.7597V18.6597C2.875 20.8497 4.025 21.9997 6.205 21.9997H8.105C10.285 21.9997 11.435 20.8497 11.435 18.6697V16.7697C11.445 14.5797 10.295 13.4297 8.115 13.4297Z" fill="#745F8C" />
                            </svg></a>
                            <a className={parseInt(grid) == 1 && "active"} onClick={() => { setGrid(1), localStorage.setItem("grid", 1) }}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <path d="M4.73991 1.81055C3.40189 1.81055 2.31348 2.89904 2.31348 4.23698C2.31348 5.57492 3.40144 6.66334 4.73991 6.66334C6.07838 6.66334 7.16634 5.57492 7.16634 4.23698C7.16634 2.89904 6.07785 1.81055 4.73991 1.81055Z" fill="#745F8C" />
                                <path d="M12.5934 1.81055C11.2555 1.81055 10.167 2.89904 10.167 4.23698C10.167 5.57492 11.2555 6.66334 12.5934 6.66334C13.9314 6.66334 15.0201 5.57492 15.0201 4.23698C15.0201 2.89904 13.9319 1.81055 12.5934 1.81055Z" fill="#745F8C" />
                                <path d="M20.5739 6.66341C21.9116 6.66341 23.0003 5.575 23.0003 4.23706C23.0003 2.89911 21.9125 1.81055 20.5739 1.81055C19.2353 1.81055 18.1475 2.89904 18.1475 4.23698C18.1475 5.57492 19.2361 6.66341 20.5739 6.66341Z" fill="#745F8C" />
                                <path d="M4.67688 14.438C6.01483 14.438 7.10354 13.3498 7.10354 12.0116C7.10354 10.6734 6.01483 9.58496 4.67688 9.58496C3.33894 9.58496 2.25 10.6735 2.25 12.0116C2.25 13.3498 3.33894 14.438 4.67688 14.438Z" fill="#745F8C" />
                                <path d="M12.5299 14.438C13.8677 14.438 14.9564 13.3498 14.9564 12.0116C14.9564 10.6734 13.8686 9.58496 12.5299 9.58496C11.1916 9.58496 10.1035 10.6734 10.1035 12.0116C10.1035 13.3498 11.192 14.438 12.5299 14.438Z" fill="#745F8C" />
                                <path d="M20.5113 14.438C21.8496 14.438 22.9378 13.3498 22.9378 12.0116C22.9378 10.6734 21.8496 9.58496 20.5113 9.58496C19.1731 9.58496 18.084 10.6734 18.084 12.0116C18.084 13.3498 19.1727 14.438 20.5113 14.438Z" fill="#745F8C" />
                                <path d="M4.73243 17.3359C3.39448 17.3359 2.30554 18.4241 2.30554 19.7624C2.30554 21.1001 3.39448 22.1887 4.73243 22.1887C6.07037 22.1887 7.15879 21.1006 7.15879 19.7624C7.15879 18.4241 6.07037 17.3359 4.73243 17.3359Z" fill="#745F8C" />
                                <path d="M12.5862 17.3359C11.2482 17.3359 10.1593 18.4241 10.1593 19.7624C10.1593 21.1001 11.2478 22.1887 12.5862 22.1887C13.9239 22.1887 15.0125 21.1006 15.0125 19.7624C15.0125 18.4241 13.9239 17.3359 12.5862 17.3359Z" fill="#745F8C" />
                                <path d="M20.5662 17.3359C19.2285 17.3359 18.1398 18.4241 18.1398 19.7624C18.1398 21.1001 19.2285 22.1887 20.5662 22.1887C21.9044 22.1887 22.9926 21.1006 22.9926 19.7624C22.9926 18.4241 21.9039 17.3359 20.5662 17.3359Z" fill="#745F8C" />
                            </svg></a>
                        </div>
                    }
                </div>
                <div className={toggle ? 'bottom-content iffilterhiddencardstyling' : 'bottom-content forgap set-csutom-if-open-cardstyling'}>
                    {/* <div className={toggle ? 'filter-side filter-hidden' : 'filter-side'}>
                        <Filter />
                    </div> */}
                    <div className={toggle ? 'cards-area' : 'cards-area widthset set-custom-cards-style'}>
                        <div className={grid === 0 ? "" : "biggrid-styling"}>
                            <section className="live-auction">
                                <div className="custom-container">
                                    {/* displaynoneinmobile */}
                                    <div className="bottom-cards ">
                                        {dataset?.collectionsItems?.map((card) => {
                                            // console.log(card?.walletAddress == account); // Log the current card object
                                            return (
                                                <>
                                                    <Link href={`/${card?.walletAddress == account?.toLowerCase() ? "putonsale" : "nftdetail"}?id=${card?._id}`} key={card.id} className="main-card">
                                                        <div className="main-img">
                                                            <img
                                                                src={card?.nft}
                                                                alt="img"
                                                                className="img-fluid main-img-card"
                                                            />
                                                            <img
                                                                src="/assets/landing/static/live-auction-abs.svg"
                                                                alt="img"
                                                                className="img-fluid abs-img"
                                                            />
                                                        </div>
                                                        <div className="bottom-text">
                                                            <div className="twice-text">
                                                                <div className="left-text">
                                                                    <h6>
                                                                        <span>By</span>
                                                                        {card?.launchpadId?.name}{' '}
                                                                        <img
                                                                            src="/assets/landing/static/verify-icon.svg"
                                                                            alt="img"
                                                                            className="img-fluid"
                                                                        />
                                                                    </h6>
                                                                    <h5>{card.cardNumber}</h5>
                                                                </div>
                                                                <div className="right-text">
                                                                    <h6>Price</h6>
                                                                    <h5>
                                                                        <img
                                                                            src="/assets/landing/static/price-icon.svg"
                                                                            alt="img"
                                                                            className="img-fluid"
                                                                        />
                                                                        {card.price} <span>Core</span>
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </>
                                            );
                                        })}
                                    </div>

                                    {/* <button className="exploreallbtn">See More</button> */}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>


            <Offcanvas show={show} onHide={handleClose} placement='bottom' className="filtersidebar filtersidebaritems">
                <Offcanvas.Body>
                    <div className="filtersidehead">
                        <h6 className="filtersideheading">Filters</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="crossimg" onClick={handleClose}>
                            <g clipPath="url(#clip0_206_27652)">
                                <path d="M0.683721 14.0001C0.548501 14.0001 0.41631 13.96 0.30387 13.8849C0.191431 13.8098 0.103793 13.703 0.0520429 13.5781C0.000292829 13.4532 -0.0132448 13.3157 0.0131423 13.1831C0.0395295 13.0505 0.104656 12.9287 0.200284 12.8331L12.8331 0.200246C12.9613 0.0720308 13.1352 0 13.3165 0C13.4979 0 13.6718 0.0720308 13.8 0.200246C13.9282 0.328462 14.0002 0.50236 14.0002 0.683684C14.0002 0.865008 13.9282 1.03891 13.8 1.16712L1.16716 13.7999C1.10373 13.8635 1.02837 13.9139 0.945409 13.9482C0.862446 13.9826 0.773514 14.0002 0.683721 14.0001Z" fill="white" />
                                <path d="M13.3165 14.0001C13.2267 14.0002 13.1378 13.9826 13.0548 13.9482C12.9718 13.9139 12.8965 13.8635 12.8331 13.7999L0.200246 1.16712C0.0720308 1.03891 0 0.865008 0 0.683684C0 0.50236 0.0720308 0.328462 0.200246 0.200246C0.328462 0.0720308 0.50236 0 0.683684 0C0.865008 0 1.03891 0.0720308 1.16712 0.200246L13.7999 12.8331C13.8956 12.9287 13.9607 13.0505 13.9871 13.1831C14.0135 13.3157 13.9999 13.4532 13.9482 13.5781C13.8964 13.703 13.8088 13.8098 13.6963 13.8849C13.5839 13.96 13.4517 14.0001 13.3165 14.0001Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_206_27652">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <Filter />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Items;
