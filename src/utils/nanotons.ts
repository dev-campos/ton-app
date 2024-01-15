import BigNumber from "bignumber.js"

const decimals = new BigNumber(1e9)

export const formatTons = (nanotons: string | number) => {
    const bigNano = new BigNumber(nanotons)
    return bigNano.div(decimals)
}