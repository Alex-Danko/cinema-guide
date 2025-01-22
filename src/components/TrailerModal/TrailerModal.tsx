import "./TrailerModal.css"
import { FC, MouseEventHandler, useEffect, useState } from "react";
import ReactDom from "react-dom"

export interface TrailerModalProps {
    open: boolean,
    onClose: MouseEventHandler<HTMLButtonElement>,
    trailerUrl: string
}

export const TrailerModal: FC<TrailerModalProps> = ({ open, onClose, trailerUrl }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 1024);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

    const modalStyles = {
        display: "block"
    }

    if (!open) return null;

    return ReactDom.createPortal(
        <div className="trailer-modal-wrapper" style={modalStyles}>
            <div className="trailer-modal">
                <div className="trailer-modal-content">
                    <iframe title="trailer" width={isMobile ? window.innerWidth - 40 : "960px"} height={isMobile ? (window.innerWidth / 16 * 9) : "540x"} frameBorder={0}
                        src={`https://www.youtube.com/embed/${trailerUrl}`}>
                    </iframe>
                </div>
                <button className="trailer-modal-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" fill="black" />
                    </svg>
                </button>
            </div>

        </div>,
        document.getElementById('modal')!
    )
}