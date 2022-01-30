import { Theme } from '@Styled/theme';
import QRCodeStyling from 'qr-code-styling';
import { useCallback, useEffect, useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';


const QR_DIMENSION = 320;
const qrCode = new QRCodeStyling({
  width: QR_DIMENSION,
  height: QR_DIMENSION,
  dotsOptions: {
    type: 'dots'
  },
  cornersDotOptions: {
    type: 'dot'
  },
  cornersSquareOptions: {
    type: 'extra-rounded'
  },
  imageOptions: {
    imageSize: 0.75,
    margin: 16
  },
});

const QRCode = () => {
  const [url, setUrl] = useState('https://T04435.dev/tools/QR');
  const [color, setColor] = useState(Theme.palette.dark);
  const QRCodeRef = useRef(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import qr-code-styling only client-side
    if (typeof window !== 'undefined') {
      if (QRCodeRef.current) {
        qrCode.append(QRCodeRef.current);
      }
    }
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);

  useEffect(() => {
    qrCode.update({
      dotsOptions: {
        color: color
      }
    });
  }, [color]);


  const handleDownload = (fileType: 'svg' | 'png' | 'webp') => {
    void qrCode.download({
      extension: fileType
    });
  };

  const handleImageChange = (image: string | undefined) => {
    void qrCode.update({
      image: image
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const dataUrl = reader.result;
      qrCode.update({
        image: dataUrl as string
      });
    };
    reader.readAsDataURL(acceptedFiles[0]);

  }, []);

  return <QRCodeStyled>
    <URLInput type="text" placeholder={'Type URL here'} value={url} onChange={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setUrl(e.target.value);
    }}/>
    <Dropzone onDrop={onDrop} multiple={false}>
      {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <DropMessage>Add logo</DropMessage>
          </div>
      )}
    </Dropzone>
    <ClearImageButton onClick={() => handleImageChange(undefined)}>Remove logo</ClearImageButton>
    <label>
      <input type="color" onChange={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setColor(e.target.value);
      }
      }/>
      &nbsp;Choose QR code color
    </label>
    <QRContainer ref={QRCodeRef}/>
    <DownloadButton onClick={() => handleDownload('svg')}>Download SVG</DownloadButton>
    <DownloadButton onClick={() => handleDownload('png')}>Download PNG</DownloadButton>
    <DownloadButton onClick={() => handleDownload('webp')}>Download WEBP</DownloadButton>
  </QRCodeStyled>;
};

const QRCodeStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: ${QR_DIMENSION}px;
`;
const QRContainer = styled.div`
  width: ${QR_DIMENSION}px;
  height: ${QR_DIMENSION}px;
`;

const URLInput = styled.input`
  border: 2px solid ${(props) => props.theme.palette.dark};
  height: 48px;
  padding: 0 1rem;
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const DropMessage = styled.p`
  border: 2px dashed ${(props) => props.theme.palette.dark};
  border-radius: ${(props) => props.theme.borderRadius};
  height: 48px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownloadButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.palette.primary};
  color: ${(props) => props.theme.palette.light};
  border-radius: ${(props) => props.theme.borderRadius};
  height: 48px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClearImageButton = styled(DownloadButton)`
  background-color: ${(props) => props.theme.palette.secondary};
`;
export default QRCode;
