import {FaCopy} from "react-icons/fa";
import "./Payment.css";
import {MdDownloading} from "react-icons/md";
import { useParams } from "react-router";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateDepositData } from "../../Components/store/FeaturesSlice";

const Payment = () => {
    const {paymentname, id} = useParams()
    const [pay, setpay] = useState(false)
    let amount = JSON.parse(localStorage.getItem("amount"))
    const [isButtonDisabled, setButtonDisabled] = useState(false);



    const nav = useNavigate()
    console.log(amount);

    const depositDatas = 
        {
            amount: amount,
            paymentMode: paymentname,
            status: "success",
            dateCreated: new Date().toDateString(),
        }
    const dispatch = useDispatch()
    // console.log(depositData)

    const [state, setState] = useState({
        value: `${paymentname === "BITCOINP PAYMENT"? ("bc1qgcqq96k52032390g7nvnf6j5ds0wqgusywm0sj"): paymentname === "ETHEREUM PAYMENT"? ("0x51C9A181FcAdcE7E4704db79a876A4B84f4daBA1"):"Chosse a Payment Method"}`,
        copied: false,
      });

      const url = `https://ot-swift-earnprime-back-end.vercel.app/api/sendpayment/${id}`

      const data = {
        amountDeposited:amount,
        paymentMethod: paymentname
      }
      
      const payNow = ()=> {
        setButtonDisabled(true)
        axios.post(url, data)
        .then(res => {
          console.log(res)
          setpay(true)

        }).catch((err)=>{
          console.log(err)
        })
      }

    return (
        <>
            <div className="DepPaymentBody">
                <h1>Make Payment</h1>
                <div className="DepPaymentContent">
                    <div className="DepPaymentContentWrap">
                        <div className="DepPaymentContentA">
                            <div>Your payment method</div>
                            <p>
                                {paymentname}{" "}
                                <span>
                                    <MdDownloading />
                                </span>
                            </p>
                        </div>
                        <p className="DepPaymentContentB">
                            You are to make payment of ${amount} using your selected
                            payment method.
                        </p>
                        <div className="DepPaymentContentC">
                            <p>{paymentname} Address:</p>
                            <div className="DepPaymentContentCTopReferUsDivBox">
                                <input
                                    type="text"
                                    value={state.value}
                                    readOnly
                                />
                                <CopyToClipboard
                                 text={state.value}
                                 onCopy={() => setState({ copied: true })}
                                 >
                                <div className="DepPaymentContentCTopReferUsDivBoxCopy">
                                    <FaCopy />
                                </div>
                                 </CopyToClipboard>
                            </div>
                            <h5>Network Type:<span>{paymentname=== "BITCOINP PAYMENT"? "BTC" : paymentname=== "ETHEREUM PAYMENT"? "ETH" :  paymentname === "DOGECOIN PAYMENT" ? "DOGECOIN" : paymentname=== "ETHEREUM PAYMENT"? "ETH" :  paymentname === "BNB PAYMENT" ? "BNB": null}</span></h5>
                        </div>
                        <div className="DepPaymentContentD">
                            <p>Upload Payment proof after payment.</p>
                            <div className="DepPaymentContentDUpload">
                                <input type="file" />
                            </div>
                            <button onClick={payNow}
                            disabled={isButtonDisabled}
                            >
                                {
                                    isButtonDisabled ?  "Submitting..." : 'Submit Payment'
                                }
                                </button>
                        </div>
                    </div>
                </div>

          {pay?
          <div className='SuccessPaid'>
                <div className='PayCon'>
                    <h3>You have successfully made a deposit </h3>
                    <button style={{width: "50%", height: "40px", background:"#0e4152", border:"none", color:"white", fontSize:"15px"}} onClick={()=>{setpay(false); nav(`/${id}`); dispatch(updateDepositData(depositDatas))}}>Ok</button>
                </div>
            </div>: 
            null}
            </div>
        </>
    );
};

export default Payment;
