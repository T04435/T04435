import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicQRCode = dynamic(() => import('@Components/QRCode/QRCode'), {
  ssr: false
});

const QR: NextPage = () => {
  return <>
    <h2>QR</h2>
    <DynamicQRCode/>
    {/*  TODO: Give credits qr-code-styling / dropzone*/}
  </>;
};


export default QR;
