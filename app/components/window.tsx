import Draggable from "react-draggable";

interface WindowProps {
    title: string;
    children: React.ReactNode;
    className: string;
}

export default function Window({ title, children, className }: WindowProps) {

    return (
      <Draggable handle=".title-bar" bounds=".desktop">
        <div className='window absolute top-1 left-1 sm:top-5 sm:left-[200px] z-10'>
          <div className="title-bar">
            <div className="title-bar-text">{title}</div>
            <div className="title-bar-controls">
                <button onClick={() => window.location.href = '/'} aria-label="Close">X</button>
            </div>
          </div>
          <div className={`window-body max-h-[500px] sm:max-h-[700px] overflow-auto ${className}`}>
            {children}
          </div>
        </div>
      </Draggable>
    );
}