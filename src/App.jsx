import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import FormComponent from './components/FormComponent'
import Result from './components/Result'
import Spinner from './components/Spinner'
import ImagenCripto from './img/imagen-criptos.png'


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width:90%;
  @media (min-width:992px){
    display:grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width:400px;
  width:80%;
  margin: 100px auto 0 auto; 
  display:block;
`

const Heading = styled.h1`
  font-family: 'lato',sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content:'';
    width: 400px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [currencies,setCurrencies]=useState({})
  const [result, setResult]=useState({})
  const [loading, setLoading]=useState(false)

  useEffect(()=>{
    if(Object.keys(currencies).length>0){
      
      const checkCripto = async ()=>{
        setLoading(true)
        setResult({})


        const {currency,criptoCurrency}= currencies
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoCurrency}&tsyms=${currency},EUR`
      
        const answer = await fetch(url)
        const result = await answer.json()

        setResult(result.DISPLAY[criptoCurrency][currency])
        setLoading(false)
      }
      checkCripto()
    }
  },[currencies])

  return (

    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt='Image criptocurrency'
      />
      <div>
        <Heading>
          Check the price of your favorite criptocurrency
        </Heading>
        <FormComponent
          setCurrencies={setCurrencies}

        />
        {loading && <Spinner/>}
        {result.PRICE && <Result result={result}/>}
      </div>

    </Contenedor>
  )
}

export default App
