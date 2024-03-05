import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Environment from '@/utils/Enviroment';
import moment from 'moment';
const Activity = ({ idnft }) => {
    const api_url = Environment.api_url;
    const [dataset3, setdataset3] = useState();

    const activityData = [
        {
            id: 1,
            username: 'Azuki #2456',
            address: '0xb3aa99234...92a0',
            action: 'accepted bid',
            amount: '6.32 wETH',
            performedBy: '0x7bbe7f4d5...ef05',
            timestamp: '2 minutes ago',
            imgUrl: '/assets/dummy-imgs/collection/a1.png'
        },
        {
            id: 2,
            username: 'Azuki #2456',
            address: '0xb3aa99234...92a0',
            action: 'accepted bid',
            amount: '6.32 wETH',
            performedBy: '0x7bbe7f4d5...ef05',
            timestamp: '2 minutes ago',
            imgUrl: '/assets/dummy-imgs/collection/a2.png'
        },
        {
            id: 3,
            username: 'Azuki #2456',
            address: '0xb3aa99234...92a0',
            action: 'accepted bid',
            amount: '6.32 wETH',
            performedBy: '0x7bbe7f4d5...ef05',
            timestamp: '2 minutes ago',
            imgUrl: '/assets/dummy-imgs/collection/a3.png'
        },
        {
            id: 4,
            username: 'Azuki #2456',
            address: '0xb3aa99234...92a0',
            action: 'accepted bid',
            amount: '6.32 wETH',
            performedBy: '0x7bbe7f4d5...ef05',
            timestamp: '2 minutes ago',
            imgUrl: '/assets/dummy-imgs/collection/a4.png'
        },

    ];

    const getNftActivityDetails = async () => {
        let tok = localStorage.getItem("accessToken");
        var config = ''

        config = {
            method: "get",
            url: `${api_url}/launchpads/${idnft}/activities?offset=1&limit=10&orderField=createdAt&orderDirection=-1`,
            headers: {
                authorization: `Bearer ` + tok
            },
        }

        axios(config)
            .then(function (response) {
                setdataset3(response?.data?.data?.collectionActivites)
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
        getNftActivityDetails()
        // var val = window.location.href;
        // setlinkuser(val)
        // setlinktext('NFT Detail Here TokenID = #' + dataset?.tokenID)
    }, [idnft])

    return (
        <>
            <section className="activity-section">
                <div className="parent-activity">
                    <div className="left-side">
                        {dataset3?.map(item => (
                            <div key={item.id}>
                                {item?.type === 'sell' ?
                                    (
                                        <div className="single-item" >
                                            <div className="profile">
                                                <img src={item.nft} alt="img" className='img-fluid' />
                                            </div>
                                            <div className="right-content">
                                                <h5>{item?.launchpadId?.name} #{item.tokenId}</h5>
                                                <h6>
                                                    <span className='gradient-1'></span>   {item?.from?.slice(0, 8)}...
                                                    {item?.from?.slice(
                                                        item?.from?.length - 6,
                                                        item?.from?.length
                                                    )}{' '}
                                                    <span className='text-span-color'>Transferred To</span>{' '}
                                                    {/* {item.amount}{' '} */}
                                                    {/* <span className='text-span-color'> by </span> */}
                                                    <span className='gradient-2'></span>{item?.to?.slice(0, 8)}...
                                                    {item?.to?.slice(
                                                        item?.to?.length - 6,
                                                        item?.to?.length
                                                    )}
                                                </h6>
                                                <p>{moment(item?.createdAt).fromNow()}</p>
                                            </div>
                                        </div>
                                    )
                                    :
                                    item?.type === 'bid' ?
                                        (
                                            <div className="single-item" key={item.id}>
                                                <div className="profile">
                                                    <img src={item.nft} alt="img" className='img-fluid' />
                                                </div>
                                                <div className="right-content">
                                                    <h5>{item?.launchpadId?.name} #{item.tokenId}</h5>
                                                    <h6>
                                                        <span className='gradient-1'></span>   {item?.from?.slice(0, 8)}...
                                                        {item?.from?.slice(
                                                            item?.from?.length - 6,
                                                            item?.from?.length
                                                        )}{' '}
                                                        <span className='text-span-color'>Bid For</span>{' '}
                                                        {item.price} Core{' '}
                                                        {/* <span className='text-span-color'> by </span> */}
                                                        <span className='gradient-2'></span>
                                                    </h6>
                                                    <p>{moment(item?.createdAt).fromNow()}</p>
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="single-item" key={item.id}>
                                                <div className="profile">
                                                    <img src={item.nft} alt="img" className='img-fluid' />
                                                </div>
                                                <div className="right-content">
                                                    <h5>{item?.launchpadId?.name} #{item.tokenId}</h5>
                                                    <h6>
                                                        <span className='gradient-1'></span>   {item?.from?.slice(0, 8)}...
                                                        {item?.from?.slice(
                                                            item?.from?.length - 6,
                                                            item?.from?.length
                                                        )}{' '}
                                                        <span className='text-span-color'>Listed For</span>{' '}
                                                        {item.price} Core{' '}
                                                        {/* <span className='text-span-color'> by </span> */}
                                                        <span className='gradient-2'></span>
                                                    </h6>
                                                    <p>{moment(item?.createdAt).fromNow()}</p>
                                                </div>
                                            </div>
                                        )
                                }

                            </div>

                        ))}
                    </div>
                    {/* <div className="right-side">
                        <h6 className="heading-text">Filters</h6>
                        <div className="all-filters-item">
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17.528 9.66398L10.332 2.468C10.04 2.18 9.63998 2 9.19999 2H3.60001C2.71599 2 2 2.71599 2 3.60001V9.19999C2 9.64399 2.18 10.044 2.47201 10.332L9.67201 17.532C9.96001 17.82 10.36 18 10.8 18C11.24 18 11.644 17.82 11.932 17.532L17.532 11.932C17.82 11.64 18 11.24 18 10.8C18 10.356 17.82 9.95599 17.528 9.66398ZM4.80001 6.00001C4.136 6.00001 3.60001 5.46402 3.60001 4.80001C3.60001 4.136 4.136 3.60001 4.80001 3.60001C5.46402 3.60001 6.00001 4.136 6.00001 4.80001C6.00001 5.46402 5.46398 6.00001 4.80001 6.00001Z" fill="white" />
                            </svg> Listing</a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 10.108L10 2L15 10.108L10 13L5 10.108Z" fill="white" />
                                <path d="M10 14.5564L15.4313 11.1846L10 18.9064L4.44067 11.1846L10 14.5564Z" fill="white" />
                            </svg> Purchase</a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M8.30283 18.4925C8.52859 18.589 8.79109 18.5085 8.92295 18.3002L14.9228 8.76707C15.02 8.61278 15.0258 8.41795 14.9379 8.25879C14.85 8.09912 14.6821 7.99999 14.4999 7.99999H10.4956L11.9849 2.08984C12.0449 1.85108 11.9233 1.60448 11.6973 1.50732C11.4727 1.41066 11.2085 1.49169 11.0772 1.69968L5.07731 11.2328C4.98015 11.3871 4.97428 11.5819 5.06218 11.7411C5.15008 11.9007 5.31804 11.9999 5.50017 11.9999H9.50447L8.01524 17.91C7.95517 18.1488 8.07674 18.3954 8.30283 18.4925Z" fill="white" />
                            </svg> Sales</a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5.82285 1.66682C5.60668 1.67327 5.40151 1.76369 5.2508 1.91884L1.92252 5.2478C1.84479 5.32515 1.78311 5.41702 1.74103 5.51828C1.69894 5.61954 1.67728 5.72812 1.67728 5.83778C1.67728 5.94744 1.69894 6.05602 1.74103 6.15728C1.78311 6.25854 1.84479 6.35051 1.92252 6.42785L5.2508 9.75691C5.32692 9.8394 5.41893 9.90555 5.52131 9.95155C5.62368 9.99755 5.7343 10.0224 5.84652 10.0245C5.95873 10.0266 6.07021 10.006 6.17425 9.96395C6.2783 9.92187 6.37276 9.85923 6.45196 9.77969C6.53115 9.70015 6.59344 9.60538 6.63508 9.50114C6.67671 9.3969 6.69684 9.28531 6.69424 9.17309C6.69164 9.06086 6.66638 8.95031 6.61996 8.84811C6.57355 8.74591 6.50694 8.65419 6.42415 8.5784L4.51949 6.67334H17.4865C17.704 6.66855 17.911 6.57879 18.0631 6.42324C18.2153 6.26768 18.3005 6.05866 18.3005 5.84105C18.3005 5.62344 18.2153 5.41451 18.0631 5.25895C17.911 5.1034 17.704 5.01364 17.4865 5.00885H4.51299L6.42415 3.09725C6.54475 2.98064 6.6273 2.83032 6.66098 2.66597C6.69466 2.50161 6.67789 2.3309 6.61288 2.17625C6.54786 2.02159 6.43764 1.89018 6.29666 1.79927C6.15568 1.70837 5.99052 1.6622 5.82285 1.66682ZM14.1566 9.99096C13.9906 9.99098 13.8285 10.0406 13.691 10.1335C13.5535 10.2264 13.4469 10.3582 13.3848 10.5121C13.3228 10.666 13.3082 10.835 13.3429 10.9973C13.3777 11.1596 13.4601 11.3078 13.5796 11.4229L15.4843 13.3264H2.51732C2.40651 13.3239 2.29633 13.3437 2.19324 13.3844C2.09016 13.4251 1.99625 13.4861 1.91702 13.5636C1.83779 13.6411 1.77484 13.7337 1.73186 13.8359C1.68889 13.9381 1.66675 14.0478 1.66675 14.1586C1.66675 14.2695 1.68889 14.3792 1.73186 14.4814C1.77484 14.5836 1.83779 14.6762 1.91702 14.7537C1.99625 14.8312 2.09016 14.8922 2.19324 14.9329C2.29633 14.9736 2.40651 14.9933 2.51732 14.9908H15.4908L13.5796 16.9024C13.5001 16.9794 13.4366 17.0714 13.393 17.1731C13.3494 17.2749 13.3266 17.3843 13.3258 17.495C13.325 17.6057 13.3463 17.7154 13.3884 17.8178C13.4305 17.9201 13.4926 18.0131 13.5711 18.0911C13.6496 18.1692 13.7428 18.2308 13.8454 18.2724C13.948 18.314 14.0578 18.3347 14.1685 18.3333C14.2791 18.3319 14.3884 18.3083 14.4899 18.2642C14.5914 18.22 14.683 18.1561 14.7595 18.076L18.0878 14.7519C18.1655 14.6745 18.2272 14.5827 18.2693 14.4814C18.3114 14.3802 18.333 14.2716 18.333 14.1619C18.333 14.0523 18.3114 13.9437 18.2693 13.8424C18.2272 13.7412 18.1655 13.6492 18.0878 13.5718L14.7595 10.2429C14.6812 10.1624 14.5874 10.0986 14.4838 10.0553C14.3802 10.012 14.2689 9.99009 14.1566 9.99096Z" fill="white" />
                            </svg> Transfer</a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M14.1807 7.12247C14.0798 7.01891 13.9382 6.97185 13.7997 6.99591C13.6609 7.01988 13.541 7.11191 13.4767 7.24397C13.2552 7.69832 12.9739 8.11585 12.643 8.48494C12.676 8.21832 12.6926 7.9501 12.6926 7.68116C12.6926 7.16513 12.6271 6.63409 12.4979 6.10262C12.0731 4.35696 10.9591 2.88068 9.44163 2.05233C9.30952 1.98024 9.15211 1.98277 9.02213 2.05908C8.89214 2.13543 8.80702 2.27539 8.79536 2.43196C8.67707 4.01834 7.90338 5.46159 6.67152 6.39259C6.65522 6.405 6.63903 6.41756 6.62285 6.43006C6.58933 6.45597 6.55772 6.48047 6.5282 6.50103C6.52358 6.50428 6.51899 6.50759 6.5145 6.511C5.73975 7.09685 5.10049 7.87779 4.66574 8.76963C4.22399 9.67679 4 10.6503 4 11.6629C4 12.1788 4.06548 12.7098 4.19463 13.2414C4.87621 16.0432 7.26353 18 10.0002 18C13.3085 18 16 15.1572 16 11.6629C16 9.93979 15.3539 8.32729 14.1807 7.12247Z" fill="white" />
                            </svg> Burns</a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M16.7307 4.37008C15.9025 3.48659 14.766 3 13.5304 3C12.6068 3 11.761 3.28717 11.0164 3.85348C10.6406 4.13933 10.3002 4.48906 10 4.89725C9.69995 4.48918 9.35938 4.13933 8.98352 3.85348C8.23901 3.28717 7.39319 3 6.4696 3C5.23401 3 4.09741 3.48659 3.26917 4.37008C2.45081 5.24325 2 6.43613 2 7.72914C2 9.05996 2.50427 10.2782 3.58691 11.563C4.55542 12.7123 5.94739 13.879 7.55933 15.23C8.10974 15.6914 8.73364 16.2144 9.38147 16.7714C9.55261 16.9188 9.77222 17 10 17C10.2277 17 10.4474 16.9188 10.6183 16.7717C11.2661 16.2145 11.8904 15.6913 12.441 15.2297C14.0527 13.8789 15.4447 12.7123 16.4132 11.5629C17.4958 10.2782 18 9.05996 18 7.72902C18 6.43613 17.5492 5.24325 16.7307 4.37008Z" fill="white" />
                            </svg> Likes</a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M11.3219 7.28124L8.41418 4.37354L4.61816 8.16954L7.52587 11.0773C8.71042 9.88711 10.1345 8.46867 11.3219 7.28124Z" fill="white" />
                                <path d="M9.21938 4.37366L11.3188 6.47304C11.4609 6.61394 11.8122 6.96822 11.95 7.10429C12.1151 7.26309 12.336 7.35084 12.5651 7.34873C12.7942 7.34661 13.0133 7.2548 13.1755 7.09298C13.3377 6.93116 13.43 6.71223 13.4327 6.48313C13.4353 6.25404 13.3481 6.03303 13.1896 5.86751L9.82493 2.5028C9.01123 1.71226 7.80194 2.93342 8.58817 3.74241C8.72621 3.88201 9.07894 4.23109 9.21938 4.37366Z" fill="white" />
                                <path d="M6.11189 12.9455C6.23706 13.0625 6.39354 13.1406 6.56228 13.1704C6.73103 13.2001 6.90479 13.1802 7.06243 13.113C7.22006 13.0459 7.35479 12.9343 7.45023 12.792C7.54567 12.6497 7.59771 12.4828 7.60003 12.3114C7.61777 11.7794 7.02498 11.4346 6.71742 11.0747L4.61805 8.97525C4.47557 8.83407 4.12486 8.48026 3.9868 8.34403C3.82166 8.18563 3.60101 8.09825 3.37219 8.10063C3.14337 8.10302 2.9246 8.19497 2.76279 8.35678C2.60098 8.51859 2.50902 8.73737 2.50664 8.96619C2.50426 9.19501 2.59164 9.41565 2.75004 9.5808L6.11189 12.9455Z" fill="white" />
                                <path d="M17.583 15.2646L14.0097 11.6942C13.8293 11.5216 13.6282 11.641 13.4985 11.8056L10.5508 8.85791L10.1452 9.2635L9.10547 10.306L12.0503 13.2509L11.9389 13.3623C11.9121 13.3885 11.8908 13.4198 11.8762 13.4544C11.8616 13.489 11.8541 13.5261 11.8541 13.5637C11.8541 13.6012 11.8616 13.6383 11.8762 13.6729C11.8908 13.7075 11.9121 13.7388 11.9389 13.765L15.5093 17.3382C16.4009 18.2608 18.0151 17.5262 18 16.2757C18.0004 16.088 17.9638 15.9021 17.8922 15.7286C17.8207 15.5551 17.7156 15.3974 17.583 15.2646Z" fill="white" />
                                <path d="M10.5392 16.2044H10.245V15.5446C10.2446 15.2341 10.1211 14.9365 9.90154 14.717C9.68201 14.4975 9.38439 14.374 9.07393 14.3735H3.74694C3.43678 14.3741 3.13951 14.4977 2.92046 14.7173C2.70141 14.9369 2.57849 15.2344 2.57871 15.5446V16.2044H2.28168C2.20666 16.2055 2.13509 16.2361 2.08243 16.2895C2.02977 16.343 2.00025 16.415 2.00024 16.49C2.00024 16.5651 2.02976 16.6371 2.08241 16.6905C2.13507 16.744 2.20664 16.7746 2.28166 16.7757H10.5392C10.6148 16.7754 10.6872 16.7452 10.7406 16.6917C10.794 16.6382 10.8239 16.5656 10.8239 16.49C10.8239 16.4144 10.794 16.3419 10.7406 16.2884C10.6872 16.2349 10.6148 16.2047 10.5392 16.2044Z" fill="white" />
                            </svg> Bids</a>
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.1538 4.07666H4.61518C3.72301 4.07666 2.99976 4.79991 2.99976 5.69209V16.4616C2.99976 17.3538 3.72301 18.077 4.61518 18.077H12.1538C13.046 18.077 13.7693 17.3538 13.7693 16.4616V5.69209C13.7693 4.79991 13.046 4.07666 12.1538 4.07666Z" fill="white" />
                                <path d="M17 3.53828V14.3078C16.9987 14.7358 16.8281 15.146 16.5254 15.4487C16.2227 15.7513 15.8126 15.9219 15.3845 15.9232H14.8461V5.69218C14.8461 4.97812 14.5624 4.2933 14.0575 3.78838C13.5526 3.28346 12.8678 2.9998 12.1537 2.9998H6.32739C6.43849 2.68558 6.64405 2.4134 6.91591 2.2206C7.18777 2.02779 7.51261 1.92379 7.84589 1.92285H15.3845C15.8126 1.92413 16.2227 2.09474 16.5254 2.39741C16.8281 2.70009 16.9987 3.11023 17 3.53828Z" fill="white" />
                            </svg> Mints</a>
                        </div>
                    </div> */}
                </div>
            </section>
        </>
    );
};

export default Activity;
