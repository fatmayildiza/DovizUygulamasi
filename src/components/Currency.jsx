import React, { useState } from 'react';
import '../css/currency.css';
import { FaArrowCircleRight } from "react-icons/fa";
import axios from 'axios';

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = ".......";

function Currency() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [result, setResult] = useState('');

    const exchange = async () => {
        try {
            const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
            const exchangeRate = response.data.data[toCurrency];
            
   
            const calculatedResult = exchangeRate ? (parseFloat(exchangeRate) * parseFloat(amount)) : 0;
            setResult(calculatedResult.toFixed(2));
        } catch (error) {
            console.error("Error fetching exchange rates", error);
            setResult('Error');
        }
    };
    
    

    return (
        <div className='currency-div'>
            <div>
                <h3 style={{ backgroundColor: 'antiquewhite', fontFamily: 'cursive' }}> DÖVİZ KURU UYGULAMASI</h3>
            </div>
            <div>
                <input 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type='number'
                    className='amount'
                />
                <select 
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className='from-currency-option'
                >
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TL</option>
                </select>
                <FaArrowCircleRight style={{ fontSize: '25px', marginRight: '10px', marginLeft: '10px', color: 'gray' }} />
                <select 
                    onChange={(e) => setToCurrency(e.target.value)}
                    className='to-currency-option'
                >
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TL</option>
                </select>
                <input value={result} readOnly type='number' className='result' />
            </div>
            <div>
                <button 
                    onClick={exchange}
                    style={{ cursor: 'pointer', width: 70, height: 25, border: 'none', borderRadius: 5, fontWeight: 'bold', fontFamily: 'cursive' }}
                >
                    ÇEVİR
                </button>
            </div>
        </div>
    );
}

export default Currency;
