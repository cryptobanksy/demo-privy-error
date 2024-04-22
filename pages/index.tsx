import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ConnectedWallet, usePrivy, useWallets } from '@privy-io/react-auth';
import Head from 'next/head';
import { ethers } from 'ethers';

export default function DashboardPage() {
  const {
    ready,
    authenticated,
    user,
  } = usePrivy();

  const { wallets } = useWallets();
  const embeddedWallet: ConnectedWallet | undefined = useMemo(() => {
    return wallets.find((w) => w.walletClientType === "privy");
  }, [wallets]);

  const getEthersSigner = 
    async () => {
      const provider = await embeddedWallet?.getEthersProvider();
      return await provider?.getSigner();
    };

  const [chainId, setChainId] = useState("88882")
  const [balance, setBalance] = useState<any>(0)
  const fetchBalance = async () => {
    const signer = await getEthersSigner();
    if (!signer) return;
    const d = await signer.getBalance();
    const balance = ethers.formatEther(d?.toBigInt());
    setBalance(balance);
  };

  useEffect(() => {
    fetchBalance().catch(() => {})
  }, [embeddedWallet])

  const [result, setResult] = useState<any>()

  const handleSend = async () => {
    setResult("")
    // chiliz spicy network 88882
    await embeddedWallet?.switchChain(Number(chainId));
    console.log(embeddedWallet?.chainId);

    const signer = await getEthersSigner();
    if (!signer) {
      return;
    }

    console.log(signer);

    try {
      const tx = await signer.sendTransaction({
        to: "0x62c717299AbfF852385173ffEf45B9F48D86c5b4",
        value: ethers.parseEther("0.1"),
      });

      const result = await tx.wait();
      setResult(result)

    } catch (e) {
      console.log(e);
      setResult(e)
    }
    
  }

  return (
    <>
      <Head>
        <title>Privy Auth Demo</title>
      </Head>

      <main className="flex flex-col min-h-screen px-4 sm:px-20 py-6 sm:py-10 bg-privy-light-blue">
        {ready && authenticated ? (
          <>
            <p className="mt-6 font-bold uppercase text-sm text-gray-600">User object</p>
            <textarea
              value={JSON.stringify(user, null, 2)}
              className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2"
              rows={8}
              disabled
            />
            <p className="mt-6 font-bold uppercase text-sm text-gray-600">Embedded Wallet object</p>
            <textarea
              value={JSON.stringify(embeddedWallet, null, 2)}
              className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2"
              rows={8}
              disabled
            />

            <div>
              <select className="mt-5 form-select px-4 py-3 w-[200px]" value={chainId} onChange={(e) => {
                console.log('select', e.target.value)
                setChainId(e.target.value)
                embeddedWallet?.switchChain(Number(e.target.value))
              }}>
                <option value="97">BNB Chain</option>
                <option value="88882">Chiliz Chain</option>
              </select>
              <div>Balance: { balance }</div>
              <button className='bg-red-400 rounded-lg py-2 px-5 mt-6' onClick={handleSend}>Send</button>

              <div>
                {JSON.stringify(result, null, 2)}
              </div>
            </div>
          </>
        ) : null}
      </main>
    </>
  );
}
