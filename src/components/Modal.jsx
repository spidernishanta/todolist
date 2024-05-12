import { createPortal } from "react-dom"
import { AiOutlineClose } from "react-icons/ai"

const Modal = ({isOpen, onClose, children}) => {
  return createPortal(
    <>
    {isOpen && (
      <div className="backdrop-blur h-screen w-screen absolute top-0 z-40 grid place-items-center">
        <div className="bg-white min-h-[350px] max-w-[80%] p-4 z-50 relative m-auto min-w-[80%]">
          <div className="flex justify-end">
            <AiOutlineClose className="text-2xl self-end cursor-pointer" onClick={onClose}/>
          </div>
          {children}
        </div>
      </div>
    )}
    </>
  , document.getElementById("modal-root"))
}

export default Modal