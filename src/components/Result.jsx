import styled from "@emotion/styled"

const Container = styled.div`
    color: #FFF;
    font-family: 'Lato',sans-serif;

    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Image = styled.img`
    display: block;
    width: 130px;
`

const Text = styled.p`
       font-size: 18px;
    span{
        font-weight: 700;
    }
`
const Price = styled.p`
    font-size: 28px;
    span{
        font-weight: 700;
    }
`

const Result = ({ result }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = result
    return (
        <Container>
            <Image 
                src={`https://cryptocompare.com/${IMAGEURL}`} 
                alt="Image cripto" 
            />
            <div>
                <Price>The price is: <span>{PRICE}</span></Price>
                <Text>The highest price of the day: <span>{HIGHDAY}</span></Text>
                <Text>The lowest price of the day: <span>{LOWDAY}</span></Text>
                <Text>The varietion of the last 24 hours is: <span>{CHANGEPCT24HOUR}</span></Text>
                <Text>The last update is: <span>{LASTUPDATE}</span></Text>
            </div>
        </Container>
    )
}

export default Result