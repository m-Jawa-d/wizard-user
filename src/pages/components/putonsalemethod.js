import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { Modal, Nav } from 'react-bootstrap';
import Environment from '@/utils/Enviroment';
import PutOnSaleTokens from '@/hooks/putonsale';
import PutOnAuctionTokens from '@/hooks/putonauction';
import axios from 'axios';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import { Log } from 'ethers';
import Loader from '@/hooks/loader';
const Putonsalemethod = () => {
    var router = useRouter();
    const [dateValue, setDateValue] = useState('');
    const [rend, setRend] = useState(false)
    // console.log(dateValue);
    const api_url = Environment.api_url;
    const [activeTab, setActiveTab] = useState('link-1');
    const [dataset, setdataset] = useState();
    const [fee, setFee] = useState(0)
    // console.log(fee);
    const [Id, setId] = useState()
    const [loader, setLoader] = useState(false)

    let { OnSale } = PutOnSaleTokens()
    let { OnAuction } = PutOnAuctionTokens()
    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getNftDetails = async (id) => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/nfts/${id}/details`,
            headers: {
                authorization: `Bearer ` + tok
            },
        }

        axios(config)
            .then(function (response) {
                setdataset(response.data.data?.nft[0])
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
    const putOnSale = () => {
        let tok = localStorage.getItem("accessToken");
        const config = {
            method: 'patch',
            url: `${api_url}/nfts/${Id}`,
            data: {
                isFixedPrice: true,
                price: fee,
            },
            headers: {
                Authorization: "Bearer " + tok,
            },
        };
        axios(config)
            .then(function (res) {
                setLoader(false)
                toast.success("Nft Put On Sale successfully")
                router.push(`/putonsale?id=${Id}`)

                // props?.GetBidDetail()
                // history.push(`/explore`);
            })
            .catch(function (error) {
                setLoader(false)
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                } else {
                    console.log(error.message, "ssssss");
                    toast.error("An error occurred.");
                }
            });
    };
    const putOnAuction = () => {
        let tok = localStorage.getItem("accessToken");
        const config = {
            method: 'patch',
            url: `${api_url}/nfts/${Id}`,
            data: {
                openForBid: true,
                duration: dateValue,
            },
            headers: {
                Authorization: "Bearer " + tok,
            },
        };
        axios(config)
            .then(function (res) {
                setLoader(false)
                toast.success("Nft Put On Auction successfully")
                router.push(`/putonsale?id=${Id}`)

                // props?.GetBidDetail()
                // history.push(`/explore`);
            })
            .catch(function (error) {
                setLoader(false)
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                } else {
                    console.log(error.message, "ssssss");
                    toast.error("An error occurred.");
                }
            });
    };
    async function completeListing() {
        if (parseFloat(fee) <= parseFloat(dataset?.price)) {
            toast.error("Fee must be greater than the price.");
            return;
        }

        try {
            setLoader(true)
            let res = await OnSale(dataset?.tokenID, dataset?.collectionAddress, fee)
            // console.log(res);
            if (res) {
                // setLoader(true)
                putOnSale()
                // setLoader(false)
            }
            // let res = 
        } catch (error) {
            setLoader(false)
        }
    }
    async function completeListing2() {
        let time = dateValue; // '2024-02-28T19:47'
        // console.log(time);

        // Convert time to a Date object and get current time
        const selectedTime = new Date(time);
        const currentTime = new Date();

        try {
            setLoader(true);

            // Check if selected time is greater than current time
            if (selectedTime > currentTime) {
                // Convert selected time to epoch
                let epochTime = selectedTime.getTime();

                let res = await OnAuction(dataset?.tokenID, dataset?.collectionAddress, epochTime);
                // console.log(res);

                if (res) {
                    putOnAuction();
                }
            } else {
                // Show toast message if time is not greater
                toast.error("Selected time should be in the future.");
            }
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    }

    const HandleDate = (val) => {
        // Format the date and update the state
        // console.log(val);
        const formattedDate = new Date(val);
        setDateValue(formattedDate);
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        // console.log(id);
        setId(id)
        getNftDetails(id)
    }, [])
    return (
        <>
       {loader && <Loader/>}
            <Navbar />
            <section className="putsalemethod">
                <div className="custom-container-small">
                    <div className="selectmethodmain">
                        <div className="selectmethodleft">
                            <h6 className="selectmethodhead">Select method</h6>
                            <Nav variant="pills" activeKey={activeTab} onSelect={handleSelect}>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                            <path d="M11.4975 18.3058C11.0558 18.3074 10.6308 18.1308 10.3191 17.8174L3.78832 11.2883C3.61804 11.1186 3.48665 10.9139 3.4032 10.6885C3.31975 10.463 3.28624 10.2221 3.30498 9.98245L3.72165 4.51078C3.75044 4.11243 3.92209 3.73787 4.20504 3.45599C4.48798 3.17412 4.86319 3.00389 5.26165 2.97661L10.7333 2.55995C10.7766 2.55078 10.8191 2.55078 10.8625 2.55078C11.3041 2.55078 11.7266 2.72578 12.0375 3.03911L18.5691 9.56745C18.724 9.72222 18.8468 9.90598 18.9306 10.1082C19.0144 10.3105 19.0575 10.5273 19.0575 10.7462C19.0575 10.9651 19.0144 11.1819 18.9306 11.3842C18.8468 11.5864 18.724 11.7702 18.5691 11.9249L12.6758 17.8174C12.5214 17.9727 12.3378 18.0958 12.1356 18.1796C11.9333 18.2635 11.7164 18.3063 11.4975 18.3058ZM7.96165 5.54411C7.68758 5.54419 7.41775 5.61186 7.17607 5.74112C6.93439 5.87039 6.72832 6.05726 6.57611 6.28518C6.4239 6.5131 6.33025 6.77505 6.30345 7.04781C6.27665 7.32057 6.31753 7.59573 6.42247 7.84892C6.52741 8.10211 6.69317 8.32552 6.90507 8.49934C7.11696 8.67317 7.36846 8.79206 7.63728 8.84548C7.9061 8.8989 8.18394 8.8852 8.4462 8.8056C8.70846 8.726 8.94705 8.58294 9.14082 8.38911L9.14665 8.38411L9.15248 8.37828L9.14582 8.38411C9.37747 8.15042 9.53477 7.85338 9.59788 7.53043C9.66099 7.20749 9.62709 6.87308 9.50045 6.56937C9.37382 6.26566 9.16011 6.00623 8.88627 5.82378C8.61243 5.64132 8.29071 5.54402 7.96165 5.54411Z" fill="white" />
                                        </svg>
                                        Fixed price</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                            <path d="M13.75 6C13.75 6.79565 13.4339 7.55871 12.8713 8.12132C12.3087 8.68393 11.5456 9 10.75 9C9.95435 9 9.19129 8.68393 8.62868 8.12132C8.06607 7.55871 7.75 6.79565 7.75 6C7.75 5.20435 8.06607 4.44129 8.62868 3.87868C9.19129 3.31607 9.95435 3 10.75 3C11.5456 3 12.3087 3.31607 12.8713 3.87868C13.4339 4.44129 13.75 5.20435 13.75 6Z" fill="white" />
                                            <path d="M18.75 8C18.75 8.53043 18.5393 9.03914 18.1642 9.41421C17.7891 9.78929 17.2804 10 16.75 10C16.2196 10 15.7109 9.78929 15.3358 9.41421C14.9607 9.03914 14.75 8.53043 14.75 8C14.75 7.46957 14.9607 6.96086 15.3358 6.58579C15.7109 6.21071 16.2196 6 16.75 6C17.2804 6 17.7891 6.21071 18.1642 6.58579C18.5393 6.96086 18.75 7.46957 18.75 8Z" fill="white" />
                                            <path d="M14.75 15C14.75 13.9391 14.3286 12.9217 13.5784 12.1716C12.8283 11.4214 11.8109 11 10.75 11C9.68913 11 8.67172 11.4214 7.92157 12.1716C7.17143 12.9217 6.75 13.9391 6.75 15V18H14.75V15Z" fill="white" />
                                            <path d="M6.75 8C6.75 8.53043 6.53929 9.03914 6.16421 9.41421C5.78914 9.78929 5.28043 10 4.75 10C4.21957 10 3.71086 9.78929 3.33579 9.41421C2.96071 9.03914 2.75 8.53043 2.75 8C2.75 7.46957 2.96071 6.96086 3.33579 6.58579C3.71086 6.21071 4.21957 6 4.75 6C5.28043 6 5.78914 6.21071 6.16421 6.58579C6.53929 6.96086 6.75 7.46957 6.75 8Z" fill="white" />
                                            <path d="M16.75 17.9998V14.9998C16.7514 13.9831 16.4933 12.9828 16 12.0938C16.4433 11.9804 16.9068 11.9697 17.3549 12.0625C17.803 12.1554 18.224 12.3494 18.5857 12.6297C18.9474 12.91 19.2403 13.2693 19.4421 13.68C19.6439 14.0908 19.7492 14.5422 19.75 14.9998V17.9998H16.75Z" fill="white" />
                                            <path d="M5.5 12.0933C5.00675 12.9824 4.7486 13.9826 4.75 14.9993V17.9993H1.75V14.9993C1.74981 14.5413 1.85446 14.0894 2.05595 13.6782C2.25743 13.2669 2.55039 12.9072 2.91238 12.6267C3.27437 12.3462 3.69578 12.1523 4.14431 12.0598C4.59284 11.9674 5.05658 11.9788 5.5 12.0933Z" fill="white" />
                                        </svg>
                                        Open for bids</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            {activeTab === 'link-1' && (
                                <>
                                    <h6 className="pricesalepara">Price</h6>
                                    <input onChange={(e) => setFee(e.target.value)} type="number" placeholder='Amount' className="pricesaleinput" />
                                    {/* <div className="pricesaledata">
                                        <div className="pricesaletextleft">
                                            <h6 className="feespara">Fees</h6>
                                            <p className="servicepara">Service Fee</p>
                                        </div>
                                        <h6 className="percentagepara">{dataset?.launchpad[0]?.platformFee}%
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                <path d="M12 22.5C17.5 22.5 22 18 22 12.5C22 7 17.5 2.5 12 2.5C6.5 2.5 2 7 2 12.5C2 18 6.5 22.5 12 22.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12 8.5V13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.9945 16.5H12.0035" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </h6>
                                    </div> */}
                                    {loader ?
                                        <button className="bluebtn" > <img
                                            width={17}
                                            style={{
                                                filter:
                                                    "invert(99%) sepia(1%) saturate(2%) hue-rotate(168deg) brightness(120%) contrast(100%)",
                                            }}
                                            src="https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg"
                                            alt="loader"
                                        /></button>
                                        :
                                        <button className="bluebtn" onClick={completeListing}>Complete Listing</button>
                                    }
                                </>
                            )}
                            {activeTab === 'link-2' && (
                                <>
                                    {/* <h6 className="pricesalepara">Price</h6>
                                    <input onChange={(e) => setFee(e.target.value)}  type="text" placeholder='Amount' className="pricesaleinput" /> */}
                                    <h6 className="pricesalepara">Duration</h6>
                                    <div className="pricesaleinputmain">
                                        {/* <input type="date" placeholder='Duration' className="pricesaleinput" /> */}
                                        <input
                                            onChange={(e) => HandleDate(e.target.value)}
                                            // value={dateValue}
                                            min={new Date().toISOString().slice(0, -8)}
                                            className="pricesaleinput"
                                            type="datetime-local"
                                            placeholder="6 Months"
                                        />
                                        <svg style={{ pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='calendarimg'>
                                            <path d="M16.75 3.56V2C16.75 1.59 16.41 1.25 16 1.25C15.59 1.25 15.25 1.59 15.25 2V3.5H8.74999V2C8.74999 1.59 8.40999 1.25 7.99999 1.25C7.58999 1.25 7.24999 1.59 7.24999 2V3.56C4.54999 3.81 3.23999 5.42 3.03999 7.81C3.01999 8.1 3.25999 8.34 3.53999 8.34H20.46C20.75 8.34 20.99 8.09 20.96 7.81C20.76 5.42 19.45 3.81 16.75 3.56Z" fill="#862FC0" />
                                            <path d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.11 18.2998 9 18.3698 8.88 18.4198C8.76 18.4698 8.63 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C8 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 8 16.6298 8.12 16.5798C8.36 16.4798 8.64 16.4798 8.88 16.5798C9 16.6298 9.11 16.6998 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.42 14.3798C9.37 14.4998 9.3 14.6098 9.21 14.7098C9.11 14.7998 9 14.8698 8.88 14.9198C8.76 14.9698 8.63 14.9998 8.5 14.9998C8.37 14.9998 8.24 14.9698 8.12 14.9198C8 14.8698 7.89 14.7998 7.79 14.7098C7.7 14.6098 7.63 14.4998 7.58 14.3798C7.53 14.2598 7.5 14.1298 7.5 13.9998C7.5 13.8698 7.53 13.7398 7.58 13.6198C7.63 13.4998 7.7 13.3898 7.79 13.2898C7.89 13.1998 8 13.1298 8.12 13.0798C8.36 12.9798 8.64 12.9798 8.88 13.0798C9 13.1298 9.11 13.1998 9.21 13.2898C9.3 13.3898 9.37 13.4998 9.42 13.6198C9.47 13.7398 9.5 13.8698 9.5 13.9998C9.5 14.1298 9.47 14.2598 9.42 14.3798ZM12.71 14.7098C12.61 14.7998 12.5 14.8698 12.38 14.9198C12.26 14.9698 12.13 14.9998 12 14.9998C11.87 14.9998 11.74 14.9698 11.62 14.9198C11.5 14.8698 11.39 14.7998 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.39 13.1998 11.5 13.1298 11.62 13.0798C11.86 12.9698 12.14 12.9698 12.38 13.0798C12.5 13.1298 12.61 13.1998 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098Z" fill="#862FC0" />
                                        </svg>
                                    </div>
                                    {/* <div className="pricesaledata">
                                        <div className="pricesaletextleft">
                                            <h6 className="feespara">Fees</h6>
                                            <p className="servicepara">Service Fee</p>
                                        </div>
                                        <h6 className="percentagepara">{dataset?.launchpad[0]?.platformFee}%
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                <path d="M12 22.5C17.5 22.5 22 18 22 12.5C22 7 17.5 2.5 12 2.5C6.5 2.5 2 7 2 12.5C2 18 6.5 22.5 12 22.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12 8.5V13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.9945 16.5H12.0035" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </h6>
                                    </div> */}
                                    {/* handleShow */}
                                    {loader ?
                                        <button className="bluebtn" > <img
                                            width={17}
                                            style={{
                                                filter:
                                                    "invert(99%) sepia(1%) saturate(2%) hue-rotate(168deg) brightness(120%) contrast(100%)",
                                            }}
                                            src="https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg"
                                            alt="loader"
                                        /></button>
                                        :
                                        <button className="bluebtn" onClick={completeListing2}>Complete Listing</button>
                                    }
                                    
                                </>
                            )}
                        </div>
                        <div className="selctmethodright">
                            <section className="live-auction">
                                <div className="custom-container">
                                    <div className="bottom-cards">
                                        <div className="main-card">
                                            <div className="main-img">
                                                <img
                                                    src={dataset?.nft}
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
                                                            {dataset?.launchpad[0]?.name}
                                                            <img
                                                                src="/assets/landing/static/verify-icon.svg"
                                                                alt="img"
                                                                className="img-fluid"
                                                            />
                                                        </h6>
                                                        {/* <h5> {dataset?.launchpad[0]?.name}</h5> */}
                                                    </div>
                                                </div>
                                                <div className="twice-pricebid">
                                                    <div className="left-side">
                                                        <h6>Price</h6>
                                                        <h5>
                                                            <img
                                                                src="/assets/landing/static/price-icon.svg"
                                                                alt="img"
                                                                className="img-fluid"
                                                            />
                                                            {dataset?.price} <span>Core</span>
                                                        </h5>
                                                    </div>
                                                    {/* <div className="left-side">
                                                        <h6>Highest bid</h6>
                                                        <h5>
                                                            276.45 <span>Core</span>
                                                        </h5>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

            <Modal className='buymodal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Your item is now listed for sale</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="buynowimg">
                        <img src="\assets\nftdetailassets\mainnft.png" alt="buynowinnerimg" className="buynowinnerimg" />
                    </div>
                    <div className="sharyourlisting">
                        <p className="sharelistingpara">Share your Listing</p>
                        <div className="socialicons">
                            <div className="innersocialicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <g clip-path="url(#clip0_206_13287)">
                                        <path d="M10.5003 1.6665C12.7645 1.6665 13.047 1.67484 13.9353 1.7165C14.8228 1.75817 15.427 1.89734 15.9587 2.104C16.5087 2.31567 16.972 2.60234 17.4353 3.06484C17.8591 3.48142 18.187 3.98533 18.3962 4.5415C18.602 5.07234 18.742 5.67734 18.7837 6.56484C18.8228 7.45317 18.8337 7.73567 18.8337 9.99984C18.8337 12.264 18.8253 12.5465 18.7837 13.4348C18.742 14.3223 18.602 14.9265 18.3962 15.4582C18.1876 16.0147 17.8596 16.5187 17.4353 16.9348C17.0186 17.3584 16.5147 17.6863 15.9587 17.8957C15.4278 18.1015 14.8228 18.2415 13.9353 18.2832C13.047 18.3223 12.7645 18.3332 10.5003 18.3332C8.23616 18.3332 7.95366 18.3248 7.06533 18.2832C6.17782 18.2415 5.57366 18.1015 5.04199 17.8957C4.4856 17.6869 3.9816 17.359 3.56533 16.9348C3.1415 16.5183 2.8136 16.0144 2.60449 15.4582C2.39783 14.9273 2.25866 14.3223 2.21699 13.4348C2.17783 12.5465 2.16699 12.264 2.16699 9.99984C2.16699 7.73567 2.17533 7.45317 2.21699 6.56484C2.25866 5.6765 2.39783 5.07317 2.60449 4.5415C2.81302 3.98499 3.141 3.48094 3.56533 3.06484C3.98172 2.64086 4.48568 2.31295 5.04199 2.104C5.57366 1.89734 6.17699 1.75817 7.06533 1.7165C7.95366 1.67734 8.23616 1.6665 10.5003 1.6665ZM10.5003 5.83317C9.39526 5.83317 8.33545 6.27216 7.55405 7.05356C6.77265 7.83496 6.33366 8.89477 6.33366 9.99984C6.33366 11.1049 6.77265 12.1647 7.55405 12.9461C8.33545 13.7275 9.39526 14.1665 10.5003 14.1665C11.6054 14.1665 12.6652 13.7275 13.4466 12.9461C14.228 12.1647 14.667 11.1049 14.667 9.99984C14.667 8.89477 14.228 7.83496 13.4466 7.05356C12.6652 6.27216 11.6054 5.83317 10.5003 5.83317ZM15.917 5.62484C15.917 5.34857 15.8072 5.08362 15.6119 4.88827C15.4165 4.69292 15.1516 4.58317 14.8753 4.58317C14.5991 4.58317 14.3341 4.69292 14.1388 4.88827C13.9434 5.08362 13.8337 5.34857 13.8337 5.62484C13.8337 5.9011 13.9434 6.16606 14.1388 6.36141C14.3341 6.55676 14.5991 6.6665 14.8753 6.6665C15.1516 6.6665 15.4165 6.55676 15.6119 6.36141C15.8072 6.16606 15.917 5.9011 15.917 5.62484ZM10.5003 7.49984C11.1634 7.49984 11.7993 7.76323 12.2681 8.23207C12.7369 8.70091 13.0003 9.3368 13.0003 9.99984C13.0003 10.6629 12.7369 11.2988 12.2681 11.7676C11.7993 12.2364 11.1634 12.4998 10.5003 12.4998C9.83728 12.4998 9.2014 12.2364 8.73256 11.7676C8.26372 11.2988 8.00033 10.6629 8.00033 9.99984C8.00033 9.3368 8.26372 8.70091 8.73256 8.23207C9.2014 7.76323 9.83728 7.49984 10.5003 7.49984Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_206_13287">
                                            <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="innersocialicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M18.9485 4.33596L16.3078 16.7891C16.1086 17.668 15.5891 17.8867 14.8508 17.4727L10.8274 14.5078L8.88596 16.375C8.67111 16.5899 8.49143 16.7696 8.07736 16.7696L8.36643 12.6719L15.8235 5.93362C16.1477 5.64455 15.7531 5.4844 15.3196 5.77346L6.1008 11.5781L2.13205 10.336C1.26877 10.0664 1.25315 9.47268 2.31174 9.05862L17.8352 3.07815C18.5539 2.80862 19.1828 3.2383 18.9485 4.33596Z" fill="white" />
                                </svg>
                            </div>
                            <div className="innersocialicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M17.1562 7.96875C16.8125 7.96875 16.5 8.0625 16.2188 8.1875C15.9688 8.3125 15.6562 8.3125 15.375 8.15625C14.4375 7.65625 13.3438 7.3125 12.1875 7.125C11.6563 7.0625 11.3125 6.53125 11.4375 6L11.9062 4.03125C11.9375 3.9375 12 3.875 12.0938 3.90625L13.875 4.3125C14.1875 4.375 14.4375 4.625 14.5313 4.9375C14.7813 5.59375 15.4375 6.0625 16.1875 6.0625C17.1562 6.0625 17.9375 5.28125 17.9375 4.3125C17.9375 3.34375 17.1562 2.5625 16.1875 2.5625C15.6875 2.5625 15.25 2.75 14.9375 3.09375C14.6875 3.34375 14.3438 3.4375 14.0312 3.375L11.7188 2.84375C11.4688 2.78125 11.2188 2.9375 11.1562 3.15625L10.5 5.84375C10.3438 6.5 9.78125 7 9.125 7.0625C7.84375 7.21875 6.65625 7.5625 5.65625 8.09375C5.40625 8.21875 5.09375 8.25 4.84375 8.125C4.5625 8 4.25 7.90625 3.9375 7.90625C2.78125 7.90625 1.84375 8.84375 1.84375 10C1.84375 10.5625 2.0625 11.0938 2.4375 11.4688C2.625 11.6562 2.71875 11.875 2.71875 12.125C2.71875 12.1562 2.71875 12.1875 2.71875 12.2187C2.71875 13.6562 3.5625 15 5.09375 15.9687C6.5625 16.9062 8.5 17.4375 10.5625 17.4375C12.625 17.4375 14.5625 16.9062 16.0312 15.9687C17.5625 14.9687 18.4062 13.6562 18.4062 12.2187V12.1875C18.4062 11.9375 18.5 11.6875 18.7188 11.5C19.125 11.125 19.375 10.5938 19.375 10C19.25 8.90625 18.3125 7.96875 17.1562 7.96875ZM6.75 11.25C6.75 10.5625 7.34375 10 8.03125 10C8.71875 10 9.28125 10.5625 9.28125 11.25C9.28125 11.9375 8.71875 12.5 8.03125 12.5C7.3125 12.5 6.75 11.9375 6.75 11.25ZM13.375 14.7812C12.7813 15.375 11.8125 15.6875 10.5 15.6875C9.1875 15.6875 8.28125 15.4062 7.65625 14.8125C7.5 14.6562 7.4375 14.4062 7.5625 14.1875C7.71875 13.9062 8.09375 13.875 8.3125 14.0937C8.71875 14.5 9.4375 14.7187 10.5 14.7187C11.5625 14.7187 12.2812 14.5312 12.6875 14.0937C12.875 13.9062 13.1875 13.9062 13.375 14.0937C13.5625 14.3125 13.5625 14.5937 13.375 14.7812ZM13 12.5C12.3125 12.5 11.7188 11.9375 11.7188 11.25C11.7188 10.5625 12.3125 10 13 10C13.6875 10 14.25 10.5625 14.25 11.25C14.25 11.9375 13.6875 12.5 13 12.5Z" fill="white" />
                                </svg>
                            </div>
                            <div className="innersocialicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M17.544 4.99184C15.2522 3.27684 13.0564 3.32504 13.0564 3.32504L12.832 3.58144C15.5566 4.39884 16.8228 5.60084 16.8228 5.60084C12.9246 3.45464 7.95939 3.47004 3.90479 5.60084C3.90479 5.60084 5.21899 4.33464 8.10399 3.51724L7.94379 3.32484C7.94379 3.32484 5.76399 3.27684 3.45619 4.99164C3.45619 4.99164 1.14819 9.14264 1.14819 14.2554C1.14819 14.2554 2.49459 16.5634 6.03659 16.6756C6.03659 16.6756 6.62959 15.9704 7.11039 15.3614C5.07499 14.7524 4.30559 13.4862 4.30559 13.4862C5.58439 14.2864 6.87739 14.7872 8.48879 15.105C11.1104 15.6446 14.3714 15.0898 16.807 13.4862C16.807 13.4862 16.0056 14.7844 13.906 15.3774C14.3868 15.9704 14.9638 16.6596 14.9638 16.6596C18.5058 16.5474 19.852 14.2394 19.852 14.2556C19.8518 9.14284 17.544 4.99184 17.544 4.99184ZM7.51099 12.765C6.61339 12.765 5.87619 11.9796 5.87619 11.002C5.94179 8.66064 9.09659 8.66784 9.14579 11.002C9.14579 11.9796 8.42439 12.765 7.51099 12.765ZM13.3608 12.765C12.4632 12.765 11.726 11.9796 11.726 11.002C11.798 8.66524 14.9134 8.66424 14.9956 11.002C14.9956 11.9796 14.2744 12.765 13.3608 12.765Z" fill="white" />
                                </svg>
                            </div>
                            <div className="innersocialicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M3.63444 5.85601C3.65684 5.63954 3.5726 5.42551 3.40758 5.27986L1.72686 3.29631V3H6.94535L10.979 11.6667L14.5253 3L19.5 3.00003V3.29631L18.063 4.64608C17.9391 4.73856 17.8777 4.89069 17.9034 5.0412V14.9588C17.8777 15.1093 17.9391 15.2614 18.063 15.3539L19.4664 16.7037V17H12.4076V16.7037L13.8613 15.321C14.0042 15.1811 14.0042 15.1399 14.0042 14.926V6.9095L9.96222 16.967H9.41603L4.71005 6.9095V13.6502C4.67088 13.9336 4.76693 14.219 4.97055 14.4239L6.8614 16.6707V16.967H1.5V16.6707L3.39084 14.4239C3.59296 14.2186 3.68338 13.9313 3.63444 13.6502V5.85601Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="buymodalbtns">
                        <button className="bluebtn">View Item</button>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default Putonsalemethod