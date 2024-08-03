'use client'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { changeLan } from "@/redux/slices/settingsSlice";
import { useSelector, useDispatch } from 'react-redux';




const Topupamountcard = () => {

  const dispatch = useDispatch();
  const language = useSelector((state) => state.lan.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      dispatch(changeLan(savedLanguage));
    }
  }, [dispatch]);


    const game = useSelector((state) => state.game.value)
    const user = useSelector((state) => state.user.user);
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ appearance: false, message: '' })
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user.loggedIn) {
            setError({ appearance: true, message: 'Please Login First' });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/get-code?code=${code}&game=${user.game}&uid=${user.uid}`, {
                headers: {
                    'Accept': 'application/json',
                    // No need for 'Content-Type' for GET requests
                },
                method: "GET",
            });

            const responseData = await response.json();
            console.log(responseData);

            if (!responseData.success) {
                return setError({ appearance: true, message: responseData.message });
            } else {
                let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];
                usersArray.push(user);
                localStorage.setItem('usersArray', JSON.stringify(usersArray));
                router.push(`/success/${code}`);
            }
        } catch (error) {
            setError({ appearance: true, message: error.message });
        } finally {
            setLoading(false);
        }
    }

    const freefiredata = [
        { name: 'US$ 1', heading: 'Diamond 100', bonus: language ==='en' ? "+ Bonus 10" : '+ مكافأة عام 10' },
        { name: 'US$ 2', heading: 'Diamond 210', bonus: language ==='en' ? "+ Bonus 21" :  '+ مكافأة عام  21   ' },
        { name: 'US$ 5', heading: 'Diamond 530', bonus: language ==='en' ? "+ Bonus 53" :  '+ مكافأة عام 53' },
        { name: 'US$ 10', heading: 'Diamond 1,080', bonus: language ==='en' ? "+ Bonus 10" :  '+ مكافأة عام 108' },
        { name: 'US$ 20', heading: 'Diamond 2,200', bonus: language ==='en' ? "+ Bonus 220" :  '+ مكافأة عام 220' },
    ]
    const blackcloverdata = [
        { name: '50', heading: 'Black Crystals 43' },
        { name: '100', heading: 'Black Crystals 88' },
        { name: '250', heading: ' Black Crystals 225' },
        { name: '500', heading: 'Black Crystals 470' },
        { name: '1000', heading: 'Black Crystals  980' },
    ]

    const [toggle, settoggle] = useState(true);


    const [selectedCard, setSelectedCard] = useState(null);

  

  const cards = [
    { id: 1, value: 50, price: "TND 1.95", reward:5 },
    { id: 2, value: 100, price: "TND 3.7", reward:10 },
    { id: 3, value: 210, price: "TND 7.4", reward:21 },
    { id: 4, value: 530, price: "TND 18.5", reward:53 },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };


  const [activeCard, setActiveCard] = useState(null);

  const cardss = [
    {
      id: 'r1f',
      imgSrc: 'https://cdn-gop.garenanow.com/gop/app/0000/100/067/rebate/0000/002/058/logo.png',
      altText: 'بطاقة رفع المستوى',
      title: language ==='en' ? "Level Up Pass" : "بطاقة رفع المستوى",
      price: "TND 3.7",
    },
    {
      id: 'r1h',
      imgSrc: 'https://cdn-gop.garenanow.com/gop/app/0000/100/067/item/0803/000/000/logo.png',
      altText: 'تصريح بوياه',
      title: language ==='en' ? "Booyah Pass Card" : "تصريح بوياه",
      price: "TND 11",
    },
  ];

  const handleCardClickk = (id) => {
    setActiveCard(id);
  };


  const [selectedId, setSelectedId] = useState(null);

  const handleCardClickkkk = (id) => {
    setSelectedId(id);
  };


  

  const [showMessage, setShowMessage] = useState(false);
  const errorMessageRef = useRef(null);

  const handleButtonClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  useEffect(() => {
    if (showMessage && errorMessageRef.current) {
      errorMessageRef.current.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        window.scrollBy(0, -100); 
      }, 500); 
    }
  }, [showMessage]);

  const [selected, setSelected] = useState(null);

  const [showButton, setShowButton] = useState(false);

  const handleClick = (id) => {
    if (selected === id) {
      setSelected(null);
      setShowButton(true); 
    } else {
      setSelected(id);
      setShowButton(true); 
    }
  };
  const [showMessagee, setShowMessagee] = useState(false);

  const [disable, setDisable] = useState(false);

  const handleClickk = () => {
    setShowMessagee((prev) => !prev); 
    setDisable((prev) => !prev)
  };
  
  
  const handleTabClick = (selected) => {
    settoggle(selected);
    setShowButton(false); 
  }

  const [latestCard, setLatestCard] = useState(cards.find(card => card.id === 1));
  
  const handleCardClicck = (card) => {
    setLatestCard(card);
  };

  const handleTabClickk = () => {
    setSelected(null);
    setShowButton(false);
    setShowMessagee((prev) => !prev); 
    // setSelectedCard(null)
    // setSelectedId(null)
  };


  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  

    return (
        <div dir={language ==='en' ? 'rtl' : 'ltr'} 
        className='w-fit mt-8 max-[1100px]:w-full' >
            <div className=' flex items-center
                justify-end gap-2'>
                <p className=' text-xl font-bold font-ar '>
                    {language ==='en' ? 'Payment Method' : 'كمية الشحن'}
                </p>
<div className=" flex items-center gap-2 text-lg/none text-text-title md:text-xl/none">
  <div className="grid items-center" data-marker="true">
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="col-start-1 row-start-1 text-2xl text-primary-red"
    >
      <path
        d="M0 3C0 1.34315 1.34315 0 3 0H21C22.6569 0 24 1.34315 24 3V15.7574C24 16.553 23.6839 17.3161 23.1213 17.8787L17.8787 23.1213C17.3161 23.6839 16.553 24 15.7574 24H3C1.34315 24 0 22.6569 0 21V3Z"
        fill="currentColor"
      />
    </svg>
    <div className="col-start-1 row-start-1 text-center text-base/none font-bold text-white">
      2
    </div>
  </div>
  <span className="font-bold" />
</div>
            </div>
            

      
<div
  dir={language === 'en' ? "ltr" : "rtl"}
  className="nowarp mt-5 fgfg
    w-[1000px] max-[760px]:items-start max-[1100px]:w-full max-[760px]:flex-col max-[760px]:h-fit
    relative mb-4 flex rounded-md bg-bg-tab p-1"
  role="tablist"
  aria-orientation="horizontal"
  style={{ backgroundColor: 'rgb(244 244 244 / calc(1 * 1))' }}
>

  <button
    className={`w-1/2 rounded-sm p-2.5 text-sm/none font-medium ${
      !toggle ? 'font-bold' : ''
    }`}
    id="headlessui-tabs-tab-:rv:"
    role="tab"
    type="button"
    aria-selected={!toggle ? "true" : "false"}
    tabIndex={!toggle ? 0 : -1}
    data-headlessui-state={!toggle ? "selected" : ""}
    aria-controls="headlessui-tabs-panel-:r11:"
    style={{
      backgroundColor: !toggle ? 'rgb(255 255 255 / calc(1 * 1))' : 'rgb(244 244 244 / calc(1 * 1))',
      color: !toggle ? 'rgb(216 26 13 / calc(1 * 1))' : 'inherit',
      fontWeight: !toggle ? 700 : 'normal',
      fontSize:"14px"
    }}
    onClick={() => {
      settoggle(false);
      handleClick();
    }}
  >
    {language === 'en' ? 'Purchase' : 'شراء'}
  </button>
  <button
    className={`w-1/2 rounded-sm p-2.5 text-sm/none font-medium ${
      toggle ? 'font-bold' : ''
    }`}
    id="headlessui-tabs-tab-:r10:"
    role="tab"
    type="button"
    aria-selected={toggle ? "true" : "false"}
    tabIndex={toggle ? 0 : -1}
    data-headlessui-state={toggle ? "selected" : ""}
    aria-controls="headlessui-tabs-panel-:r1j:"
    style={{
      backgroundColor: toggle ? 'rgb(255 255 255 / calc(1 * 1))' : 'rgb(244 244 244 / calc(1 * 1))',
      color: toggle ? 'rgb(216 26 13 / calc(1 * 1))' : 'inherit',
      fontWeight: toggle ? 700 : 'normal',
      fontSize:"14px"
    }}
    onClick={() => {
      handleTabClick('tab1');
      settoggle(true);
    }}
  >
    {language === 'en' ? 'Garena Voucher' : 'قسيمة غارينا'}
  </button>
</div>







{showMessage && (
        <div
        ref={errorMessageRef}
          style={{
            color: "#D81A0D",
            marginTop: "10px",
            fontWeight: "500",
            marginBottom: "10px",
          }}
          dir={language === 'en' ? "ltr" : "ltr"}
        >
          {/* {language === 'en' ? "Can't proceed card payment for now. Please use another method." : 'The payment cannot be completed using the card now. Please use another method'} */}
          Can't proceed card payment for now. Please use another method.
        </div>
      )}


  {toggle === true ? (
        <div className='w-[1000px] max-[760px]:items-start h-[450px] flex border border-[#eeeeee] mt-5 max-[1100px]:w-full max-[760px]:flex-col-reverse max-[760px]:h-fit'>
          <div className='h-full w-[50%] flex flex-col items-center justify-between py-8 px-10 max-[760px]:w-full max-[760px]:gap-5'>
            {game === 'freefire' &&
              freefiredata?.map((offer) => {
                return (
                  <Offers
                  
                   key={offer.name} name={offer.name} bonus={offer.bonus} heading={offer.heading} />
                )
              })
            }

            {game === 'blackclover' &&
              blackcloverdata?.map((offer) => {
                return (
                  <BCOffers key={offer.name} name={offer.name} heading={offer.heading} />
                )
              })
            }
          </div>
          <div className='h-full w-[50%] py-8 px-10 flex items-end justify-start flex-col max-[760px]:w-full'>

          <img class="h-[50px] w-[50px] object-contain" src="https://cdn-gop.garenanow.com/webmain/static/open_platform/images/icon_ppc.png"/>



            <p 
            style={{
               fontSize:"13px"
            }}
            className={`text-sm ${language === 'en' ? 'text-left my-2' : 'text-right'} font-medium text-[#757575] font-ar`}>
              {language === 'en' ?
                'You can redeem your Garena voucher here. Garena vouchers can be purchased through our official distributors' :
                'يمكنك استبدال رمز قسيمة جارينا من هنا. يمكن شراء قسيمة جارينا من خلال موزعينا الرسمين'}
            </p>
            <span>
              <Link target='_blank' href='https://menadistributors.ff.garena.com/ar'>
                <p 
                style={{
                  fontSize:"13px"
               }}
                className='font-ar text-sm underline text-[#2E86C1]'>
                  {language === 'en' ?
                    "(Click here to view the list of distributors)" :
                    "(أضغط هنا للاطلاع على قائمة الموزعين)"}
                </p>
              </Link>
            </span>

            <div className='w-full'>
              <p
              style={{
                fontSize:"15px",
                fontWeight:"500",
             }}
               className={`${language === 'en' ? 'text-left' : 'text-right'} text-md mr-1 font-normal text-[#28292f] mt-8 font-ar`} dir={language === 'en' ? 'ltr' : 'rtl'}>
                {language === 'en' ?
                  "Password for the prepaid Garena card" : "كلمة المرور لبطاقة جارينا المدفوعة مسبقاً"}
              </p>
              <form onSubmit={handleSubmit}>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`${language === 'en' ? 'text-left' : 'text-right'} mt-3 font-ar`}
                  placeholder={language === 'en' ? 'Prepaid Garena card password' : 'كلمة مرور بطاقة جارينا المدفوعة مسبقاً'}
                />
                {error.appearance && <p className='text-sm font-light mt-1 text-red-600 text-right'>{error.message}</p>}
                <Button disabled={code.length !== 10 || loading} variant='custom' className='font-bold rounded-md mt-5 h-10 text-lg text-white w-full'>
                  {loading
                    ? (language === 'en' ? "... Confirm" : "... تأكيد")
                    : (language === 'en' ? "Confirm" : "تأكيد")
                  }
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div 
         dir= {language ==='en'? "ltr":"rtl"}
         className="flex flex-col gap-9 px-2 lg:px-0">
        <div className="flex flex-col gap-6 empty:hidden" />
        <div>
          <div>
            <div
              id="headlessui-tabs-panel-:r11:"
              role="tabpanel"
              tabIndex={-1}
              data-headlessui-state="selected"
              aria-labelledby="headlessui-tabs-tab-:rv:"
            >
              <div
                className="flex flex-col gap-4"
                id="headlessui-radiogroup-:r12:"
                role="radiogroup"
              >

{showMessagee && (
        <div className="mb-3"
           style={{
            backgroundColor:"#f7f7f7"
           }}
        >
        <div className="flex items-center justify-between gap-4 rounded-md bg-border-login-panel px-2 py-1">
          <div className="text-xs/normal text-text-secondary md:text-sm/[22px]"
            style={{
               color:"#757575"
            }}
           >
            الطائفة المعروضة حاليا تدعم الدفع عن طريق{" "}
            <strong className="font-medium text-text-content2"
              style={{
                 color:"#D81A0D"
              }}
            >
              Visa/Mastercard
            </strong>
            . انقر فوق "إعادة تعيين" لإزالة التحديد.
          </div>
          <a
            className="inline-flex items-center justify-center gap-1.5 rounded-md border py-1 text-center leading-none transition-colors border-primary-red text-primary-red hover:bg-bg-selected dark:hover:border-light-primary-red dark:hover:text-light-primary-red bg-bg-base px-3 text-xs font-medium h-7"
            href=""
            onClick={(e) => {
              e.preventDefault(); 
              handleTabClickk();
            }}
          >
            إعادة ضبط
          </a>
        </div>
      </div>
      
      
      )}
<div className="flex flex-col empty:hidden" role="none">
        <div className="flex flex-col gap-4 empty:hidden" role="none">
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 md:gap-4 empty:hidden" role="none">
            {cards.map((card) => (
              <div
                onClick={() => handleCardClicck(card)}
                key={card.id}
                className="relative"
                role="none"
              >
                <div
                  className={`borrder group peer relative flex min-h-[50px] cursor-pointer flex-col items-center justify-center rounded-md outline outline-1 outline-gray-200 sm:min-h-[64px] md:min-h-[72px] ${
                    latestCard?.id === card.id
                      ? 'bg-[rgb(255,244,244,calc(1*1))] outline-red-700 outline-2 -outline-offset-2 '
                      : 'bg-bg-unselected outline-box-border'
                  }`}
                  id={`headlessui-radiogroup-option-${card.id}`}
                  role="radio"
                  aria-checked={latestCard?.id === card.id}
                  tabIndex={0}
                  onClick={() => handleCardClick(card)}
                >
                  <div className="flex items-center group-aria-disabled:opacity-[.45]">
                    <img
                      className="me-1 h-3 w-3 object-contain md:h-4 md:w-4"
                      src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png"
                      alt="Diamond"
                    />
                    <span className="text-sm/none font-medium md:text-lg/none">
                      {card.value}
                    </span>
                  </div>
                </div>
                <div
                  className={`absolute inset-0 hidden cursor-pointer peer-aria-checked:block`}
                  id={`headlessui-radiogroup-option-${card.id}`}
                  role="radio"
                  aria-checked={latestCard?.id === card.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>


<div className="flex flex-col empty:hidden" role="none">
        <div className="flex flex-col gap-4 empty:hidden" role="none">
          <div role="none">
            <div className="mb-2 flex items-center" role="none">
              <div 
              style={{color:"#757575"}}
              className="text-base/none font-bold text-text-secondary" role="none">
                {language === 'en' ? 'Special Offers' : 'العروض الخاصة'}
              </div>
              <hr className="ms-2 grow border-line" role="none" />
            </div>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4" role="none">
              {cardss.map((card) => (
                <div
                  onClick={() => handleCardClicck(card)}
                  key={card.id}
                  className="relative"
                  role="none"
                >
                  <div
                    className={`group peer relative flex h-full cursor-pointer flex-col items-center rounded-md p-1.5 pb-2 outline outline-1 outline-gray-200 outline-box-border ${
                      latestCard?.id === card.id
                        ? 'bg-[rgb(255,244,244,calc(1*1))] outline-red-700 outline-2 -outline-offset-2'
                        : 'bg-bg-unselected outline-box-border'
                    }`}
                    id={`headlessui-radiogroup-option-${card.id}`}
                    role="radio"
                    aria-checked={latestCard?.id === card.id}
                    tabIndex={-1}
                    data-headlessui-state=""
                  >
                    <div className="relative mb-2 w-full overflow-hidden rounded-sm pt-[56.25%]">
                      <img
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover group-aria-disabled:opacity-[.45]"
                        src={card.imgSrc}
                        alt={card.altText}
                      />
                    </div>
                    <div className="line-clamp-2 text-center text-sm/[18px] font-medium group-aria-disabled:opacity-[.45]">
                      {card.title}
                    </div>
                  </div>
                  <div
                    className={`absolute inset-0 ${
                      latestCard?.id === card.id ? 'block' : 'hidden'
                    } cursor-pointer peer-aria-checked:block`}
                    id={`headlessui-radiogroup-option-${card.id}`}
                    role="radio"
                    aria-checked={latestCard?.id === card.id}
                    data-headlessui-state=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



    
                
              </div>
            </div>
            <span
              id="headlessui-tabs-panel-:r1j:"
              role="tabpanel"
              tabIndex={-1}
              aria-labelledby="headlessui-tabs-tab-:r10:"
              style={{
                position: "fixed",
                top: 1,
                left: 1,
                width: 1,
                height: 0,
                padding: 0,
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0px, 0px, 0px, 0px)",
                whiteSpace: "nowrap",
                borderWidth: 0
              }}
            />
          </div>
        </div>



        <div
          className="flex flex-col"
          id="headlessui-radiogroup-:rf:"
          role="radiogroup"
        >
          <div
            id="channel-section"
            className="mb-3 flex scroll-mt-36 items-center gap-2 text-lg/none font-bold text-text-title md:text-xl/none"
            role="none"
          >
            <div className="grid items-center" data-marker="true" role="none">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="col-start-1 row-start-1 text-2xl text-primary-red"
                role="none"
              >
                <path
                  d="M0 3C0 1.34315 1.34315 0 3 0H21C22.6569 0 24 1.34315 24 3V15.7574C24 16.553 23.6839 17.3161 23.1213 17.8787L17.8787 23.1213C17.3161 23.6839 16.553 24 15.7574 24H3C1.34315 24 0 22.6569 0 21V3Z"
                  fill="currentColor"
                  role="none"
                />
              </svg>
              <div
                className="col-start-1 row-start-1 text-center text-base/none text-white"
                role="none"
              >
                3
              </div>
            </div>

            
            <div role="none">
          
            {language ==='en' ? 'Payment Methods' : 'طرق الدفع'}
            </div>
          </div>



 <div className="relative">
  <div className="relative scroll-mt-40 ">
  {showMessagee && (
        <div className="mb-4 text-xs/normal text-text-secondary">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block align-middle text-base/none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 18C9 11.9249 13.9249 7 20 7H60C66.0751 7 71 11.9249 71 18V62C71 68.0751 66.0751 73 60 73H20C13.9249 73 9 68.0751 9 62V18ZM20 13C17.2386 13 15 15.2386 15 18V62C15 64.7614 17.2386 67 20 67H60C62.7614 67 65 64.7614 65 62V18C65 15.2386 62.7614 13 60 13H20ZM23 31C23 29.3431 24.3431 28 26 28H54C55.6569 28 57 29.3431 57 31C57 32.6569 55.6569 34 54 34H26C24.3431 34 23 32.6569 23 31ZM26 46C24.3431 46 23 47.3431 23 49C23 50.6569 24.3431 52 26 52H42C43.6569 52 45 50.6569 45 49C45 47.3431 43.6569 46 42 46H26Z"
            fill="currentColor"
          />
        </svg>{" "}
        <span>يمكنك استخدام بطاقات فيزا/ماستر كارد لإجراء الدفع</span>
      </div>
      
      )}
    <div
      className={`oddd mb-2 outline outline-1 outline-gray-200 group peer relative flex h-full min-h-[80px] cursor-pointer items-start gap-2 rounded-md 
        ${selected === 'channel-230199' ? 'bg-[rgb(255,244,244,calc(1*1))] outline-red-700 outline-2 -outline-offset-2 '
          : 'bg-bg-unselected outline-box-border'} 
        max-md:flex-col max-md:justify-center md:items-center md:gap-3 md:p-3`}
      id="channel-230199 headlessui-radiogroup-option-:r32:"
      role="radio"
      aria-checked={selected === 'channel-230199'}
      tabIndex={0}
      onClick={() => {
        handleClick('channel-230199');
        handleClickk();
      }}
    >

 
<div className="ooddd flex w-full flex-nowrap flex-col gap-x-0.5 gap-y-1 text-sm/none font-medium md:flex-col md:gap-y-2 md:text-base/none"
 style={{
   display:"flex",
   flexDirection:"row",
   gap:"0.7rem"
 }}
>
      
          <span className="items-center [text-decoration:inherit] inline-flex">
            
          <span
          //  style={{color:"#dd4245"}}
           className="mb-1 items-center [text-decoration:inherit] inline-flex">
              {/* {latestCard ? latestCard.price : ''} */}
              {/* ooredoo */}
              <img 
                style={{
                   width:"70px",
                   marginBottom:"4px"
                }}
              src="https://res.cloudinary.com/dglafz8eh/image/upload/v1721819524/p2wmlaxdf10uj1ygtfgl.png" alt="" />
          </span>
        </span> 
        {latestCard && (
  <span className="inline-flex items-center gap-0.5 text-sm/none text-bonus"
  style={{
    display:"flex",
    flexDirection:"column",
    gap:"0.5rem"
  }}
   >
    {latestCard.price && (
      <span>
         {latestCard.price}
      </span>
    )}
    {!latestCard.isSecondSession && latestCard.reward !== undefined && (
      <div
      style={{
        display:"flex",
        flexDirection:"row",
        gap:"0.3rem"
      }}
      >
        <span style={{ color: "#f4841a" }}>
          {language === 'en'
            ? ` + Bonus ${latestCard.reward}`
            : ` + مكافأة ${latestCard.reward}`}
        </span>
        <img
          className="h-3 w-3 object-contain"
          src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png"
          alt="Bonus"
        />
      </div>
    )}
  </span>
)}


      </div>

      <div className="absolute end-[3px] top-[3px] overflow-hidden rounded-[3px]">
        <div className="flex text-2xs/none font-bold uppercase">
          <div
            style={{ backgroundColor: "rgb(230 37 45 / calc(1 * 1))",
              fontWeight:"500",
              fontSize:"12px"
             }}
            className="h-4 flex items-center gap-1 bg-bg-tag-promo p-0.5 pe-1 text-white"

          >
            <img
              className="h-3 w-3 rounded-sm bg-white object-contain p-0.5"
              src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png"
              alt="Special Offer"
            />
            {language === 'en' ? 'PROMO' : 'عرض خاص'}
          </div>
        </div>
      </div>
    </div>
    <div
      className="absolute inset-0 hidden cursor-pointer peer-aria-checked:block"
      id="headlessui-radiogroup-option-:r33:"
      role="radio"
      aria-checked={selected === 'channel-230199'}
    />
  </div>
</div>


          
        </div>
        
        
      </div>
      )}
          
          {showButton && (


  <div dir= {language ==='en'? "ltr":"rtl"} className="fdds sticky inset-x-0 bottom-0 z-10" data-headlessui-state="">
  <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-t border-line/50 bg-bg-base p-4 md:justify-end md:gap-10 md:border-none lg:px-10">

  <div className="pt-3 flex flex-col md:items-end relative hover-trigger section-hover">
      <div className="flex items-center gap-1 text-sm/none font-bold md:text-end md:text-base/none">
        <span className="flex items-center gap-1">
          {latestCard?.value ? (
            <>
              <img className="h-4 w-4 object-contain" src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png" />
              {latestCard.value} + {latestCard.reward}
            </>
          ) : (
            ''
          )}
          <span>{latestCard?.title || ''}</span>
        </span>

        {latestCard?.value && (
          <button
            className="rounded-full bg-icon-bottom-bar text-lg transition-all rotate-button"
            type="button"
            aria-expanded="false"
            data-headlessui-state=""
            id="headlessui-popover-button-:r7e:"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-icon"
            >
              <path
                d="M11.25 9.96484L9 7.71484L6.75 9.96484"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {latestCard?.value && (
        <div className="hover-card absolute hidden p-4 bg-white border rounded shadow-md">
          <div className='flex items-center justify-between'>
            <p style={{ fontWeight: "800" }} >
             
            {language === 'en' ? 'Total Amount' : 'المجموع'}
            </p>
            <div className='flex items-center'>
              <img className="ml-1 h-4 w-4 object-contain" src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png" />
              <span style={{ fontWeight: "800" }}>
                {(latestCard?.value || 0) + (latestCard?.reward || 0)}
              </span>
            </div>
          </div>

          <div className='mt-3' style={{ backgroundColor: "#f9f9f9", padding: "0.4rem" }}>
            <div className='flex items-center justify-between '>
              <p style={{ color: "#757575", fontSize: "14px", fontWeight: "500" }}>
                
                {language === 'en' ? 'Original price' : 'السعر الأصلي'}
                </p>
              <div className='flex items-center gap-1'>
                <img style={{ width: "14px" }} className="ml-1 h-4 w-4 object-contain" src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png" />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{latestCard.value}</span>
              </div>
            </div>
            <div className='flex items-center justify-between mt-1'>
              <p style={{ color: "#757575", fontSize: "14px", fontWeight: "500" }}>
                
                {language === 'en' ? '+ Bonus General' : '+ مكافأة عام'}
                </p>
              <div className='flex items-center gap-1'>
                <img style={{ width: "14px" }} className="ml-1 h-4 w-4 object-contain" src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png" />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{latestCard.reward}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 flex items-center gap-1 text-sm/none md:text-end md:text-base/none">
        <span className="font-medium">
          {language === 'en' ? 'Sum:' : 'المجموع:'}
        </span>
        <span className="items-center [text-decoration:inherit] flex font-bold text-text-content2">
          {latestCard?.price ? `${latestCard.price}` : ''}
        </span>
      </div>
    </div>

    <button
  onClick={handleButtonClick}
  style={{
    color: "#fff",
    background: "#D81A0D",
    fontWeight: "700",
    zIndex: "0",
  }}
  disabled={!disable} 
  className={
    disable
      ? "inline-flex items-center justify-center gap-1.5 rounded-md border py-1 text-center leading-none transition-colors border-primary-red bg-primary-red text-white hover:bg-primary-red-hover hover:border-primary-red-hover px-5 text-base font-bold h-11"
      : "inline-flex items-center justify-center gap-1.5 rounded-md border py-1 text-center leading-none transition-colors border-primary-red bg-primary-red text-white hover:bg-primary-red-hover hover:border-primary-red-hover px-5 text-base font-bold h-11 opacity-40 cursor-not-allowed"
  }
>

  <span className="text-lg h-[18px] w-[18px]">
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M54.125 34.1211C55.2966 32.9495 55.2966 31.05 54.125 29.8784C52.9534 28.7069 51.0539 28.7069 49.8823 29.8784L38.0037 41.7571L32.125 35.8784C30.9534 34.7069 29.0539 34.7069 27.8823 35.8784C26.7108 37.05 26.7108 38.9495 27.8823 40.1211L35.8823 48.1211C37.0539 49.2926 38.9534 49.2926 40.125 48.1211L54.125 34.1211Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.4187 3.4715C41.2965 2.28554 38.711 2.28554 36.5889 3.4715L8.07673 19.4055C6.19794 20.4555 4.97252 22.4636 5.02506 24.7075C5.36979 39.43 10.1986 63.724 37.0183 76.9041C38.8951 77.8264 41.1125 77.8264 42.9893 76.9041C69.809 63.724 74.6377 39.43 74.9825 24.7075C75.035 22.4636 73.8096 20.4555 71.9308 19.4055L43.4187 3.4715ZM39.5159 8.7091C39.8191 8.53968 40.1885 8.53968 40.4916 8.7091L68.9826 24.6313C68.6493 38.3453 64.2154 59.7875 40.343 71.5192C40.135 71.6214 39.8725 71.6214 39.6646 71.5192C15.7921 59.7875 11.3583 38.3453 11.025 24.6313L39.5159 8.7091Z"
        fill="currentColor"
      />
    </svg>
  </span>
  
  {language ==='en' ? 'Buy Now' : 'شراء الآن'}
</button>
 

  </div>
</div>


)}

        </div>
    );
}

export default Topupamountcard;



const Offers = ({ name, heading, bonus }) => {
    return (
        <div className=' w-full flex items-center justify-between'>
            <p className=' text-sm font-[500] font-en'
             style={{
              fontSize:"14px"
           }}
            >{name}</p>
            <div className=' flex items-center justify-center gap-2'>
                <div className=' flex  items-center justify-end flex-col'>
                    <p className=' text-lg font-medium  font-en'
                     style={{
                      fontSize:"16px"
                   }}
                    >{heading}</p>
                    <p className=' text-sm font-medium text-[#ff8f00]'
                    style={{
                      fontSize:"14px"
                   }}
                    >{bonus}</p>
                </div>
                <Image src='/assets/diamond.png' height={30} width={30} alt='diamond' />
            </div>
        </div>
    );
}

const BCOffers = ({ name, heading }) => {
    return (
        <div className=' w-full flex items-center justify-between'>
            <div className='flex items-center justify-center gap-1'>
                <p className=' text-sm font-[500] font-en'>{name}</p>
                <Image src='/assets/bc-shells.svg' height={20} width={20} alt='aa' />
            </div>
            <div className=' flex items-center justify-center gap-2'>

                <p className=' text-lg font-medium  font-en'>{heading}</p>


                <Image src='/assets/bc-elixer.png' height={30} width={30} alt='diamond' />
            </div>
        </div>
    );
}


