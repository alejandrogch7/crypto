import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrency from '../hooks/useSelectCurrency'
import { currencies } from '../data/currencies'


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: backround-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const FormComponent = ({setCurrencies}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [currency, SelectCurrency] = useSelectCurrency('choose your currency', currencies)
    const [criptoCurrency, SelectCriptoCurrency] = useSelectCurrency('choose your cripto currency', criptos)

    useEffect(() => {
        const consultAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

            const answer = await fetch(url)
            const result = await answer.json()

            console.log(result.Data)

            const arrayCriptos = result.Data.map(cripto => {

                const object = {
                    id: cripto.CoinInfo.Name,
                    currencyName: cripto.CoinInfo.FullName
                }
                return object
            })
            setCriptos(arrayCriptos)
        }
        consultAPI()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([currency, criptoCurrency].includes('')) {
            setError(true)
            return
        }
        setError(false)
        setCurrencies({
            currency,
            criptoCurrency
        })
    }

    return (
        <div>
            
            {error && <Error>All blanks must be filled!</Error> }
            <form
                onSubmit={handleSubmit}
            >
                <SelectCurrency />
                <SelectCriptoCurrency />

                <InputSubmit
                    type='submit'
                    value='check price'
                />


            </form>
        </div>
    )
}

export default FormComponent