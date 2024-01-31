const Web3 = require('web3');
const ethUtil = require('ethereumjs-util');

exports.verifyWalletAddress = async (publicAddress, signature) => {
    try {
        let web3 = new Web3();
        let msg = web3.utils.fromUtf8("Login Mrmint");

        const msgBuffer = await ethUtil.toBuffer(msg);
        const msgHash = ethUtil.hashPersonalMessage(msgBuffer);

        const signatureBuffer = ethUtil.toBuffer(signature);
        const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
        const publicKey = ethUtil.ecrecover(
            msgHash,
            signatureParams.v,
            signatureParams.r,
            signatureParams.s
        );
        const addressBuffer = ethUtil.publicToAddress(publicKey);
        const address = ethUtil.bufferToHex(addressBuffer);
       
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
            return {
                status: true,
            }
        } else {
            return {
                status: false,
                message: "Wallet signature verification failed!"
            }
        }
    } catch (err) {
        return {
            status: false,
            message: err.toString()
        }
    }
}