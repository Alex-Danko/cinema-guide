import { FC, MouseEventHandler } from "react";
import { Search } from "../Search/Search";
import './SearchModal.css'
import ReactDom from "react-dom"

export interface SearchModalProps {
    open: boolean,
    onClose: MouseEventHandler<HTMLElement>
}

export const SearchModal: FC<SearchModalProps> = ({ open, onClose }) => {

    if (!open) return null;

    return ReactDom.createPortal(
        <div className="search-modal">
            <Search closeModal={onClose}/>
            <button className="search-modal-close" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9987 10.5865L16.9485 5.63672L18.3627 7.05093L13.4129 12.0007L18.3627 16.9504L16.9485 18.3646L11.9987 13.4149L7.04899 18.3646L5.63477 16.9504L10.5845 12.0007L5.63477 7.05093L7.04899 5.63672L11.9987 10.5865Z" fill="white" />
                </svg>
            </button>
        </div>,
        document.getElementById('modal')!
    )
}